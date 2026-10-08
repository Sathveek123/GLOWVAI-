import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { storyData } from "@/config/story";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { brandValuesClaims } from "@/config/claims";
import { getAssetPath } from "@/lib/utils";
import { Camera, Lock, ArrowRight, ArrowDown, Sparkles, ShieldCheck, Store, FlaskConical, Users, Truck } from "lucide-react";

export const metadata = {
  title: `Our Story | ${BRAND_NAME}`,
  description: `How three founders in Andhra Pradesh built ${BRAND_NAME} to make personalised skincare affordable, transparent, and accessible.`,
  openGraph: {
    title: `Our Story | ${BRAND_NAME}`,
    description: `How three founders in Andhra Pradesh built ${BRAND_NAME} to make personalised skincare affordable, transparent, and accessible.`,
    url: `${siteConfig.url}/our-story`,
    siteName: BRAND_NAME,
    type: "website",
  },
};

export default function OurStoryPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      name: BRAND_NAME,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      description: siteConfig.description,
      foundingLocation: {
        "@type": "Place",
        name: "Andhra Pradesh, India",
      },
      founders: storyData.founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.role,
      })),
    },
  };

  const editorialValues = [
    { num: "01", title: brandValuesClaims.honestClaims.title, text: brandValuesClaims.honestClaims.text, verified: brandValuesClaims.honestClaims.verified },
    { num: "02", title: brandValuesClaims.privacyFirst.title, text: brandValuesClaims.privacyFirst.text, verified: brandValuesClaims.privacyFirst.verified },
    { num: "03", title: brandValuesClaims.pricedForRealLife.title, text: brandValuesClaims.pricedForRealLife.text, verified: brandValuesClaims.pricedForRealLife.verified },
    { num: "04", title: brandValuesClaims.madeForIndianSkin.title, text: brandValuesClaims.madeForIndianSkin.text, verified: brandValuesClaims.madeForIndianSkin.verified },
  ].filter((v) => v.verified === true);

  return (
    <div className="bg-white py-12 sm:py-20 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <Container size="md">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#0050FF] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900">Our story</li>
          </ol>
        </nav>

        {/* 1. HERO */}
        <div className="space-y-6 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="brand" size="md" className="bg-[#0050FF]/10 text-[#0050FF] border-[#0050FF]/20 px-3.5 py-1 font-bold">
            {storyData.eyebrow}
          </Badge>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 text-wrap-balance leading-[1.08]">
            The skincare aisle shouldn&apos;t feel like a <Accent>guessing</Accent> game.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {storyData.intro}
          </p>

          <div className="pt-2 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-[#0050FF]/10 flex items-center justify-center text-[#0050FF] animate-bounce">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 5-IMAGE ECOSYSTEM SHOWCASE ON OUR STORY */}
        <div className="mb-20 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              Inside GLOW VAI Formulation & Technology
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Built in Andhra Pradesh with cosmetic scientists, browser AI engineers, and local micro-hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Story Image 1: Lab Formulation Science */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src="/images/story-ai/lab.png"
                  alt="Cosmetic formulation lab science"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0050FF] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  1. Lab Formulations
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Lab Formulation Science</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean, small-batch formulation matrices tested for Indian humidity and UV protection.
              </p>
            </div>

            {/* Story Image 2: Sardhar Vision */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src="/images/founders/sardhar-musthafa.jpeg"
                  alt="Sardhar Musthafa Founder"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  2. Sardhar • Vision
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Dermatological Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bringing transparent, dermatologist-approved skincare to everyday Indian households.
              </p>
            </div>

            {/* Story Image 3: Rahimath Market Explorer */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src="/images/founders/rahimath.jpeg"
                  alt="Rahimath Market Explorer"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  3. Rahimath • Market
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Local Consumer Connection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understanding real consumer barrier needs across Andhra Pradesh and Telangana.
              </p>
            </div>

            {/* Story Image 4: Satvik Technologist */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src="/images/founders/nalla-satvik.jpg"
                  alt="Nalla Satvik Lead Technologist"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#0050FF] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  4. Satvik • Lead Tech
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">On-Device AI Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineered the private 30-second camera diagnostic scanner running strictly inside client browsers.
              </p>
            </div>

            {/* Story Image 5: 15-Min Express Delivery Hub */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 sm:col-span-2 lg:col-span-2">
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src="/images/home-ai/express_delivery.png"
                  alt="Express 15-minute delivery in Vijayawada"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  5. 15-Min Express Hubs
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Hyperlocal Vijayawada Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Micro-hubs store fresh monthly batches for 15-minute doorstep dispatch across Vijayawada.
              </p>
            </div>
          </div>
        </div>

        {/* 2. THE PROBLEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
          <div className="lg:col-span-5 bg-[#0050FF]/5 p-8 rounded-3xl border-l-4 border-[#0050FF] space-y-3">
            <blockquote className="font-display text-xl font-bold text-slate-900 leading-snug italic">
              &ldquo;Getting clear skin shouldn&apos;t require a chemistry degree or luxury prices.&rdquo;
            </blockquote>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {storyData.problem}
            </p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 pt-2">
              {storyData.turn}
            </h2>
          </div>
        </div>

        {/* 3. THE IDEA */}
        <div className="my-20 py-16 px-6 sm:px-12 bg-[#0050FF]/5 rounded-[40px] border border-[#0050FF]/20 text-center space-y-6 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight max-w-4xl mx-auto">
            What if the best tool for understanding your skin was already in your <span className="text-[#0050FF]">pocket?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {storyData.origin}
          </p>
        </div>

        {/* 4. CLOSING CTA */}
        <div className="pt-8 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900">
            {storyData.signoff}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/face-analysis">
              <Button variant="primary" size="lg" className="bg-[#0050FF] hover:bg-[#003CD6] text-white font-bold h-[52px] px-8 rounded-2xl shadow-md text-xs">
                <Camera className="w-5 h-5" />
                <span>Start Free Face Scan</span>
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="h-[52px] px-8 rounded-2xl border-slate-300 font-bold text-xs text-slate-800">
                <span>Shop Routine Products</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
