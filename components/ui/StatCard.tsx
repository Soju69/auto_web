import { CheckCircle2, Info, MoreHorizontal, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  suffix?: string;
  status?: string;
  tone?: "good" | "normal" | "low";
  trend?: number[];
};

const toneStyles = {
  good: {
    icon: CheckCircle2,
    text: "text-[#F4E8C8]",
    muted: "text-[#E8D6A6]/75",
    glow: "from-[#C8A96A]/22 via-transparent to-transparent",
    stroke: "#F4E8C8",
    bars: "bg-[#E8D6A6]/30"
  },
  normal: {
    icon: Info,
    text: "text-[#E8E1D2]",
    muted: "text-[#D5CEC0]/72",
    glow: "from-[#E8E1D2]/14 via-transparent to-transparent",
    stroke: "#E8E1D2",
    bars: "bg-[#E8E1D2]/22"
  },
  low: {
    icon: TriangleAlert,
    text: "text-[#D9B17B]",
    muted: "text-[#B98B57]/78",
    glow: "from-[#8A6A3F]/26 via-transparent to-transparent",
    stroke: "#D9B17B",
    bars: "bg-[#B98B57]/28"
  }
};

export function StatCard({
  value,
  label,
  suffix,
  status = "Хорошо",
  tone = "good",
  trend = []
}: StatCardProps) {
  const style = toneStyles[tone];
  const StatusIcon = style.icon;

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.075] bg-[#101015]/70 p-5 shadow-2xl shadow-black/45 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#13131a]/78">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
          style.glow
        )}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-white/[0.055] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="max-w-[13rem] text-sm font-medium leading-6 text-white/78">
          {label}
        </h3>
        <button
          type="button"
        aria-label={`Опции: ${label}`}
          className="rounded-full p-1 text-white/46 transition hover:bg-white/10 hover:text-white"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="relative mt-6 grid grid-cols-[0.78fr_1fr] items-end gap-4">
        <div>
          <div className={cn("flex items-center gap-2 text-xs", style.muted)}>
            <StatusIcon className="h-4 w-4" aria-hidden="true" />
            <span>{status}</span>
          </div>
          <p className="mt-2 font-display text-4xl font-semibold tracking-[-0.05em] text-white">
            {value}
            {suffix ? (
              <span className="ml-1 text-base font-semibold tracking-normal text-white/72">
                {suffix}
              </span>
            ) : null}
          </p>
        </div>
        <MiniSparkline trend={trend} toneClass={style.bars} stroke={style.stroke} />
      </div>
    </article>
  );
}

function MiniSparkline({
  trend,
  toneClass,
  stroke
}: {
  trend: number[];
  toneClass: string;
  stroke: string;
}) {
  const points = trend
    .map((value, index) => {
      const x = (index / Math.max(trend.length - 1, 1)) * 132;
      const y = 52 - (value / 100) * 44;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-16 overflow-hidden rounded-2xl">
      <div className="absolute inset-x-0 bottom-1 flex h-12 items-end justify-between gap-1 opacity-75">
        {trend.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className={cn("w-1 rounded-full", toneClass)}
            style={{ height: `${18 + value * 0.35}%` }}
          />
        ))}
      </div>
      <svg
        viewBox="0 0 132 58"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="График динамики метрики"
      >
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.82"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
