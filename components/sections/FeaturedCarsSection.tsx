import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredCars } from "@/data/cars";
import { Container } from "@/components/layout/Container";
import { CarGrid } from "@/components/cars/CarGrid";
import { Reveal } from "@/components/shared/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function FeaturedCarsSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionTitle
              eyebrow="Избранное"
              title="Три автомобиля, которые задают тон каталогу."
              description="Не перегружаем витрину: показываем самые сильные позиции, а остальное раскрываем в каталоге."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/45 hover:text-luxury-platinum"
            >
              Весь каталог
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Reveal className="mt-10" delay={0.12}>
          <CarGrid cars={featuredCars} />
        </Reveal>
      </Container>
    </section>
  );
}
