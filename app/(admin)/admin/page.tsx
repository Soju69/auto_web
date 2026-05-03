import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminKpiGrid } from "@/components/admin/AdminKpiGrid";
import { ModuleOverview } from "@/components/admin/ModuleOverview";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader
        title="Операционный обзор автосалона"
        description="Первая рабочая версия CRM уже собирает роли, статусы и очередь заявок в единый экран. Отсюда удобно начать день, увидеть узкие места и перейти в нужный модуль."
      />
      <AdminKpiGrid />
      <ModuleOverview />
    </>
  );
}
