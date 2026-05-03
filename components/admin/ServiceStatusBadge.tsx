import { serviceStatusLabels } from "@/data/service";
import { cn } from "@/lib/utils";
import type { ServiceOrderStatus } from "@/types/service-order";

const tones: Record<ServiceOrderStatus, string> = {
  new: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  confirmed: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  in_progress: "border-luxury-champagne/25 bg-luxury-champagne/10 text-luxury-champagne",
  completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  canceled: "border-white/10 bg-white/[0.05] text-white/55"
};

export function ServiceStatusBadge({ status }: { status: ServiceOrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase",
        tones[status]
      )}
    >
      {serviceStatusLabels[status]}
    </span>
  );
}
