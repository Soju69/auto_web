export type WarehouseItemCategory = "part" | "accessory";

export type WarehouseItem = {
  id: string;
  sku: string;
  name: string;
  category: WarehouseItemCategory;
  compatibleWith: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  location: string;
  supplier: string;
};
