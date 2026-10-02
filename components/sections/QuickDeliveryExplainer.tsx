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
            
            {/* Live-feeling Mini Delivery Map Card (Labeled "Demo") */}
            <div className="bg-skymist/50 p-5 rounded-3xl border border-brand/15 relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-ink">Live Rider Tracker</span>
                </div>
                <span className="text-[10px] font-bold bg-yellow text-ink px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Demo
                </span>
              </div>

              {/* Stylised SVG Map Tile */}
              <div className="relative w-full h-32 bg-white rounded-2xl border border-ink/10 overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 120">
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#0050FF" strokeWidth="6" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#0050FF" strokeWidth="4" />
                  <line x1="120" y1="0" x2="120" y2="120" stroke="#0050FF" strokeWidth="5" />
                  <line x1="280" y1="0" x2="280" y2="120" stroke="#0050FF" strokeWidth="5" />
                </svg>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120">
                  <path
                    d="M 60 40 C 140 40 180 90 320 90"
                    fill="none"
                    stroke="#FF6B57"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />
                  <circle cx="200" cy="65" r="7" fill="#0050FF" className="animate-ping opacity-75 motion-reduce:animate-none" />
                  <circle cx="200" cy="65" r="6" fill="#0050FF" />
                  <circle cx="200" cy="65" r="2.5" fill="#FFFFFF" />
                </svg>

                <div className="absolute left-8 top-[28px] bg-brand text-white p-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-xs">
                  <Box className="w-3 h-3" />
                  <span>Micro-Hub</span>
                </div>

                <div className="absolute right-8 bottom-[18px] bg-coral text-ink p-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-xs">
                  <MapPin className="w-3 h-3" />
                  <span>Your Door</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-ink-muted">Demo Delivery ETA:</span>
                <span className="font-display font-bold text-brand tabular-nums bg-white px-3 py-1 rounded-full border border-brand/15">
                  ~{demoCountdown} mins remaining
                </span>
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
