import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BRAND_NAME, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-lg font-semibold uppercase tracking-[0.28em]">
            {BRAND_NAME}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-luxury-soft">
            Каталог автомобилей, trade-in, сервис и сопровождение сделки в одном премиальном цифровом пространстве.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Разделы</p>
          <div className="mt-4 grid gap-3">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-luxury-soft transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Консьерж</p>
          <p className="mt-4 text-sm leading-7 text-luxury-soft">
            +7 (473) 200-80-08
            <br />
            concierge@aurummotors.ru
            <br />
            Воронежская область, г.о. город Воронеж, г. Воронеж, пр-кт Патриотов, д. 47, офис 106
          </p>
        </div>
      </Container>
    </footer>
  );
}
