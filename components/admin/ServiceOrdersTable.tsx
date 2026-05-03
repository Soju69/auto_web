"use client";

import { useMemo, useState } from "react";
import { serviceStatusLabels } from "@/data/service";
import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";
import { ServiceStatusBadge } from "@/components/admin/ServiceStatusBadge";
import type { ServiceOrderStatus } from "@/types/service-order";

const serviceStatuses: Array<ServiceOrderStatus | "all"> = [
  "all",
  "new",
  "confirmed",
  "in_progress",
  "completed",
  "canceled"
];

export function ServiceOrdersTable() {
  const serviceOrders = useAdminStore((state) => state.serviceOrders);
  const users = useAdminStore((state) => state.users);
  const updateServiceStatus = useAdminStore((state) => state.updateServiceStatus);
  const assignServiceAdvisor = useAdminStore((state) => state.assignServiceAdvisor);
  const assignMechanic = useAdminStore((state) => state.assignMechanic);
  const [statusFilter, setStatusFilter] = useState<ServiceOrderStatus | "all">("all");

  const advisors = useMemo(
    () => users.filter((user) => user.role === "service_manager"),
    [users]
  );
  const mechanics = useMemo(() => users.filter((user) => user.role === "mechanic"), [users]);

  const visibleOrders = serviceOrders.filter((order) =>
    statusFilter === "all" ? true : order.status === statusFilter
  );

  return (
    <GlassCard className="p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Управление сервисом</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Подтверждение визита, распределение по сотрудникам и контроль жизненного цикла заказа.
          </p>
        </div>

        <label className="grid gap-2 sm:min-w-[260px]">
          <span className="text-sm text-white/45">Фильтр по статусу</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as ServiceOrderStatus | "all")}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
          >
            {serviceStatuses.map((status) => (
              <option key={status} value={status} className="bg-luxury-main">
                {status === "all" ? "Все статусы" : serviceStatusLabels[status]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-xs uppercase tracking-[0.2em] text-white/35">
            <tr>
              <th className="pb-3 pr-6 font-medium">Клиент</th>
              <th className="pb-3 pr-6 font-medium">Авто и задача</th>
              <th className="pb-3 pr-6 font-medium">Мастер</th>
              <th className="pb-3 pr-6 font-medium">Механик</th>
              <th className="pb-3 pr-6 font-medium">Статус</th>
              <th className="pb-3 pr-0 font-medium">Изменить</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <tr key={order.id} className="border-t border-white/8 align-top">
                <td className="py-4 pr-6">
                  <p className="font-medium text-white">{order.customerName}</p>
                  <p className="mt-1 text-sm text-white/45">{order.phone}</p>
                  <p className="mt-2 text-xs text-luxury-soft">
                    {new Date(order.appointmentAt).toLocaleString("ru-RU")}
                  </p>
                </td>
                <td className="py-4 pr-6">
                  <p className="font-medium text-white">
                    {order.car} · {order.plate}
                  </p>
                  <p className="mt-2 text-sm text-luxury-soft">{order.serviceType}</p>
                  {order.note ? (
                    <p className="mt-2 text-sm text-white/50">{order.note}</p>
                  ) : null}
                </td>
                <td className="py-4 pr-6">
                  <select
                    value={order.advisorId}
                    onChange={(event) => assignServiceAdvisor(order.id, event.target.value)}
                    className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                  >
                    {advisors.map((advisor) => (
                      <option key={advisor.id} value={advisor.id} className="bg-luxury-main">
                        {advisor.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 pr-6">
                  <select
                    value={order.mechanicId ?? ""}
                    onChange={(event) => assignMechanic(order.id, event.target.value)}
                    className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                  >
                    <option value="" className="bg-luxury-main">
                      Не назначен
                    </option>
                    {mechanics.map((mechanic) => (
                      <option key={mechanic.id} value={mechanic.id} className="bg-luxury-main">
                        {mechanic.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 pr-6">
                  <ServiceStatusBadge status={order.status} />
                </td>
                <td className="py-4 pr-0">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateServiceStatus(order.id, event.target.value as ServiceOrderStatus)
                    }
                    className="h-11 min-w-[200px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                  >
                    {serviceStatuses
                      .filter((status) => status !== "all")
                      .map((status) => (
                        <option key={status} value={status} className="bg-luxury-main">
                          {serviceStatusLabels[status]}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
