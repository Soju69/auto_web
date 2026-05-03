import { AdminHeader } from "@/components/admin/AdminHeader";
import { TradeInKpiGrid } from "@/components/admin/TradeInKpiGrid";
import { TradeInTable } from "@/components/admin/TradeInTable";

export default function AdminTradeInPage() {
  return (
    <>
      <AdminHeader
        title="Trade-In"
        description="Очередь оценки, распределение заявок между оценщиками, ориентир по стоимости и решение по обмену в одном рабочем окне."
      />
      <TradeInKpiGrid />
      <TradeInTable />
    </>
  );
}
