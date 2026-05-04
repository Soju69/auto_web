"use client";

import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth-session";
import { getSavedClientProfile } from "@/lib/client-profile";
import { BRAND_NAME, navLinks } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function Navbar() {
  const [accountHref, setAccountHref] = useState("/login");
  const [accountLabel, setAccountLabel] = useState("Вход / регистрация");

  useEffect(() => {
    const session = getAuthSession();

    if (session?.type === "employee") {
      setAccountHref("/admin");
      setAccountLabel("Админка");
      return;
    }

    if (session?.type === "client" || getSavedClientProfile()) {
      setAccountHref("/account");
      setAccountLabel("Личный кабинет");
      return;
    }

    setAccountHref("/login");
    setAccountLabel("Вход / регистрация");
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <Container>
        <nav
          aria-label="Основная навигация"
          className="flex items-center justify-between rounded-full border border-white/10 bg-[#070708]/80 px-4 py-3 shadow-2xl shadow-black/45 backdrop-blur-2xl md:px-6"
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10">
              <ShieldCheck className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-white">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-white/62 transition duration-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="accent" size="sm">
              <Link href={accountHref}>{accountLabel}</Link>
            </Button>
            <Button
              variant="glass"
              size="sm"
              aria-label="Открыть мобильное меню"
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
