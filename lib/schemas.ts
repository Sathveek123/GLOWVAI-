import { z } from "zod";

export const phoneRegex = /^\+?[0-9\s-]{10,15}$/;

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters").max(80, "Name too long"),
  phone: z.string().trim().regex(phoneRegex, "Valid 10-digit phone number required"),
  email: z.string().trim().email("Invalid email format").optional().or(z.literal("")),
  skinConcern: z.string().trim().max(100).optional(),
  image_base64: z.string().optional(),
  consent: z.literal(true, { message: "Required privacy consent must be accepted" }),
  imageConsent: z.boolean().default(false),
  marketingOptIn: z.boolean().default(false),
  ageConfirmed: z.literal(true, { message: "You must confirm you are 18 or older to proceed" }),
  consentVersion: z.string().default("v1.0-dpdp-2024"),
  referrer: z.string().max(100).optional(),
  utm_source: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  website: z.string().max(0).optional(), // Honeypot
});

export const leadPatchSchema = z.object({
  overall_score: z.number().min(0).max(100),
  sub_scores: z.record(z.string(), z.number().min(0).max(100)),
  skin_concern: z.string().trim().max(100).optional(),
});

export const dataRequestSchema = z.object({
  contact: z.string().trim().min(5, "Valid phone or email required").max(100),
  type: z.enum(["delete", "access", "withdraw_consent"]),
  details: z.string().trim().max(500).optional(),
  website: z.string().max(0).optional(), // Honeypot
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().optional(),
  topic: z.enum(["order", "scan", "product", "press", "other"]),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
  consent: z.literal(true, { message: "Consent is required" }),
  website: z.string().max(0).optional(),
});
