import { AdminHeader } from "@/components/admin/AdminHeader";
import { TeamKpiGrid } from "@/components/admin/TeamKpiGrid";
import { TeamTable } from "@/components/admin/TeamTable";

export default function AdminTeamPage() {
  return (
    <>
      <AdminHeader
        title="Команда и роли"
        description="Управление составом сотрудников, ролями, доступом и текущим статусом участия в операционной работе салона."
      />
      <TeamKpiGrid />
      <TeamTable />
    </>
  );
}
