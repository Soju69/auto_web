import { whyChooseUs } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function WhyChooseUsSection() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Почему АВТО СИТИ ПРО"
            title="Меньше обещаний. Больше контроля в каждом шаге."
            description="Мы оставили только то, что влияет на доверие: проверка, сделка, скорость ответа и сопровождение после покупки."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <GlassCard interactive className="h-full p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10">
                    <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-luxury-soft">{item.description}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
