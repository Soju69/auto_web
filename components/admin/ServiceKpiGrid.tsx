"use client";

import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";

export function ServiceKpiGrid() {
  const serviceOrders = useAdminStore((state) => state.serviceOrders);

  const metrics = [
    {
      label: "Записей на сегодня",
      value: serviceOrders.length,
      note: "активная сервисная очередь"
    },
    {
      label: "Подтверждены",
      value: serviceOrders.filter((order) => order.status === "confirmed").length,
      note: "готовы к приему"
    },
    {
      label: "В работе",
      value: serviceOrders.filter((order) => order.status === "in_progress").length,
      note: "цех и мастера"
    },
    {
      label: "Завершены",
      value: serviceOrders.filter((order) => order.status === "completed").length,
      note: "выдача и отчет"
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
