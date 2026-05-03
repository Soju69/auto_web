import { getBrandBySlug, getCarsByBrand } from "@/data/cars";
import { BrandPageContent } from "@/components/sections/BrandPageContent";

export default function KiaPage() {
  const brand = getBrandBySlug("kia");

  if (!brand) {
    return null;
  }

  return <BrandPageContent brand={brand} cars={getCarsByBrand("kia")} />;
}
