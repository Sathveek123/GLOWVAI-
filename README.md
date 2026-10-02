# GLOW VAI - Quick-Commerce Skincare Platform

GLOW VAI is an editorial, high-performance quick-commerce skincare platform built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. The platform combines on-device facial skin analysis with rapid delivery across Indian pin-codes.

---

## Key Features

- **On-Device AI Skin Analysis**: Biometric facial analysis evaluated locally within the browser canvas. Face photos are stored in a private Google Drive folder only when separate image consent is explicitly granted.
- **Dynamic Quick-Commerce Delivery**: Real-time pin-code eligibility checker (`110001`, `400001`, `560001`, `500001`, `600001`) with live delivery counters.
- **Honest Claims Engine**: ASCI and DPDP Act compliant copy engine. Dynamic claim verification system in [config/claims.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/config/claims.ts).
- **Google Sheets & Drive Webhook**: Automated payload sync to Google Apps Script for real-time lead tracking, private Drive image uploads, waitlist, newsletter, contact, and feedback.
- **Real Founders Editorial**: Authentic founder story section featuring original portraits of Sardhar (Founder & Vision), Rahimath (Market Explorer), and Nalla Satvik (Lead Technologist).
- **Zero Em-Dash & Strict Copy Rules**: Handcrafted copy free of generic AI buzzwords (`unlock`, `elevate`, `seamless`, `revolutionize`, `empower`).

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v3 with Electric Blue (`#0050FF`), Coral (`#FF6B57`), Butter Yellow (`#FFD84D`), Sky Mist (`#E6EEFF`), and Ink (`#0B1220`).
- **State Management**: React Context & Custom Storage Stores
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
# Google Apps Script Web App URL for data sync (Keep secret, do not commit)
SHEETS_WEBAPP_URL="your_google_apps_script_url_here"

# Secret token matching Google Apps Script Script Properties
SHEETS_SECRET="your_sheets_secret_here"

# Session secret for secure HMAC lead cookies
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

## Landing Page Section Sequence

The home page ([app/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/page.tsx)) renders sections in this exact order:

1. **Hero**: Headline with typography accents, fixed sample report score card, and delivery status.
2. **Trust Strip**: 4-point privacy and service guarantees.
3. **Face Scan**: Interactive camera analysis entry point.
4. **Bestsellers**: Core product catalog grid.
5. **Shop by Concern**: Filterable target skin concern grid.
6. **Founder Story**: Real portraits and vision of Sardhar, Rahimath, and Nalla Satvik.
7. **Values**: 4 core formulation pillars.
8. **Delivery**: 15-minute quick-commerce process breakdown.
9. **Testimonials**: Customer reviews and feedback.
10. **Journal**: Skincare education preview.
11. **FAQ**: Collapsible accordion FAQ.
12. **Final CTA & Newsletter**: Email capture and final call to action.
13. **Footer**: Official links and copyright notice.

---

## Documentation Suite in `/docs/`

Comprehensive single-source-of-truth documentation files:

- [docs/00-README.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/00-README.md): Index, decisions log, and pre-launch checklist.
- [docs/01-DESIGN-SYSTEM.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/01-DESIGN-SYSTEM.md): Electric Blue color tokens, typography rules, and voice guidelines.
- [docs/02-CLAIMS-AND-COMPLIANCE.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/02-CLAIMS-AND-COMPLIANCE.md): ASCI standards, claim verification engine rules.
- [docs/03-DATA-AND-PRIVACY.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/03-DATA-AND-PRIVACY.md): Data collection table, Google Drive image policy, retention rules.
- [docs/04-API-AND-SHEETS.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/04-API-AND-SHEETS.md): Route handlers, signed cookies, Apps Script setup, and sheet tabs.
- [docs/05-FACE-ANALYSIS.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/05-FACE-ANALYSIS.md): Heuristics engine, camera checks, recommendation rules, bias testing log.
- [docs/06-CHECKOUT-PLAN.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/06-CHECKOUT-PLAN.md): Payments integration plan and order management rules.
- [docs/07-ASSETS.md](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/07-ASSETS.md): Photography brief and AI image generation rules.

---

## Deployment & Repository Sync

Repository URL: [https://github.com/Sathveek123/GLOWVAI-](https://github.com/Sathveek123/GLOWVAI-)
