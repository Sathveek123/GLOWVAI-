"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Gift, Store, Truck, Sparkles, ArrowRight, Share2, ShieldCheck, Users } from "lucide-react";

export function ReferralAndVendorSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200 text-slate-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Card 1: Referral Program */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#0050FF]/10 text-[#0050FF] px-3 py-1 rounded-full text-xs font-bold border border-[#0050FF]/20">
                <Gift className="w-3.5 h-3.5" />
                <span>GLOW VAI Referral Program</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                Invite Friends & <span className="text-[#0050FF]">Earn Rewards</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Share your skin scan link with friends in Vijayawada. When they complete their first AI scan & routine order, you both get ₹100 instant wallet cash.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="font-display font-extrabold text-xl text-[#0050FF] block">₹100</span>
                  <span className="text-[11px] font-semibold text-slate-600">Per Friend Scan</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="font-display font-extrabold text-xl text-emerald-600 block">Instant</span>
                  <span className="text-[11px] font-semibold text-slate-600">WhatsApp Payout</span>
                </div>
              </div>
            </div>

            <div className="pt-2 relative z-10">
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

          {/* Card 2: Vendor & Express Delivery Network */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                <Store className="w-3.5 h-3.5" />
                <span>Authorized Vendor Network</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                15-Min Delivery in <span className="text-emerald-600">Vijayawada</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Powered by our hyper-local authorized pharmacy & cosmetics partner hubs across Vijayawada. Fresh batch products from Minimalist & The Derma Co delivered in 15 minutes.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 block">15 Min Delivery</span>
                    <span className="text-[10px] text-slate-500">Fast local dispatch</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#0050FF] shrink-0" />
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 block">100% Genuine</span>
                    <span className="text-[10px] text-slate-500">Direct from brand</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 relative z-10">
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
