"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { canAccessAdminPath, getAuthSession, getDefaultAdminPath } from "@/lib/auth-session";

export function AdminAccessGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const session = getAuthSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.type === "client") {
      router.replace("/account");
      return;
    }

    if (!canAccessAdminPath(session.role, pathname)) {
      router.replace(getDefaultAdminPath(session.role));
      return;
    }

    setIsAllowed(true);
  }, [pathname, router]);

  if (!isAllowed) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 text-center text-sm text-luxury-soft">
        Проверяем права доступа...
      </section>
    );
  }

  return children;
}
