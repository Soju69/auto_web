import { cars, featuredCars } from "@/data/cars";
import type { InventoryItem, InventoryStatus } from "@/types/inventory-item";

export const inventoryStatusLabels: Record<InventoryStatus, string> = {
  available: "В наличии",
  reserved: "В резерве",
  sold: "Продан",
  hidden: "Скрыт"
};

export const initialInventory: InventoryItem[] = cars.map((car) => ({
  carId: car.id,
  visible: true,
  featured: featuredCars.some((featuredCar) => featuredCar.id === car.id),
  status: "available",
  location: car.brandSlug === "zeekr" || car.brandSlug === "xiaomi" ? "Премиум-зал" : "Основной шоурум",
  managerId: car.brandSlug === "hyundai" ? "u-sales-2" : "u-sales-1"
}));
