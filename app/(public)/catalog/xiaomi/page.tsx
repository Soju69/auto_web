import { getBrandBySlug, getCarsByBrand } from "@/data/cars";
import { BrandPageContent } from "@/components/sections/BrandPageContent";

export default function XiaomiPage() {
  const brand = getBrandBySlug("xiaomi");

  if (!brand) {
    return null;
  }

  return <BrandPageContent brand={brand} cars={getCarsByBrand("xiaomi")} />;
}
