# GLOW VAI: System Architecture & Technical Specifications

This document details the high level technical architecture, state management, session lifecycle, data flow pipelines, and compliance guarantees powering the **GLOW VAI** platform.

---

## 1. Executive Technical Overview

GLOW VAI is built as a unified, client-accelerated Next.js 16 App Router application. It operates under a strict privacy-first directive: sensitive biometric facial data is processed locally within the browser context and is never transmitted over network protocols.

```
+-----------------------------------------------------------------------+
|                            USER BROWSER                               |
|                                                                       |
|  +------------------+   +-------------------+   +------------------+  |
|  | WebCam / Canvas  | --> | Local Heuristics  | --> | Recommendations  |  |
|  | Frame Buffer     |   | Engine (On-Device)|   | Routine Engine   |  |
|  +------------------+   +-------------------+   +------------------+  |
|           |                                               |           |
|     (Raw Frames)                                   (Skin Metrics)     |
|   [DISCARDED IN-RAM]                              [ENCRYPTED COOKIE]  |
|                                                           |           |
+-----------------------------------------------------------|-----------+
                                                            |
                                                   (Session & Form Lead)
                                                            v
+-----------------------------------------------------------------------+
|                      NEXT.JS 16 ROUTE HANDLERS                        |
|                                                                       |
|   /api/lead  |  /api/newsletter  |  /api/contact  |  /api/waitlist    |
|                                                                       |
|            +-------------------------------------------+              |
|            | Zod Schema Validation & Sanitization      |              |
|            +-------------------------------------------+              |
|                                  |                                    |
+----------------------------------|------------------------------------+
                                   | (HTTPS POST Webhook)
                                   v
+-----------------------------------------------------------------------+
|                     GOOGLE APPS SCRIPT WEB APP                        |
|                                                                       |
|     Logs to Spreadsheets: Leads | Waitlist | Newsletter | Feedback    |
+-----------------------------------------------------------------------+
```

---

## 2. Privacy-First Biometric Architecture

### Zero Photo Storage Guarantee
1. **HTML5 MediaStream API**: Camera feed frames are captured into an ephemeral HTML5 `<canvas>` element.
2. **On-Device Pixel Analysis**: The heuristic analysis engine ([lib/analysis/engine.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/analysis/engine.ts)) reads raw RGBA pixel arrays directly from memory.
3. **Immediate Frame Destruction**: As soon as pixel luminance, red-intensity variance, and highlight reflections are computed, the frame buffer is cleared (`context.clearRect()`).
4. **No Server Transmission**: The Next.js API endpoints (`/api/lead`) explicitly block binary payload fields. Only text metrics (`overall_score`, `sub_scores`) are accepted.

---

## 3. Session & Lead Lifecycle Management

Lead tracking uses secure, HTTP-only cookies and local storage tokens managed by [lib/session.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/session.ts):

### Lead State Machine

```
   +-------------------------------------------------------+
   | 1. ANONYMOUS VISITOR                                  |
   | Session Cookie: gv_session_id (UUID v4 created)       |
   +-------------------------------------------------------+
                               |
                               v (Fills /face-analysis initial step)
   +-------------------------------------------------------+
   | 2. PENDING LEAD                                       |
   | POST /api/lead -> Logs lead meta to Google Sheets     |
   | Cookie: gv_lead_status = "pending"                    |
   +-------------------------------------------------------+
                               |
                               v (Completes camera scan)
   +-------------------------------------------------------+
   | 3. COMPLETED LEAD                                     |
   | PATCH /api/lead -> Updates score in Google Sheets     |
   | Cookie: gv_lead_status = "completed"                  |
   +-------------------------------------------------------+
```

---

## 4. State Management Layer

The application utilizes specialized lightweight state containers:

1. **Cart Store ([lib/store/cartStore.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/store/cartStore.ts))**: React hook backed by local storage persistence managing cart items, selected sizes, quantities, and pin-code verification status.
2. **Shop Early Access Gate State**: Session storage key `gv_shop_unlocked` toggling frosted glass blur on [/shop](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/shop/page.tsx).
3. **Pin-Code Checker Context**: Synchronizes active location across Navbar, Hero, and Product detail pages.

---

## 5. Security & Sanitization Protocols

- **Formula Injection Prevention**: All incoming inputs to Google Sheets are processed through `sanitizeValue()`, prefixing single quotes to characters (`=`, `+`, `-`, `@`) that could execute formulas.
- **Zod Schema Validation**: Every API route enforces strict Zod schemas ([lib/schemas.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/schemas.ts)) before executing business logic.
- **Header & Secret Verification**: API route requests append `X-GLOWVAI-SECRET` headers to validate server-to-server webhook authenticity.

---

## 6. DPDP Act 2023 Data Rights Compliance

In compliance with India's Digital Personal Data Protection (DPDP) Act 2023:
- Users can request complete erasure or export of logged contact data via `/privacy` data request controls.
- `/api/data-request` processes data requests, setting an audit record in the Google Sheets database.
- Explicit age consent gates block users under 18 from initiating camera scans without guardian consent.
