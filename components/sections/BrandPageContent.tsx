import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import type { Brand, Car } from "@/types/car";
import { CarGrid } from "@/components/cars/CarGrid";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

type BrandPageContentProps = {
  brand: Brand;
  cars: Car[];
};

export function BrandPageContent({ brand, cars }: BrandPageContentProps) {
  return (
    <section className="pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/45 backdrop-blur-2xl md:p-8">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,169,106,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-luxury-champagne">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {brand.eyebrow}
                </p>
                <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.065em] md:text-7xl">
                  {brand.name}
                </h1>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-white/82">
                  {brand.title}
                </p>
                <p className="mt-5 max-w-2xl leading-8 text-luxury-soft">
                  {brand.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton href="#available">Смотреть авто</PrimaryButton>
                  <SecondaryButton href="/contact">Получить подбор</SecondaryButton>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-3">
                <img
                  src={brand.heroImage}
                  alt={`Автомобили ${brand.name}`}
                  className="h-[420px] w-full rounded-[1.55rem] object-cover"
                />
                <div className="absolute inset-3 rounded-[1.55rem] bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 grid gap-3 sm:grid-cols-2">
                  {brand.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-medium text-white backdrop-blur-xl"
                    >
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.08}>
          <div className="grid gap-5 md:grid-cols-3">
            {brand.featuredModels.map((model) => (
              <GlassCard key={model} className="p-6">
                <BadgeCheck className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em]">
                  {model}
                </h2>
                <p className="mt-3 text-sm leading-6 text-luxury-soft">
                  Модель доступна в подборке АВТО СИТИ ПРО с проверкой, документами и готовым сценарием сделки.
                </p>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={0.12}>
          <div id="available" className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-luxury-champagne">
                В наличии
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em]">
                Доступные {brand.name}
              </h2>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-luxury-platinum transition hover:text-luxury-champagne"
            >
              Весь каталог
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <CarGrid cars={cars} />
        </Reveal>
      </Container>
    </section>
  );
}
