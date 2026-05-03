import type { CSSProperties } from "react";
import { stats } from "@/data/stats";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { StatCard } from "@/components/ui/StatCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const trustSignals = [
  "Проверенные авто",
  "Прозрачная сделка",
  "Быстрый ответ",
  "Сервис после покупки"
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-luxury-champagne/[0.14] blur-3xl"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal>
            <SectionTitle
              eyebrow="Метрики"
              title="Цифры, которые подтверждают качество работы без лишнего шума."
              description="Продажи, скорость сделки, конверсия trade-in и повторные обращения показывают, насколько уверенно клиент чувствует себя на каждом этапе."
            />
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
              {trustSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white/62 backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative">
            <div
              className="absolute -left-7 bottom-10 hidden h-72 w-24 -rotate-6 rounded-[2rem] bg-white/[0.08] blur-[1px] lg:block"
              aria-hidden="true"
            />
            <div
              className="absolute -right-8 -top-8 h-52 w-52 rounded-full bg-luxury-platinum/[0.12] blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-4 md:-rotate-2">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="md:[transform:translateX(var(--metric-offset))]"
                  style={
                    {
                      "--metric-offset": `${index % 2 === 0 ? 0 : 28}px`
                    } as CSSProperties
                  }
                >
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    suffix={stat.suffix}
                    status={stat.status}
                    tone={stat.tone as "good" | "normal" | "low"}
                    trend={stat.trend}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
