"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Минимум 8 символов")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  function onSubmit() {
    return undefined;
  }

  return (
    <GlassCard className="w-full max-w-md p-6 md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
          <LockKeyhole className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold">Вход в рабочую зону</h1>
          <p className="text-sm text-luxury-soft">Используйте корпоративный email и пароль сотрудника.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <InputField
          label="Email"
          id="admin-email"
          type="email"
          placeholder="manager@aurummotors.ru"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputField
          label="Пароль"
          id="admin-password"
          type="password"
          placeholder="********"
          error={errors.password?.message}
          {...register("password")}
        />
        {isSubmitSuccessful ? (
          <p role="status" className="text-sm text-luxury-champagne">
            Данные приняты. Следующим шагом подключим полноценную авторизацию сотрудников.
          </p>
        ) : null}
        <PrimaryButton type="submit" className="w-full">
          Продолжить
        </PrimaryButton>
      </form>
    </GlassCard>
  );
}
