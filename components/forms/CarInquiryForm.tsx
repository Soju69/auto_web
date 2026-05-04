"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CreditCard, Repeat2, WalletCards } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { carInquirySchema, type CarInquiryValues } from "@/lib/form-schemas";
import { getAuthSession, type AuthSession } from "@/lib/auth-session";
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
  const router = useRouter();
  const [requestType, setRequestType] = useState<RequestType>("purchase");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [clientSession, setClientSession] = useState<Extract<AuthSession, { type: "client" }> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
      preferredTime: "",
      clientId: ""
    }
  });

  function selectType(nextType: RequestType) {
    setRequestType(nextType);
    setValue("requestType", nextType);
    setServerMessage(
      clientSession
        ? `Выбран сценарий: ${requestTypeLabels[nextType]}. Данные клиента уже подставлены из личного кабинета.`
        : `Выбран сценарий: ${requestTypeLabels[nextType]}. Для отправки заявки войдите или зарегистрируйтесь.`
    );
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    const session = getAuthSession();

    if (!session || session.type !== "client") {
      return;
    }

    setClientSession(session);
    setValue("name", session.name);
    setValue("phone", session.phone);
    setValue("clientId", session.clientId);
  }, [setValue]);

  async function onSubmit(values: CarInquiryValues) {
    setServerMessage(null);

    if (!clientSession) {
      router.push("/login");
      return;
    }

    const response = await fetch("/api/public/car-inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...values,
        name: clientSession.name,
        phone: clientSession.phone,
        clientId: clientSession.clientId
      })
    });

    if (!response.ok) {
      setServerMessage("Не удалось отправить заявку. Попробуйте ещё раз.");
      return;
    }

    reset({
      name: clientSession.name,
      phone: clientSession.phone,
      requestType,
      carId,
      carLabel,
      comment: "",
      preferredDate: "",
      preferredTime: "",
      clientId: clientSession.clientId
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

      <form ref={formRef} id="car-request" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input type="hidden" value={carId} {...register("carId")} />
        <input type="hidden" value={carLabel} {...register("carLabel")} />
        <input type="hidden" value={requestType} {...register("requestType")} />
        <input type="hidden" {...register("clientId")} />
        <input type="hidden" {...register("name")} />
        <input type="hidden" {...register("phone")} />

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-luxury-champagne">
            {requestTypeLabels[requestType]}
          </p>
          <p className="mt-2 text-sm leading-6 text-luxury-soft">
            {clientSession
              ? requestType === "test-drive"
                ? "Выберите удобную дату и время. ФИО и телефон будут взяты из личного кабинета."
                : "Напишите комментарий к заявке. ФИО и телефон будут взяты из личного кабинета."
              : "Для отправки заявки сначала войдите или зарегистрируйтесь. После входа ФИО и телефон подставятся автоматически."}
          </p>
        </div>

        {clientSession ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-luxury-champagne">
              Клиент
            </p>
            <p className="mt-2 font-medium text-white">{clientSession.name}</p>
            <p className="mt-1 text-sm text-luxury-soft">{clientSession.phone}</p>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-luxury-champagne/25 bg-luxury-champagne/[0.08] p-4">
            <p className="font-medium text-white">Войдите или зарегистрируйтесь</p>
            <p className="mt-2 text-sm leading-6 text-luxury-soft">
              Нажмите кнопку ниже, заполните ФИО и телефон один раз, затем вернитесь к заявке.
            </p>
          </div>
        )}

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
          {clientSession ? (
            <PrimaryButton type="submit" disabled={isSubmitting} className="justify-center">
              {isSubmitting ? "Отправляем..." : "Оставить заявку"}
            </PrimaryButton>
          ) : (
            <PrimaryButton type="button" onClick={() => router.push("/login")} className="justify-center">
              Вход / регистрация
            </PrimaryButton>
          )}
        </div>
      </form>
    </div>
  );
}
