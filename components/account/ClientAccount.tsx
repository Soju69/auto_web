"use client";

import { Car, ClipboardList, Edit3, LogOut, Save, ShieldCheck, Wrench, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthSession, getAuthSession, saveAuthSession } from "@/lib/auth-session";
import {
  findRegisteredClientByPhone,
  getSavedClientProfile,
  updateClientProfile,
  type SavedClientProfile
} from "@/lib/client-profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const actions = [
  { href: "/catalog", label: "Выбрать автомобиль", icon: Car },
  { href: "/service", label: "Записаться в сервис", icon: Wrench },
  { href: "/trade-in", label: "Оценить авто Trade-In", icon: ClipboardList },
  { href: "/insurance", label: "Оформить страхование", icon: ShieldCheck }
];

export function ClientAccount() {
  const router = useRouter();
  const [profile, setProfile] = useState<SavedClientProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ name: "", phone: "", email: "" });
  const [editMessage, setEditMessage] = useState<string | null>(null);

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

    const nextProfile = getSavedClientProfile() ?? {
      clientId: session.clientId,
      name: session.name,
      phone: session.phone,
      email: session.email
    };
    setProfile(nextProfile);
    setDraft({
      name: nextProfile.name,
      phone: nextProfile.phone,
      email: nextProfile.email ?? ""
    });
  }, [router]);

  function logout() {
    clearAuthSession();
    router.push("/login");
  }

  function startEdit() {
    if (!profile) {
      return;
    }

    setDraft({
      name: profile.name,
      phone: profile.phone,
      email: profile.email ?? ""
    });
    setEditMessage(null);
    setIsEditing(true);
  }

  function saveProfileEdit() {
    if (!profile) {
      return;
    }

    if (draft.name.trim().length < 2) {
      setEditMessage("Укажите ФИО.");
      return;
    }

    const normalizedPhone = draft.phone.replace(/\D/g, "");
    if (normalizedPhone.length < 7) {
      setEditMessage("Укажите корректный телефон.");
      return;
    }

    const registeredByPhone = findRegisteredClientByPhone(draft.phone);
    if (registeredByPhone && registeredByPhone.clientId !== profile.clientId) {
      setEditMessage("Этот телефон уже используется другим клиентом.");
      return;
    }

    const nextProfile = updateClientProfile({
      clientId: profile.clientId,
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim() || undefined
    });

    if (!nextProfile) {
      return;
    }

    saveAuthSession({
      type: "client",
      clientId: nextProfile.clientId,
      name: nextProfile.name,
      phone: nextProfile.phone,
      email: nextProfile.email
    });
    setProfile(nextProfile);
    setIsEditing(false);
    setEditMessage("Профиль обновлен.");
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
            <div className="min-w-0 flex-1">
              <p className="text-sm uppercase tracking-[0.22em] text-luxury-champagne">Личный кабинет</p>
              {isEditing ? (
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <InputField
                    label="ФИО"
                    id="account-name"
                    value={draft.name}
                    onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  />
                  <InputField
                    label="Телефон"
                    id="account-phone"
                    value={draft.phone}
                    onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))}
                  />
                  <InputField
                    label="Email"
                    id="account-email"
                    type="email"
                    value={draft.email}
                    onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
              ) : (
                <>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">
                    {profile.name}
                  </h1>
                  <p className="mt-3 text-luxury-soft">{profile.phone}</p>
                  {profile.email ? <p className="mt-1 text-luxury-soft">{profile.email}</p> : null}
                  <p className="mt-2 text-sm text-white/45">ID клиента: {profile.clientId}</p>
                </>
              )}
              {editMessage ? <p className="mt-3 text-sm text-luxury-champagne">{editMessage}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={saveProfileEdit}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-luxury-champagne/45 bg-luxury-champagne px-4 text-sm font-semibold text-luxury-main transition hover:bg-luxury-platinum"
                  >
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Отмена
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={startEdit}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum"
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                  Редактировать
                </button>
              )}
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Выйти
              </button>
            </div>
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
                  Контактные данные из личного кабинета подставятся в заявку автоматически.
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
