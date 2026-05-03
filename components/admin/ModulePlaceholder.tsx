"use client";

import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";
import type { LeadSource } from "@/types/lead";

export function ModulePlaceholder({
  title,
  description,
  source
}: {
  title: string;
  description: string;
  source: LeadSource;
}) {
  const leads = useAdminStore((state) => state.leads.filter((lead) => lead.source === source));

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <GlassCard className="p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-luxury-champagne">Следующий этап</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-luxury-soft">{description}</p>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="text-sm text-white/45">Текущий поток по модулю</p>
        <p className="mt-4 font-display text-4xl font-semibold">{leads.length}</p>
        <div className="mt-5 grid gap-3">
          {leads.slice(0, 3).map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-medium text-white">{lead.name}</p>
              <p className="mt-1 text-sm text-luxury-soft">{lead.vehicleLabel ?? "Без автомобиля"}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
