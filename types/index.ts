export interface LocationData {
  city: string;
  region?: string;
  country?: string;
  ip?: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  consent: boolean;
  honeypot?: string;
}

export interface FaceScanResultData {
  overallScore: number;
  subScores: {
    hydration: number;
    barrier: number;
    texture: number;
    clarity: number;
  };
  summary: string;
  recommendedProductIds: string[];
}

export interface LeadSubmissionPayload extends LeadFormData {
  sessionId: string;
  location: LocationData;
  userAgent: string;
  referrer?: string;
  entryTime: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize?: string;
}
