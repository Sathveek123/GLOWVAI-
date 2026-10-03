import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Accent";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { storyData } from "@/config/story";
import { assetConfig } from "@/config/assets";
import { ArrowRight } from "lucide-react";

export function WhyWeStarted() {
  // Filter timeline rows: hide any row where happened is false
  const activeTimelineRows = storyData.timeline.filter((row) => row.happened === true);
  const showTimelineCard = activeTimelineRows.length >= 2;

  return (
    <section className="py-16 sm:py-28 bg-white border-t border-ink/10 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols desktop): Narrative & Pull-Quote */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-eyebrow text-brand font-semibold tracking-wider uppercase block">
              Why we started
            </span>

            <h2 className="font-display font-semibold text-h2-section text-ink text-wrap-balance leading-[1.08]">
              We figured there had to be an easier place to start. What if the best tool was in your <Accent>pocket?</Accent>
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
              {storyData.problem}
            </p>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
              {storyData.origin}
            </p>

            {/* Thin Coral Rule (2px high, 48px wide) above Pull-Quote */}
            <div className="pt-2 space-y-3">
              <div className="w-12 h-[2px] bg-coral rounded-full" />
              <blockquote className="font-display text-xl sm:text-2xl font-semibold text-ink leading-snug">
                &ldquo;What if the best tool for understanding your skin was already in your pocket?&rdquo;
              </blockquote>
            </div>

            <div className="pt-2">
              <Link href="/our-story">
                <Button variant="primary" size="md" className="gap-2 shadow-coral-glow text-button-label">
                  <span>Read our full story</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols desktop): Layered Collage & Timeline Card */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/12]">
              
              {/* Organic Sky Mist Backdrop Shape */}
              <div className="absolute inset-0 bg-skymist/70 rounded-[40px] transform -rotate-2 border border-brand/10" />

              {/* Butter Yellow Circle (80px) behind top-right frame */}
              <div className="absolute top-2 right-2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow opacity-85 z-0" />

              {/* Frame 1: Sardhar Musthafa (Founder & Vision) */}
              <div className="absolute top-2 left-2 sm:left-4 w-[52%] sm:w-[50%] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-[6px] border-white transform -rotate-2 bg-white z-10 group">
                <PlaceholderImage
                  src={assetConfig.story.teamAtDesk.src}
                  alt="SK Sardhar Musthafa - Founder"
                  caption={assetConfig.story.teamAtDesk.caption}
                  objectPosition="object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-2.5 text-white z-20">
                  <p className="text-[11px] font-bold leading-tight">SK Sardhar Musthafa</p>
                  <p className="text-[9px] text-yellow font-semibold">Founder & Vision</p>
                </div>
              </div>

              {/* Frame 2: Nalla Satvik (Lead Technologist) */}
              <div className="absolute top-6 right-2 sm:right-4 w-[48%] sm:w-[46%] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-[6px] border-white transform rotate-3 bg-white z-20 group">
                <PlaceholderImage
                  src={assetConfig.story.workingMoment.src}
                  alt="Nalla Satvik - Lead Technologist"
                  caption={assetConfig.story.workingMoment.caption}
                  objectPosition="object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-2.5 text-white z-20">
                  <p className="text-[11px] font-bold leading-tight">Nalla Satvik</p>
                  <p className="text-[9px] text-cyan-300 font-semibold">Lead Technologist</p>
                </div>
              </div>

              {/* Frame 3: Rahimath (Market Explorer) - Positioned at object-top so face is 100% visible */}
              <div className="absolute bottom-2 left-1/3 w-[46%] sm:w-[44%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white transform -rotate-3 bg-white z-30 group">
                <PlaceholderImage
                  src={assetConfig.story.productCloseUp.src}
                  alt="Rahimath - Market Explorer"
                  caption={assetConfig.story.productCloseUp.caption}
                  objectPosition="object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-2.5 text-white z-20">
                  <p className="text-[11px] font-bold leading-tight">Rahimath</p>
                  <p className="text-[9px] text-coral-light font-semibold">Market Explorer</p>
                </div>
              </div>

              {/* Timeline Card Overlay (Overlapping bottom-left, hidden if < 2 rows pass) */}
              {showTimelineCard && (
                <div className="absolute -bottom-6 left-2 sm:left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card border border-ink/10 max-w-[260px] w-full space-y-2 z-20">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider block border-b border-ink/10 pb-1">
                    Timeline
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {activeTimelineRows.map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                          <span className="font-bold text-ink truncate">{row.label}</span>
                        </div>
                        {row.date && row.date.trim() !== "" && (
                          <span className="text-ink-muted text-[10px] shrink-0">{row.date}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
