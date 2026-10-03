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
import { getAssetPath, cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemCount = 1;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Utility Announcement & Contact Bar */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-white/10 z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+918977855998"
              className="flex items-center gap-1.5 text-white/90 hover:text-yellow font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>+91 89778 55998</span>
            </a>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a
              href="mailto:contact@glowvai.in"
              className="hidden sm:flex items-center gap-1.5 text-white/90 hover:text-yellow font-medium transition-colors"
            >
              <span>contact@glowvai.in</span>
            </a>
          </div>

          {/* Center Announcement badge */}
          <div className="hidden lg:flex items-center gap-2 bg-white/10 px-3 py-0.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-yellow animate-spin-slow" />
            <span className="font-semibold text-white/90">Instant AI Face Scan & Express 15-Min Delivery</span>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/glowvai?stkn=MTV6Znk1ZHd2OGd5eg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://x.com/Glowvai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/glowvai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-ink/10 shadow-md py-2.5 sm:py-3"
            : "bg-white/90 backdrop-blur-md py-3.5 sm:py-4 border-b border-ink/5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo Image with Prominent Sizing & Visibility */}
          <Link
            href="/"
            className="group flex items-center gap-2 p-1 -ml-1 rounded-2xl hover:bg-skymist/60 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <div className="relative h-10 sm:h-12 lg:h-14 w-auto flex items-center">
              <Image
                src={getAssetPath("/images/logo/glowvai-logo.png")}
                alt={BRAND_NAME}
                width={220}
                height={60}
                priority
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="relative px-4 py-2 text-[15px] font-semibold text-ink/80 hover:text-brand hover:bg-skymist/70 rounded-xl transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span>{link.title}</span>
                {link.badge && (
                  <span className="text-[10px] font-extrabold bg-gradient-to-r from-coral to-amber-500 text-white px-2 py-0.5 rounded-full shadow-2xs border border-white/40 animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons & Primary CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon */}
            <button
              aria-label="Search skincare products"
              className="p-2.5 rounded-xl text-ink/80 hover:text-brand hover:bg-skymist/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Trigger with Animated Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${cartItemCount} items`}
              className="relative p-2.5 rounded-xl text-ink/80 hover:text-brand hover:bg-skymist/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand group"
            >
              <ShoppingBag className="w-5 h-5 text-ink group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 rounded-full bg-coral text-ink font-extrabold text-[11px] flex items-center justify-center shadow-xs ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Scan My Face Primary Action Button */}
            <div className="hidden sm:block">
              <Link href="/face-analysis">
                <Button variant="primary" size="md" className="gap-2 shadow-coral-glow hover:scale-[1.03] transition-transform text-button-label font-bold rounded-xl px-5">
                  <Sparkles className="w-4.5 h-4.5 text-ink animate-spin-slow" />
                  <span>Scan my face</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden p-2.5 rounded-xl text-ink hover:bg-skymist/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
