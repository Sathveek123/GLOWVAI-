/**
 * GLOW VAI Verified Claims Configuration
 * Verify all claims before setting verified: true.
 * Unverified claims (verified: false) are automatically hidden from rendering.
 */

export interface ClaimItem {
  id: string;
  label: string;
  value?: string;
  verified: boolean;
}

// Always verified claims
export const freeScanClaim: ClaimItem = { id: "freeScan", label: "Free face scan", verified: true };
export const photoNeverStoredClaim: ClaimItem = { id: "photoNeverStored", label: "Photo never stored", verified: true };

// Delivery claim flag
export const fastDeliveryClaim: ClaimItem = { id: "fastDelivery", label: "Delivery in ~15 minutes", verified: false };

// Verify before launch: Trust Strip Claims
export const trustStripClaimsList: ClaimItem[] = [
  { id: "freeScan", label: "Free face scan", verified: true },
  { id: "photoNeverStored", label: "Photo never stored", verified: true },
  // Verify before launch
  { id: "madeInIndia", label: "Made in India", verified: false },
  { id: "dermatologistTested", label: "Dermatologist tested", verified: false },
  { id: "crueltyFree", label: "Cruelty free", verified: false },
  { id: "fastDelivery", label: "Delivery in minutes", verified: false },
  { id: "securePayments", label: "Secure payments", verified: false },
  { id: "freeShipping", label: "Free shipping", verified: false },
];

// Verify before launch: Proof row items
export const proofClaims: ClaimItem[] = [
  { id: "p1", label: "Free scan", verified: true },
  { id: "p2", label: "Photo never stored", verified: true },
  // Unverified claims default to false
  { id: "p3", label: "Delivered in ~15 min", verified: false },
  { id: "p4", label: "happy customers", value: "18,000+", verified: false },
  { id: "p5", label: "star rating", value: "4.95 / 5", verified: false },
];

// Verify before launch: Quick delivery stats
export const deliveryStatsClaims: ClaimItem[] = [
  { id: "d1", label: "Average Delivery Time", value: "12.4 min", verified: false },
  { id: "d2", label: "Live Micro Dark-Stores", value: "32", verified: false },
  { id: "d3", label: "On-Time Dispatch Rate", value: "99.4%", verified: false },
];

// Verify before launch: Active cities
export const cityCoverageClaims: ClaimItem[] = [
  { id: "c1", label: "Hyderabad", verified: true },
  { id: "c2", label: "Bengaluru", verified: false },
  { id: "c3", label: "Mumbai", verified: false },
  { id: "c4", label: "Delhi NCR", verified: false },
];

// Value 04 flag
export const brandValuesClaims = {
  honestClaims: { title: "Honest claims", text: "We only say what we can prove.", verified: true },
  privacyFirst: { title: "Privacy first", text: "Your photo stays on your phone.", verified: true },
  pricedForRealLife: { title: "Priced for real life", text: "Personalised skincare shouldn't cost a fortune.", verified: true },
  madeForIndianSkin: { title: "Made for Indian skin and weather", text: "Formulated specifically for Indian climate conditions.", verified: false },
};

/**
 * Never in our products list.
 * TODO: Founders confirm the real list. Candidates to confirm, not to publish:
 * parabens, sulfates, mineral oil, synthetic fragrance, artificial dyes.
 * Renders ONLY when list is non-empty and neverListVerified is true.
 */
export const neverListVerified = false;
export const neverList: string[] = [];
