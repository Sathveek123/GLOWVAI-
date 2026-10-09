"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { storyData, Founder, TimelineEvent } from "@/config/story";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  MapPin, 
  UserCheck, 
  Truck, 
  Camera, 
  ChevronRight,
  BookOpen
} from "lucide-react";

export default function OurStoryClient() {
  const [selectedFounderId, setSelectedFounderId] = useState<string | null>(null);

  const selectedFounder = storyData.founders.find((f) => f.id === selectedFounderId);

  // Scroll smoothly to top when switching view
  const handleSelectFounder = (id: string) => {
    setSelectedFounderId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToStory = () => {
    setSelectedFounderId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">

      {/* ------------------------------------------------------------- */}
      {/* 1. DETAILED INDIVIDUAL FOUNDER STORY VIEW (Bright Theme)       */}
      {/* ------------------------------------------------------------- */}
      {selectedFounder ? (
        <div className="py-10 sm:py-16 bg-[#F8FAFC] text-slate-900 animate-fadeIn">
          <Container size="md">
            
            {/* Top Navigation Back Button */}
            <div className="mb-8">
              <button
                onClick={handleBackToStory}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-blue-50 text-[#0050FF] font-bold text-sm transition-all border-2 border-[#0050FF]/30 shadow-md group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Founding Team & Story</span>
              </button>
            </div>

            {/* Founder Profile Hero Header (Bright Card) */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-blue-100 shadow-xl mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                
                {/* Founder Photo with face-centered positioning */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#0050FF] shadow-lg shrink-0 bg-blue-50">
                  <Image
                    src={selectedFounder.image}
                    alt={selectedFounder.name}
                    fill
                    className={`object-cover ${selectedFounder.id === "rahimath" ? "object-top" : "object-center"}`}
                    priority
                  />
                </div>

                {/* Founder Info */}
                <div className="space-y-3 text-center md:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0050FF]/10 border border-[#0050FF]/30 text-[#0050FF] text-xs font-extrabold uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{selectedFounder.role}</span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
                    {selectedFounder.name}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#0050FF]" />
                      {selectedFounder.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      GLOW VAI Founding Partner
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic pt-1 max-w-xl">
                    &ldquo;{selectedFounder.tagline}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Story Header */}
            <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0050FF]">
                FOUNDER PERSONAL JOURNEY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                {selectedFounder.storyTitle}
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                {selectedFounder.storySubtitle}
              </p>
            </div>

            {/* Structured Story Sections (Bright Cards) */}
            <div className="space-y-8 max-w-3xl mx-auto">
              {selectedFounder.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-[#0050FF]/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0050FF] text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                      {sec.title}
                    </h3>
                  </div>

                  <div className="space-y-3 pl-0 sm:pl-11 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Back Button */}
            <div className="mt-12 text-center pt-8 border-t border-slate-200">
              <button
                onClick={handleBackToStory}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0050FF] hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-[#0050FF]/40 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to GLOW VAI Founding Team</span>
              </button>
            </div>

          </Container>
        </div>
      ) : (

        /* ------------------------------------------------------------- */
        /* 2. MAIN OUR STORY PAGE VIEW (Bright Theme)                   */
        /* ------------------------------------------------------------- */
        <div className="py-12 sm:py-20">
          <Container size="md">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8 text-xs text-slate-500">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#0050FF] transition-colors font-medium">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="font-semibold text-slate-900">Our story & Quick Commerce Dark Store</li>
              </ol>
            </nav>

            {/* 1. HERO SECTION */}
            <div className="space-y-6 text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0050FF]/10 border border-[#0050FF]/20 text-[#0050FF] text-xs font-extrabold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>GLOW VAI QUICK-COMMERCE BEAUTY DARK STORE</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1]">
                We are not just a store. We are a <Accent>15-Minute Dark Store</Accent> powered by AI.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                GLOW VAI combines 30-second on-device dermatological skin analysis with instant hyperlocal dark store fulfillment across Vijayawada and Andhra Pradesh.
              </p>
            </div>

            {/* QUICK COMMERCE HIGHLIGHT BANNER (Bright Blue Gradient) */}
            <div className="bg-gradient-to-r from-[#0050FF] via-blue-600 to-indigo-600 p-8 sm:p-10 rounded-3xl text-white shadow-2xl mb-20 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white text-[#0050FF] flex items-center justify-center mx-auto shadow-md">
                    <Camera className="w-5 h-5 text-[#0050FF]" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white">AI Skin Scan</h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Evaluates hydration, pore depth & radiance score in 30 seconds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center mx-auto shadow-md">
                    <Zap className="w-5 h-5 text-slate-900" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white">Vijayawada Dark Store</h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Hyperlocal micro-hubs packed with Minimalist & Derma Co routines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mx-auto shadow-md">
                    <Truck className="w-5 h-5 text-slate-900" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white">15-Min Doorstep Express</h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Direct courier dispatch to your doorstep inside Vijayawada.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. INTERACTIVE FOUNDING TEAM CARDS */}
            <div className="mb-28 space-y-10">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <Badge variant="brand" size="md">
                  CLICK A FOUNDER TO READ THEIR STORY
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Meet Our Founders & Co-Founders
                </h2>
                <p className="text-sm text-slate-600">
                  Click on any founder card below to view their complete personal startup journey, setbacks, and technical milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {storyData.founders.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => handleSelectFounder(f.id)}
                    className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-[#0050FF] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      {/* Photo with face-focused positioning for Rahimath */}
                      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-blue-50 border border-slate-200 group-hover:scale-[1.02] transition-transform duration-500">
                        <Image
                          src={f.image}
                          alt={f.name}
                          fill
                          className={`object-cover ${f.id === "rahimath" ? "object-top" : "object-center"}`}
                        />
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                          {f.location}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 group-hover:text-[#0050FF] transition-colors">
                          {f.name}
                        </h3>
                        <p className="text-xs font-bold text-[#0050FF] uppercase tracking-wider">
                          {f.role}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3">
                          {f.bio}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-5 mt-4 border-t border-slate-100">
                      <button className="w-full py-2.5 px-4 rounded-xl bg-[#0050FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md">
                        <BookOpen className="w-4 h-4" />
                        <span>Read {f.name.split(" ")[0]}&apos;s Full Story</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. GLOW VAI STARTUP JOURNEY TIMELINE (2023 - 2026) */}
            <div className="mb-28 space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <Badge variant="skymist" size="md">
                  CHRONOLOGICAL MILESTONES (2023 - 2026)
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Glowvai: The Story Behind the Startup
                </h2>
                <p className="text-sm text-slate-600">
                  From a conversation between friends to building an AI beauty-tech quick commerce startup in Vijayawada.
                </p>
              </div>

              {/* Timeline Items */}
              <div className="relative border-l-2 border-[#0050FF]/30 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
                {storyData.timeline.map((evt, idx) => (
                  <div key={idx} className="relative group">

                    {/* Dot Icon */}
                    <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-4 ${evt.isKeyMilestone ? "bg-[#0050FF] border-blue-200 shadow-lg scale-125" : "bg-white border-[#0050FF]"}`} />

                    {/* Content Card */}
                    <div className={`p-6 rounded-2xl border transition-all ${evt.isKeyMilestone ? "bg-blue-50/70 border-[#0050FF]/40 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300"}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-display font-extrabold text-base sm:text-lg text-[#0050FF]">
                          {evt.period}
                        </span>
                        {evt.badge && (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#0050FF]/10 text-[#0050FF] uppercase tracking-wider">
                            {evt.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                        {evt.title}
                      </h3>

                      <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {evt.description.map((d, dIdx) => (
                          <p key={dIdx}>• {d}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. MISSION & QUICK COMMERCE COMMITMENT */}
            <div className="my-20 py-12 px-8 bg-[#0050FF] text-white rounded-3xl text-center space-y-4 shadow-2xl">
              <span className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                OUR PROMISE TO ANDHRA PRADESH
              </span>
              <p className="font-display text-xl sm:text-3xl font-extrabold max-w-2xl mx-auto leading-relaxed">
                Free AI skin checks for everyone with a smartphone, and instant 15-minute dark store delivery directly to your doorstep.
              </p>
              <p className="text-xs text-blue-100 font-medium pt-2">
                GLOW VAI Quick Commerce • Vijayawada Hub
              </p>
            </div>

            {/* 5. CLOSING CTA */}
            <div className="pt-4 text-center space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                Ready to experience GLOW VAI Quick-Commerce?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/face-analysis">
                  <Button variant="primary" size="lg" className="h-[52px] gap-2 shadow-coral-glow text-button-label bg-[#0050FF] hover:bg-blue-600">
                    <Camera className="w-5 h-5 text-white shrink-0" />
                    <span>Start Free AI Face Scan</span>
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="h-[52px] gap-2 text-button-label">
                    <span>Explore Skincare Products</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Button>
                </Link>
              </div>
            </div>

          </Container>
        </div>
      )}
    </div>
  );
}
