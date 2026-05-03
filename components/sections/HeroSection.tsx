"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, CarFront, Sparkles } from "lucide-react";
import { featuredCars } from "@/data/cars";
import { platformPillars } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { formatCurrency, formatMileage } from "@/lib/utils";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroCar = featuredCars[0];

  return (
    <section className="relative overflow-hidden pb-24 pt-6 md:pb-32">
      <div className="luxury-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-luxury-champagne/[0.12] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-luxury-champagne" aria-hidden="true" />
              Премиальная платформа современного автосалона
            </div>
            <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.075em] text-white md:text-7xl xl:text-8xl">
              Автомобили будущего. Сделка без лишнего шума.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-luxury-soft md:text-xl">
              Aurum объединяет каталог, Trade-In, кредит, тест-драйв и сервис в один спокойный
              цифровой сценарий для клиентов, которые ценят время и точность.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/catalog">Смотреть каталог</PrimaryButton>
              <SecondaryButton href="/contact">Получить подбор</SecondaryButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {platformPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={pillar.label}
                    href={pillar.href}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-sm font-semibold text-white/76 transition hover:border-luxury-champagne/50 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-luxury-champagne" aria-hidden="true" />
                    {pillar.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40, rotateX: 8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-8 top-14 h-40 w-40 rounded-full bg-luxury-champagne/[0.18] blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-luxury-platinum/[0.12] blur-3xl" />
            <GlassCard className="relative p-3">
              <div className="relative overflow-hidden rounded-[1.9rem]">
                <img
                  src={heroCar.image}
                  alt={`${heroCar.brand} ${heroCar.model}`}
                  className="h-[560px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <Link
                  href={`/catalog/${heroCar.id}`}
                  className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white backdrop-blur-xl transition hover:bg-luxury-platinum hover:text-luxury-main"
                  aria-label={`Открыть ${heroCar.brand} ${heroCar.model}`}
                >
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <div className="absolute bottom-5 left-5 right-5">
                  <GlassCard className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-luxury-champagne">
                          Автомобиль недели
                        </p>
                        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em]">
                          {heroCar.brand} {heroCar.model}
                        </h2>
                        <p className="mt-2 text-sm text-luxury-soft">
                          {heroCar.power} · {heroCar.drivetrain} · {formatMileage(heroCar.mileage)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/45">Цена</p>
                        <p className="mt-1 text-sm font-semibold text-luxury-platinum">
                          {formatCurrency(heroCar.price)}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </GlassCard>

            <div className="absolute -bottom-6 left-6 hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/35 backdrop-blur-2xl md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-luxury-champagne text-luxury-main">
                  <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Проверено Aurum</p>
                  <p className="text-xs text-luxury-soft">диагностика, документы, гарантия</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-24 hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/35 backdrop-blur-2xl xl:block">
              <CarFront className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-white">11 авто в наличии</p>
              <p className="text-xs text-luxury-soft">KIA, Hyundai, Xiaomi, Zeekr</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
