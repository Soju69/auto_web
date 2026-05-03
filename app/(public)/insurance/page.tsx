import { ShieldCheck, WalletCards } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function InsurancePage() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="sticky top-32">
              <SectionTitle
                eyebrow="Страхование"
                title="Запишитесь на расчет КАСКО, ОСАГО или страхование сделки."
                description="Заявка попадет в CRM отдельным источником, а менеджер увидит задачу по страхованию и свяжется с клиентом."
              />
              <div className="mt-8 grid gap-4">
                <InfoCard icon={ShieldCheck} title="Отдельный статус в CRM" text="Заявка не теряется среди общих обращений." />
                <InfoCard icon={WalletCards} title="Подготовка расчета" text="Менеджер уточнит автомобиль, условия и желаемый пакет." />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-5 md:p-8">
              <ContactForm
                endpoint="/api/public/insurance"
                defaultTopic="Страхование"
                submitLabel="Записаться на страхование"
                successMessage="Заявка на страхование отправлена и появилась в CRM."
              />
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <GlassCard className="flex gap-4 p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
        <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
      </span>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm leading-6 text-luxury-soft">{text}</p>
      </div>
    </GlassCard>
  );
}
