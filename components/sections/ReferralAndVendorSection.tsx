"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Gift, Store, Truck, Sparkles, ArrowRight, Share2, ShieldCheck, Camera, CheckCircle2 } from "lucide-react";

export function ReferralAndVendorSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 text-slate-900">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0050FF]/10 text-[#0050FF] px-3.5 py-1 rounded-full text-xs font-bold border border-[#0050FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOW VAI Ecosystem</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            AI Scan. Local Vendors. <span className="text-[#0050FF]">15-Min Delivery.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From smart 30-second camera diagnostics to neighborhood pharmacy hubs in Vijayawada and referral rewards, experience a complete skincare ecosystem built for Indian weather.
          </p>
        </div>

        {/* 5 AI Images Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: AI Skin Scan */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:border-[#0050FF]/40 transition-all">
            <div className="space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/images/home-ai/ai_scan.png"
                  alt="AI skin diagnostic scan on smartphone"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0050FF] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  1. AI Camera Scan
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">1. Instant AI Diagnostics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates hydration depth, texture smoothness, tone radiance, and barrier defense in 30 seconds inside your browser.
              </p>
            </div>
            <Link href="/face-analysis" className="pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs font-bold border-slate-300">
                <Camera className="w-3.5 h-3.5 text-[#0050FF]" />
                <span>Try Free Camera Scan</span>
              </Button>
            </Link>
          </div>

          {/* Card 2: Skincare Products Shelf */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:border-[#0050FF]/40 transition-all">
            <div className="space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/images/home-ai/products_shelf.png"
                  alt="Authorized skincare routine products shelf"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  2. Authorized Actives
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">2. Minimalist & Derma Co</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Matched routines featuring Niacinamide, Salicylic Acid, Hyaluronic Acid, and Ceramides.
              </p>
            </div>
            <Link href="/shop" className="pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs font-bold border-slate-300">
                <Store className="w-3.5 h-3.5 text-[#0050FF]" />
                <span>Browse Products</span>
              </Button>
            </Link>
          </div>

          {/* Card 3: 15-Minute Express Delivery */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:border-[#0050FF]/40 transition-all">
            <div className="space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/images/home-ai/express_delivery.png"
                  alt="15-minute express doorstep delivery in Vijayawada"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  3. 15-Min Delivery
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">3. Express Doorstep Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dispatched from nearest neighborhood pharmacy hub directly to your door in Vijayawada.
              </p>
            </div>
            <Link href="/store" className="pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs font-bold border-slate-300">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Check Delivery Hubs</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 2-Column Promo Cards: Referral & Vendor Partner Stores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Card 4: Referral Rewards Program */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/images/home-ai/referral_rewards.png"
                  alt="GLOW VAI referral program rewards app"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0050FF] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  4. Referral Program
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#0050FF]/10 text-[#0050FF] px-3 py-1 rounded-full text-xs font-bold border border-[#0050FF]/20">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Referral Rewards Program</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Invite Friends & <span className="text-[#0050FF]">Earn ₹100 Wallet Cash</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Share your personal skin scan link with friends. When they complete their first AI scan and routine order, both of you earn instant ₹100 wallet credit!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="font-display font-extrabold text-xl text-[#0050FF] block">₹100</span>
                  <span className="text-[11px] font-semibold text-slate-600">Per Friend Referral</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="font-display font-extrabold text-xl text-emerald-600 block">Instant</span>
                  <span className="text-[11px] font-semibold text-slate-600">WhatsApp Reward</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://earn.glowvai.in/portal.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#0050FF] hover:bg-[#003CD6] text-white font-bold py-3.5 rounded-2xl shadow-md text-xs flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Join Referral Program (earn.glowvai.in)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Card 5: Vendor Partner Network Store */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/images/home-ai/vendor_store.png"
                  alt="Authorized vendor pharmacy partner store"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  5. Vendor Partner Stores
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <Store className="w-3.5 h-3.5" />
                  <span>Authorized Vendor Hub Network</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Authorized Stores in <span className="text-emerald-600">Vijayawada</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Powered by local authorized pharmacy & cosmetic hubs in Vijayawada. Fresh batch products dispatched straight to your doorstep in 15 minutes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 block">15 Min Express</span>
                    <span className="text-[10px] text-slate-500">Doorstep dispatch</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#0050FF] shrink-0" />
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 block">100% Genuine</span>
                    <span className="text-[10px] text-slate-500">Brand sealed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/store" className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-slate-300 hover:bg-slate-50 text-slate-800 font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4 text-[#0050FF]" />
                  <span>Explore Partner Stores & Products</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
