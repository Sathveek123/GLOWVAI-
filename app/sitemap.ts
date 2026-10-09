import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModDate = new Date("2026-10-09T00:00:00.000Z");

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: lastModDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: lastModDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/face-analysis`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/our-story`,
      lastModified: lastModDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: lastModDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/referral`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = [
    "minimalist",
    "the-derma-co",
    "face-serums",
    "face-washes",
    "sunscreen",
    "moisturizers",
  ].map((slug) => ({
    url: `${SITE_URL}/shop/${slug}`,
    lastModified: lastModDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: lastModDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const legalRoutes: MetadataRoute.Sitemap = siteConfig.LEGAL_APPROVED
    ? [
        {
          url: `${SITE_URL}/privacy`,
          lastModified: lastModDate,
          changeFrequency: "yearly",
          priority: 0.3,
        },
        {
          url: `${SITE_URL}/terms`,
          lastModified: lastModDate,
          changeFrequency: "yearly",
          priority: 0.3,
        },
      ]
    : [];

  return [...coreRoutes, ...categoryRoutes, ...productRoutes, ...legalRoutes];
}
