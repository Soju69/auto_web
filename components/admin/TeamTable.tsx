"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createEmployeeSchema, type CreateEmployeeValues } from "@/lib/form-schemas";
import { formatRussianPhoneInput } from "@/lib/phone";
import { roleLabels } from "@/data/crm";
import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { UserRole, UserStatus } from "@/types/user";

const statusLabels: Record<UserStatus, string> = {
  active: "Активен",
  vacation: "В отпуске",
  blocked: "Заблокирован"
};

const roles: UserRole[] = [
  "admin",
  "sales_manager",
  "service_manager",
  "mechanic",
  "trade_in_appraiser"
];

const statuses: UserStatus[] = ["active", "vacation", "blocked"];

export function TeamTable() {
  const users = useAdminStore((state) => state.users);
  const createUser = useAdminStore((state) => state.createUser);
  const updateUserStatus = useAdminStore((state) => state.updateUserStatus);
  const deleteUser = useAdminStore((state) => state.deleteUser);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateEmployeeValues>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      role: "sales_manager",
      status: "active",
      phone: "",
      password: "admin123"
    }
  });

  async function onCreate(values: CreateEmployeeValues) {
    setServerMessage(null);

    const normalizedPhone = values.phone.replace(/\D/g, "");
    const phoneOwner = normalizedPhone
      ? users.find((user) => user.phone?.replace(/\D/g, "") === normalizedPhone)
      : null;

    if (phoneOwner) {
      setServerMessage("Этот телефон уже закреплен за другим сотрудником.");
      return;
    }

    try {
      await createUser(values);
      reset({
        name: "",
        email: "",
        phone: "",
        password: "admin123",
        role: "sales_manager",
        status: "active"
      });
      setServerMessage("Сотрудник добавлен и уже доступен в админке.");
    } catch (error) {
      setServerMessage("Не удалось добавить сотрудника. Проверьте email и попробуйте ещё раз.");
      console.error(error);
    }
  }

  async function onStatusChange(id: string, status: UserStatus) {
    setServerMessage(null);

    try {
      await updateUserStatus(id, status);
      setServerMessage("Статус сотрудника обновлен.");
    } catch (error) {
      setServerMessage("Не удалось изменить статус сотрудника.");
      console.error(error);
    }
  }

  async function onDelete(id: string) {
    setServerMessage(null);

    try {
      await deleteUser(id);
      setServerMessage("Сотрудник удален из команды.");
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Не удалось удалить сотрудника.");
      console.error(error);
    }
  }

  return (
    <GlassCard className="p-5">
      <div className="grid gap-6 border-b border-white/10 pb-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold">Сотрудники и права</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Добавление сотрудников, выдача пароля и управление статусом доступа.
          </p>
        </div>

        <form onSubmit={handleSubmit(onCreate)} className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <InputField
              id="team-name"
              label="Имя сотрудника"
              placeholder="Мария Белова"
              error={errors.name?.message}
              {...register("name")}
            />
            <InputField
              id="team-email"
              label="Email"
              placeholder="manager@autocitypro.ru"
              error={errors.email?.message}
              {...register("email")}
            />
            <InputField
              id="team-password"
              label="Пароль"
              type="password"
              placeholder="Минимум 6 символов"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <InputField
              id="team-phone"
              label="Телефон"
              placeholder="+7 999 000-00-00"
              inputMode="tel"
              maxLength={16}
              error={errors.phone?.message}
              {...register("phone", {
                onChange: (event) => {
                  setValue("phone", formatRussianPhoneInput(event.target.value), { shouldValidate: true });
                }
              })}
            />

            <label className="grid gap-2">
              <span className="text-sm font-medium text-white">Роль</span>
              <select
                className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                {...register("role")}
              >
                {roles.map((role) => (
                  <option key={role} value={role} className="bg-luxury-main">
                    {roleLabels[role]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-white">Статус</span>
              <select
                className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                {...register("status")}
              >
                {statuses.map((status) => (
                  <option key={status} value={status} className="bg-luxury-main">
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-luxury-soft">
              {serverMessage ?? "Добавляйте новых менеджеров, мастеров и оценщиков без выхода из рабочей зоны."}
            </p>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Добавляем..." : "Добавить сотрудника"}
            </PrimaryButton>
          </div>
        </form>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-xs uppercase tracking-[0.2em] text-white/35">
            <tr>
              <th className="pb-3 pr-6 font-medium">Сотрудник</th>
              <th className="pb-3 pr-6 font-medium">Роль</th>
              <th className="pb-3 pr-6 font-medium">Статус</th>
              <th className="pb-3 pr-6 font-medium">Нагрузка</th>
              <th className="pb-3 pr-0 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-white/8 align-top">
                <td className="py-4 pr-6">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="mt-1 text-sm text-white/45">{user.email}</p>
                  {user.phone ? <p className="mt-2 text-xs text-luxury-soft">{user.phone}</p> : null}
                </td>
                <td className="py-4 pr-6">
                  <div className="inline-flex min-h-11 min-w-[220px] items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white">
                    {roleLabels[user.role]}
                  </div>
                </td>
                <td className="py-4 pr-6">
                  <select
                    value={user.status}
                    onChange={(event) => void onStatusChange(user.id, event.target.value as UserStatus)}
                    className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className="bg-luxury-main">
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 pr-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="font-medium text-white">{user.workload ?? 0} задач</p>
                    <p className="mt-1 text-sm text-luxury-soft">{statusLabels[user.status]}</p>
                  </div>
                </td>
                <td className="py-4 pr-0">
                  <button
                    type="button"
                    onClick={() => void onDelete(user.id)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 text-sm font-semibold text-red-200 transition hover:border-red-300/45 hover:bg-red-400/15"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
