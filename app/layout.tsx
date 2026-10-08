import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, BRAND_NAME } from "@/config/site";
import { HeaderAndFooterWrapper } from "@/components/layout/HeaderAndFooterWrapper";
import { getLocationFromIP } from "@/lib/location";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
  preload: true,
});

const accentFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["400"],
  style: ["italic"],
  preload: false,
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0050FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowvai.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GLOW VAI | Skincare that starts with a face scan",
    template: "%s | GLOW VAI",
  },
  description: "Scan your face for free, get a plain-language skin report, and shop a routine that fits.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "GLOW VAI | Skincare that starts with a face scan",
    description: "Scan your face for free, get a plain-language skin report, and shop a routine that fits.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "GLOW VAI skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GLOW VAI | Skincare that starts with a face scan",
    description: "Scan your face for free, get a plain-language skin report, and shop a routine that fits.",
    images: ["/og.jpg"],
    creator: "@glowvai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locationData = await getLocationFromIP();

  return (
    <html lang="en" className={`${displayFont.variable} ${accentFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-white text-ink flex flex-col font-sans selection:bg-brand selection:text-white">
        <HeaderAndFooterWrapper city={locationData.city}>
          {children}
        </HeaderAndFooterWrapper>
      </body>
    </html>
  );
}

