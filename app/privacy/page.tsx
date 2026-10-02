"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { complianceConfig } from "@/config/compliance";
import { dataRequestSchema } from "@/lib/schemas";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function PrivacyPage() {
  const [dataReq, setDataReq] = useState({
    contact: "",
    type: "delete" as "delete" | "access" | "withdraw_consent",
    details: "",
    website: "",
  });
  const [reqStatus, setReqStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reqError, setReqError] = useState("");

  const handleDataRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReqError("");

    const validated = dataRequestSchema.safeParse(dataReq);
    if (!validated.success) {
      setReqError("Please enter a valid phone number or email address.");
      return;
    }

    setReqStatus("loading");
    try {
      const res = await fetch("/api/data-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataReq),
      });

      if (!res.ok) throw new Error("Request failed");
      setReqStatus("success");
    } catch {
      setReqStatus("error");
      setReqError("Failed to submit request. Please try again or email us.");
    }
  };

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
              DPDP Act 2023 Compliant
            </Badge>
            <h1 className="font-display font-semibold text-h1-page text-ink leading-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-ink-muted">Last updated: October 2026</p>
          </div>

          <div className="prose prose-slate text-sm leading-relaxed space-y-6 text-ink-muted border-t border-ink/10 pt-6">
            
            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">1. Who We Are (Data Fiduciary)</h2>
              <p>
                {siteConfig.legalName} (&ldquo;{BRAND_NAME}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this platform. For the purpose of India&apos;s Digital Personal Data Protection (DPDP) Act, 2023, we act as the Data Fiduciary.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">2. What We Collect</h2>
              <p>When you use {BRAND_NAME}, we collect:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Full name, phone number, and optional email address.</li>
                <li>Rough geographical location derived from your IP address (e.g. city).</li>
                <li>Device information (browser type, OS, device model).</li>
                <li>Your explicit consent records and consent version ID.</li>
                <li>Skin score summaries (hydration, texture, tone, clarity) generated during your scan.</li>
              </ul>
            </section>

            <section space-y-2 className="bg-skymist/50 p-4 rounded-2xl border border-brand/15 text-ink">
              <h2 className="font-display font-bold text-base text-brand flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>3. What We Do NOT Collect or Store (Face Photo Guarantee)</span>
              </h2>
              <p className="text-xs">
                Your face photo or video feed is processed entirely on your phone inside your browser canvas. It is NEVER uploaded, logged, saved to local storage, or transmitted to any server. Once analysis completes, the image frame is wiped immediately.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">4. Purpose & Legal Basis</h2>
              <p>
                We collect personal data based on your explicit consent to display your personalized skin breakdown, process orders, and send service updates.
              </p>
            </section>

            <section space-y-2>
              <h2 className="font-display font-bold text-lg text-ink">5. Age Limit (18+)</h2>
              <p>
                The face scan service is intended solely for individuals who are 18 years of age or older. We do not knowingly collect personal data from minors.
              </p>
            </section>

            {/* Your Rights Form Section */}
            <section id="your-rights" className="bg-skymist/40 p-6 rounded-3xl border border-ink/10 space-y-4 pt-6">
              <h2 className="font-display font-bold text-xl text-ink">
                6. Your Rights & Data Requests (DPDP Act)
              </h2>
              <p className="text-xs text-ink-muted">
                Under the DPDP Act, you have the right to access a summary of your data, request erasure, or withdraw consent at any time. Submit your request below:
              </p>

              {reqStatus === "success" ? (
                <div className="bg-mint text-emerald-950 p-4 rounded-2xl border border-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Request received. We will process it within the statutory timeframe.</span>
                </div>
              ) : (
                <form onSubmit={handleDataRequestSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-ink/10">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={dataReq.website}
                    onChange={(e) => setDataReq({ ...dataReq, website: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Phone or Email *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter phone or email associated with your scan"
                      value={dataReq.contact}
                      onChange={(e) => setDataReq({ ...dataReq, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 text-xs focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Request Type *</label>
                    <select
                      value={dataReq.type}
                      onChange={(e) => setDataReq({ ...dataReq, type: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 text-xs focus:outline-none focus:border-brand bg-white font-semibold"
                    >
                      <option value="delete">Erasure (Delete My Data)</option>
                      <option value="withdraw_consent">Withdraw Consent</option>
                      <option value="access">Access Data Summary</option>
                    </select>
                  </div>

                  {reqError && (
                    <p className="text-xs text-coral font-bold">{reqError}</p>
                  )}

                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    disabled={reqStatus === "loading"}
                    className="w-full shadow-coral-glow"
                  >
                    {reqStatus === "loading" ? "Submitting..." : "Submit Data Request"}
                  </Button>
                </form>
              )}
            </section>

          </div>
        </div>

      </Container>
    </div>
  );
}
