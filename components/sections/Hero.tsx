import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Accent";
import { HeroVisual } from "./HeroVisual";
import { heroContent } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Sparkles, ArrowRight, Zap, MapPin, ShieldCheck, Lock, Clock, Star, Users } from "lucide-react";

interface HeroProps {
  city?: string;
}

export function Hero({ city = "Hyderabad" }: HeroProps) {
  // Real ratings and customer counts go here ONLY when verified before launch.
  // If siteConfig.rating or siteConfig.customerCount is empty, they are automatically hidden.
  const hasVerifiedRating = Boolean(siteConfig.rating && siteConfig.rating.trim());
  const hasVerifiedCustomerCount = Boolean(siteConfig.customerCount && siteConfig.customerCount.trim());

  return (
    <section className="relative bg-white pt-6 sm:pt-8 pb-8 sm:pb-12 overflow-hidden flex flex-col justify-center min-h-[calc(100svh-120px)] max-h-[850px]">
      {/* Background Subtle Soft Blurs */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-skymist/50 rounded-blob blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-blush/30 rounded-blob blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column - Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left max-w-2xl">
            
            {/* Eyebrow: Blue pill + plain text location with pin icon (no second pill) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
              <span className="text-eyebrow bg-brand text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 font-bold">
                <Zap className="w-3 h-3 text-yellow fill-yellow shrink-0" />
                <span>15-minute doorstep express</span>
              </span>
              <span className="text-ink-muted font-medium flex items-center gap-1 text-xs sm:text-sm">
                <MapPin className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>Delivering to {city}</span>
              </span>
            </div>

            {/* Headline with Bricolage Grotesque & Instrument Serif Accent */}
            <h1 className="font-display text-hero-display text-ink text-wrap-balance leading-[1.08] max-w-[15ch]">
              Skincare that <Accent underline>knows</Accent> your face. At your door in 15.
            </h1>

            {/* Supporting Line */}
            <p className="text-body-lg text-ink-muted max-w-[52ch] font-normal leading-relaxed">
              {heroContent.subheadline}
            </p>

            {/* Action Buttons Row - aligned height 52px, 2px focus ring, hover lift 2px */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link href="/face-analysis" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto h-[52px] flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-ink font-bold shadow-coral-glow transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                >
                  <Sparkles className="w-5 h-5 text-ink shrink-0" />
                  <span>{heroContent.primaryCTA}</span>
                </Button>
              </Link>

              <Link href="/shop" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-[52px] flex items-center justify-center gap-2 text-ink font-semibold border-2 border-ink/15 hover:bg-ink/5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span>{heroContent.secondaryCTA}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
              </Link>
            </div>

            {/* Proof Row: Displays provable claims & verified numbers only */}
            <div className="pt-3 border-t border-ink/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-ink font-medium">
              {hasVerifiedRating && (
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow fill-yellow shrink-0" />
                  <span className="font-bold text-ink">{siteConfig.rating}</span>
                </div>
              )}

              {hasVerifiedCustomerCount && (
                <div className="flex items-center gap-1.5 text-ink-muted">
                  <Users className="w-4 h-4 text-brand shrink-0" />
                  <span className="font-semibold text-ink">{siteConfig.customerCount}</span>
                </div>
              )}

              {/* Default Provable Claims */}
              <div className="flex items-center gap-1.5 text-ink-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-ink">Free scan</span>
              </div>

              <div className="flex items-center gap-1.5 text-ink-muted">
                <Lock className="w-4 h-4 text-brand shrink-0" />
                <span className="font-semibold text-ink">Photo never stored</span>
              </div>

              <div className="flex items-center gap-1.5 text-ink-muted">
                <Clock className="w-4 h-4 text-coral shrink-0" />
                <span className="font-semibold text-ink">Delivered in ~15 min</span>
              </div>
            </div>
          </div>

          {/* Right Column - 6-Layer Tactile Visual Stack (5 cols) max-height 600px */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroVisual city={city} />
          </div>

        </div>
      </Container>
    </section>
  );
}

