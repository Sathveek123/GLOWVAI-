import React from "react";
import { Container } from "@/components/ui/Container";
import { HelpCircle, ChevronDown, Sparkles, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Frequently Asked Questions & Support | GLOW VAI",
  description: "Find instant answers regarding GLOW VAI 15-minute quick commerce delivery, AI skin face scan analysis, return policies, and product formulations.",
};

const faqList = [
  {
    q: "How does GLOW VAI deliver skincare in 15 minutes?",
    a: "We operate dedicated neighborhood dark store micro-hubs in Vijayawada & Visakhapatnam. Once you order, electric riders pack and dispatch cold-chain products within 3 minutes of order placement."
  },
  {
    q: "Is the AI Face Scan free and private?",
    a: "Yes! Our computer vision facial scan is 100% free and runs locally on your browser. Your facial image is never uploaded, saved, or shared with third parties."
  },
  {
    q: "What products are available on GLOW VAI?",
    a: "We stock authentic formulations from Minimalist, The Derma Co, and GLOW VAI custom AI routine packs targeting acne, dullness, hyperpigmentation, and sun damage."
  },
  {
    q: "What happens if a product arrives damaged?",
    a: "We offer a 100% hassle-free Instant Replacement guarantee. Contact customer support via call or email within 24 hours of delivery."
  },
  {
    q: "What locations do you currently service?",
    a: "We currently offer 15-minute express delivery across key pincodes in Vijayawada and Visakhapatnam. Enter your 6-digit pincode on our homepage or delivery page to check real-time coverage."
  },
  {
    q: "How can I join the GLOW VAI Partner Referral Program?",
    a: "You can sign up on our Referral page to earn 15% instant commission on every friend or campus student who orders using your referral code."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12 sm:py-20">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-extrabold text-[#0050FF] uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200 inline-block">
            Support Center
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
            Frequently Asked <span className="text-[#0050FF]">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Everything you need to know about our AI Face Scanner, 15-minute express dark store delivery, and skincare routine recommendations.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          {faqList.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#0050FF] shrink-0 mt-0.5" />
                <span>{item.q}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support Box */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#0050FF] to-indigo-600 text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-display font-extrabold text-2xl text-white">Still have questions?</h2>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              Our customer happiness team in Andhra Pradesh is ready to assist you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a href="tel:+918977855998" className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-2xl shadow-md transition-transform hover:scale-105 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-900" />
              <span>+91 89778 55998</span>
            </a>
            <a href="mailto:contact@glowvai.in" className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-2xl border border-white/30 flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" />
              <span>contact@glowvai.in</span>
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
