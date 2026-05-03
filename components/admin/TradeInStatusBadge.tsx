import { tradeInStatusLabels } from "@/data/trade-in";
import { cn } from "@/lib/utils";
import type { TradeInRequestStatus } from "@/types/trade-in-request";

const tones: Record<TradeInRequestStatus, string> = {
  new: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  inspection: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  offer_prepared: "border-luxury-champagne/25 bg-luxury-champagne/10 text-luxury-champagne",
  accepted: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  declined: "border-white/10 bg-white/[0.05] text-white/55",
  revaluation: "border-rose-300/20 bg-rose-300/10 text-rose-100"
};

export function TradeInStatusBadge({ status }: { status: TradeInRequestStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase",
        tones[status]
      )}
    >
      {tradeInStatusLabels[status]}
    </span>
  );
}
