import { inventoryStatusLabels } from "@/data/inventory";
import { cn } from "@/lib/utils";
import type { InventoryStatus } from "@/types/inventory-item";

const tones: Record<InventoryStatus, string> = {
  available: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  reserved: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  sold: "border-white/12 bg-white/[0.06] text-white/70",
  hidden: "border-rose-300/20 bg-rose-300/10 text-rose-100"
};

export function InventoryStatusBadge({ status }: { status: InventoryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase",
        tones[status]
      )}
    >
      {inventoryStatusLabels[status]}
    </span>
  );
}
