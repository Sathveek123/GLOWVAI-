# GLOW VAI docs: index and decisions log

Each topic lives in exactly one file, so two docs cannot contradict each other.

| File | Owns |
|---|---|
| 01-DESIGN-SYSTEM.md | Colors, fonts, type scale, voice rules |
| 02-CLAIMS-AND-COMPLIANCE.md | Retailer claims, ASCI & DPDP compliance |
| 03-DATA-AND-PRIVACY.md | What we collect, optional photo consent, retention, DPDP |
| 04-API-AND-SHEETS.md | Endpoints, WhatsApp order intents, sheet columns, Apps Script |
| 05-FACE-ANALYSIS.md | Scan-then-lead flow, Glow Card personas, recommendations, Event Mode |
| 06-CHECKOUT-PLAN.md | WhatsApp ordering flow & payments roadmap |
| 07-ASSETS.md | Photo brief and AI image rules |

## Decisions log
| Decision | Detail |
|---|---|
| Palette | White background, Electric Blue #0050FF, Coral, Butter Yellow, Sky Mist, Ink |
| Retail Model | Independent retailer stocking **Minimalist** and **The Derma Co** (Excel database) |
| Face images | Processed on-device. Stored privately in cloud storage ONLY with separate consent |
| Scan Flow | Step 1: Scan Face -> Step 2: Gamified Glow Card -> Step 3: Data collection lead form |
| Checkout | Order on WhatsApp (`GV-YYMMDD-XXXX` reference + `/api/order-intent` logging) |
| Scores | Bounded 23–92 based on pixel luminance sampling with ±3 random offset |
| Event Mode | 4-question habit quiz fallback when `NEXT_PUBLIC_EVENT_MODE=quiz` |
| Founders | Sardhar (founder, vision), Rahimath (market explorer), Nalla Satvik (lead technologist) |
| Navbar | Single unified top bar + 120px wide SVG logo |
| Redirects | `/store` automatically redirects to `/shop` |
| Sheet tabs | Leads, OrderIntents, Waitlist, Feedback, Newsletter, Contact, DataRequests |

## Pre-launch checklist
- [x] Apps Script updated with `OrderIntents` tab and `migrateHeaders()` function
- [x] Single merged top bar in Navbar (removed stacked double bar)
- [x] High-definition 120px wide SVG Logo component integrated
- [x] WhatsApp order intent route (`/api/order-intent`) created with Zod validation
- [x] `/store` redirect page implemented to handle `/store` URL navigation cleanly
- [x] All references to "Drive" removed from site copy and privacy policies
- [x] Gen Z Glow Card personas deck created (`dew-drop`, `smooth-operator`, `even-steven`, `clear-skies`, `balanced-boss`)
- [x] Product recommendations sourced strictly from Minimalist & The Derma Co Excel database
- [x] `npm run build` compiled 100% cleanly
