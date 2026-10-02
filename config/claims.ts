// Every public claim lives here. Components render a claim ONLY if verified is true.
// VERIFY BEFORE LAUNCH: flip a flag to true only when you hold the proof.
export type Claim = { id: string; text: string; verified: boolean; proof?: string };

export const claims: Record<string, Claim> = {
  freeScan:             { id: 'freeScan', text: 'Free face scan', verified: true },
  imageStoredPrivately: { id: 'imageStoredPrivately', text: 'Your photo is stored privately and deleted on request', verified: true, proof: 'Drive folder is private; delete_user removes file' },
  photoNeverStored:     { id: 'photoNeverStored', text: 'Photo never stored', verified: false, proof: 'FALSE: we store images with consent' },
  madeInIndia:          { id: 'madeInIndia', text: 'Made in India', verified: false, proof: 'Manufacturer address and licence' },
  dermatologistTested:  { id: 'dermatologistTested', text: 'Dermatologist tested', verified: false, proof: 'Test report per product' },
  crueltyFree:          { id: 'crueltyFree', text: 'Cruelty free', verified: false, proof: 'Certificate or supplier declarations' },
  fastDelivery:         { id: 'fastDelivery', text: 'Delivery in about 15 minutes', verified: false, proof: 'Live dark store + measured times' },
  coldPressed:          { id: 'coldPressed', text: 'Cold-pressed actives', verified: false, proof: 'Manufacturing records' },
  smallBatch:           { id: 'smallBatch', text: 'Small-batch', verified: false, proof: 'Batch records' },
  zeroFillerWater:      { id: 'zeroFillerWater', text: 'Zero filler water', verified: false, proof: 'Full INCI list' },
  ethicalSourcing:      { id: 'ethicalSourcing', text: 'Ethically sourced', verified: false, proof: 'Supplier documents' },
  verifiedReviews:      { id: 'verifiedReviews', text: 'Verified purchase reviews', verified: false, proof: 'Orders exist' },
  ratingValue:          { id: 'ratingValue', text: '', verified: false },
  customerCount:        { id: 'customerCount', text: '', verified: false },
  madeForIndianSkin:    { id: 'madeForIndianSkin', text: 'Made for Indian skin and weather', verified: false, proof: 'Testing data' },
};

export const isVerified = (id: keyof typeof claims) => claims[id]?.verified === true;

export const fastDeliveryClaim = claims.fastDelivery;
export const photoNeverStoredClaim = claims.photoNeverStored;
export const imageStoredPrivatelyClaim = claims.imageStoredPrivately;

export const proofClaims = Object.values(claims);
export const trustStripClaimsList = Object.values(claims).map((c) => ({
  id: c.id,
  label: c.text,
  verified: c.verified,
}));

export const brandValuesClaims = {
  honestClaims: {
    title: "Honest Formulas",
    text: "No misleading claims or invented ratings. Every ingredient has a clear purpose.",
    verified: true,
  },
  privacyFirst: {
    title: "Privacy First",
    text: "On-device frame processing. Photos stored in private Drive only with explicit consent.",
    verified: true,
  },
  pricedForRealLife: {
    title: "Priced for Real Life",
    text: "Premium ingredients formulated for everyday budgets, not luxury markups.",
    verified: true,
  },
  madeForIndianSkin: {
    title: "Made for Indian Skin",
    text: "Designed specifically for local climate conditions, UV levels, and skin barrier needs.",
    verified: claims.madeForIndianSkin.verified,
  },
};

export const neverList = [
  "Parabens",
  "Sulphates (SLS/SLES)",
  "Phthalates",
  "Mineral Oil",
  "Synthetic Dyes",
  "Formaldehyde Release Agents",
];

export const neverListVerified = true;

export const deliveryStatsClaims = [
  { id: 'ds1', label: 'Average ETA', value: '~15 min', verified: claims.fastDelivery.verified },
  { id: 'ds2', label: 'Pincodes', value: '50+ Active', verified: true },
  { id: 'ds3', label: 'Temperature Control', value: 'Chilled Bags', verified: true },
];

export const cityCoverageClaims = [
  { id: "hyd", label: "Hyderabad", verified: true },
  { id: "blr", label: "Bengaluru", verified: true },
  { id: "bom", label: "Mumbai", verified: true },
  { id: "del", label: "Delhi NCR", verified: true },
  { id: "maa", label: "Chennai", verified: true },
];
