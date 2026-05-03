"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { tradeInFormSchema, type TradeInFormValues } from "@/lib/form-schemas";
import { getSavedClientProfile, saveClientProfile } from "@/lib/client-profile";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TradeInForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<TradeInFormValues>({
    resolver: zodResolver(tradeInFormSchema),
    defaultValues: {
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

  async function onSubmit(values: TradeInFormValues) {
    setServerMessage(null);
    const profile = saveClientProfile(values);

    const formData = new FormData();
    Object.entries({ ...values, clientId: profile?.clientId ?? values.clientId }).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });
    files.forEach((file) => formData.append("photos", file));

    const response = await fetch("/api/public/trade-in", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setServerMessage("Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз.");
      return;
    }

    reset({
      name: profile?.name ?? values.name,
      phone: profile?.phone ?? values.phone,
      brand: "",
      model: "",
      year: undefined,
      mileage: undefined,
      vin: "",
      desiredCar: "",
      comment: "",
      clientId: profile?.clientId ?? values.clientId
    });
    setFiles([]);
    setServerMessage("Заявка отправлена. Фото уже доступны оценщику в админке.");
  }

  return (
    <GlassCard className="p-5 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <input type="hidden" {...register("clientId")} />
        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            label="ФИО"
            id="trade-name"
            placeholder="Алексей Морозов"
            error={errors.name?.message}
            {...register("name")}
          />
          <InputField
            label="Телефон"
            id="trade-phone"
            placeholder="+7 999 000-00-00"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <InputField
            label="Марка"
            id="trade-brand"
            placeholder="Hyundai"
            error={errors.brand?.message}
            {...register("brand")}
          />
          <InputField
            label="Модель"
            id="trade-model"
            placeholder="Tucson"
            error={errors.model?.message}
            {...register("model")}
          />
          <InputField
            label="Год"
            id="trade-year"
            type="number"
            placeholder="2022"
            error={errors.year?.message}
            {...register("year")}
          />
          <InputField
            label="Пробег"
            id="trade-mileage"
            type="number"
            placeholder="32400"
            error={errors.mileage?.message}
            {...register("mileage")}
          />
          <InputField
            label="VIN"
            id="trade-vin"
            placeholder="WBA12345678900000"
            error={errors.vin?.message}
            {...register("vin")}
          />
          <InputField
            label="Интересующий автомобиль"
            id="trade-desired-car"
            placeholder="Zeekr X"
            error={errors.desiredCar?.message}
            {...register("desiredCar")}
          />
        </div>

        <label
          htmlFor="trade-photos"
          className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.04] px-6 py-10 text-center transition hover:border-luxury-champagne/60 hover:bg-white/[0.07]"
        >
          <UploadCloud className="h-8 w-8 text-luxury-champagne" aria-hidden="true" />
          <span className="mt-4 text-sm font-semibold text-white">Загрузите фотографии автомобиля</span>
          <span className="mt-2 text-sm text-luxury-soft">
            Общий вид, салон и крупные детали помогут быстрее подготовить ориентир по стоимости.
          </span>
          <input
            id="trade-photos"
            type="file"
            multiple
            accept="image/*"
            className="sr-only"
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          />
        </label>
        {files.length ? (
          <p className="text-sm text-luxury-soft">Выбрано файлов: {files.length}</p>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="trade-comment">Комментарий</Label>
          <Textarea
            id="trade-comment"
            placeholder="Например: есть второй комплект колёс, окрасы по заднему крылу или нужен быстрый обмен."
            {...register("comment")}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {isSubmitSuccessful ? (
            <p role="status" className="text-sm text-luxury-champagne">
              {serverMessage ?? "Заявка отправлена. Мы свяжемся с вами и согласуем следующий шаг по оценке."}
            </p>
          ) : (
            <p className="text-sm text-luxury-soft">
              {serverMessage ?? "Обычно возвращаемся с предварительной оценкой в течение рабочего дня."}
            </p>
          )}
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем..." : "Запросить оценку"}
          </PrimaryButton>
        </div>
      </form>
    </GlassCard>
  );
}
