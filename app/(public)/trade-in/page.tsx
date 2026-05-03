import { BadgeDollarSign, Camera, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TradeInForm } from "@/components/forms/TradeInForm";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const process = [
  { title: "Расскажите об автомобиле", icon: ClipboardCheck },
  { title: "Прикрепите фотографии", icon: Camera },
  { title: "Получите предварительную оценку", icon: BadgeDollarSign }
];

export default function TradeInPage() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="sticky top-32">
              <SectionTitle
                eyebrow="Trade-In"
                title="Оценим ваш автомобиль деликатно, быстро и без салонной суеты."
                description="Оставьте основные данные, и мы подготовим предварительную оценку с понятным сценарием дальнейшего обмена."
              />
              <div className="mt-8 grid gap-4">
                {process.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <GlassCard key={item.title} className="flex items-center gap-4 p-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                        <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm text-white/40">Шаг {index + 1}</p>
                        <p className="font-semibold">{item.title}</p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <TradeInForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
