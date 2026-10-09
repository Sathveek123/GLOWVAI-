import React from "react";
import OurStoryClient from "./OurStoryClient";
import { storyData } from "@/config/story";
import { BRAND_NAME, siteConfig } from "@/config/site";

export const metadata = {
  title: "Our Story & Quick-Commerce Startup Journey",
  description: `How three founders in Vijayawada & Visakhapatnam built ${BRAND_NAME} — combining dermatological AI face scanning with 15-minute quick-commerce dark store delivery.`,
  alternates: {
    canonical: `${siteConfig.url}/our-story`,
  },
  openGraph: {
    title: `Our Story | ${BRAND_NAME} Quick-Commerce`,
    description: `The startup journey of Sardhar Musthafa, Sathveek Nalla, and Rahimath building ${BRAND_NAME} AI Quick-Commerce Dark Store network.`,
    url: `${siteConfig.url}/our-story`,
    siteName: BRAND_NAME,
    type: "website",
  },
};

export default function OurStoryPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      name: BRAND_NAME,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      description: "AI-powered Quick-Commerce Skincare Dark Store Network",
      foundingLocation: {
        "@type": "Place",
        name: "Vijayawada & Visakhapatnam, Andhra Pradesh, India",
      },
      founders: storyData.founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.role,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <OurStoryClient />
    </>
  );
}
