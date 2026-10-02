# GLOW VAI - Privacy-First Quick-Commerce Skincare Platform

GLOW VAI is an editorial, high-performance quick-commerce skincare platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and custom glassmorphism design tokens. The platform combines real-time, on-device AI skin analysis with rapid delivery across Indian pin-codes, bringing personalized routines to your doorstep in minutes.

---

## Key Features

- **On-Device AI Skin Analysis**: Privacy-first facial analysis via browser camera. Facial frames are evaluated locally on canvas pixel buffers and are never stored or uploaded.
- **Dynamic Quick-Commerce Delivery**: Real-time pin-code eligibility checker (`110001`, `400001`, `560001`, `500001`, `600001`) with live ETA counters.
- **Honest Claims Architecture**: ASCI and DPDP Act 2023 compliant copy engine. Dynamic claim verification system in [config/claims.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/config/claims.ts).
- **Google Sheets Lead Webhook**: Automated multi-tab payload sync to Google Apps Script for real-time lead tracking, newsletter signups, waitlists, and feedback.
- **Glassmorphism Early Access Gate**: Translucent unlock gate on `/shop` route requiring email entry before unlocking full product browsing.
- **Real Founders Editorial**: Authentic founder story section featuring original portraits of Rahimath, Sardhar Musthafa, and Nalla Satvik.
- **Zero Em-Dash & Strict Copy Rules**: Handcrafted copy free of generic AI buzzwords (`unlock`, `elevate`, `seamless`, `revolutionize`, `empower`, `diagnostic`).

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v3 with custom design system tokens
- **State Management**: React Context & Custom Local Storage Store
- **Forms & Validation**: Zod schema validation
- **Fonts**: Bricolage Grotesque, Instrument Serif, DM Sans (loaded via `next/font/google`)
- **Backend Integration**: Next.js Route Handlers + Google Apps Script Web App

---

## Quick Start & Local Execution

### 1. Prerequisites

Ensure Node.js 18.17.0+ or Node.js 20+ is installed on your machine.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sathveek123/GLOWVAI-.git
cd "glow vai landing page"
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Google Apps Script Web App URL for data sync
SHEETS_WEBAPP_URL="https://script.google.com/macros/s/AKfycbw1YFoq50OsTnyWaAJ0eX1hMKtfBt1qyqE-j-9qiwug5ZlJrvkmrSL2OMWKiwRqh2IV/exec"

# Secret token matching Google Apps Script Script Properties
SHEETS_SECRET="glowvai_production_secret_2026"

# Session secret for secure lead cookies
SESSION_SECRET="glowvai_session_encryption_key_32_bytes_min"
```

### 4. Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 5. Production Build Verification

To verify that all routes compile cleanly without errors:

```bash
npm run build
npm run start
```

---

## Project Folder Structure

```
glow vai landing page/
├── app/                        # Next.js 16 App Router Pages & API Routes
│   ├── api/                    # Route handlers (lead, newsletter, contact, etc.)
│   ├── contact/                # Contact page (/contact)
│   ├── face-analysis/          # Interactive camera skin scan route (/face-analysis)
│   ├── journal/                # Editorial skincare journal (/journal)
│   ├── our-story/              # Brand & founder narrative route (/our-story)
│   ├── privacy/                # DPDP-compliant privacy policy (/privacy)
│   ├── product/[slug]/         # Dynamic product detail page
│   ├── shop/                   # Glassmorphism locked shop route (/shop)
│   ├── terms/                  # Terms of service page (/terms)
│   ├── layout.tsx              # Root HTML structure with Google Fonts
│   ├── page.tsx                # Master landing page (13 sections)
│   ├── sitemap.ts              # Dynamic sitemap generator
│   └── robots.ts               # Web crawler configuration
├── components/                 # React Component Library
│   ├── cart/                   # Slide-out Cart Drawer & item quantity logic
│   ├── layout/                 # Navbar, AnnouncementBar, Footer, SearchOverlay
│   ├── product/                # INCI tab lists, product cards, size selectors
│   ├── sections/               # All 13 landing page sections
│   ├── shop/                   # Glassmorphism Shop Unlock Gate modal
│   └── ui/                     # Reusable UI primitives (Button, Badge, Accent)
├── config/                     # Configuration & Claims Engine
│   ├── claims.ts               # ASCI verification matrix
│   ├── content.ts              # Master copy & editorial text
│   ├── products.ts             # Skincare catalog & INCI ingredient breakdown
│   └── site.ts                 # Brand metadata & global settings
├── docs/                       # Project Documentation Suite
│   ├── API-ROUTES-GUIDE.md
│   ├── DESIGN-SYSTEM-AND-COMPLIANCE.md
│   ├── FACE-ANALYSIS-FLOW.md
│   ├── GOOGLE-SHEETS-INTEGRATION.md
│   ├── LANDING-PAGE-SECTIONS.md
│   └── SYSTEM-ARCHITECTURE.md
├── lib/                        # Utility Functions & Analysis Engines
│   ├── analysis/               # Canvas facial landmark heuristic engine
│   ├── schemas.ts              # Zod validation schemas
│   └── session.ts              # Secure DPDP lead session manager
├── public/                     # Static Assets & Founder Images
│   ├── images/founders/        # Original photos of Rahimath, Sardhar, and Satvik
│   └── logo/                   # Transparent PNG brand logos
└── README.md                   # Project documentation master file
```

---

## Comprehensive Section Map

The home page ([app/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/page.tsx)) renders 13 modular sections in sequence:

1. **AnnouncementBar**: Top banner with live delivery alerts and claims ticker.
2. **Navbar**: Responsive header with search overlay, pin-code badge, and cart trigger.
3. **Hero**: Headline with typography accents, randomized sample skin scores, and live pin-code delivery chip.
4. **TrustStrip**: 4-point guarantee strip (On-device analysis, zero photo storage, instant formulation, quick delivery).
5. **FaceAnalysisSection**: Teaser section introducing the 30-second camera analysis flow.
6. **QuickDeliveryExplainer**: Step-by-step breakdown of how GLOW VAI formulates and delivers in under 15 minutes.
7. **Bestsellers**: Product catalog grid with quick-add triggers and formula details.
8. **WhyWeStarted**: Founder story featuring real portraits of Rahimath, Sardhar Musthafa, and Nalla Satvik.
9. **BrandValues**: 4 core brand pillars (Cold-pressed active botanical ingredients, zero filler water, ethical sourcing, transparent INCI labeling).
10. **ShopByConcern**: Filterable interactive grid categorizing products by skin targets (Dehydration, Dullness, Uneven Texture, Blemish Control).
11. **TestimonialsGrid**: Verified customer reviews with real usage duration and skin concerns.
12. **JournalTeaser**: Skincare education journal preview with reading times.
13. **FAQSection & FinalCTABanner / Footer**: Collapsible accordion FAQ, newsletter signup, data privacy controls, and official copyright footer.

---

## Detailed Usage Guide

### How On-Device Skin Analysis Works

1. Visit [/face-analysis](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/face-analysis/page.tsx).
2. Enter your full name, phone number, age bracket, and skin goals in the initial lead form.
3. Grant temporary camera permission in your browser.
4. The canvas engine processes pixel variances across hydration, clarity, texture, and tone zones.
5. Frames remain strictly within browser memory and are discarded immediately after calculation.
6. View composite skin score breakdown and receive personalized routine recommendations.

### How Early Access Shop Locking Works

1. Navigate to [/shop](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/shop/page.tsx).
2. Non-authenticated visitors see a glassmorphism frosted overlay masking the product grid.
3. Submitting a valid email unlocks the catalog, setting an `unlocked` state in session storage.

### How Google Sheets Sync Works

Every form submission (Leads, Newsletter, Contact, Waitlist, Feedback) posts to `/api/*` route handlers, which forward payload data to the Google Apps Script endpoint:
`https://script.google.com/macros/s/AKfycbw1YFoq50OsTnyWaAJ0eX1hMKtfBt1qyqE-j-9qiwug5ZlJrvkmrSL2OMWKiwRqh2IV/exec`

Data is logged automatically into dedicated tabs (`Leads`, `Waitlist`, `Newsletter`, `Feedback`, `Contacts`).

---

## Documentation Suite in `/docs/`

Detailed documentation files are available in the [docs/](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs) folder:

- [SYSTEM-ARCHITECTURE.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/SYSTEM-ARCHITECTURE.md): Deep dive into system state, privacy guarantees, and session engine.
- [LANDING-PAGE-SECTIONS.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/LANDING-PAGE-SECTIONS.md): Section breakdown, props, design tokens, and components.
- [FACE-ANALYSIS-FLOW.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/FACE-ANALYSIS-FLOW.md): Step-by-step documentation of camera scan heuristics and score algorithms.
- [GOOGLE-SHEETS-INTEGRATION.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/GOOGLE-SHEETS-INTEGRATION.md): Apps Script setup guide, payload headers, and security rules.
- [DESIGN-SYSTEM-AND-COMPLIANCE.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/DESIGN-SYSTEM-AND-COMPLIANCE.md): Color tokens, typography stack, ASCI standards, and tone rules.
- [API-ROUTES-GUIDE.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/API-ROUTES-GUIDE.md): Endpoint specification, payloads, Zod schemas, and responses.

---

## Verification & Deployment

To push changes to the main GitHub repository:

```bash
git add .
git commit -m "docs: complete comprehensive system documentation and root README"
git push origin main
```

Deployed GitHub Repository: [https://github.com/Sathveek123/GLOWVAI-](https://github.com/Sathveek123/GLOWVAI-)

---

## License & Operational Rules

- **Brand Name**: GLOW VAI
- **Cosmetic Disclaimer**: *"Cosmetic skin insights, not medical advice."*
- **Copy Restrictions**: Zero em-dashes. Zero misleading medical claims. Zero photo uploads.
