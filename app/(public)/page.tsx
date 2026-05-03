import { FeaturedCarsSection } from "@/components/sections/FeaturedCarsSection";
import { FinancingCTA, ServiceCTA } from "@/components/sections/CtaSections";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCarsSection />
      <WhyChooseUsSection />
      <StatsSection />
      <FinancingCTA />
      <TestimonialsSection />
      <ServiceCTA />
    </>
  );
}
