import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CarFront,
  FileCheck2,
  Gauge,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { cars, getCarById } from "@/data/cars";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { CarInquiryForm } from "@/components/forms/CarInquiryForm";
import { CarSpecs } from "@/components/cars/CarSpecs";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) {
    notFound();
  }

  const title = `${car.brand} ${car.model}`;

  return (
    <section className="pb-24">
      <Container>
        <Reveal>
          <Link
            href="/catalog"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 transition hover:border-luxury-champagne/40 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Вернуться в каталог
          </Link>
        </Reveal>

        <div className="grid gap-8 xl:grid-cols-[1fr_390px]">
          <div className="grid gap-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/45 backdrop-blur-2xl md:p-5">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(200,169,106,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]"
                  aria-hidden="true"
                />
                <div className="relative grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
                  <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-black/30">
                    <img
                      src={car.gallery[0]}
                      alt={`${title}, главное фото`}
                      className="h-full min-h-[380px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="inline-flex rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-luxury-champagne backdrop-blur-xl">
                        {car.badge}
                      </p>
                      <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.065em] md:text-7xl">
                        {title}
                      </h1>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {car.gallery.slice(1, 3).map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${title}, фото ${index + 2}`}
                        className="h-[188px] w-full rounded-[1.5rem] object-cover lg:h-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-5 md:grid-cols-4">
                <HeroSpec icon={CalendarDays} label="Год" value={String(car.year)} />
                <HeroSpec icon={Gauge} label="Пробег" value={formatMileage(car.mileage)} />
                <HeroSpec icon={CarFront} label="Привод" value={car.drivetrain} />
                <HeroSpec icon={Sparkles} label="Тип" value={car.fuelType} />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <CarSpecs car={car} />
            </Reveal>

            <Reveal delay={0.16}>
              <GlassCard className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-luxury-champagne">
                  Почему у нас
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em]">
                  Покупка без тревоги и лишних кругов.
                </h2>
                <div className="mt-7 grid gap-4 md:grid-cols-4">
                  <Benefit
                    icon={BadgeCheck}
                    title="Проверенный авто"
                    text="Диагностика и история до показа."
                  />
                  <Benefit icon={ShieldCheck} title="Гарантия" text="Поддержка после выдачи." />
                  <Benefit
                    icon={FileCheck2}
                    title="Юридическая чистота"
                    text="Документы собраны заранее."
                  />
                  <Benefit
                    icon={Sparkles}
                    title="Сопровождение"
                    text="Менеджер ведёт сделку целиком."
                  />
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <GlassCard className="sticky top-32 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-luxury-champagne">
                Цена
              </p>
              <p className="mt-3 font-display text-5xl font-semibold tracking-[-0.06em] text-luxury-platinum">
                {formatCurrency(car.price)}
              </p>
              <p className="mt-4 leading-7 text-luxury-soft">{car.description}</p>

              <CarInquiryForm carId={car.id} carLabel={title} />

              <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-white">Включено в подготовку</p>
                <div className="mt-4 grid gap-3 text-sm text-white/68">
                  <span>Проверка кузова и технических узлов</span>
                  <span>Юридический отчёт перед сделкой</span>
                  <span>Персональная выдача в шоуруме</span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HeroSpec({
  icon: Icon,
  label,
  value
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <GlassCard className="p-5">
      <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
      <p className="mt-5 text-xs uppercase tracking-[0.22em] text-white/38">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </GlassCard>
  );
}

function Benefit({
  icon: Icon,
  title,
  text
}: {
  icon: typeof BadgeCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
      <Icon className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-luxury-soft">{text}</p>
    </div>
  );
}
