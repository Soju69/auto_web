"use client";

import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";
import { ServiceStatusBadge } from "@/components/admin/ServiceStatusBadge";

export function ServiceTimeline() {
  const serviceOrders = useAdminStore((state) => state.serviceOrders);
  const users = useAdminStore((state) => state.users);
  const upcoming = [...serviceOrders].sort((a, b) => a.appointmentAt.localeCompare(b.appointmentAt));

  return (
    <GlassCard className="p-5">
      <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl font-semibold">Лента записей</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Ближайшие визиты с привязкой к мастеру-приемщику и механику.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {upcoming.map((order) => {
          const advisor = users.find((user) => user.id === order.advisorId);
          const mechanic = users.find((user) => user.id === order.mechanicId);

          return (
            <div
              key={order.id}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-luxury-champagne">
                    {new Date(order.appointmentAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{order.customerName}</h3>
                  <p className="mt-2 text-sm text-white/72">
                    {order.car} · {order.plate}
                  </p>
                  <p className="mt-2 text-sm text-luxury-soft">{order.serviceType}</p>
                </div>

                <div className="grid gap-3 sm:min-w-[280px]">
                  <ServiceStatusBadge status={order.status} />
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-white/45">Мастер-приемщик</p>
                    <p className="mt-1 font-medium">{advisor?.name ?? "Не назначен"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-white/45">Механик</p>
                    <p className="mt-1 font-medium">{mechanic?.name ?? "Не назначен"}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
