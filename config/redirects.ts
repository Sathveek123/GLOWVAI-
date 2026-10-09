/**
 * Legacy URL Redirects Mapping (HTTP 308 Permanent)
 */

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

export const redirectRules: RedirectRule[] = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/index", destination: "/", permanent: true },
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/products", destination: "/shop", permanent: true },
  { source: "/store/catalog", destination: "/shop", permanent: true },
  { source: "/scan", destination: "/face-analysis", permanent: true },
  { source: "/about", destination: "/our-story", permanent: true },
];
