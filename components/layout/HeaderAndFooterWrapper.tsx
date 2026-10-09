"use client";

import React from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GlowVaiBot } from "@/components/chat/GlowVaiBot";

interface HeaderAndFooterWrapperProps {
  children: React.ReactNode;
  city: string;
}

export function HeaderAndFooterWrapper({ children, city }: HeaderAndFooterWrapperProps) {
  return (
    <>
      <AnnouncementBar city={city} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <GlowVaiBot />
    </>
  );
}
