import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { brands, cars } from "@/data/cars";
import { catalogFilters } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { CarGrid } from "@/components/cars/CarGrid";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const priceRanges = ["до 4 млн ₽", "4-6 млн ₽", "6-8 млн ₽", "8 млн ₽+"];
const mileageRanges = ["до 5 тыс. км", "5-10 тыс. км", "10 тыс. км+"];
const years = ["2024", "2023", "2022"];

export default function CatalogPage() {
  return (
    <section className="pb-24 pt-2">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Каталог"
            title="Премиальная подборка KIA, Hyundai, Xiaomi Auto и Zeekr."
            description="Актуальные автомобили в единой витрине: с понятными характеристиками, аккуратными карточками и отдельными страницами каждой модели."
          />
        </Reveal>

        <Reveal className="mt-10" delay={0.06}>
          <div className="grid gap-4 md:grid-cols-4">
            {brands.map((brand) => (
              <Link key={brand.slug} href={`/catalog/${brand.slug}`} className="group">
                <GlassCard interactive className="h-full p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-luxury-champagne">
                        {brand.eyebrow}
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em]">
                        {brand.name}
                      </h2>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/42 transition group-hover:text-luxury-champagne" />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-luxury-soft">
                    {brand.featuredModels.join(" • ")}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
          <Reveal>
            <GlassCard className="sticky top-32 p-5">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
                  <SlidersHorizontal className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Фильтр шоурума</h2>
                  <p className="text-sm text-luxury-soft">Подберите формат автомобиля под свой сценарий</p>
                </div>
              </div>

              <div className="grid gap-5">
                <FilterGroup title="Марка" items={catalogFilters.brands} />
                <FilterGroup title="Цена" items={priceRanges} />
                <FilterGroup title="Пробег" items={mileageRanges} />
                <FilterGroup title="Год" items={years} />
                <FilterGroup title="Коробка" items={catalogFilters.transmissions} />
                <FilterGroup title="Тип" items={catalogFilters.fuelTypes} />
                <FilterGroup title="Привод" items={catalogFilters.drivetrains} />
              </div>
            </GlassCard>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <div className="mb-5 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
                  <p className="text-sm text-white/72">
                    В наличии <span className="font-semibold text-white">{cars.length}</span> автомобилей
                  </p>
                </div>
                <p className="text-sm text-luxury-soft">
                  Каждый лот сопровождается характеристиками, галереей и быстрым сценарием связи с салоном.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <CarGrid cars={cars} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
        {title}
      </legend>
      <div className="grid gap-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/70 transition hover:border-luxury-champagne/40 hover:bg-white/[0.07] hover:text-white"
          >
            <span>{item}</span>
            <input type="checkbox" className="h-4 w-4 accent-[#C8A96A]" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
