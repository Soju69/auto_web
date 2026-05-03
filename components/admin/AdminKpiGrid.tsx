"use client";

import { leadStatusLabels, leadSourceLabels } from "@/data/crm";
import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";

export function AdminKpiGrid() {
  const leads = useAdminStore((state) => state.leads);

  const metrics = [
    {
      label: "Всего активных заявок",
      value: leads.filter((lead) => !["sold", "declined"].includes(lead.status)).length,
      note: "в работе прямо сейчас"
    },
    {
      label: "Новые за сегодня",
      value: leads.filter((lead) => lead.status === "new").length,
      note: leadStatusLabels.new
    },
    {
      label: "Назначенные встречи",
      value: leads.filter((lead) => lead.status === "meeting_scheduled").length,
      note: leadStatusLabels.meeting_scheduled
    },
    {
      label: "Trade-In и сервис",
      value: leads.filter((lead) => ["trade-in", "service"].includes(lead.source)).length,
      note: `${leadSourceLabels["trade-in"]} + ${leadSourceLabels.service}`
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {metrics.map((metric) => (
        <GlassCard key={metric.label} className="p-5">
          <p className="text-sm text-white/45">{metric.label}</p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em]">
            {metric.value}
          </p>
          <p className="mt-3 text-sm text-luxury-soft">{metric.note}</p>
        </GlassCard>
      ))}
    </div>
  );
}
