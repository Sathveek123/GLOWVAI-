import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { leadFormSchema, leadPatchSchema } from "@/lib/schemas";
import { setSessionCookie, verifySessionToken } from "@/lib/session";
import { storage } from "@/lib/storage";

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n++;
  return h.n > 10;
}

function parseUA(ua: string) {
  const device = /mobile|android|iphone/i.test(ua)
    ? "mobile"
    : /ipad|tablet/i.test(ua)
    ? "tablet"
    : "desktop";
  const browser = /edg/i.test(ua)
    ? "Edge"
    : /chrome/i.test(ua)
    ? "Chrome"
    : /safari/i.test(ua)
    ? "Safari"
    : /firefox/i.test(ua)
    ? "Firefox"
    : "Other";
  const os = /android/i.test(ua)
    ? "Android"
    : /iphone|ipad|ios/i.test(ua)
    ? "iOS"
    : /windows/i.test(ua)
    ? "Windows"
    : /mac/i.test(ua)
    ? "macOS"
    : "Other";
  return { device, browser, os };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many tries. Wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Security checks: Content-Type & Origin
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid Content-Type" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = req.headers.get("origin") || req.headers.get("referer");
  if (siteUrl && origin && !origin.startsWith(siteUrl)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const d = parsed.data;
  if (d.website) {
    return NextResponse.json({ ok: true, session_id: "bot" }); // Honeypot bot protection
  }

  const session_id = randomUUID();
  const now = new Date().toISOString();
  const ua = parseUA(req.headers.get("user-agent") || "");

  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "Hyderabad");
  const region = req.headers.get("x-vercel-ip-country-region") || "Telangana";
  const country = req.headers.get("x-vercel-ip-country") || "India";

  // Normalize phone to E.164 string format (+91...)
  let normalizedPhone = d.phone.replace(/[^0-9+]/g, "");
  if (!normalizedPhone.startsWith("+")) {
    normalizedPhone = `+91${normalizedPhone.slice(-10)}`;
  }

  try {
    const r = await storage.callSheet({
      action: "create",
      tab: "Leads",
      data: {
        session_id,
        created_at: now,
        completed_at: now,
        name: d.name,
        phone: normalizedPhone,
        email: d.email || "",
        skin_concern: d.skinConcern || "",
        image_base64: d.image_base64 || "",
        ip: ip === "127.0.0.1" ? "" : ip,
        city,
        region,
        country,
        ...ua,
        referrer: d.referrer ? d.referrer.slice(0, 100) : "",
        utm_source: d.utm_source ? d.utm_source.slice(0, 100) : "",
        utm_campaign: d.utm_campaign ? d.utm_campaign.slice(0, 100) : "",
        consent: "yes",
        consent_at: now,
        consent_version: d.consentVersion || "v2",
        image_consent: d.imageConsent ? "yes" : "no",
        marketing_opt_in: d.marketingOptIn ? "yes" : "no",
        age_confirmed: d.ageConfirmed ? "yes" : "no",
        overall_score: body?.overall_score ?? 75,
        sub_scores: body?.sub_scores ? JSON.stringify(body.sub_scores) : "",
        scan_type: body?.scan_type || "camera",
        persona: body?.persona || "dew-drop",
        glow_level: body?.glow_level || 4,
        scan_count: 1,
        status: "completed",
      },
    });

    if (!r.ok) throw new Error(r.error || "Storage failed");

    // Set HMAC signed httpOnly cookie
    await setSessionCookie(session_id);

    return NextResponse.json({ ok: true, session_id, sessionId: session_id });
  } catch (err) {
    console.error("Error creating lead record (PII omitted):", String(err).slice(0, 100));
    await setSessionCookie(session_id);
    return NextResponse.json({ ok: true, session_id, sessionId: session_id }); // Resilient fallback
  }
}

export async function PATCH(req: NextRequest) {
  // HMAC Cookie signature verification (never trust session_id in request body)
  const sessionCookie = req.cookies.get("gv_session")?.value;
  const verification = verifySessionToken(sessionCookie || "");

  if (!verification.valid || !verification.sessionId) {
    return NextResponse.json(
      { error: "Unauthorized session or expired token" },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = leadPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid score data" }, { status: 400 });
  }

  try {
    const r = await storage.callSheet({
      action: "complete",
      tab: "Leads",
      session_id: verification.sessionId,
      overall_score: parsed.data.overall_score,
      sub_scores: parsed.data.sub_scores,
      skin_concern: parsed.data.skin_concern || "",
    });

    if (!r.ok) throw new Error(r.error || "Patch failed");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error updating scan completion (PII omitted):", String(err).slice(0, 100));
    return NextResponse.json({ ok: true }); // Resilient fallback
  }
}
