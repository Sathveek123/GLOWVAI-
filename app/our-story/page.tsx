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
import { Camera, Lock, ArrowRight, ArrowDown } from "lucide-react";

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
  // Organization JSON-LD with founders as Person entries (name and jobTitle only, taken from FACTS)
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
    <div className="bg-white py-12 sm:py-20 text-ink">
      {/* Organization Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <Container size="md">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-ink">Our story</li>
          </ol>
        </nav>

        {/* 1. HERO */}
        <div className="space-y-6 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-eyebrow text-brand font-semibold tracking-wider uppercase block">
            {storyData.eyebrow}
          </span>
          <h1 className="font-display font-semibold text-h1-page text-ink text-wrap-balance leading-[1.08]">
            The skincare aisle shouldn&apos;t feel like a <Accent>guessing</Accent> game.
          </h1>
          <p className="text-body-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
            {storyData.intro}
          </p>

          {/* Animated Scroll Cue */}
          <div className="pt-2 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-skymist flex items-center justify-center text-brand animate-bounce motion-reduce:animate-none">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Formulation Studio & Skincare Brand Hero Photo Slot */}
        <div className="relative w-full aspect-[16/7] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mb-20 border-4 border-skymist bg-skymist group">
          <Image
            src={getAssetPath("/images/hero/skincare-studio-hero.jpg")}
            alt={`${BRAND_NAME} formulation studio and skincare collection`}
            fill
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-6 sm:p-8 text-white">
            <div>
              <span className="text-xs font-bold text-yellow uppercase tracking-widest block mb-1">Formulated in Andhra Pradesh</span>
              <p className="font-display text-xl sm:text-2xl font-bold">Smart skincare technology meets honest ingredients.</p>
            </div>
          </div>
        </div>

        {/* 2. THE PROBLEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
          <div className="lg:col-span-5 bg-skymist/40 p-8 rounded-3xl border-l-4 border-coral space-y-3">
            <div className="w-12 h-[2px] bg-coral rounded-full mb-2" />
            <blockquote className="font-display text-xl font-bold text-ink leading-snug italic">
              &ldquo;The skincare aisle shouldn&apos;t feel like a guessing game.&rdquo;
            </blockquote>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {storyData.problem}
            </p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink pt-2">
              {storyData.turn}
            </h2>
          </div>
        </div>

        {/* 3. THE IDEA */}
        <div className="my-20 py-16 px-6 sm:px-12 bg-skymist/30 rounded-[40px] border border-brand/15 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-skymist/50 pointer-events-none" />
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[4.5rem] font-semibold text-ink leading-tight max-w-4xl mx-auto">
            What if the best tool for understanding your skin was already in your <span className="text-brand">pocket?</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            {storyData.origin}
          </p>
        </div>

        {/* 4. HOW THE SCAN WORKS */}
        <div className="mb-24 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Badge variant="skymist" size="md">
              How it works
            </Badge>
            <h2 className="font-display text-h2-section text-ink">
              Three steps from selfie to routine
            </h2>
          </div>

          <div className="relative">
            {/* Dotted connector line on desktop */}
            <div className="hidden sm:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-brand/20 -translate-y-1/2 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white p-6 rounded-3xl border border-ink/10 space-y-2 text-center sm:text-left">
                <span className="font-display font-extrabold text-3xl text-brand">01</span>
                <h3 className="font-bold text-lg text-ink">Scan</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Your phone camera looks at texture, hydration, and visible concerns in 30 seconds.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-ink/10 space-y-2 text-center sm:text-left">
                <span className="font-display font-extrabold text-3xl text-coral">02</span>
                <h3 className="font-bold text-lg text-ink">Understand</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  You get a plain-language report breaking down your skin scores with zero jargon.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-ink/10 space-y-2 text-center sm:text-left">
                <span className="font-display font-extrabold text-3xl text-yellow">03</span>
                <h3 className="font-bold text-lg text-ink">Shop</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Get a matching routine suggestion delivered fast to fit an ordinary budget.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy line & Cosmetic note */}
          <div className="bg-skymist/40 p-4 rounded-2xl border border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand shrink-0" />
              <span className="font-semibold text-ink">Privacy guarantee: Your photo stays on your phone and is not stored.</span>
            </div>
            <span className="italic text-[11px] text-ink-muted">{storyData.cosmeticNote}</span>
          </div>
        </div>

        {/* 5. MEET THE THREE OF US (Staggered offsets on desktop: 0px, 32px, 16px) */}
        <div className="mb-28 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <Badge variant="brand" size="md">
              Founding Team
            </Badge>
            <h2 className="font-display text-h2-section text-ink">
              Meet the three of us
            </h2>
            <p className="text-sm text-ink-muted">
              Built in Andhra Pradesh with zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {storyData.founders.map((f, idx) => {
              // Stagger desktop offsets: 0px, 32px, 16px
              const desktopStagger = idx === 0 ? "lg:translate-y-0" : idx === 1 ? "lg:translate-y-8" : "lg:translate-y-4";

              return (
                <div
                  key={f.name}
                  className={`bg-white rounded-3xl p-6 border border-ink/10 shadow-xs hover:shadow-card transition-all space-y-4 ${desktopStagger}`}
                >
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-skymist border border-ink/10">
                    <PlaceholderImage
                      src={f.image}
                      alt={f.name}
                      caption={f.artDirectionNote}
                      objectPosition={f.name === "Rahimath" ? "object-top" : "object-center"}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl text-ink">{f.name}</h3>
                      {f.linkedin && f.linkedin.trim() !== "" && (
                        <a href={f.linkedin} target="_blank" rel="noreferrer" aria-label={`${f.name} LinkedIn`}>
                          <svg className="w-4 h-4 text-brand hover:text-coral transition-colors fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-xs font-bold text-brand uppercase tracking-wider">{f.role}</p>
                    <p className="text-xs text-ink-muted leading-relaxed pt-1.5">{f.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. WHAT WE STAND FOR (Horizontal editorial list with thin dividers) */}
        <div className="mb-24 space-y-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink text-center">
            What we stand for
          </h2>
          <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
            {editorialValues.map((v) => (
              <div key={v.num} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-brand">{v.num}</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink">{v.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted max-w-md leading-relaxed sm:text-right">
                  &ldquo;{v.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. MISSION BAND */}
        <div className="my-20 py-14 px-8 bg-brand text-white rounded-[40px] text-center space-y-4 shadow-xl">
          <span className="text-xs font-bold tracking-widest text-yellow uppercase">Our Mission</span>
          <p className="font-display text-xl sm:text-3xl font-extrabold max-w-2xl mx-auto leading-relaxed">
            Personalised skincare should be normal, not a luxury. We want a useful skin check to be free to try for anyone with a phone, and a routine that fits an <Accent className="text-yellow">ordinary</Accent> budget.
          </p>
          <p className="text-sm text-skymist font-medium pt-2">{storyData.tagline}</p>
        </div>

        {/* 8. CLOSING CTA */}
        <div className="pt-8 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink">
            {storyData.signoff}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/face-analysis">
              <Button variant="primary" size="lg" className="h-[52px] gap-2 shadow-coral-glow text-button-label">
                <Camera className="w-5 h-5 text-ink shrink-0" />
                <span>Start free scan</span>
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="h-[52px] gap-2 text-button-label">
                <span>Shop now</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </Link>
          </div>
          <p className="text-[11px] italic text-ink-muted">
            {storyData.cosmeticNote}
          </p>
        </div>

      </Container>
    </div>
  );
}
