"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/config/nav";
import { BRAND_NAME } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Sparkles, ShoppingBag, Search, Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemCount = 1;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 bg-white",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-ink/10 shadow-xs py-3"
            : "py-4 sm:py-5 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Image */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
          >
            <div className="relative h-9 sm:h-10 w-auto flex items-center">
              <Image
                src="/images/logo/glowvai-logo.png"
                alt={BRAND_NAME}
                width={150}
                height={40}
                priority
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="relative px-3.5 py-2 text-[15px] font-medium text-ink/80 hover:text-ink hover:bg-ink/5 rounded-xl transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span>{link.title}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-blush text-ink px-2 py-0.5 rounded-full border border-coral/20">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon */}
            <button
              aria-label="Search skincare products"
              className="p-2 sm:p-2.5 rounded-xl text-ink hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon with Item Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${cartItemCount} items`}
              className="relative p-2 sm:p-2.5 rounded-xl text-ink hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ShoppingBag className="w-5 h-5 text-ink" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-coral text-ink font-bold text-[10px] flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Desktop Scan My Face Primary CTA */}
            <div className="hidden sm:block">
              <Link href="/face-analysis">
                <Button variant="primary" size="md" className="gap-2 shadow-coral-glow text-button-label">
                  <Sparkles className="w-4 h-4 text-ink" />
                  <span>Scan my face</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden p-2 rounded-xl text-ink hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu & Cart Drawer Modals */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
