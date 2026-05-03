"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CreditCard, Repeat2, WalletCards } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { carInquirySchema, type CarInquiryValues } from "@/lib/form-schemas";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Textarea } from "@/components/ui/textarea";

type RequestType = CarInquiryValues["requestType"];

const requestTypeLabels: Record<RequestType, string> = {
  purchase: "Покупка",
  credit: "Кредит",
  "test-drive": "Тест-драйв"
};

export function CarInquiryForm({
  carId,
  carLabel
}: {
  carId: string;
  carLabel: string;
}) {
  const [requestType, setRequestType] = useState<RequestType>("purchase");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CarInquiryValues>({
    resolver: zodResolver(carInquirySchema),
    defaultValues: {
      requestType: "purchase",
      carId,
      carLabel,
      comment: "",
      preferredDate: "",
      preferredTime: ""
    }
  });

  function selectType(nextType: RequestType) {
    setRequestType(nextType);
    setValue("requestType", nextType);
  }

  async function onSubmit(values: CarInquiryValues) {
    setServerMessage(null);

    const response = await fetch("/api/public/car-inquiry", {
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

    reset({
      name: "",
      phone: "",
      requestType,
      carId,
      carLabel,
      comment: "",
      preferredDate: "",
      preferredTime: ""
    });
    setServerMessage("Заявка зафиксирована. Менеджер увидит её в CRM и свяжется с вами.");
  }

  return (
    <div className="mt-7 grid gap-4">
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <PrimaryButton
            type="button"
            onClick={() => selectType("purchase")}
            className="justify-center"
          >
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            Купить
          </PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => selectType("credit")}
            className="justify-center"
          >
            <WalletCards className="h-4 w-4" aria-hidden="true" />
            Оформить кредит
          </SecondaryButton>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <SecondaryButton href="/trade-in" className="justify-center">
            <Repeat2 className="h-4 w-4" aria-hidden="true" />
            Trade-In
          </SecondaryButton>
          <SecondaryButton
            type="button"
            onClick={() => selectType("test-drive")}
            className="justify-center"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Тест-драйв
          </SecondaryButton>
        </div>
      </div>

      <form id="car-request" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input type="hidden" value={carId} {...register("carId")} />
        <input type="hidden" value={carLabel} {...register("carLabel")} />
        <input type="hidden" value={requestType} {...register("requestType")} />

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-luxury-champagne">
            {requestTypeLabels[requestType]}
          </p>
          <p className="mt-2 text-sm leading-6 text-luxury-soft">
            {requestType === "test-drive"
              ? "Выберите удобную дату и время, а мы подтвердим слот и подготовим автомобиль."
              : "Оставьте контакты, и менеджер соберёт предложение по автомобилю, кредиту и срокам выдачи."}
          </p>
        </div>

        <InputField
          id="car-inquiry-name"
          label="Имя"
          placeholder="Алексей Морозов"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputField
          id="car-inquiry-phone"
          label="Телефон"
          placeholder="+7 999 000-00-00"
          error={errors.phone?.message}
          {...register("phone")}
        />

        {requestType === "test-drive" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              id="car-inquiry-date"
              label="Дата"
              type="date"
              error={errors.preferredDate?.message}
              {...register("preferredDate")}
            />
            <InputField
              id="car-inquiry-time"
              label="Время"
              type="time"
              error={errors.preferredTime?.message}
              {...register("preferredTime")}
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="car-inquiry-comment" className="text-sm font-medium text-white">
            Комментарий
          </label>
          <Textarea
            id="car-inquiry-comment"
            placeholder="Например: нужен расчёт по кредиту, бронь до вечера или обмен по trade-in."
            {...register("comment")}
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-luxury-soft">
            {serverMessage ??
              "Заявка сразу попадёт в CRM, а менеджер увидит сценарий обращения и модель автомобиля."}
          </p>
          <PrimaryButton type="submit" disabled={isSubmitting} className="justify-center">
            {isSubmitting ? "Отправляем..." : "Оставить заявку"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
