import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FaceAnalysisFeature } from "@/components/sections/FaceAnalysisFeature";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { WhyWeStarted } from "@/components/sections/WhyWeStarted";
import { BrandValues } from "@/components/sections/BrandValues";
import { QuickDeliveryExplainer } from "@/components/sections/QuickDeliveryExplainer";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { JournalTeaser } from "@/components/sections/JournalTeaser";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTABanner } from "@/components/sections/FinalCTABanner";
import { getLocationFromIP } from "@/lib/location";

export default async function HomePage() {
  const locationData = await getLocationFromIP();

  return (
    <>
      {/* Section 1: Hero */}
      <Hero city={locationData.city} />

      {/* Section 2: Trust Strip */}
      <TrustStrip />

      {/* Section 3: Face Analysis Feature */}
      <FaceAnalysisFeature />

      {/* Section 4: Bestsellers */}
      <Bestsellers />

      {/* Section 5: Shop By Concern */}
      <ShopByConcern />

      {/* Section 6: Why We Started (Founder Story) */}
      <WhyWeStarted />

      {/* Section 7: Brand Values */}
      <BrandValues />

      {/* Section 8: Quick Delivery Explainer */}
      <QuickDeliveryExplainer />

      {/* Section 9: Testimonials & UGC Grid */}
      <TestimonialsGrid />

      {/* Section 10: Journal Teaser */}
      <JournalTeaser />

      {/* Section 11: FAQ */}
      <FAQSection />

      {/* Section 12: Final CTA Banner & Newsletter */}
      <FinalCTABanner />
    </>
  );
}
