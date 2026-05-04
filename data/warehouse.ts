import type { WarehouseItem, WarehouseItemCategory } from "@/types/warehouse-item";

export const warehouseCategoryLabels: Record<WarehouseItemCategory, string> = {
  part: "Запчасть",
  accessory: "Доп. оборудование"
};

export const initialWarehouseItems: WarehouseItem[] = [
  {
    id: "wh-001",
    sku: "KIA-OIL-25GDI",
    name: "Масляный фильтр 2.5 GDI",
    category: "part",
    compatibleWith: "KIA K5, Hyundai Sonata",
    quantity: 18,
    minQuantity: 6,
    unit: "шт.",
    location: "A-01-03",
    supplier: "Mobis Parts"
  },
  {
    id: "wh-002",
    sku: "HYU-BRK-TUC",
    name: "Комплект передних колодок",
    category: "part",
    compatibleWith: "Hyundai Tucson",
    quantity: 5,
    minQuantity: 8,
    unit: "компл.",
    location: "A-02-01",
    supplier: "Hyundai Genuine"
  },
  {
    id: "wh-003",
    sku: "EV-CABLE-GB",
    name: "Зарядный кабель Type 2",
    category: "accessory",
    compatibleWith: "KIA EV6, Zeekr, Xiaomi SU7",
    quantity: 12,
    minQuantity: 4,
    unit: "шт.",
    location: "B-04-02",
    supplier: "EV Service"
  },
  {
    id: "wh-004",
    sku: "ZEEKR-MATS-001",
    name: "Комплект ковриков салона",
    category: "accessory",
    compatibleWith: "Zeekr 001",
    quantity: 7,
    minQuantity: 3,
    unit: "компл.",
    location: "C-01-05",
    supplier: "Detail Line"
  },
  {
    id: "wh-005",
    sku: "WIPER-UNIV-24",
    name: "Щетки стеклоочистителя 24/18",
    category: "part",
    compatibleWith: "Универсальные",
    quantity: 24,
    minQuantity: 10,
    unit: "компл.",
    location: "A-03-04",
    supplier: "Bosch"
  },
  {
    id: "wh-006",
    sku: "DVR-PREM-4K",
    name: "Видеорегистратор 4K",
    category: "accessory",
    compatibleWith: "Все модели",
    quantity: 3,
    minQuantity: 5,
    unit: "шт.",
    location: "B-02-02",
    supplier: "AutoTech"
  }
];
