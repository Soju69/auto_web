import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function ContactPage() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="sticky top-32">
              <SectionTitle
                eyebrow="Контакты"
                title="Свяжитесь с персональным советником Aurum Motors."
                description="Поможем подобрать автомобиль, согласовать показ, trade-in, сервис или тест-драйв в удобное для вас время."
              />
              <div className="mt-8 grid gap-4">
                <ContactItem icon={Phone} label="Телефон" value="+7 (495) 220-88-18" />
                <ContactItem icon={Mail} label="Email" value="concierge@aurummotors.ru" />
                <ContactItem icon={MapPin} label="Шоурум" value="Москва, Пресненская набережная, 12" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-5 md:p-8">
              <ContactForm />
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <GlassCard className="flex items-center gap-4 p-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
        <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm text-white/40">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </GlassCard>
  );
}
