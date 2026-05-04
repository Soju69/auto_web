"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CarFront, ClipboardList, Gauge, ShieldCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { adminNav } from "@/data/crm";
import { canAccessAdminPath, getAuthSession } from "@/lib/auth-session";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import type { UserRole } from "@/types/user";

const icons = [BarChart3, ClipboardList, Gauge, ShieldCheck, CarFront, Users];

export function AdminSidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const session = getAuthSession();
    setRole(session?.type === "employee" ? session.role : null);
  }, []);

  const visibleNav = role
    ? adminNav
        .map((item, index) => ({ ...item, Icon: icons[index] }))
        .filter((item) => canAccessAdminPath(role, item.href))
    : [];

  return (
    <GlassCard className="sticky top-6 p-4">
      <div className="mb-6 flex items-center gap-3 px-2">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
          <ShieldCheck className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-lg font-semibold">АВТО СИТИ ПРО CRM</p>
          <p className="text-sm text-luxury-soft">Внутренняя рабочая зона</p>
        </div>
      </div>

      <nav className="grid gap-2">
        {visibleNav.map((item) => {
          const Icon = item.Icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-3xl border px-4 py-4 transition",
                isActive
                  ? "border-luxury-champagne/35 bg-white/[0.09] text-white"
                  : "border-white/5 bg-white/[0.03] text-white/72 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-2xl border border-white/10 bg-white/10 p-2">
                  <Icon className="h-4 w-4 text-luxury-champagne" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-1 text-sm text-white/45">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </GlassCard>
  );
}
