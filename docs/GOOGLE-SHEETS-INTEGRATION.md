# GLOW VAI: Google Sheets Webhook Integration & Apps Script Deployment Guide

This document details the configuration, deployment, schema specifications, and security mechanisms powering GLOW VAI's Google Sheets lead and subscriber backend.

---

## 1. Active Webhook Endpoint

- **Production Endpoint URL**:
  `https://script.google.com/macros/s/AKfycbw1YFoq50OsTnyWaAJ0eX1hMKtfBt1qyqE-j-9qiwug5ZlJrvkmrSL2OMWKiwRqh2IV/exec`
- **Environment Variable**: `SHEETS_WEBAPP_URL` in `.env.local`
- **Source Script File**: [docs/google-apps-script.js](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/google-apps-script.js)

---

## 2. Multi-Tab Database Schema

The Google Apps Script automatically routes payloads based on the incoming `tab` or `action` parameter. If a tab does not exist in the connected Google Sheet, the script creates it automatically and appends the designated headers.

### Tab 1: `Leads` Sheet
Logs user lead information captured during `/face-analysis` scan flows.

| Column Header | Data Type | Description |
| :--- | :--- | :--- |
| `session_id` | String (UUID) | Unique lead session identifier |
| `created_at` | ISO Timestamp | Lead initiation time |
| `name` | String | User full name |
| `phone` | String | User phone number |
| `email` | String | User email address |
| `ip` | String | Anonymized user IP |
| `city` | String | User city |
| `region` | String | User state/region |
| `country` | String | User country |
| `device` | String | Mobile / Desktop / Tablet |
| `browser` | String | Chrome / Safari / Firefox |
| `os` | String | iOS / Android / Windows |
| `referrer` | String | HTTP referrer string |
| `utm_source` | String | Marketing UTM source parameter |
| `utm_campaign` | String | Marketing UTM campaign parameter |
| `consent` | Boolean | DPDP consent boolean (`true`/`false`) |
| `consent_at` | ISO Timestamp | Timestamp of consent submission |
| `status` | String | `pending` or `completed` |
| `completed_at` | ISO Timestamp | Timestamp of camera scan completion |
| `overall_score` | Number | Composite skin score (35 - 95) |
| `sub_scores` | JSON String | Breakdown of hydration, texture, tone, clarity |

### Tab 2: `Waitlist` Sheet
Logs pincode waitlist and early access shop unlock submissions.

| Column Header | Data Type | Description |
| :--- | :--- | :--- |
| `created_at` | ISO Timestamp | Submission timestamp |
| `email` | String | Subscriber email |
| `pincode` | String | 6-digit Indian postal code |
| `city` | String | Detected or user-entered city |
| `consent` | Boolean | Terms consent flag |
| `source` | String | `shop_gate` or `pincode_checker` |

### Tab 3: `Newsletter` Sheet
Logs footer and popup email newsletter subscriptions.

| Column Header | Data Type | Description |
| :--- | :--- | :--- |
| `created_at` | ISO Timestamp | Subscription timestamp |
| `email` | String | Subscriber email address |
| `source` | String | Form location tag (e.g. `footer_cta`) |
| `consent` | Boolean | Marketing consent flag |
| `consent_at` | ISO Timestamp | Consent submission time |

### Tab 4: `Feedback` Sheet
Logs customer review submissions.

| Column Header | Data Type | Description |
| :--- | :--- | :--- |
| `created_at` | ISO Timestamp | Review submission time |
| `first_name` | String | Customer name |
| `city` | String | Customer city |
| `skin_type` | String | Dry / Oily / Combination / Sensitive |
| `product` | String | Purchased product slug |
| `rating` | Number | Rating value (1 to 5) |
| `message` | String | Review content |
| `consent_to_publish`| Boolean | Consent to display review on site |
| `status` | String | `pending_moderation` or `approved` |

---

## 3. Security & Formula Injection Prevention

To prevent malicious CSV/Excel formula injection attacks via form fields:
```javascript
function sanitizeValue(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (/^[=+\-@]/.test(str)) {
    return "'" + str; // Prefixes single quote to neutralize executable commands
  }
  return str;
}
```

---

## 4. Deployment Steps for Custom Google Sheet

If you need to deploy this script on a new Google Sheet:

1. Open your Google Sheet.
2. Navigate to **Extensions** -> **Apps Script**.
3. Clear existing contents and paste the code from [docs/google-apps-script.js](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/docs/google-apps-script.js).
4. Navigate to **Project Settings** (Gear icon) -> **Script Properties** -> Add `SECRET` with a strong secret string.
5. Click **Deploy** -> **New Deployment**.
6. Set **Select type**: `Web app`.
7. Set **Execute as**: `Me`.
8. Set **Who has access**: `Anyone`.
9. Deploy, copy the resulting Web App URL, and update `SHEETS_WEBAPP_URL` in `.env.local`.
