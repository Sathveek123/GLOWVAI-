"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { serviceablePincodes } from "@/config/serviceablePincodes";
import { deliveryStatsClaims, cityCoverageClaims, fastDeliveryClaim } from "@/config/claims";
import { Zap, MapPin, Search, CheckCircle2, AlertCircle, ShoppingBag, Box, Bike, Home } from "lucide-react";

export function QuickDeliveryExplainer() {
  const isFastDeliveryVerified = fastDeliveryClaim.verified;

  const deliverySteps = [
    { step: "01", title: "Order", desc: "Select routine or scan", icon: ShoppingBag },
    { step: "02", title: "Packed at a store", desc: "Cold-chain dark store", icon: Box },
    { step: "03", title: "Rider on the way", desc: "Dedicated electric bike", icon: Bike },
    {
      step: "04",
      title: "At your door",
      desc: isFastDeliveryVerified ? "Delivered in ~15 minutes" : "Doorstep delivery dispatch",
      icon: Home,
    },
  ];

  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "unavailable" | "invalid">("idle");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);

  // Demo loop countdown timer for delivery demo card
  const [demoCountdown, setDemoCountdown] = useState(14);
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoCountdown((prev) => (prev <= 1 ? 14 : prev - 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setStatus("invalid");
      return;
    }
    setStatus("checking");
    setTimeout(() => {
      if (serviceablePincodes.includes(pincode)) {
        setStatus("available");
      } else {
        setStatus("unavailable");
      }
    }, 300);
  };

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail && waitlistEmail.includes("@")) {
      setIsSubmittingWaitlist(true);
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail, pincode }),
      }).catch(() => {});
      setIsSubmittingWaitlist(false);
      setWaitlistSuccess(true);
    }
  };

  const verifiedStats = deliveryStatsClaims.filter((item) => item.verified === true);
  const verifiedCities = cityCoverageClaims.filter((item) => item.verified === true);

  return (
    <section id="delivery" className="py-16 sm:py-24 bg-brand text-white rounded-[40px] my-12 relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-widest text-yellow uppercase block">
            How it reaches you
          </span>
          <h2 className="font-display text-h2-section text-white text-wrap-balance">
            Order from your couch. Someone nearby <Accent className="text-yellow">brings</Accent> it over.
          </h2>
          <p className="text-body-lg text-skymist font-normal">
            We store fresh formulations in temperature-controlled neighborhood micro hubs for instant doorstep dispatch.
          </p>
        </div>

        {/* 4 Connected Steps with Dotted Route Line SVG */}
        <div className="relative mb-14">
          {/* Dotted Route Line SVG connecting steps on desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-1 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 4" fill="none">
              <path
                d="M 0 2 H 800"
                stroke="#FFD84D"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="opacity-60"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {deliverySteps.map((s) => {
              const Icon = s.icon;
              return (
                <ol
                  key={s.step}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 space-y-3 relative group hover:bg-white/15 transition-all list-none m-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-2xl text-yellow">
                      {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-white">{s.title}</h3>
                    <p className="text-xs text-skymist leading-relaxed">{s.desc}</p>
                  </div>
                </ol>
              );
            })}
          </div>
        </div>

        {/* Mini Delivery Map Demo Card & Pincode Checker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white text-ink rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Left (6 cols): Animated Mini Map Demo & Verified Stats */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live-feeling Mini Delivery Map Card with Ultra-Modern Animated Radar Scanner */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 rounded-3xl border border-blue-500/30 relative overflow-hidden space-y-4 shadow-2xl text-white">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-extrabold tracking-wider text-blue-200 uppercase">
                    Vijayawada Dark Store Dispatch #HYD-DS04
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    LIVE RADAR
                  </span>
                </div>
              </div>

              {/* Dynamic Radar Scanner Viewport */}
              <div className="relative w-full h-44 bg-slate-950/80 rounded-2xl border border-blue-400/20 overflow-hidden flex items-center justify-center">
                
                {/* Radar Grid Lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Radar Concentric Pulsing Rings */}
                <div className="absolute w-40 h-40 rounded-full border border-blue-500/30 animate-ping opacity-25" />
                <div className="absolute w-28 h-28 rounded-full border border-cyan-400/40" />
                <div className="absolute w-16 h-16 rounded-full border border-blue-400/50" />

                {/* Sweeping Radar Scanner Line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-full rounded-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(56,189,248,0.25)_360deg)]" />
                </div>

                {/* Animated Rider Delivery Vector Path */}
                <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 400 160">
                  {/* Outer Glow Path */}
                  <path
                    d="M 50 120 C 130 120, 160 40, 350 40"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="4"
                    className="opacity-40"
                  />
                  {/* Electric Dashed Pulse Path */}
                  <path
                    d="M 50 120 C 130 120, 160 40, 350 40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                    className="animate-pulse"
                  />
                </svg>

                {/* Micro-Hub Pin (Start Point) */}
                <div className="absolute left-4 bottom-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1.5 shadow-lg border border-blue-300/40 z-20">
                  <Box className="w-3.5 h-3.5 text-amber-300" />
                  <div>
                    <div className="leading-tight">Micro-Hub</div>
                    <div className="text-[8px] text-blue-200 font-medium">Dark Store #04</div>
                  </div>
                </div>

                {/* Animated Rider Icon Traveling along the route */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-slate-900 px-3 py-1.5 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 shadow-xl ring-4 ring-amber-400/30 animate-bounce z-20">
                  <Bike className="w-4 h-4 text-slate-900" />
                  <span>EV Rider</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                </div>

                {/* Your Door Pin (End Point) */}
                <div className="absolute right-4 top-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1.5 shadow-lg border border-emerald-300/40 z-20">
                  <Home className="w-3.5 h-3.5 text-white" />
                  <div>
                    <div className="leading-tight">Your Doorstep</div>
                    <div className="text-[8px] text-emerald-100 font-medium">Vijayawada</div>
                  </div>
                </div>
              </div>

              {/* Rider Telemetry & Live Countdown Bar */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-blue-500/20 space-y-1">
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-wider block">Live Speed & Temp</span>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>⚡ 32 km/h</span>
                    <span className="text-emerald-400">❄️ 4°C Cold</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-2xl border border-blue-500/20 space-y-1">
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-wider block">Doorstep ETA</span>
                  <div className="text-xs font-extrabold text-amber-300 flex items-center justify-between">
                    <span>~{demoCountdown} Mins</span>
                    <span className="text-[10px] text-blue-300 font-normal">On Schedule</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Stats Row (Only if verifiedStats is non-empty) */}
            {verifiedStats.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {verifiedStats.map((st) => (
                  <div key={st.id} className="bg-skymist/40 p-4 rounded-2xl border border-brand/10">
                    <p className="font-display font-extrabold text-2xl text-brand tabular-nums">{st.value}</p>
                    <p className="text-xs text-ink-muted font-medium">{st.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Verified Cities */}
            {verifiedCities.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
                  Active Express Cities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {verifiedCities.map((c) => (
                    <span
                      key={c.id}
                      className="bg-skymist text-brand text-xs font-semibold px-3 py-1 rounded-full border border-brand/15 flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-coral fill-coral" />
                      <span>{c.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right (6 cols): Pincode Checker Form */}
          <div className="lg:col-span-6 bg-skymist/30 p-6 sm:p-8 rounded-3xl border border-brand/15 space-y-4" aria-live="polite">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand shrink-0" />
                <span>Check Your 6-Digit Pincode</span>
              </h3>
              <p className="text-xs text-ink-muted">
                Find out if doorstep delivery is active near you.
              </p>
            </div>

            <form onSubmit={handleCheckPincode} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setStatus("idle");
                  }}
                  placeholder="Enter 6-digit pincode (e.g. 500081)"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-ink/15 focus:border-brand focus:outline-none text-sm font-semibold pr-10"
                />
                <Search className="w-4 h-4 text-ink-muted absolute right-4 top-4" />
              </div>
              <Button variant="primary" size="md" type="submit" className="w-full text-button-label">
                Check Availability
              </Button>
            </form>

            {/* Pincode States */}
            {status === "invalid" && (
              <div className="bg-blush text-ink p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-coral/30">
                <AlertCircle className="w-4 h-4 text-coral shrink-0" />
                <span>Please enter a valid 6-digit numeric Indian pincode.</span>
              </div>
            )}

            {status === "checking" && (
              <p className="text-xs text-ink-muted animate-pulse">Checking micro-hub coverage...</p>
            )}

            {status === "available" && (
              <div className="bg-mint text-emerald-950 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>We deliver here! Micro-Hub active for doorstep express.</span>
              </div>
            )}

            {status === "unavailable" && (
              <div className="bg-blush text-ink p-4 rounded-xl text-xs space-y-2 border border-coral/30">
                <div className="flex items-center gap-2 font-bold text-coral">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Not yet live in your area. Join the waitlist:</span>
                </div>
                {waitlistSuccess ? (
                  <p className="text-emerald-800 font-semibold pt-1">
                    Added to waitlist! We will notify you when we open your pincode.
                  </p>
                ) : (
                  <form onSubmit={handleJoinWaitlist} className="space-y-2 pt-1">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-ink/20 text-xs focus:outline-none"
                      />
                      <Button variant="primary" size="sm" type="submit" disabled={isSubmittingWaitlist}>
                        {isSubmittingWaitlist ? "..." : "Join"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}
