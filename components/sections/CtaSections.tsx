import { CalendarCheck, CreditCard, Wrench } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export function FinancingCTA() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <GlassCard className="grid gap-8 p-8 md:grid-cols-[0.75fr_1.25fr] md:p-12">
            <div className="grid h-16 w-16 place-items-center rounded-3xl border border-white/10 bg-white/10">
              <CreditCard className="h-7 w-7 text-luxury-champagne" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-luxury-champagne">
                Финансирование
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Рассчитаем кредит и закрепим автомобиль за вами до визита в шоурум.
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-luxury-soft">
                Без агрессивных форм и лишних звонков: один запрос, понятный сценарий и аккуратное сопровождение менеджера.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/contact">Получить расчёт</PrimaryButton>
                <SecondaryButton href="/catalog">Выбрать автомобиль</SecondaryButton>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

export function ServiceCTA() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <GlassCard className="relative overflow-hidden p-8 md:p-12">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-luxury-champagne/[0.14] blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-center">
              <div>
                <div className="flex items-center gap-3 text-luxury-champagne">
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.32em]">
                    Сервис после покупки
                  </span>
                </div>
                <h2 className="mt-4 max-w-4xl font-display text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                  Покупка не заканчивается выдачей ключей.
                </h2>
                <p className="mt-5 leading-8 text-luxury-soft">
                  АВТО СИТИ ПРО сохраняет клиента внутри экосистемы: диагностика, ТО, гарантийные вопросы и персональный сервис.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <PrimaryButton href="/service">Записаться на сервис</PrimaryButton>
                <span className="flex items-center gap-2 text-sm text-luxury-soft">
                  <CalendarCheck className="h-4 w-4 text-white/40" aria-hidden="true" />
                  Подтверждение консьержа обязательно
                </span>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}
