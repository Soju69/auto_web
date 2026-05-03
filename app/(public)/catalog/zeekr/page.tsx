import { getBrandBySlug, getCarsByBrand } from "@/data/cars";
import { BrandPageContent } from "@/components/sections/BrandPageContent";

export default function ZeekrPage() {
  const brand = getBrandBySlug("zeekr");

  if (!brand) {
    return null;
  }

  return <BrandPageContent brand={brand} cars={getCarsByBrand("zeekr")} />;
}
