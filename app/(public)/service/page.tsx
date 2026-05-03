import { ShieldCheck, TimerReset, Wrench } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function ServicePage() {
  return (
    <section className="pb-24">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Запись в сервис"
            title="Премиальный сервис для автомобилей, которые требуют точности и внимания."
            description="Запишитесь на диагностику, плановое обслуживание или консультацию, а мы подберем удобное время и заранее подготовим визит."
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <Reveal>
            <ServiceForm />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              <ServiceNote
                icon={ShieldCheck}
                title="Проверенные специалисты"
                text="Работаем с автомобилями, где важны правильная диагностика, прозрачные рекомендации и бережное отношение к деталям."
              />
              <ServiceNote
                icon={TimerReset}
                title="Быстрое подтверждение"
                text="Подтверждаем запись в рабочее время и заранее уточняем все детали, чтобы визит прошел спокойно."
              />
              <ServiceNote
                icon={Wrench}
                title="Сервис как продолжение сделки"
                text="После покупки вы остаетесь с командой, которая знает историю автомобиля и сопровождает его дальше."
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ServiceNote({
  icon: Icon,
  title,
  text
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <GlassCard className="p-6">
      <Icon className="h-6 w-6 text-luxury-champagne" aria-hidden="true" />
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-luxury-soft">{text}</p>
    </GlassCard>
  );
}
