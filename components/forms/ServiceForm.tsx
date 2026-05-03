"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { serviceTypes } from "@/lib/constants";
import { serviceFormSchema, type ServiceFormValues } from "@/lib/form-schemas";
import { InputField } from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Textarea } from "@/components/ui/textarea";

export function ServiceForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema)
  });

  async function onSubmit(values: ServiceFormValues) {
    setServerMessage(null);

    const response = await fetch("/api/public/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setServerMessage("Не удалось отправить запись. Попробуйте ещё раз.");
      return;
    }

    reset();
    setServerMessage("Запись отправлена. Мы подтвердим время визита и закрепим мастера.");
  }

  return (
    <GlassCard className="p-5 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            label="Имя клиента"
            id="service-name"
            placeholder="Алексей Морозов"
            error={errors.name?.message}
            {...register("name")}
          />
          <InputField
            label="Телефон"
            id="service-phone"
            placeholder="+7 999 000-00-00"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <InputField
            label="Автомобиль"
            id="service-car"
            placeholder="Zeekr 001"
            error={errors.car?.message}
            {...register("car")}
          />
          <InputField
            label="Госномер"
            id="service-plate"
            placeholder="А777АА797"
            error={errors.plate?.message}
            {...register("plate")}
          />
          <InputField
            label="Желаемая дата"
            id="service-date"
            type="date"
            error={errors.date?.message}
            {...register("date")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-type">Тип сервиса</Label>
          <select
            id="service-type"
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            defaultValue=""
            aria-invalid={Boolean(errors.serviceType)}
            {...register("serviceType")}
          >
            <option value="" className="bg-luxury-main">
              Выберите услугу
            </option>
            {serviceTypes.map((service) => (
              <option key={service} value={service} className="bg-luxury-main">
                {service}
              </option>
            ))}
          </select>
          {errors.serviceType?.message ? (
            <p role="alert" className="text-sm text-red-300">
              {errors.serviceType.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-note">Комментарий</Label>
          <Textarea
            id="service-note"
            placeholder="Опишите задачу, текущие симптомы или то, что хотите проверить на визите."
            {...register("note")}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {isSubmitSuccessful ? (
            <p role="status" className="text-sm text-luxury-champagne">
              {serverMessage ?? "Заявка отправлена. Консьерж свяжется с вами для подтверждения времени."}
            </p>
          ) : (
            <p className="text-sm text-luxury-soft">
              {serverMessage ?? "Подтверждаем запись в рабочее время и заранее уточняем детали визита."}
            </p>
          )}
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем..." : "Записаться"}
          </PrimaryButton>
        </div>
      </form>
    </GlassCard>
  );
}
