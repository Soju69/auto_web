import { leadStatusLabels } from "@/data/crm";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/types/lead";

const tones: Record<LeadStatus, string> = {
  new: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  in_progress: "border-white/15 bg-white/10 text-white",
  meeting_scheduled: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  sold: "border-luxury-champagne/25 bg-luxury-champagne/10 text-luxury-champagne",
  declined: "border-white/10 bg-white/[0.05] text-white/55"
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase",
        tones[status]
      )}
    >
      {leadStatusLabels[status]}
    </span>
  );
}
