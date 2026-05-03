"use client";

import { useMemo, useState } from "react";
import { roleLabels } from "@/data/crm";
import { tradeInStatusLabels } from "@/data/trade-in";
import { useAdminStore } from "@/hooks/use-admin-store";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { TradeInStatusBadge } from "@/components/admin/TradeInStatusBadge";
import type { TradeInRequestStatus } from "@/types/trade-in-request";

const statuses: Array<TradeInRequestStatus | "all"> = [
  "all",
  "new",
  "inspection",
  "offer_prepared",
  "accepted",
  "declined",
  "revaluation"
];

export function TradeInTable() {
  const users = useAdminStore((state) => state.users);
  const tradeInRequests = useAdminStore((state) => state.tradeInRequests);
  const updateTradeInStatus = useAdminStore((state) => state.updateTradeInStatus);
  const assignTradeInAppraiser = useAdminStore((state) => state.assignTradeInAppraiser);
  const updateTradeInEstimate = useAdminStore((state) => state.updateTradeInEstimate);
  const [statusFilter, setStatusFilter] = useState<TradeInRequestStatus | "all">("all");

  const appraisers = useMemo(
    () => users.filter((user) => user.role === "trade_in_appraiser"),
    [users]
  );

  const visibleRequests = tradeInRequests.filter((request) =>
    statusFilter === "all" ? true : request.status === statusFilter
  );

  return (
    <GlassCard className="p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Очередь оценки</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Назначайте оценщика, вносите ориентир по стоимости и проверяйте фотографии без выхода из заявки.
          </p>
        </div>

        <label className="grid gap-2 sm:min-w-[260px]">
          <span className="text-sm text-white/45">Статус заявки</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as TradeInRequestStatus | "all")}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-luxury-main">
                {status === "all" ? "Все статусы" : tradeInStatusLabels[status]}
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
              <th className="pb-3 pr-6 font-medium">Автомобиль</th>
              <th className="pb-3 pr-6 font-medium">Оценщик</th>
              <th className="pb-3 pr-6 font-medium">Оценка</th>
              <th className="pb-3 pr-6 font-medium">Статус</th>
              <th className="pb-3 pr-0 font-medium">Решение</th>
            </tr>
          </thead>
          <tbody>
            {visibleRequests.map((request) => (
              <tr key={request.id} className="border-t border-white/8 align-top">
                <td className="py-4 pr-6">
                  <p className="font-medium text-white">{request.customerName}</p>
                  <p className="mt-1 text-sm text-white/45">{request.phone}</p>
                  <p className="mt-2 text-xs text-luxury-soft">
                    {new Date(request.createdAt).toLocaleString("ru-RU")}
                  </p>
                </td>
                <td className="py-4 pr-6">
                  <p className="font-medium text-white">{request.currentCar}</p>
                  <p className="mt-2 text-sm text-luxury-soft">
                    {request.year} • {formatMileage(request.mileage)}
                  </p>
                  {request.desiredCar ? (
                    <p className="mt-2 text-sm text-white/50">Интересует: {request.desiredCar}</p>
                  ) : null}
                  {request.photos?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {request.photos.slice(0, 4).map((photo) => (
                        <a
                          key={photo.id}
                          href={photo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                        >
                          <img
                            src={photo.url}
                            alt={photo.originalName}
                            className="h-14 w-14 object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-white/40">Фото пока не загружены</p>
                  )}
                </td>
                <td className="py-4 pr-6">
                  <select
                    value={request.appraiserId ?? ""}
                    onChange={(event) => void assignTradeInAppraiser(request.id, event.target.value)}
                    className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                  >
                    <option value="" className="bg-luxury-main">
                      Не назначен
                    </option>
                    {appraisers.map((appraiser) => (
                      <option key={appraiser.id} value={appraiser.id} className="bg-luxury-main">
                        {appraiser.name} • {roleLabels[appraiser.role]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 pr-6">
                  <input
                    type="number"
                    value={request.estimatedValue ?? ""}
                    onChange={(event) =>
                      void updateTradeInEstimate(request.id, Number(event.target.value || 0))
                    }
                    className="h-11 min-w-[180px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                    placeholder="0"
                  />
                  <p className="mt-2 text-xs text-luxury-soft">
                    {request.estimatedValue ? formatCurrency(request.estimatedValue) : "Оценка не внесена"}
                  </p>
                </td>
                <td className="py-4 pr-6">
                  <TradeInStatusBadge status={request.status} />
                </td>
                <td className="py-4 pr-0">
                  <select
                    value={request.status}
                    onChange={(event) =>
                      void updateTradeInStatus(request.id, event.target.value as TradeInRequestStatus)
                    }
                    className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                  >
                    {statuses
                      .filter((status) => status !== "all")
                      .map((status) => (
                        <option key={status} value={status} className="bg-luxury-main">
                          {tradeInStatusLabels[status]}
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
