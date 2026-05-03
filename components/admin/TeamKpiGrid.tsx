"use client";

import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";

export function TeamKpiGrid() {
  const users = useAdminStore((state) => state.users);

  const metrics = [
    {
      label: "Всего сотрудников",
      value: users.length,
      note: "во внутреннем контуре"
    },
    {
      label: "Продажи и сопровождение",
      value: users.filter((user) => ["sales_manager", "trade_in_appraiser"].includes(user.role)).length,
      note: "front-office"
    },
    {
      label: "Сервисная команда",
      value: users.filter((user) => ["service_manager", "mechanic"].includes(user.role)).length,
      note: "after-sales"
    },
    {
      label: "Вне линии",
      value: users.filter((user) => user.status !== "active").length,
      note: "отпуск и блокировки"
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
