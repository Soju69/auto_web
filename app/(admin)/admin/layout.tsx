import type { ReactNode } from "react";
import { AdminDataHydrator } from "@/components/admin/AdminDataHydrator";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminWorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen py-6">
      <div className="mx-auto grid w-full max-w-[1840px] gap-6 px-4 sm:px-5 lg:px-6 xl:grid-cols-[320px_1fr] xl:items-start">
        <AdminDataHydrator />
        <AdminSidebar />
        <div className="grid gap-6">{children}</div>
      </div>
    </section>
  );
}
