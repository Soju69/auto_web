import { Gem, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const principles = [
  {
    title: "Автомобили с понятной историей",
    text: "Каждый автомобиль проходит диагностику, проверку документов и аккуратную предпродажную подготовку.",
    icon: ShieldCheck
  },
  {
    title: "Премиальный сценарий сделки",
    text: "Показ, оценка, финансирование и выдача собраны в один спокойный маршрут без лишних визитов.",
    icon: Gem
  },
  {
    title: "Сервис после покупки",
    text: "Мы остаемся рядом после передачи ключей: сервис, сопровождение и персональные рекомендации уже включены в опыт.",
    icon: Wrench
  },
  {
    title: "Внимание к деталям",
    text: "От первого звонка до выдачи автомобиля все строится вокруг такта, скорости ответа и прозрачных договоренностей.",
    icon: Sparkles
  }
];

export default function AboutPage() {
  return (
    <section className="pb-24">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="О салоне"
            title="АВТО СИТИ ПРО — цифровой автосалон с вниманием уровня private service."
            description="Мы собираем автомобили, сервис и сопровождение в единый опыт, где важны доверие, спокойный ритм и качество каждой детали."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.07}>
                <GlassCard className="h-full p-7">
                  <Icon className="h-6 w-6 text-luxury-champagne" aria-hidden="true" />
                  <h2 className="mt-8 font-display text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-3 leading-7 text-luxury-soft">{item.text}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
