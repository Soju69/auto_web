import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brands, cars } from "@/data/cars";
import { Container } from "@/components/layout/Container";
import { CatalogBrowser } from "@/components/cars/CatalogBrowser";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

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

        <Reveal delay={0.1}>
          <CatalogBrowser cars={cars} />
        </Reveal>
      </Container>
    </section>
  );
}
