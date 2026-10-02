export interface Testimonial {
  id: string;
  name: string;
  city: string;
  skinType: string;
  rating: number;
  quote: string;
  productUsed: string;
  consentToPublish: boolean;
  photo?: string;
  verifiedPurchase?: boolean;
}

/**
 * Ships empty by default until founders collect real user reviews with consentToPublish: true.
 * When fewer than 3 consented reviews exist, Section 9 automatically renders the Early Access feedback variant.
 */
export const testimonials: Testimonial[] = [];
