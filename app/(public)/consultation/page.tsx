import { CalendarDays, Headphones } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function ConsultationPage() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="sticky top-32">
              <SectionTitle
                eyebrow="Консультация"
                title="Запишитесь на консультацию менеджера по покупке, кредиту или обмену."
                description="Клиент оставляет ФИО и телефон один раз, а последующие формы автоматически подставляют эти данные на этом устройстве."
              />
              <div className="mt-8 grid gap-4">
                <InfoCard icon={Headphones} title="Консультация в CRM" text="Обращение появляется в общей очереди заявок с источником Консультация." />
                <InfoCard icon={CalendarDays} title="Следующий шаг" text="Менеджер назначает ответственного и переводит заявку по статусам." />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-5 md:p-8">
              <ContactForm
                endpoint="/api/public/consultation"
                defaultTopic="Консультация"
                submitLabel="Записаться на консультацию"
                successMessage="Заявка на консультацию отправлена и появилась в CRM."
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
  icon: typeof Headphones;
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
