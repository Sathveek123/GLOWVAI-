export const BRAND_NAME = "GLOW VAI";

const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowvai.in";

export const siteConfig = {
  name: BRAND_NAME,
  legalName: "GLOW VAI Technologies Pvt. Ltd.",
  description: "Scan your face for free, get a plain-language skin report, and shop a routine that fits.",
  url: defaultSiteUrl,
  ogImage: `${defaultSiteUrl}/og.jpg`,
  supportEmail: "contact@glowvai.in",
  phone: "+91 89778 55998",
  address: "Studio 4B, Design District, Hyderabad, Telangana 500081",
  deliveryEstimateMinutes: 15,
  defaultCity: "Vijayawada",
  // Real ratings and customer counts go here ONLY when verified before launch.
  // If empty, components hide them automatically.
  rating: "", // e.g. "4.95 / 5" when verified
  customerCount: "", // e.g. "18,000+ happy customers" when verified
  // TODO: Founders to fill manufacturing and compliance details before launch (required for cosmetic sales in India)
  compliance: {
    manufacturerName: "", // e.g. "GLOW VAI Laboratories Pvt. Ltd."
    licenceNumber: "", // e.g. "COS-AP-2024-8891"
  },
  socials: {
    instagram: "https://www.instagram.com/glowvai",
    twitter: "https://x.com/Glowvai",
    youtube: "",
    linkedin: "https://www.linkedin.com/company/glowvai/",
  },
};


