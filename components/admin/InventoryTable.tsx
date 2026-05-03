"use client";

import { cars } from "@/data/cars";
import { inventoryStatusLabels } from "@/data/inventory";
import { roleLabels } from "@/data/crm";
import { useAdminStore } from "@/hooks/use-admin-store";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { InventoryStatusBadge } from "@/components/admin/InventoryStatusBadge";
import type { InventoryStatus } from "@/types/inventory-item";

const statuses: InventoryStatus[] = ["available", "reserved", "sold", "hidden"];

export function InventoryTable() {
  const users = useAdminStore((state) => state.users);
  const inventory = useAdminStore((state) => state.inventory);
  const updateInventoryStatus = useAdminStore((state) => state.updateInventoryStatus);
  const toggleInventoryVisibility = useAdminStore((state) => state.toggleInventoryVisibility);
  const toggleFeatured = useAdminStore((state) => state.toggleFeatured);
  const assignInventoryManager = useAdminStore((state) => state.assignInventoryManager);
  const managers = users.filter((user) => user.role === "sales_manager" || user.role === "admin");

  return (
    <GlassCard className="p-5">
      <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="font-display text-2xl font-semibold">Управление лотами</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Статус автомобиля, видимость на сайте, флаг витрины и закрепленный менеджер.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-xs uppercase tracking-[0.2em] text-white/35">
            <tr>
              <th className="pb-3 pr-6 font-medium">Автомобиль</th>
              <th className="pb-3 pr-6 font-medium">Финансы</th>
              <th className="pb-3 pr-6 font-medium">Менеджер</th>
              <th className="pb-3 pr-6 font-medium">Публикация</th>
              <th className="pb-3 pr-6 font-medium">Статус</th>
              <th className="pb-3 pr-0 font-medium">Витрина</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const car = cars.find((carItem) => carItem.id === item.carId);
              const manager = users.find((user) => user.id === item.managerId);

              if (!car) {
                return null;
              }

              return (
                <tr key={item.carId} className="border-t border-white/8 align-top">
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">
                      {car.brand} {car.model} {car.trim}
                    </p>
                    <p className="mt-1 text-sm text-white/45">
                      {car.year} · {car.drivetrain} · {car.fuelType}
                    </p>
                    <p className="mt-2 text-xs text-luxury-soft">{item.location}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">{formatCurrency(car.price)}</p>
                    <p className="mt-2 text-sm text-luxury-soft">{formatMileage(car.mileage)}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <select
                      value={item.managerId ?? ""}
                      onChange={(event) => assignInventoryManager(item.carId, event.target.value)}
                      className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                    >
                      {managers.map((user) => (
                        <option key={user.id} value={user.id} className="bg-luxury-main">
                          {user.name} · {roleLabels[user.role]}
                        </option>
                      ))}
                    </select>
                    {manager ? (
                      <p className="mt-2 text-xs text-white/45">Загрузка: {manager.workload ?? 0}</p>
                    ) : null}
                  </td>
                  <td className="py-4 pr-6">
                    <button
                      type="button"
                      onClick={() => toggleInventoryVisibility(item.carId)}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      {item.visible ? "Показан на сайте" : "Скрыт с сайта"}
                    </button>
                  </td>
                  <td className="py-4 pr-6">
                    <div className="space-y-3">
                      <InventoryStatusBadge status={item.status} />
                      <select
                        value={item.status}
                        onChange={(event) =>
                          updateInventoryStatus(item.carId, event.target.value as InventoryStatus)
                        }
                        className="h-11 min-w-[200px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status} className="bg-luxury-main">
                            {inventoryStatusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="py-4 pr-0">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(item.carId)}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      {item.featured ? "На главной" : "Обычный лот"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
