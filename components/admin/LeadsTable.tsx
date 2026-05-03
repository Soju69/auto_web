"use client";

import { useState } from "react";
import { leadSourceLabels, leadStatusLabels, roleLabels } from "@/data/crm";
import { useAdminStore } from "@/hooks/use-admin-store";
import { GlassCard } from "@/components/ui/GlassCard";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import type { LeadSource, LeadStatus } from "@/types/lead";

const sourceOptions: Array<LeadSource | "all"> = [
  "all",
  "purchase",
  "credit",
  "test-drive",
  "service",
  "trade-in",
  "insurance",
  "consultation",
  "contact"
];
const statusOptions: Array<LeadStatus | "all"> = [
  "all",
  "new",
  "in_progress",
  "meeting_scheduled",
  "sold",
  "declined"
];

export function LeadsTable() {
  const leads = useAdminStore((state) => state.leads);
  const users = useAdminStore((state) => state.users);
  const updateLeadStatus = useAdminStore((state) => state.updateLeadStatus);
  const assignLead = useAdminStore((state) => state.assignLead);

  const [source, setSource] = useState<LeadSource | "all">("all");
  const [status, setStatus] = useState<LeadStatus | "all">("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSource = source === "all" ? true : lead.source === source;
    const matchesStatus = status === "all" ? true : lead.status === status;
    return matchesSource && matchesStatus;
  });

  return (
    <GlassCard className="p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Очередь заявок</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Фильтруйте обращения, назначайте ответственных и меняйте статус без перехода между экранами.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <FilterSelect
            label="Источник"
            value={source}
            onChange={(value) => setSource(value as LeadSource | "all")}
            options={sourceOptions.map((option) => ({
              value: option,
              label: option === "all" ? "Все источники" : leadSourceLabels[option]
            }))}
          />
          <FilterSelect
            label="Статус"
            value={status}
            onChange={(value) => setStatus(value as LeadStatus | "all")}
            options={statusOptions.map((option) => ({
              value: option,
              label: option === "all" ? "Все статусы" : leadStatusLabels[option]
            }))}
          />
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-xs uppercase tracking-[0.2em] text-white/35">
            <tr>
              <th className="pb-3 pr-6 font-medium">Клиент</th>
              <th className="pb-3 pr-6 font-medium">Сценарий</th>
              <th className="pb-3 pr-6 font-medium">Автомобиль</th>
              <th className="pb-3 pr-6 font-medium">Ответственный</th>
              <th className="pb-3 pr-6 font-medium">Статус</th>
              <th className="pb-3 pr-0 font-medium">Действие</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
              const assignedUser = users.find((user) => user.id === lead.managerId);

              return (
                <tr key={lead.id} className="border-t border-white/8 align-top">
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="mt-1 text-sm text-white/45">{lead.phone}</p>
                    <p className="mt-2 text-xs text-luxury-soft">
                      {new Date(lead.createdAt).toLocaleString("ru-RU")}
                    </p>
                  </td>
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">{leadSourceLabels[lead.source]}</p>
                    <p className="mt-2 text-sm text-luxury-soft">{lead.comment ?? "Без комментария"}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">{lead.vehicleLabel ?? "Уточняется"}</p>
                    {lead.appointmentAt ? (
                      <p className="mt-2 text-sm text-luxury-soft">
                        Встреча: {new Date(lead.appointmentAt).toLocaleString("ru-RU")}
                      </p>
                    ) : null}
                  </td>
                  <td className="py-4 pr-6">
                    <select
                      value={lead.managerId ?? ""}
                      onChange={(event) => assignLead(lead.id, event.target.value)}
                      className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id} className="bg-luxury-main">
                          {user.name} · {roleLabels[user.role]}
                        </option>
                      ))}
                    </select>
                    {assignedUser ? (
                      <p className="mt-2 text-xs text-white/45">Загрузка: {assignedUser.workload ?? 0} задач</p>
                    ) : null}
                  </td>
                  <td className="py-4 pr-6">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="py-4 pr-0">
                    <select
                      value={lead.status}
                      onChange={(event) => updateLeadStatus(lead.id, event.target.value as LeadStatus)}
                      className="h-11 min-w-[200px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                    >
                      {statusOptions
                        .filter((option) => option !== "all")
                        .map((option) => (
                          <option key={option} value={option} className="bg-luxury-main">
                            {leadStatusLabels[option]}
                          </option>
                        ))}
                    </select>
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

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-white/45">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-luxury-main">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
