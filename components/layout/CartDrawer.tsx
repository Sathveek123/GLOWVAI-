"use client";

import React from "react";
import { X, ShoppingBag, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { bestsellerProducts } from "@/config/content";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  // Sample cart preview item
  const sampleItem = bestsellerProducts[0];
  const itemQty = 1;
  const total = sampleItem.price * itemQty;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand" />
            <h2 className="font-display text-xl font-bold text-ink">Your Express Basket</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 py-6 space-y-4">
          <div className="bg-skymist/60 rounded-2xl p-3.5 flex items-center gap-3 border border-brand/10">
            <Zap className="w-5 h-5 text-brand shrink-0" />
            <p className="text-xs text-brand font-semibold">
              Delivering to your address in <span className="font-bold underline">~14 minutes</span> via electric rider.
            </p>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl border border-ink/10 bg-white shadow-sm">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-skymist shrink-0 border">
              <Image
                src={sampleItem.image}
                alt={sampleItem.altText}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-ink truncate">{sampleItem.name}</h3>
              <p className="text-xs text-ink-muted">{sampleItem.size}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-sm text-brand">{formatPrice(sampleItem.price)}</span>
                <div className="flex items-center border border-ink/15 rounded-lg px-2 py-0.5 text-xs font-semibold">
                  <span>Qty: 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Summary */}
        <div className="border-t border-ink/10 pt-4 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-medium text-ink">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Hyperlocal 15-min Delivery</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-ink border-t border-ink/10 pt-2">
              <span>Total Pay</span>
              <span className="text-brand">{formatPrice(total)}</span>
            </div>
          </div>

          <Link href="/shop" onClick={onClose} className="block">
            <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
              <span>Proceed to Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted SSL 256-Bit Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
