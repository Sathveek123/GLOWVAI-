# Data and privacy

## What we collect
| Data | How | Why |
|---|---|---|
| Name, phone, skin concern | User enters (after scan) | Show report, contact about scan and orders |
| Email (optional) | User enters / form | Send report, customer service |
| Face image | Camera / upload, with separate image consent | Skin report, quality review |
| Scores and sub-scores | Analysis engine | Report, routine recommendations |
| IP, city, region, country | Server, from request | Location, fraud and abuse control |
| Browser, OS, device, timestamps | Server, from request | Compatibility, analytics |
| Referrer, UTM | URL | Marketing attribution |
| Consent records | Form | Proof of consent and DPDP version |

## Face image policy
- Processed locally in the browser.
- Uploaded only if `image_consent` is explicitly checked (separate checkbox, unchecked by default).
- Saved in secure private cloud storage for up to 90 days.
- Deleted automatically after retention period, or sooner upon user request.
- Never logged, never placed in public URLs, analytics, or localStorage.

## Retention
| Data | Rule |
|---|---|
| Face images | Delete after IMAGE_RETENTION_DAYS (default 90 days) |
| Lead PII (name, phone, email, IP) | Retained for up to 24 months from last interaction or until consent is withdrawn |
| Contact, DataRequests | Purge PII 90 days after resolution |
| Waitlist, Newsletter | Until consent is withdrawn |

## Rights and requests
Users can request access, correction, erasure, or withdraw consent via `/privacy#your-rights`,
which writes to the `DataRequests` tab. Erasure uses `delete_user`.

## Age Gate
The scan is for people 18 and over. Age confirmation is required before submitting the lead form.
