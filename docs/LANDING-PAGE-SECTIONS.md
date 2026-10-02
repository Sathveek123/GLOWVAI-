# GLOW VAI: Landing Page Sections & Component Guide

This document provides a comprehensive component breakdown of all 13 sections on the home page ([app/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/page.tsx)) as well as key site pages.

---

## Master Landing Page Sequence

The GLOW VAI home page follows a strict narrative progression designed to build trust, demonstrate technological differentiation, present real founder credentials, and drive conversion.

```
Section 01: AnnouncementBar (Top delivery ticker & claim badges)
Section 02: Navbar (Brand logo, nav links, pin-code status, cart drawer trigger)
Section 03: Hero (Main headline, italic typography accent, randomized sample scores)
Section 04: TrustStrip (4-point non-medical privacy & delivery claims)
Section 05: FaceAnalysisSection (Interactive scan entry point & 30-second explanation)
Section 06: QuickDeliveryExplainer (15-minute quick-commerce process cards)
Section 07: Bestsellers (Product grid with size selectors & quick add to cart)
Section 08: WhyWeStarted (Founder story featuring Rahimath, Sardhar, and Satvik)
Section 09: BrandValues (4 formulation pillars & cold-pressed ingredients)
Section 10: ShopByConcern (Filterable target concern grid)
Section 11: TestimonialsGrid (Real customer reviews with verified badges)
Section 12: JournalTeaser (Skincare education & science previews)
Section 13: FAQSection & FinalCTABanner / Footer (Accordions, newsletter, legal links)
```

---

## Comprehensive Section Breakdown

### Section 01: AnnouncementBar
- **File**: [components/layout/AnnouncementBar.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/layout/AnnouncementBar.tsx)
- **Purpose**: Displays urgent shipping updates, active promotional notices, and verified honesty claims.
- **Key Features**: Smooth CSS ticker animation, dismissible state, dynamic pin-code awareness.

### Section 02: Navbar
- **File**: [components/layout/Navbar.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/layout/Navbar.tsx)
- **Purpose**: Primary site navigation and utility control.
- **Key Features**:
  - Crisp PNG brand logo rendering ([public/logo/glowvai-logo.png](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/public/logo/glowvai-logo.png)).
  - Live Pin-Code badge showing active delivery status.
  - Interactive Search Overlay toggle.
  - Cart count pill triggering [components/cart/CartDrawer.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/cart/CartDrawer.tsx).

### Section 03: Hero & HeroVisual
- **Files**: [components/sections/Hero.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/Hero.tsx), [components/sections/HeroVisual.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/HeroVisual.tsx)
- **Purpose**: High-impact above-the-fold brand entry point.
- **Key Features**:
  - Dynamic display headline using Bricolage Grotesque and italicized Instrument Serif accents.
  - Randomized sample skin score cards showing hydration and clarity metrics (ASCI compliant sample label).
  - Quick pin-code verification input box.

### Section 04: TrustStrip
- **File**: [components/sections/TrustStrip.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/TrustStrip.tsx)
- **Purpose**: Reassures first-time visitors regarding privacy and formulation safety.
- **Key Features**: 4 verified claims: On-device analysis, zero photo storage guarantee, fresh small-batch formulation, quick delivery.

### Section 05: FaceAnalysisSection
- **File**: [components/sections/FaceAnalysisSection.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/FaceAnalysisSection.tsx)
- **Purpose**: Highlights the proprietary 30-second camera scan feature.
- **Key Features**: Interactive step preview cards, mandatory cosmetic disclaimer banner: *"Cosmetic skin insights, not medical advice."*

### Section 06: QuickDeliveryExplainer
- **File**: [components/sections/QuickDeliveryExplainer.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/QuickDeliveryExplainer.tsx)
- **Purpose**: Explains how 15-minute quick-commerce delivery functions across major Indian metro zones.
- **Key Features**: Step cards covering order placement, instant cold-blend preparation, hyper-local rider dispatch.

### Section 07: Bestsellers
- **File**: [components/sections/Bestsellers.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/Bestsellers.tsx)
- **Purpose**: Showcases core skincare formulations with direct checkout capability.
- **Key Features**: INCI ingredient badges, size selector dropdowns, price calculations in INR (`₹`), instant Add to Cart buttons.

### Section 08: WhyWeStarted (Founder Story)
- **File**: [components/sections/WhyWeStarted.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/WhyWeStarted.tsx)
- **Purpose**: Authentic human connection detailing why GLOW VAI was founded.
- **Key Features**: High-resolution portraits of all 3 real founders from [public/images/founders/](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/public/images/founders/):
  - **Rahimath** (Co-Founder & Formulation Lead)
  - **Sardhar Musthafa** (Co-Founder & Product Lead)
  - **Nalla Satvik** (Co-Founder & Tech Lead)

### Section 09: BrandValues
- **File**: [components/sections/BrandValues.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/BrandValues.tsx)
- **Purpose**: Communicates product formulation philosophy.
- **Key Features**: 4 pillars detailing cold-pressed active botanical ingredients, zero filler water, ethical sourcing, and transparent INCI labeling.

### Section 10: ShopByConcern
- **File**: [components/sections/ShopByConcern.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/ShopByConcern.tsx)
- **Purpose**: Helps users find products tailored to specific skin needs.
- **Key Features**: Filterable tabs for Dehydration, Dullness, Uneven Texture, and Blemish Control.

### Section 11: TestimonialsGrid
- **File**: [components/sections/TestimonialsGrid.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/TestimonialsGrid.tsx)
- **Purpose**: Verified social proof.
- **Key Features**: Real customer reviews with location tags, usage duration, and verified purchaser badges.

### Section 12: JournalTeaser
- **File**: [components/sections/JournalTeaser.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/JournalTeaser.tsx)
- **Purpose**: Educational content to establish category authority.
- **Key Features**: Article cards with estimated reading times and direct links to [/journal](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/journal/page.tsx).

### Section 13: FAQSection & FinalCTABanner / Footer
- **Files**: [components/sections/FAQSection.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/FAQSection.tsx), [components/sections/FinalCTABanner.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/sections/FinalCTABanner.tsx), [components/layout/Footer.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/layout/Footer.tsx)
- **Purpose**: Answers common user questions, captures newsletter leads, and displays mandatory legal footers.
- **Key Features**: Collapsible accessible accordions, instant newsletter signup form submitting to `/api/newsletter`, legal links (`/privacy`, `/terms`, `/contact`).

---

## Standalone Pages

1. **Our Story ([app/our-story/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/our-story/page.tsx))**: Extended founder narrative page detailing the journey from lab formulations to quick-commerce delivery.
2. **Shop Page ([app/shop/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/shop/page.tsx))**: Full product catalog page gated by `<ShopUnlockGate>` frosted glass panel.
3. **Face Analysis Lead Flow ([app/face-analysis/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/face-analysis/page.tsx))**: Step-by-step camera scanning tool.
4. **Product Detail Page ([app/product/[slug]/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/product/[slug]/page.tsx))**: Deep dive into individual serums, cleansers, and moisturizers with complete INCI ingredient breakdown and customer reviews.
5. **Legal & Compliance Pages**: `/privacy`, `/terms`, `/contact`.
