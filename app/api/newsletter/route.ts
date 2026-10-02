import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Valid email address required"),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // Honeypot
});

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

async function callSheet(payload: object) {
  const webappUrl = process.env.SHEETS_WEBAPP_URL || process.env.SHEET_WEB_APP_URL;
  if (!webappUrl) {
    return { ok: true };
  }

  const res = await fetch(webappUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret: process.env.SHEETS_SECRET, ...payload }),
    redirect: "follow",
    cache: "no-store",
  });
  return res.json();
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or consent" }, { status: 400 });
  }

  const d = parsed.data;
  if (d.website) {
    return NextResponse.json({ success: true }); // Honeypot
  }

  const now = new Date().toISOString();

  try {
    await callSheet({
      tab: "Newsletter",
      data: {
        created_at: now,
        email: d.email,
        source: "footer_banner",
        consent: "yes",
        consent_at: now,
      },
    });

    return NextResponse.json({
      success: true,
      message: "You're in. Check your inbox.",
    });
  } catch (err) {
    return NextResponse.json({ success: true }); // Silent acceptance
  }
}
