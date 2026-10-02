"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/config/nav";
import { BRAND_NAME } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { X, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  cartCount,
  onOpenCart,
}: MobileMenuProps) {
  // Lock body scroll and trap Escape key
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[100] bg-white flex flex-col justify-between p-6 animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-4">
        <Link
          href="/"
          onClick={onClose}
          className="font-display text-2xl font-extrabold text-ink tracking-tight flex items-center gap-1.5"
        >
          <span className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-lg shadow-sm">
            A
          </span>
          <span>{BRAND_NAME}</span>
        </Link>

        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Links */}
      <nav className="flex flex-col space-y-5 my-auto py-6">
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            onClick={onClose}
            className="group flex items-center justify-between font-display text-2xl font-bold text-ink hover:text-brand transition-colors py-1"
          >
            <span>{link.title}</span>
            <div className="flex items-center gap-2">
              {link.badge && (
                <span className="text-xs bg-blush text-ink font-semibold px-2.5 py-0.5 rounded-full border border-coral/20">
                  {link.badge}
                </span>
              )}
              <ArrowRight className="w-5 h-5 text-ink/30 group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </nav>

      {/* Bottom Action Area */}
      <div className="space-y-4 pt-4 border-t border-ink/10">
        <Link href="/face-analysis" onClick={onClose} className="block w-full">
          <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2 shadow-coral-glow">
            <Sparkles className="w-5 h-5" />
            <span>Scan My Face (Free)</span>
          </Button>
        </Link>

        <button
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          className="w-full flex items-center justify-center gap-2 bg-skymist text-brand font-bold py-3.5 px-4 rounded-2xl border border-brand/20"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>View Cart ({cartCount})</span>
        </button>
      </div>
    </div>
  );
}
