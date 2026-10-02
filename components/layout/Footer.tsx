"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { footerLinks, routesReady } from "@/config/nav";
import { complianceConfig } from "@/config/compliance";
import { trustStripClaimsList } from "@/config/claims";
import { Container } from "@/components/ui/Container";
import { MapPin, ArrowUp, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isMadeInIndiaVerified = trustStripClaimsList.find(
    (c) => c.id === "madeInIndia"
  )?.verified;

  const hasComplianceInfo = Boolean(
    complianceConfig.manufacturerName || complianceConfig.licenceNumber || complianceConfig.marketerName
  );

  const filterLinks = (links: { title: string; href: string }[]) => {
    return links.filter((link) => {
      if (link.href.startsWith("#") || link.href.includes("#")) return true;
      return routesReady[link.href] === true;
    });
  };

  const filteredShop = filterLinks(footerLinks.shop);
  const filteredCompany = filterLinks(footerLinks.company);
  const filteredHelp = filterLinks(footerLinks.help);
  const filteredLegal = filterLinks(footerLinks.legal);

  return (
    <footer className="bg-ink text-white pt-28 pb-12 relative border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
            >
              <div className="relative h-10 w-auto flex items-center bg-white/10 p-2 rounded-xl border border-white/15">
                <Image
                  src="/images/logo/glowvai-logo.png"
                  alt={BRAND_NAME}
                  width={160}
                  height={44}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Skincare that starts with a selfie. Cold-chain micro stores, on-device privacy, doorstep delivery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-white/70 pt-1">
              {siteConfig.socials.instagram && siteConfig.socials.instagram.trim() !== "" && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GLOW VAI Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {siteConfig.socials.twitter && siteConfig.socials.twitter.trim() !== "" && (
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GLOW VAI Twitter"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {siteConfig.socials.linkedin && siteConfig.socials.linkedin.trim() !== "" && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GLOW VAI LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Contact info block */}
            <div className="pt-2 space-y-1.5 text-xs text-white/60">
              {siteConfig.supportEmail && siteConfig.supportEmail.trim() !== "" && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-yellow shrink-0" />
                  <span>{siteConfig.supportEmail}</span>
                </div>
              )}
              {siteConfig.phone && siteConfig.phone.trim() !== "" && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-yellow shrink-0" />
                  <span>{siteConfig.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shop Column */}
          {filteredShop.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white tracking-wider uppercase">Shop</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {filteredShop.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="hover:text-yellow transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company Column */}
          {filteredCompany.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white tracking-wider uppercase">Company</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {filteredCompany.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="hover:text-yellow transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Help Column */}
          {filteredHelp.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white tracking-wider uppercase">Help</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {filteredHelp.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="hover:text-yellow transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Column */}
          {filteredLegal.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white tracking-wider uppercase">Legal</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {filteredLegal.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="hover:text-yellow transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Manufacturing & Cosmetic Compliance Slot */}
        {hasComplianceInfo && (
          <div className="py-4 border-b border-white/10 text-xs text-white/60 space-y-1">
            <p className="font-bold text-white">Compliance & Regulatory Details:</p>
            {complianceConfig.marketerName && <p>Marketer: {complianceConfig.marketerName}</p>}
            {complianceConfig.manufacturerName && <p>Manufacturer: {complianceConfig.manufacturerName}</p>}
            {complianceConfig.licenceNumber && <p>Licence No: {complianceConfig.licenceNumber}</p>}
          </div>
        )}

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {currentYear} {BRAND_NAME}. All rights reserved.</span>
            {isMadeInIndiaVerified && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-coral shrink-0" />
                  <span>Made in Andhra Pradesh, India</span>
                </span>
              </>
            )}
          </div>

          <div className="text-[11px] italic text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/15">
            Cosmetic skin insights, not medical advice.
          </div>
        </div>
      </Container>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-brand text-white shadow-xl flex items-center justify-center border-2 border-white/20 hover:scale-105 transition-transform z-40 focus:outline-none focus:ring-2 focus:ring-yellow"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
