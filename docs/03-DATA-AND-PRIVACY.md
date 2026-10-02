# Data and privacy

## What we collect
| Data | How | Why |
|---|---|---|
| Name, phone, skin concern | User enters | Show report, contact about scan and orders |
| Email | Google sign-in | Send report, account |
| Face image | Camera, with separate image consent | Skin report, quality review |
| Scores and sub-scores | Analysis engine | Report, recommendations |
| IP, city, region, country | Server, from request | Location, fraud and abuse control. IP is stored as collected |
| Browser, OS, device, timestamps | Server, from request | Compatibility, analytics |
| Referrer, UTM | URL | Marketing attribution |
| Consent records | Form | Proof of consent and version |

## Face image policy
- Stored in a private Google Drive folder owned by the business account.
- Uploaded only if image_consent is yes (separate checkbox, unchecked by default).
- Only the latest image per session is kept (a retake replaces the old one).
- Deleted automatically after IMAGE_RETENTION_DAYS (default 90, lawyer to confirm).
- Deleted on request through delete_user, which removes the sheet row and the file.
- Folder access: owner plus named staff only. Never share a public link.
- Never logged, never placed in URLs, analytics, or localStorage.

## Retention
| Data | Rule |
|---|---|
| Face images | Delete after IMAGE_RETENTION_DAYS |
| Lead PII (name, phone, email, IP) | Replace with [REMOVED] after LEAD_RETENTION_DAYS (default 180) unless an active customer |
| Contact, DataRequests | Purge PII 90 days after resolution |
| Waitlist, Newsletter | Until consent is withdrawn |
Periods are set in Script Properties. Founders and their lawyer choose the final numbers.

## Rights and requests
Users can request access, correction, erasure, or withdraw consent via /privacy#your-rights,
which writes to the DataRequests tab. Reply within the period stated in the privacy policy.
Erasure uses delete_user.

## Age
The scan is for people 18 and over. If the user does not confirm 18+, no data is collected.

## Lawyer review required
The privacy policy and terms must say that face images are stored, why, for how long, who can
access them, and that processors include Google (Sheets, Drive) and the hosting provider.
Face images are sensitive, so get this reviewed before launch.
