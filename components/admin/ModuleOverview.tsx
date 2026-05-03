"use client";

import { leadSourceLabels } from "@/data/crm";
import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";
import type { LeadSource } from "@/types/lead";

const modules: Array<{ source: LeadSource; title: string; description: string }> = [
  {
    source: "purchase",
    title: "Покупка",
    description: "Первичный лид, менеджер и доведение до продажи."
  },
  {
    source: "test-drive",
    title: "Тест-драйв",
    description: "Выбор слота, подтверждение и фиксация встречи."
  },
  {
    source: "service",
    title: "Сервис",
    description: "Записи в цех, мастер и статусы работ."
  },
  {
    source: "trade-in",
    title: "Trade-In",
    description: "Оценка авто клиента, фото и итоговое решение."
  }
];

export function ModuleOverview() {
  const leads = useAdminStore((state) => state.leads);

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {modules.map((module) => {
        const total = leads.filter((lead) => lead.source === module.source).length;
        const active = leads.filter(
          (lead) =>
            lead.source === module.source &&
            !["sold", "declined"].includes(lead.status)
        ).length;

        return (
          <GlassCard key={module.source} className="p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-luxury-champagne">
              {leadSourceLabels[module.source]}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">{module.title}</h2>
            <p className="mt-3 text-sm leading-7 text-luxury-soft">{module.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-white/45">Всего</p>
                <p className="mt-2 font-display text-3xl font-semibold">{total}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-white/45">Активно</p>
                <p className="mt-2 font-display text-3xl font-semibold">{active}</p>
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
