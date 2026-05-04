"use client";

import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Car } from "@/types/car";
import { CarGrid } from "@/components/cars/CarGrid";
import { GlassCard } from "@/components/ui/GlassCard";

type RangeFilter = {
  label: string;
  test: (car: Car) => boolean;
};

const priceRanges: RangeFilter[] = [
  { label: "до 4 млн ₽", test: (car: Car) => car.price < 4_000_000 },
  { label: "4-6 млн ₽", test: (car: Car) => car.price >= 4_000_000 && car.price < 6_000_000 },
  { label: "6-8 млн ₽", test: (car: Car) => car.price >= 6_000_000 && car.price < 8_000_000 },
  { label: "8 млн ₽+", test: (car: Car) => car.price >= 8_000_000 }
];

const mileageRanges: RangeFilter[] = [
  { label: "до 5 тыс. км", test: (car: Car) => car.mileage < 5_000 },
  { label: "5-10 тыс. км", test: (car: Car) => car.mileage >= 5_000 && car.mileage < 10_000 },
  { label: "10 тыс. км+", test: (car: Car) => car.mileage >= 10_000 }
];

type FilterKey = "brands" | "models" | "prices" | "mileages" | "years" | "transmissions" | "fuelTypes" | "drivetrains";
type SelectedFilters = Record<FilterKey, string[]>;

const emptyFilters: SelectedFilters = {
  brands: [],
  models: [],
  prices: [],
  mileages: [],
  years: [],
  transmissions: [],
  fuelTypes: [],
  drivetrains: []
};

function uniqueSorted(values: Array<string | number>) {
  return Array.from(new Set(values.map(String))).sort((a, b) => a.localeCompare(b, "ru"));
}

function hasSelected(values: string[], current: string) {
  return values.includes(current);
}

function matchesSelected(values: string[], current: string | number) {
  return values.length === 0 || values.includes(String(current));
}

function matchesRange(values: string[], car: Car, ranges: RangeFilter[]) {
  return values.length === 0 || ranges.some((range) => values.includes(range.label) && range.test(car));
}

export function CatalogBrowser({ cars }: { cars: Car[] }) {
  const [selected, setSelected] = useState<SelectedFilters>(emptyFilters);

  const options = useMemo(
    () => ({
      brands: uniqueSorted(cars.map((car) => car.brand)),
      models: uniqueSorted(cars.map((car) => car.model)),
      years: uniqueSorted(cars.map((car) => car.year)).sort((a, b) => Number(b) - Number(a)),
      transmissions: uniqueSorted(cars.map((car) => car.transmission)),
      fuelTypes: uniqueSorted(cars.map((car) => car.fuelType)),
      drivetrains: uniqueSorted(cars.map((car) => car.drivetrain))
    }),
    [cars]
  );

  const visibleCars = useMemo(
    () =>
      cars.filter(
        (car) =>
          matchesSelected(selected.brands, car.brand) &&
          matchesSelected(selected.models, car.model) &&
          matchesSelected(selected.years, car.year) &&
          matchesSelected(selected.transmissions, car.transmission) &&
          matchesSelected(selected.fuelTypes, car.fuelType) &&
          matchesSelected(selected.drivetrains, car.drivetrain) &&
          matchesRange(selected.prices, car, priceRanges) &&
          matchesRange(selected.mileages, car, mileageRanges)
      ),
    [cars, selected]
  );

  const activeCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0);

  function toggleFilter(key: FilterKey, value: string) {
    setSelected((current) => {
      const values = current[key];
      return {
        ...current,
        [key]: hasSelected(values, value) ? values.filter((item) => item !== value) : [...values, value]
      };
    });
  }

  function resetFilters() {
    setSelected(emptyFilters);
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
      <GlassCard className="sticky top-32 h-fit p-5">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
              <SlidersHorizontal className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Фильтр шоурума</h2>
              <p className="text-sm text-luxury-soft">Подберите формат автомобиля</p>
            </div>
          </div>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={resetFilters}
              aria-label="Сбросить фильтры"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/55 transition hover:border-luxury-champagne/45 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="grid gap-5">
          <FilterGroup title="Марка" items={options.brands} selected={selected.brands} onToggle={(value) => toggleFilter("brands", value)} />
          <FilterGroup title="Модель" items={options.models} selected={selected.models} onToggle={(value) => toggleFilter("models", value)} />
          <FilterGroup title="Цена" items={priceRanges.map((range) => range.label)} selected={selected.prices} onToggle={(value) => toggleFilter("prices", value)} />
          <FilterGroup title="Пробег" items={mileageRanges.map((range) => range.label)} selected={selected.mileages} onToggle={(value) => toggleFilter("mileages", value)} />
          <FilterGroup title="Год" items={options.years} selected={selected.years} onToggle={(value) => toggleFilter("years", value)} />
          <FilterGroup title="Коробка" items={options.transmissions} selected={selected.transmissions} onToggle={(value) => toggleFilter("transmissions", value)} />
          <FilterGroup title="Тип" items={options.fuelTypes} selected={selected.fuelTypes} onToggle={(value) => toggleFilter("fuelTypes", value)} />
          <FilterGroup title="Привод" items={options.drivetrains} selected={selected.drivetrains} onToggle={(value) => toggleFilter("drivetrains", value)} />
        </div>
      </GlassCard>

      <div>
        <div className="mb-5 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
            <p className="text-sm text-white/72">
              Найдено <span className="font-semibold text-white">{visibleCars.length}</span> из{" "}
              <span className="font-semibold text-white">{cars.length}</span> автомобилей
            </p>
          </div>
          <p className="text-sm text-luxury-soft">
            Марки, модели и параметры берутся из массива автомобилей, поэтому новые лоты автоматически попадают в фильтр.
          </p>
        </div>
        {visibleCars.length > 0 ? (
          <CarGrid cars={visibleCars} />
        ) : (
          <GlassCard className="p-8 text-center text-sm leading-6 text-luxury-soft">
            Под такие параметры машин пока нет. Сбросьте часть фильтров или выберите другой диапазон.
          </GlassCard>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">{title}</legend>
      <div className="grid gap-2">
        {items.map((item) => {
          const checked = selected.includes(item);
          return (
            <label
              key={item}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/70 transition hover:border-luxury-champagne/40 hover:bg-white/[0.07] hover:text-white"
            >
              <span>{item}</span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(item)}
                className="h-4 w-4 accent-[#C8A96A]"
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
