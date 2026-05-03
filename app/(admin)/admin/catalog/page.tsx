import { AdminHeader } from "@/components/admin/AdminHeader";
import { InventoryTable } from "@/components/admin/InventoryTable";

export default function AdminCatalogPage() {
  return (
    <>
      <AdminHeader
        title="Управление каталогом"
        description="Внутренний контур для контроля наличия: видимость карточки, статус автомобиля, менеджер и участие в витрине главной страницы."
      />
      <InventoryTable />
    </>
  );
}
