import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/our-story`, lastModified: new Date() },
    { url: `${baseUrl}/face-analysis`, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
