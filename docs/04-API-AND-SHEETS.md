# API and Sheets

## Endpoints
| Method | Path | Tab | Notes |
|---|---|---|---|
| POST | /api/lead | Leads | Creates row, sets signed httpOnly cookie gv_session (2h) |
| PATCH | /api/lead | Leads | Needs cookie. Saves score, sub_scores, skin_concern |
| POST | /api/lead/image | Leads | Needs cookie. Uploads resized JPEG (about 800px, q0.8). Refused without image_consent |
| POST | /api/newsletter | Newsletter | Duplicates accepted silently |
| POST | /api/waitlist | Waitlist | |
| POST | /api/contact | Contact | |
| POST | /api/feedback | Feedback | status new |
| POST | /api/data-request | DataRequests | Generic reply, never reveals if a record exists |

## Rules for every route
Zod validation, honeypot field "website", per-IP rate limit (Upstash Redis in production),
Origin check, 4KB body limit (the image route has its own limit), no request bodies in logs.

## Session
Never trust a session_id in a request body. Next.js signs the id with HMAC (SESSION_SECRET),
stores it in an httpOnly, Secure, SameSite=Lax cookie, and verifies it on PATCH and image upload.

## Server to script
Next.js adds `secret` (SHEETS_SECRET) to the JSON body. Actions: create, upload_image, complete,
delete_user, append (with tab). The script fails closed if no SECRET property exists.

## Lead form fields
User provides: name, phone, skin concern, consent, image consent, age 18+.
Google sign-in provides email.
Server adds: ip, city, region, country, device, browser, os, timestamps, referrer, UTM.

## Env vars
SHEETS_WEBAPP_URL, SHEETS_SECRET, SESSION_SECRET, UPSTASH_REDIS_REST_URL,
UPSTASH_REDIS_REST_TOKEN, NEXT_PUBLIC_SITE_URL, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET.
Never commit them. If the webhook URL or secret ever appeared in git or a shared doc,
redeploy and rotate.

## Scale note
Sheets and Drive suit early traffic. Move to Postgres/Supabase plus object storage when scans
pass a few thousand a day. All access goes through /lib/storage so only one file changes.
