"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accent } from "@/components/ui/Accent";
import { bestsellerProducts } from "@/config/content";
import { trustStripClaimsList } from "@/config/claims";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import {
  ScanFace,
  Lock,
  ArrowRight,
  Droplets,
  Sparkles,
  Sun,
  Shield,
  Trash2,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

export function FaceAnalysisFeature() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const isFastDeliveryVerified = trustStripClaimsList.find((c) => c.id === "fastDelivery")?.verified ?? false;
  const sampleProds = bestsellerProducts.slice(0, 2);

  // IntersectionObserver for ScoreRing and ScoreBar animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // SVG Score Ring Constants (Overall Sample Score: 76)
  const sampleOverall = 76;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = isVisible
    ? circumference - (sampleOverall / 100) * circumference
    : circumference;

  return (
    <section
      id="face-scan"
      aria-labelledby="scan-title"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white relative overflow-hidden text-ink"
    >
      {/* Background Organic Sky Mist SVG Bleeding Off Right Edge */}
      <div className="absolute top-12 right-[-5%] w-[55%] h-[85%] bg-skymist/50 rounded-l-[140px] pointer-events-none -z-10 hidden lg:block" />

      <Container>
        {/* 2-Column Asymmetric Main Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Stepper & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-1.5 text-eyebrow text-brand font-semibold uppercase tracking-wider">
              <ScanFace className="w-4 h-4 text-brand shrink-0" />
              <span>Free face scan</span>
            </div>

            <h2 id="scan-title" className="font-display text-h2-section text-ink text-wrap-balance leading-tight max-w-[14ch]">
              No quiz. Just a <Accent>selfie</Accent> and 30 seconds.
            </h2>

            <p className="text-body-lg text-ink-muted leading-relaxed max-w-[50ch]">
              We look at hydration, texture, tone and clarity, then show you what your skin is actually asking for.
            </p>

            {/* Stepper (<ol>) with 2px Dotted Line */}
            <ol className="relative pl-6 space-y-6 border-l-2 border-dashed border-brand/30 my-6">
              <li className="relative group">
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-brand text-brand font-display font-extrabold text-xs flex items-center justify-center shadow-xs">
                  1
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-lg text-ink">Scan</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Open your camera in good light. No filters, no makeup needed.
                  </p>
                </div>
              </li>

              <li className="relative group">
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-brand text-brand font-display font-extrabold text-xs flex items-center justify-center shadow-xs">
                  2
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-lg text-ink">Score</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Get an instant breakdown across four skin markers.
                  </p>
                </div>
              </li>

              <li className="relative group">
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-brand text-brand font-display font-extrabold text-xs flex items-center justify-center shadow-xs">
                  3
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-lg text-ink">Shop what fits</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    See products picked for your scores
                    {isFastDeliveryVerified && " at your door in about 15 minutes"}.
                  </p>
                </div>
              </li>
            </ol>

            {/* CTA Row & Privacy Line */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/face-analysis" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto h-[52px] gap-2 shadow-coral-glow text-button-label">
                    <ScanFace className="w-5 h-5 text-ink shrink-0" />
                    <span>Start free scan</span>
                  </Button>
                </Link>

                <a
                  href="#what-we-check"
                  className="text-xs font-bold text-ink hover:text-brand transition-colors text-center py-3 px-4 underline"
                >
                  How the scan works
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-muted pt-1">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>We never store your photo. Only your score is saved, and only with your consent.</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Phone Mockup Composition */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            
            {/* Butter Yellow Circle Peeking at Top-Right + 3 Coral Dots */}
            <div className="absolute -top-4 right-6 w-24 h-24 rounded-full bg-yellow opacity-80 pointer-events-none z-0" />
            <div className="absolute top-2 right-12 flex gap-1.5 z-0">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-coral opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-coral opacity-60" />
            </div>

            {/* Tiny Floating Chip Near Top-Left */}
            <div className="absolute top-6 left-2 sm:left-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-card border border-ink/10 text-[10px] font-bold text-brand flex items-center gap-1.5 z-30">
              <Sparkles className="w-3.5 h-3.5 text-yellow fill-yellow" />
              <span>4 markers checked</span>
            </div>

            {/* PhoneFrame (300px wide, 19.5:9 aspect, 36px radius, 8px Ink bezel, tilted -3deg) */}
            <div
              className="relative w-[290px] sm:w-[310px] aspect-[19.5/9] rounded-[36px] bg-ink p-2 shadow-2xl transform -rotate-3 transition-transform duration-500 hover:rotate-0 z-10"
              style={{ height: "auto" }}
            >
              {/* Screen Inner Wrapper */}
              <div className="w-full h-full bg-white rounded-[28px] p-4 space-y-3 overflow-hidden text-ink relative">
                
                {/* Screen Notch Pill */}
                <div className="w-20 h-3.5 bg-ink rounded-full mx-auto mb-2 shrink-0" />

                {/* Visually Hidden Screen Reader Summary */}
                <div className="sr-only">
                  Example report: overall score 76, hydration 82, texture 64, tone 78, clarity 80. This is a sample, not a real result.
                </div>

                {/* Sample Report Preview Header */}
                <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                  <div>
                    <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Your skin report</span>
                    <span className="text-[10px] font-bold text-ink">{new Date().toLocaleDateString()}</span>
                  </div>
                  <span className="text-[9px] font-bold bg-yellow text-ink px-2 py-0.5 rounded-full border border-yellow-600/20">
                    SAMPLE REPORT
                  </span>
                </div>

                {/* SVG Score Ring (120px) */}
                <div className="flex flex-col items-center justify-center space-y-1 py-1">
                  <div className="relative w-24 h-24 flex items-center justify-center" role="img" aria-label="Overall skin score 76 out of 100">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        className="text-skymist stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        className="text-brand stroke-current transition-all duration-1000 ease-out motion-reduce:transition-none"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute font-display text-3xl font-extrabold text-brand tabular-nums">
                      {sampleOverall}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-bold text-emerald-800 bg-mint px-2.5 py-0.5 rounded-full inline-block">
                    Balanced
                  </span>
                </div>

                {/* 4 Sub-Score Progress Bars */}
                <div className="space-y-1.5 pt-1 border-t border-ink/10">
                  {[
                    { name: "Hydration", score: 82, color: "bg-brand" },
                    { name: "Texture", score: 64, color: "bg-coral" },
                    { name: "Tone", score: 78, color: "bg-yellow" },
                    { name: "Clarity", score: 80, color: "bg-brand" },
                  ].map((s, idx) => (
                    <div key={s.name} className="space-y-0.5">
                      <div className="flex justify-between text-[10px] font-semibold text-ink">
                        <span>{s.name}</span>
                        <span className="font-bold">{s.score}</span>
                      </div>
                      <div className="w-full h-2 bg-skymist rounded-full overflow-hidden" role="img" aria-label={`${s.name} score ${s.score} out of 100`}>
                        <div
                          className={`h-full rounded-full ${s.color} transition-all duration-700 ease-out motion-reduce:transition-none`}
                          style={{
                            width: isVisible ? `${s.score}%` : "0%",
                            transitionDelay: `${idx * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plain-Language Summary Line */}
                <p className="text-[10px] text-ink-muted leading-tight pt-1">
                  Your skin is holding water well. Texture needs a little help.
                </p>

                {/* Two Sample Product Rows */}
                <div className="border-t border-ink/10 pt-2 space-y-1.5">
                  <span className="text-[9px] font-bold text-ink uppercase tracking-wider block">Recommended Routine:</span>
                  {sampleProds.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-1.5 rounded-xl border border-ink/10 bg-skymist/30"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white shrink-0 border border-ink/10">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[10px] text-ink truncate">{prod.name}</p>
                          <p className="text-[9px] text-brand font-bold">{formatPrice(prod.price)}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-ink bg-white px-2 py-0.5 rounded-md border border-ink/10" aria-hidden="true">
                        Add
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Overlapping Product Recommendation Card (Bottom-Left, Tilted +2deg, Floating) */}
            <div className="absolute bottom-2 left-0 sm:left-4 bg-white p-3 rounded-2xl shadow-lg border border-ink/10 max-w-[200px] transform rotate-2 animate-float z-20 hidden sm:flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-skymist relative overflow-hidden shrink-0 border border-ink/10">
                <Image src={sampleProds[0].image} alt={sampleProds[0].name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-ink truncate">{sampleProds[0].name}</p>
                <p className="text-[9px] text-coral font-semibold">Matched for Texture score 64</p>
              </div>
            </div>

          </div>

        </div>

        {/* "What We Look At" Row (id="what-we-check", Full Container Width) */}
        <div id="what-we-check" className="pt-16 sm:pt-24 space-y-6">
          <div className="space-y-1">
            <span className="text-eyebrow text-brand font-semibold uppercase tracking-wider block">
              What the scan checks
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
              Four skin markers analyzed in 30 seconds
            </h3>
          </div>

          {/* Asymmetric Tiles (widths 3/3/3/3 desktop, mobile scroll-snap) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-scrollbar overflow-x-auto snap-x snap-mandatory flex-nowrap sm:flex-wrap">
            <div className="bg-skymist/70 p-5 rounded-3xl border border-brand/15 space-y-2 snap-center shrink-0 w-[78%] sm:w-auto">
              <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-brand border border-ink/10">
                <Droplets className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-lg text-ink">Hydration</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                How well your skin holds water.
              </p>
            </div>

            <div className="bg-blush/60 p-5 rounded-3xl border border-coral/15 space-y-2 snap-center shrink-0 w-[78%] sm:w-auto transform sm:translate-y-2">
              <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-coral border border-ink/10">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-lg text-ink">Texture</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Surface smoothness and pore visibility.
              </p>
            </div>

            <div className="bg-mint/60 p-5 rounded-3xl border border-emerald-300/30 space-y-2 snap-center shrink-0 w-[78%] sm:w-auto">
              <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-emerald-700 border border-ink/10">
                <Sun className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-lg text-ink">Tone</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Evenness and sun-induced discoloration.
              </p>
            </div>

            <div className="bg-yellow/30 p-5 rounded-3xl border border-yellow-500/30 space-y-2 snap-center shrink-0 w-[78%] sm:w-auto transform sm:translate-y-2">
              <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-ink border border-ink/10">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-lg text-ink">Clarity</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Active redness and calm barrier health.
              </p>
            </div>
          </div>
        </div>

        {/* Trust & Consent Mini Row */}
        <div className="pt-10 border-t border-ink/10 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              <Lock className="w-3.5 h-3.5 text-brand shrink-0" />
              <span>Photo stays on your phone</span>
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Saved only with your consent</span>
            </span>
            {siteConfig.supportEmail && (
              <span className="flex items-center gap-1.5 font-semibold text-ink">
                <Trash2 className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>Delete your data anytime ({siteConfig.supportEmail})</span>
              </span>
            )}
          </div>

          <Link href="/privacy" className="text-brand font-bold underline hover:text-brand-dark">
            Read the privacy policy
          </Link>
        </div>

        {/* Required Medical Disclaimer Caption */}
        <p className="text-[11px] text-ink-muted/70 text-center pt-4">
          Cosmetic skin insights, not medical advice. Lighting and camera quality affect results.
        </p>

      </Container>
    </section>
  );
}

