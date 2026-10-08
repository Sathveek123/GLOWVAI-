# GLOW VAI Landing Page (glowvai.in) - Comprehensive End-to-End Audit & Updates Log

**Last Updated**: October 9, 2026  
**Environment**: Production (`https://glowvai.in`)  
**Deployment Target**: GitHub Pages (`gh-pages`)  
**Domain**: `glowvai.in`  

---

## 1. Executive Summary & Audit Overview

This document presents a complete 15-minute end-to-end audit and implementation log for **GLOW VAI** (`glowvai.in`), an AI-first hyper-local skincare platform delivering personalized routines and authorized Minimalist & The Derma Co products to Vijayawada, Andhra Pradesh within 15 minutes.

---

## 2. Core Feature Audit & Technical Architecture

### 2.1 AI Face Scanner Engine & Shutter Mechanics
- **Component**: [`app/face-analysis/page.tsx`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/face-analysis/page.tsx)
- **Engine**: [`lib/analysis/engine.ts`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/analysis/engine.ts)
- **Camera Frame**: Broader widescreen container (`w-full max-w-3xl h-80 sm:h-96 rounded-3xl`) featuring a **vertical portrait head/face alignment oval guide** (`w-48 sm:w-56 h-60 sm:h-72 rounded-[50%]`).
- **Shutter Control**: Manual shutter button (`📷 Click Shutter / Take Photo`) giving users full control over frame capture.
- **Real Face Detection**:
  - Analyzes RGB skin-tone chrominance and spatial pixel coverage.
  - If no face is present, displays a dedicated **Face Not Found Error** banner and **completely blocks zero-score report rendering**.

### 2.2 Demographic-Based Baseline Scoring Rules
Score calculation is strictly anchored to user-selected demographics:
- 👦 **Boy (Under 18)**: Baseline Score `68`
- 👦 **Boy (Aged 18–21)**: Baseline Score `72`
- 👨 **Middle-aged Man**: Baseline Score `70`
- 👴 **Older Man**: Baseline Score `66`
- 👵 **Older Woman**: Baseline Score `68`
- 👧 **Girl (Under 18)**: Baseline Score `69`
- 👧 **Girl (Aged 18–23)**: Baseline Score `74`
- ✨ **Bright / Well-lit Face**: Baseline Score `76`

*Sub-scores (Hydration, Texture, Tone, Clarity) are derived deterministically around the baseline score, preventing any zero-score rendering bugs.*

### 2.3 Real Client Data Collection & Verification
- **Real IP Collection**: Fetched dynamically via `api.ipify.org` & `ipapi.co` ([`lib/clientInfo.ts`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/clientInfo.ts)).
- **OS Geolocation Permission**: Triggered simultaneously with camera access (`navigator.geolocation.getCurrentPosition`), reverse-geocoding precise city & state (e.g., `"Vijayawada, Andhra Pradesh"`).
- **User Agent Parsing**: Parsed into clean, human-readable strings (e.g., `"Chrome 122 on Android"`, `"Safari 17 on iOS"`).
- **Strict Mobile Phone Validation**: RegEx validation (`/^[6-9]\d{9}$/`) ensuring valid 10-digit Indian phone numbers.

### 2.4 Google Apps Script Backend Integration
- **Endpoint**: `https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec`
- Sends complete session records including session ID, name, validated phone, email, demographic choice, skin goal, score breakdown, reverse-geocoded location, client IP, parsed browser/OS, and base64 image data.

---

## 3. Site-Wide Ecosystem & Branding Updates

### 3.1 Delivery City & Location Target
- **Primary Delivery Target**: **Vijayawada, Andhra Pradesh**.
- Configured across site metadata ([`config/site.ts`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/config/site.ts)), location engine ([`lib/location.ts`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/location.ts)), and header announcement bar ([`components/layout/AnnouncementBar.tsx`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/layout/AnnouncementBar.tsx)).

### 3.2 Referral Program & Vendor Network
- **Referral Portal**: Linked directly to **[`https://earn.glowvai.in/portal.html`](https://earn.glowvai.in/portal.html)** offering ₹100 instant wallet cash per friend referral.
- **Vendor Network**: Promotes hyper-local authorized pharmacy and cosmetics hubs in Vijayawada for 15-minute doorstep dispatch.

### 3.3 Hero Headline & Subheadline
- **Main H1 Headline**:
  > *"Your bestie says you’re **glowing**. Let’s see if your skin agrees. 👀"*
- **Subheadline**:
  > *"Scan your face in 30 seconds for an instant diagnostic & personalized routine. Delivered to your doorstep in 15 minutes."*

### 3.4 Navigation System
- Integrated standard GLOW VAI Header & Navbar ([`components/layout/HeaderAndFooterWrapper.tsx`](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/components/layout/HeaderAndFooterWrapper.tsx)) consistently across all pages including `/face-analysis`.

---

## 4. Verification & Build Audit

| Verification Metric | Result | Notes |
| :--- | :--- | :--- |
| **TypeScript Compilation** | ✅ Passed | `0 errors` |
| **Next.js Static Build** | ✅ Passed | All 28 routes static/SSG prerendered |
| **GitHub Pages Deploy** | ✅ Published | Branch `gh-pages` active |
| **Live Domain Check** | ✅ Live | `https://glowvai.in` |

---

## 5. Summary of Modified Files

1. `app/face-analysis/page.tsx`: Scanner UI, shutter click, vertical portrait oval overlay, client data payload.
2. `lib/analysis/engine.ts`: Face detection logic and demographic-based baseline scoring.
3. `lib/clientInfo.ts`: Client IP fetching, OS geolocation permission, and user agent parsing.
4. `components/sections/Hero.tsx`: Main hero headline and subheadline updates.
5. `components/sections/ReferralAndVendorSection.tsx`: 5-feature ecosystem cards and referral link.
6. `components/layout/HeaderAndFooterWrapper.tsx`: Universal navbar and header wrapper.
7. `config/site.ts`: Site-wide default city set to Vijayawada, AP.
8. `config/content.ts`: Updated hero content strings.
9. `app/our-story/page.tsx`: Clean original layout preserved per user instruction.
