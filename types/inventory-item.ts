export type InventoryStatus = "available" | "reserved" | "sold" | "hidden";

export type InventoryItem = {
  carId: string;
  visible: boolean;
  featured: boolean;
  status: InventoryStatus;
  location: string;
  managerId?: string;
};
