/**
 * Single Source of Truth for GLOW VAI Site URL.
 * Exports SITE_URL constructed from process.env.NEXT_PUBLIC_SITE_URL with no trailing slash.
 * In production (NODE_ENV === "production"), if NEXT_PUBLIC_SITE_URL is missing or empty,
 * it fails the build with an explicit Error message.
 */

function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (process.env.NODE_ENV === "production") {
    if (!envUrl || !envUrl.trim()) {
      throw new Error(
        "[FATAL SEO BUILD ERROR]: NEXT_PUBLIC_SITE_URL environment variable is required in production builds. Expected 'https://glowvai.in'."
      );
    }
    return envUrl.trim().replace(/\/+$/, "");
  }

  // Development / Test fallback
  const url = envUrl && envUrl.trim() ? envUrl.trim() : "https://glowvai.in";
  return url.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

export function getAbsoluteUrl(path: string = ""): string {
  if (!path || path === "/") return SITE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
