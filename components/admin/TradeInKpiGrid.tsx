"use client";

import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";

export function TradeInKpiGrid() {
  const tradeInRequests = useAdminStore((state) => state.tradeInRequests);

  const metrics = [
    {
      label: "Заявки на оценку",
      value: tradeInRequests.length,
      note: "в общей очереди"
    },
    {
      label: "На осмотре",
      value: tradeInRequests.filter((request) => request.status === "inspection").length,
      note: "готовы к фотофиксации"
    },
    {
      label: "Оценка подготовлена",
      value: tradeInRequests.filter((request) => request.status === "offer_prepared").length,
      note: "ожидают клиента"
    },
    {
      label: "Дооценка",
      value: tradeInRequests.filter((request) => request.status === "revaluation").length,
      note: "после осмотра"
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
