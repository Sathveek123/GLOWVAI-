import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, BRAND_NAME } from "@/config/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Skincare That Understands Your Face, Delivered in Minutes`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "cosmetic quick commerce",
    "GLOW VAI skincare",
    "skincare delivered in 15 minutes",
    "AI face scan skincare",
    "Hyderabad skincare delivery",
    "clean Indian cosmetics",
    "dermatologist tested skincare",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} - Fresh Cosmetics in ~15 Mins`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Fresh Skincare Quick Commerce`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
        <AnnouncementBar city={locationData.city} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
