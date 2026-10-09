# Glowvai Auto Campaign — Partner Portal & Referral Network

**Live URL:** https://vaivaanith.in

This is the standalone deployment repo for the **Glowvai Transit & Campus Referral Network**.

---

## 🗂️ File Structure

```
index.html      → QR Scan Gateway (vaivaanith.in/?ref=PARTNER_ID)
portal.html     → Partner Registration Portal (Driver + Student)
CNAME           → Custom domain: vaivaanith.in
```

## 🔄 How It Works

1. **Driver/Student registers** at `vaivaanith.in/portal.html`
2. They get a **unique QR code** encoding `vaivaanith.in/?ref=GLV-AUTO-XXX-YYYY`
3. Passenger **scans QR** → lands on `index.html`
4. `index.html` logs IP, location, OS to Google Sheets + Firestore, then **redirects to Nykaa Play Store in < 0.8s**
5. Driver/Student **dashboard updates in real-time** via Firestore `onSnapshot`

## 📊 Data Architecture

- **Google Sheets (4 tabs):** Driver Details, Driver Referred Users, Student Details, Student Referred Users
- **Firestore:** Real-time scan counters per partner (`referralPartners/{partnerId}`)
- **Firebase Storage:** KYC photos (selfie + license/ID card)

## 🚀 Deployment

Deployed via **GitHub Pages** with custom domain `vaivaanith.in`.

```bash
git add -A
git commit -m "update"
git push origin main
```

## 🔧 Backend

Google Apps Script (Sheets macro) handles:
- `REGISTER_DRIVER` / `REGISTER_STUDENT` → assigns sequential unique ID with secure suffix
- `LOG_REFERRAL` → logs scan telemetry to the right tab
- `GET_PARTNER_STATS` → returns live referral counts for dashboard polling

---

© 2026 Glowvai Technologies. All rights reserved.
