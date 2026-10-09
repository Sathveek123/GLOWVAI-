import React from "react";
import Metadata from "next";
import { Container } from "@/components/ui/Container";
import { QuickDeliveryExplainer } from "@/components/sections/QuickDeliveryExplainer";
import { Zap, Clock, ShieldCheck, MapPin, PackageCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "15-Minute Express Dark Store Delivery | GLOW VAI",
  description: "Learn how GLOW VAI delivers fresh skincare formulations in under 15 minutes using cold-chain neighborhood micro-hubs across Vijayawada & Andhra Pradesh.",
};

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12 sm:py-20">
      <Container>
        {/* Header Hero */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-extrabold text-[#0050FF] uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200 inline-block">
            ⚡ Quick-Commerce Dark Store Logistics
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
            Fresh Skincare at Your Doorstep in <span className="text-[#0050FF]">~15 Minutes</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            GLOW VAI operates hyper-local temperature-controlled micro-hubs stocked with Minimalist, The Derma Co, and custom AI formulation routines.
          </p>
        </div>

        {/* 3 Delivery Promises */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0050FF] flex items-center justify-center border border-blue-100">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-slate-900">15-Minute Dispatch</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Orders are picked, packed into temperature-safe tamper-proof boxes, and dispatched with dedicated electric riders in seconds.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-slate-900">Cold-Chain Preserved</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Active ingredients like Vitamin C, Niacinamide, and Retinol degrade under high temperatures. Our stores remain at a strict 4°C to 18°C.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-slate-900">Hyper-Local Micro Hubs</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our dark stores are strategically placed within a 3km radius of key residential sectors in Vijayawada & Visakhapatnam.
            </p>
          </div>
        </div>

        {/* Live Delivery Explainer & Pincode Checker Component */}
        <QuickDeliveryExplainer />

        {/* FAQ Quick CTA */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-4 max-w-2xl mx-auto my-12">
          <h2 className="font-display font-bold text-2xl text-slate-900">Have questions about your active order?</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Reach out directly to our Vijayawada logistics team or start a free AI face scan while your order is prepared.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/face-analysis">
              <Button variant="primary" size="md" className="bg-[#0050FF] text-white font-bold">
                Start Free Face Scan
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="md" className="text-slate-700 font-bold">
                Contact Customer Care
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
