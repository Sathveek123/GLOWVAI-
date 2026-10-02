# GLOW VAI docs: index and decisions log

Each topic lives in exactly one file, so two docs cannot contradict each other.

| File | Owns |
|---|---|
| 01-DESIGN-SYSTEM.md | Colors, fonts, type scale, voice rules |
| 02-CLAIMS-AND-COMPLIANCE.md | What the site may say, ASCI rules, claims.ts |
| 03-DATA-AND-PRIVACY.md | What we collect, image policy, retention, DPDP |
| 04-API-AND-SHEETS.md | Endpoints, sessions, sheet columns, Apps Script |
| 05-FACE-ANALYSIS.md | Flow, scoring engine, limits, bias testing |
| 06-CHECKOUT-PLAN.md | Payments plan |
| 07-ASSETS.md | Photo brief and AI image rules |

## Decisions log
| Decision | Detail |
|---|---|
| Palette | White background, Electric Blue #0050FF, Coral, Butter Yellow, tints, Ink |
| Face images | Stored privately in Google Drive, only with separate image consent |
| Scores | Only from analysis. Never randomized. Hero card is a labelled sample |
| Founders | Sardhar (founder, vision), Rahimath (market explorer), Nalla Satvik (lead technologist) |
| Section order | Hero, Trust strip, Face scan, Bestsellers, Shop by concern, Founder story, Values, Delivery, Testimonials, Journal, FAQ, Final CTA + newsletter, Footer |
| Under 18 | No data collected |
| Sheet tabs | Leads, Waitlist, Feedback, Newsletter, Contact, DataRequests |
| Status words | Leads: started, completed, anonymised. Others: new, handled |

## Pre-launch checklist (score gates)
- [ ] Apps Script replaced with docs/google-apps-script.js, redeployed, secret rotated
- [ ] Webhook URL only in .env, not in any doc or git history
- [ ] claims.ts matches 02 doc; no unverified claim visible on any page
- [ ] "Photo never stored" removed everywhere (search the repo for "never stored", "never uploaded", "zero photo")
- [ ] Image consent checkbox separate and unchecked by default
- [ ] PATCH and image upload use signed httpOnly cookie
- [ ] No "randomized" or "variance" score logic (search the repo)
- [ ] Privacy policy and terms reviewed by a lawyer
- [ ] Scan tested on a range of skin tones and lighting (record results in 05)
- [ ] Retention periods chosen, triggers installed
- [ ] Zero em-dashes (search the repo for the character)
- [ ] Lighthouse 95+ mobile on home, shop, product, face-analysis
