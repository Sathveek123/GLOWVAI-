import { siteConfig } from "@/config/site";
import { LocationData } from "@/types";

/**
 * Server-side helper to approximate visitor location from IP header.
 * Stubbed with a fallback to siteConfig.defaultCity for graceful degradation.
 */
export async function getLocationFromIP(): Promise<LocationData> {
  try {
    // In production, header reading via next/headers (e.g. x-forwarded-for, x-vercel-ip-city)
    // resolves real-time city location.
    return {
      city: siteConfig.defaultCity,
      region: "Andhra Pradesh",
      country: "India",
      ip: "127.0.0.1",
    };
  } catch (error) {
    console.error("Error retrieving location from IP:", error);
    return {
      city: siteConfig.defaultCity,
      country: "India",
    };
  }
}
