import { AdminHeader } from "@/components/admin/AdminHeader";
import { WarehouseTable } from "@/components/admin/WarehouseTable";

export default function AdminWarehousePage() {
  return (
    <>
      <AdminHeader
        title="Склад запчастей"
        description="Учет запчастей и дополнительного оборудования: остатки, минимальный запас, место хранения и быстрые складские движения."
      />
      <WarehouseTable />
    </>
  );
}
