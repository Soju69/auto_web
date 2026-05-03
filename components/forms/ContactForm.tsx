"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schemas";
import { getSavedClientProfile, saveClientProfile } from "@/lib/client-profile";
import { InputField } from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({
  endpoint = "/api/public/contact",
  defaultTopic = "",
  submitLabel = "Отправить заявку",
  successMessage = "Заявка отправлена. Персональный советник свяжется с вами в ближайшее время."
}: {
  endpoint?: string;
  defaultTopic?: string;
  submitLabel?: string;
  successMessage?: string;
}) {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      topic: defaultTopic,
      clientId: ""
    }
  });

  useEffect(() => {
    const profile = getSavedClientProfile();

    if (!profile) {
      return;
    }

    setValue("name", profile.name);
    setValue("phone", profile.phone);
    setValue("clientId", profile.clientId);
  }, [setValue]);

  async function onSubmit(values: ContactFormValues) {
    setServerMessage(null);

    const profile = saveClientProfile(values);
    const payload = {
      ...values,
      clientId: profile?.clientId ?? values.clientId
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setServerMessage("Не удалось отправить заявку. Попробуйте ещё раз.");
      return;
    }

    reset({
      name: profile?.name ?? values.name,
      phone: profile?.phone ?? values.phone,
      topic: defaultTopic,
      message: "",
      clientId: profile?.clientId ?? values.clientId
    });
    setServerMessage(successMessage);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <input type="hidden" {...register("clientId")} />
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          id="contact-name"
          label="ФИО"
          placeholder="Алексей Морозов"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputField
          id="contact-phone"
          label="Телефон"
          placeholder="+7 999 012-88-88"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>
      <InputField
        id="contact-topic"
        label="Тема"
        placeholder="Показ Zeekr 001"
          error={errors.topic?.message}
          {...register("topic")}
        />
      <div className="space-y-2">
        <Label htmlFor="contact-message">Сообщение</Label>
        <Textarea
          id="contact-message"
          placeholder="Расскажите, какой автомобиль вас интересует или какую задачу хотите решить."
          {...register("message")}
        />
        {errors.message?.message ? (
          <p className="text-sm text-red-300">{errors.message.message}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-luxury-soft">
          {serverMessage ??
            (isSubmitSuccessful
              ? "Заявка зафиксирована в CRM."
              : "Ответим по наличию, trade-in, тест-драйву или кредиту без лишних ожиданий.")}
        </p>
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправляем..." : submitLabel}
        </PrimaryButton>
      </div>
    </form>
  );
}
