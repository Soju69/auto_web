"use client";

import { Car, ClipboardList, LogOut, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthSession, getAuthSession } from "@/lib/auth-session";
import { getSavedClientProfile, type SavedClientProfile } from "@/lib/client-profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const actions = [
  { href: "/catalog", label: "Выбрать автомобиль", icon: Car },
  { href: "/service", label: "Записаться в сервис", icon: Wrench },
  { href: "/trade-in", label: "Оценить trade-in", icon: ClipboardList },
  { href: "/insurance", label: "Оформить страхование", icon: ShieldCheck }
];

export function ClientAccount() {
  const router = useRouter();
  const [profile, setProfile] = useState<SavedClientProfile | null>(null);

  useEffect(() => {
    const session = getAuthSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.type === "employee") {
      router.replace("/admin");
      return;
    }

    setProfile(getSavedClientProfile() ?? {
      clientId: session.clientId,
      name: session.name,
      phone: session.phone,
      email: session.email
    });
  }, [router]);

  function logout() {
    clearAuthSession();
    router.push("/login");
  }

  if (!profile) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 text-center text-sm text-luxury-soft">
        Открываем личный кабинет...
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16">
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:px-5 lg:px-6">
        <GlassCard className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-luxury-champagne">Личный кабинет</p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">
                {profile.name}
              </h1>
              <p className="mt-3 text-luxury-soft">{profile.phone}</p>
              {profile.email ? <p className="mt-1 text-luxury-soft">{profile.email}</p> : null}
              <p className="mt-2 text-sm text-white/45">ID клиента: {profile.clientId}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Выйти
            </button>
          </div>
        </GlassCard>

        <div className="grid gap-4 md:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 transition hover:border-luxury-champagne/45 hover:bg-white/[0.07]"
              >
                <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
                <p className="mt-5 font-display text-2xl font-semibold">{action.label}</p>
                <p className="mt-2 text-sm leading-6 text-luxury-soft">
                  ФИО и телефон будут подставлены в форму автоматически.
                </p>
              </Link>
            );
          })}
        </div>

        <GlassCard className="p-6">
          <h2 className="font-display text-2xl font-semibold">Что доступно клиенту</h2>
          <p className="mt-3 leading-7 text-luxury-soft">
            Клиентский кабинет не открывает CRM и административные настройки. Здесь клиент только выбирает услуги,
            отправляет заявки и повторно использует сохраненные контактные данные.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/consultation">Записаться на консультацию</PrimaryButton>
            <SecondaryButton href="/contact">Связаться с салоном</SecondaryButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
