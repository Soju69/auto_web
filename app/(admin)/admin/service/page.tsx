import { AdminHeader } from "@/components/admin/AdminHeader";
import { ServiceKpiGrid } from "@/components/admin/ServiceKpiGrid";
import { ServiceOrdersTable } from "@/components/admin/ServiceOrdersTable";
import { ServiceTimeline } from "@/components/admin/ServiceTimeline";

export default function AdminServicePage() {
  return (
    <>
      <AdminHeader
        title="Сервисная зона"
        description="Полноценная внутренняя очередь сервиса: записи, подтверждение визита, назначение мастера-приемщика и механика, а также контроль текущего статуса работ."
      />
      <ServiceKpiGrid />
      <div className="grid gap-6 2xl:grid-cols-[0.92fr_1.08fr]">
        <ServiceTimeline />
        <ServiceOrdersTable />
      </div>
    </>
  );
}
