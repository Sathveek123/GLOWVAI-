"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AnnouncementBarProps {
  city?: string;
}

const provableMessages = [
  "Free skin scan - instant cosmetic insights",
  "Photos processed on-device, never stored",
  "Doorstep express delivery in ~15 minutes",
];

export function AnnouncementBar({ city = "Hyderabad" }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % provableMessages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-brand text-white text-xs font-semibold py-2 px-4 relative z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Location Chip */}
        <div className="hidden sm:flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shrink-0">
          <MapPin className="w-3 h-3 text-coral fill-coral" />
          <span>Delivering to {city}</span>
        </div>

        {/* Short Provable Message with ShieldCheck SVG Icon */}
        <div className="flex-1 text-center truncate flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-yellow shrink-0 inline" />
          <span className="transition-all duration-300 inline-block font-medium truncate">
            {provableMessages[index]}
          </span>
        </div>

        {/* Quick Scan CTA */}
        <div className="hidden md:flex items-center gap-1 text-[11px] font-bold underline hover:text-yellow transition-colors shrink-0">
          <Link href="/face-analysis" className="flex items-center gap-1">
            <span>Free Scan</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

