import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME } from "@/config/site";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata = {
  title: `Journal | ${BRAND_NAME}`,
  description: "Skin basics, written plainly. Articles by our team and dermatology advisors coming soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function JournalPage() {
  return (
    <div className="bg-white py-20 sm:py-32 text-ink min-h-[60vh] flex items-center">
      <Container size="md">
        <div className="bg-skymist/40 rounded-3xl p-8 sm:p-14 border border-brand/15 text-center space-y-6 max-w-2xl mx-auto shadow-sm">
          <Badge variant="brand" size="md">
            GLOW VAI Journal
          </Badge>
          
          <h1 className="font-display text-h1-page text-ink leading-tight">
            Coming soon
          </h1>

          <p className="text-body-lg text-ink-muted leading-relaxed">
            Skin basics, written plainly. First articles on ingredient reading, humidity care, and simple routines are on the way.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/#newsletter">
              <Button variant="primary" size="md" className="gap-2 shadow-coral-glow">
                <Mail className="w-4 h-4 text-ink shrink-0" />
                <span>Get notified when articles drop</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md" className="gap-2">
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
