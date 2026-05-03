import Link from "next/link";
import { ArrowUpRight, BatteryCharging, Gauge, Settings2 } from "lucide-react";
import type { Car } from "@/types/car";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatCurrency, formatMileage } from "@/lib/utils";

type CarCardProps = {
  car: Car;
  priority?: boolean;
};

export function CarCard({ car, priority = false }: CarCardProps) {
  return (
    <article className="group h-full">
      <GlassCard interactive className="flex h-full flex-col overflow-hidden p-2">
        <Link href={`/catalog/${car.id}`} className="block">
          <div className="relative aspect-[1.28] overflow-hidden rounded-[1.65rem] bg-white/[0.03]">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-black/10 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs text-white/78 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-luxury-champagne" />
              {car.badge}
            </div>
            <div className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition group-hover:bg-luxury-platinum group-hover:text-luxury-main">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-luxury-soft">{car.brand}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.035em] text-white">
                {car.model}
              </h3>
              <p className="mt-1 text-sm text-white/52">{car.trim}</p>
            </div>
            <p className="text-right text-sm font-semibold text-luxury-platinum">
              {formatCurrency(car.price)}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/62">
            <CardSpec icon={Gauge} value={`${car.year} · ${formatMileage(car.mileage)}`} />
            <CardSpec icon={Settings2} value={car.drivetrain} />
            <CardSpec icon={BatteryCharging} value={car.battery ?? car.engine} />
            <CardSpec icon={Settings2} value={car.transmission} />
          </div>

          <Link
            href={`/catalog/${car.id}`}
            className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-white/82 transition hover:border-luxury-champagne/45 hover:bg-luxury-champagne hover:text-luxury-main"
          >
            Подробнее
          </Link>
        </div>
      </GlassCard>
    </article>
  );
}

function CardSpec({
  icon: Icon,
  value
}: {
  icon: typeof Gauge;
  value: string;
}) {
  return (
    <span className="flex min-h-11 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-luxury-champagne/80" aria-hidden="true" />
      <span className="line-clamp-1">{value}</span>
    </span>
  );
}
