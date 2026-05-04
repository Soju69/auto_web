"use client";

import { LogOut, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/hooks/use-admin-store";
import { clearAuthSession } from "@/lib/auth-session";
import { GlassCard } from "@/components/ui/GlassCard";

export function AdminHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();
  const isLoading = useAdminStore((state) => state.isLoading);
  const hydrate = useAdminStore((state) => state.hydrate);

  function logout() {
    clearAuthSession();
    router.push("/login");
  }

  return (
    <GlassCard className="p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-luxury-champagne">АВТО СИТИ ПРО CRM</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-luxury-soft">{description}</p>
        </div>

        <div className="grid gap-3 sm:min-w-[220px]">
          <button
            type="button"
            onClick={() => void hydrate(true)}
            disabled={isLoading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={isLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden="true" />
            {isLoading ? "Обновляем" : "Обновить данные"}
          </button>
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
  );
}
