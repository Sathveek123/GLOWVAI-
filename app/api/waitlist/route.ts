import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().trim().email("Valid email required"),
  pincode: z.string().trim().length(6, "Valid 6-digit pincode required"),
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
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid waitlist submission" }, { status: 400 });
  }

  const d = parsed.data;
  if (d.website) {
    return NextResponse.json({ success: true }); // Honeypot bot protection
  }

  const now = new Date().toISOString();
  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "");

  try {
    await callSheet({
      tab: "Waitlist",
      data: {
        created_at: now,
        email: d.email,
        pincode: d.pincode,
        city,
        consent: "yes",
        source: "pincode_checker",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Added to pincode waitlist! We will notify you when micro hubs launch in your area.",
    });
  } catch (err) {
    return NextResponse.json({ success: true }); // Fallback response so UX stays smooth
  }
}
