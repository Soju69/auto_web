"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schemas";
import { InputField } from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  });

  async function onSubmit(values: ContactFormValues) {
    setServerMessage(null);

    const response = await fetch("/api/public/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setServerMessage("Не удалось отправить заявку. Попробуйте ещё раз.");
      return;
    }

    reset();
    setServerMessage("Заявка отправлена. Персональный советник свяжется с вами в ближайшее время.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          id="contact-name"
          label="Имя"
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
          {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        </PrimaryButton>
      </div>
    </form>
  );
}
