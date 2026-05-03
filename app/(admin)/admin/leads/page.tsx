import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadsTable } from "@/components/admin/LeadsTable";

export default function AdminLeadsPage() {
  return (
    <>
      <AdminHeader
        title="Заявки на покупку и тест-драйв"
        description="Рабочая очередь менеджеров: новые входящие, встречи, отказ и продажа. Здесь же назначается ответственный и меняется стадия клиента."
      />
      <LeadsTable />
    </>
  );
}
