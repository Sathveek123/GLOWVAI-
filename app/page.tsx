import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FaceAnalysisFeature } from "@/components/sections/FaceAnalysisFeature";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { WhyWeStarted } from "@/components/sections/WhyWeStarted";
import { BrandValues } from "@/components/sections/BrandValues";
import { QuickDeliveryExplainer } from "@/components/sections/QuickDeliveryExplainer";
import { ReferralAndVendorSection } from "@/components/sections/ReferralAndVendorSection";
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

      {/* Section 6: Referral Program & Vendor Network */}
      <ReferralAndVendorSection />

      {/* Section 7: Why We Started (Founder Story) */}
      <WhyWeStarted />

      {/* Section 8: Brand Values */}
      <BrandValues />

      {/* Section 9: Quick Delivery Explainer */}
      <QuickDeliveryExplainer />

      {/* Section 10: Testimonials & UGC Grid */}
      <TestimonialsGrid />

      {/* Section 11: Journal Teaser */}
      <JournalTeaser />

      {/* Section 12: FAQ */}
      <FAQSection />

      {/* Section 13: Final CTA Banner & Newsletter */}
      <FinalCTABanner />
    </>
  );
}
