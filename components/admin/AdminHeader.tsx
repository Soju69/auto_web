"use client";

import { RefreshCw } from "lucide-react";
import { useAdminStore } from "@/hooks/use-admin-store";
import { roleLabels } from "@/data/crm";
import { GlassCard } from "@/components/ui/GlassCard";

export function AdminHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  const users = useAdminStore((state) => state.users);
  const currentUserId = useAdminStore((state) => state.currentUserId);
  const isLoading = useAdminStore((state) => state.isLoading);
  const hydrate = useAdminStore((state) => state.hydrate);
  const setCurrentUser = useAdminStore((state) => state.setCurrentUser);
  const currentUser = users.find((user) => user.id === currentUserId) ?? users[0];

  return (
    <GlassCard className="p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-luxury-champagne">Aurum CRM</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-luxury-soft">{description}</p>
        </div>

        <div className="grid gap-3 sm:min-w-[320px]">
          <button
            type="button"
            onClick={() => void hydrate(true)}
            disabled={isLoading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={isLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden="true" />
            {isLoading ? "Обновляем" : "Обновить данные"}
          </button>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-white/45">Текущая роль</p>
            <p className="mt-1 font-medium text-white">{roleLabels[currentUser.role]}</p>
          </div>
          <label className="grid gap-2">
            <span className="text-sm text-white/45">Быстрое переключение роли</span>
            <select
              value={currentUserId}
              onChange={(event) => setCurrentUser(event.target.value)}
              className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id} className="bg-luxury-main">
                  {user.name} · {roleLabels[user.role]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </GlassCard>
  );
}
