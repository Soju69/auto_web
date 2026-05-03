import { getBrandBySlug, getCarsByBrand } from "@/data/cars";
import { BrandPageContent } from "@/components/sections/BrandPageContent";

export default function HyundaiPage() {
  const brand = getBrandBySlug("hyundai");

  if (!brand) {
    return null;
  }

  return <BrandPageContent brand={brand} cars={getCarsByBrand("hyundai")} />;
}
