import { testimonials } from "@/data/stats";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Сигналы доверия"
            title="Отзывы клиентов, которые подтверждают уровень сервиса."
            description="Реальные впечатления о покупке, обмене и сопровождении после сделки помогают почувствовать характер бренда еще до визита в шоурум."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.07}>
              <GlassCard className="h-full p-6">
                <p className="text-lg leading-8 text-white/82">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-luxury-soft">{testimonial.role}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
