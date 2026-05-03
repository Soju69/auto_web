import type { Car } from "@/types/car";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatMileage } from "@/lib/utils";

type CarSpecsProps = {
  car: Car;
};

export function CarSpecs({ car }: CarSpecsProps) {
  const coreSpecs = [
    { label: "Год", value: String(car.year) },
    { label: "Пробег", value: formatMileage(car.mileage) },
    { label: "Тип двигателя", value: car.engine },
    { label: "Привод", value: car.drivetrain },
    { label: "Коробка", value: car.transmission },
    { label: "Запас хода", value: car.range ?? "не требуется" }
  ];

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-luxury-champagne">
            Паспорт автомобиля
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">
            Характеристики без шума
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-luxury-soft">
          Только параметры, которые реально помогают принять решение до звонка менеджеру.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[...coreSpecs, ...car.specs].map((spec) => (
          <div
            key={`${spec.label}-${spec.value}`}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-white/38">
              {spec.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">{spec.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
