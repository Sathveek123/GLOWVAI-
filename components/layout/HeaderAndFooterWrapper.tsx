"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface HeaderAndFooterWrapperProps {
  children: React.ReactNode;
  city: string;
}

export function HeaderAndFooterWrapper({ children, city }: HeaderAndFooterWrapperProps) {
  const pathname = usePathname();
  const isFaceAnalysis = pathname === "/face-analysis";

  if (isFaceAnalysis) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <AnnouncementBar city={city} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
