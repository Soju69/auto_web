"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/hooks/use-admin-store";

export function AdminDataHydrator() {
  const hydrate = useAdminStore((state) => state.hydrate);

  useEffect(() => {
    hydrate().catch((error) => {
      console.error("Не удалось синхронизировать админку", error);
    });
  }, [hydrate]);

  return null;
}
