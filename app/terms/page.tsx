import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: `Terms & Conditions | ${BRAND_NAME}`,
  description: "Terms and conditions governing the use of Glow Vai skin analysis and products.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-12 sm:py-20 text-ink min-h-screen">
      <Container size="md">
        
        {/* Lawyer Review Banner */}
        <div className="bg-yellow/30 border border-yellow/50 p-4 rounded-2xl mb-8 text-xs text-ink font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-ink shrink-0" />
          <span>DRAFT for lawyer review. Do not publish as final without legal approval.</span>
        </div>

        <div className="max-w-[70ch] mx-auto space-y-8">
          <div className="space-y-3">
            <Badge variant="brand" size="sm">
              Legal Terms
            </Badge>
            <h1 className="font-display font-semibold text-h1-page text-ink leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs text-ink-muted">Last updated: October 2026</p>
          </div>

          <div className="prose prose-slate text-sm leading-relaxed space-y-6 text-ink-muted border-t border-ink/10 pt-6">
            
            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">1. Acceptance of Terms</h2>
              <p>
                By accessing or using {BRAND_NAME}, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the website or skin analysis service.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">2. Age Limit & Eligibility</h2>
              <p>
                The skin scan and product purchase services are available only to persons who are 18 years of age or older.
              </p>
            </section>

            <section space-y-2 className="bg-skymist/40 p-4 rounded-2xl border border-brand/15 text-ink">
              <h2 className="font-display font-bold text-base text-brand">3. Cosmetic Insights Disclaimer (Not Medical Advice)</h2>
              <p className="text-xs">
                The skin analysis provides **cosmetic skin insights only**. It does NOT provide dermatological diagnoses or medical treatment recommendations. For medical skin conditions, always consult a licensed dermatologist.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">4. Patch Testing & Usage</h2>
              <p>
                Before using any cosmetic product, users are advised to perform a patch test behind the ear 24 hours prior to full face application.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">5. Pricing & Availability</h2>
              <p>
                All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. Prices and availability are subject to change.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">6. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.
              </p>
            </section>

          </div>
        </div>

      </Container>
    </div>
  );
}
