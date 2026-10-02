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

              {/* Frame 1: Team at desk (-2deg rotation, 6px white border, soft shadow) */}
              <div className="absolute top-4 left-4 w-[56%] h-[68%] rounded-2xl overflow-hidden shadow-lg border-[6px] border-white transform -rotate-2 bg-white z-10">
                <PlaceholderImage
                  src={assetConfig.story.teamAtDesk.src}
                  alt="Team of three founders"
                  caption={assetConfig.story.teamAtDesk.caption}
                />
              </div>

              {/* Frame 2: Working moment (3deg rotation, 6px white border, soft shadow) */}
              <div className="absolute top-8 right-4 w-[46%] h-[56%] rounded-2xl overflow-hidden shadow-md border-[6px] border-white transform rotate-3 bg-white z-10">
                <PlaceholderImage
                  src={assetConfig.story.workingMoment.src}
                  alt="Testing face scan"
                  caption={assetConfig.story.workingMoment.caption}
                />
              </div>

              {/* Frame 3: Product close-up (-3deg rotation, 6px white border, soft shadow) */}
              <div className="absolute bottom-4 right-12 w-[38%] h-[42%] rounded-xl overflow-hidden shadow-md border-[6px] border-white transform -rotate-3 bg-white hidden sm:block z-10">
                <PlaceholderImage
                  src={assetConfig.story.productCloseUp.src}
                  alt="Glow Vai serum close-up"
                  caption={assetConfig.story.productCloseUp.caption}
                />
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
