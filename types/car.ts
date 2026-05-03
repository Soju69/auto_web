export type BrandSlug = "kia" | "hyundai" | "xiaomi" | "zeekr";

export type Transmission = "Автомат" | "Робот" | "Редуктор";
export type FuelType = "Бензин" | "Гибрид" | "Электро";

export type CarSpec = {
  label: string;
  value: string;
};

export type Car = {
  id: string;
  brandSlug: BrandSlug;
  brand: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuelType: FuelType;
  power: string;
  drivetrain: string;
  engine: string;
  battery?: string;
  range?: string;
  color: string;
  badge: string;
  image: string;
  gallery: string[];
  description: string;
  specs: CarSpec[];
};

export type Brand = {
  slug: BrandSlug;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  strengths: string[];
  featuredModels: string[];
};
