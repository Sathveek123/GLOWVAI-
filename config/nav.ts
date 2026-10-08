export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const routesReady: Record<string, boolean> = {
  "/": true,
  "/shop": true,
  "/our-story": true,
  "/face-analysis": true,
  "/journal": true,
  "/contact": true,
  "/privacy": true,
  "/terms": true,
  "/returns": true,
  "/#faq": true,
  "/#delivery": true,
  "/#journal": true,
  "/#ingredients": true,
};

export const navLinks: NavItem[] = [
  { title: "Shop", href: "/shop" },
  { title: "Our Story", href: "/our-story" },
  { title: "Face Analysis", href: "/face-analysis", badge: "Free" },
];

export const footerLinks = {
  shop: [
    { title: "All Products", href: "/shop" },
    { title: "Acne Care", href: "/shop?concern=acne" },
    { title: "Dullness & Glow", href: "/shop?concern=dullness" },
    { title: "Dryness & Hydration", href: "/shop?concern=dryness" },
    { title: "Sun Care", href: "/shop?concern=sun-care" },
  ],
  company: [
    { title: "Our Story", href: "/our-story" },
    { title: "Journal", href: "/journal" },
    { title: "Face Scan AI", href: "/face-analysis" },
    { title: "Contact Us", href: "/contact" },
  ],
  help: [
    { title: "FAQ", href: "/#faq" },
    { title: "Delivery", href: "/#delivery" },
    { title: "Returns Policy", href: "/returns" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
  ],
};

