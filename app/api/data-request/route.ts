import { NextRequest, NextResponse } from "next/server";
import { dataRequestSchema } from "@/lib/schemas";
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
  return h.n > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = dataRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data request" }, { status: 400 });
  }

  const d = parsed.data;
  if (d.website) {
    return NextResponse.json({ success: true }); // Honeypot
  }

  const now = new Date().toISOString();

  try {
    await storage.callSheet({
      tab: "DataRequests",
      data: {
        created_at: now,
        contact: d.contact,
        type: d.type,
        details: d.details || "",
        status: "new",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your request has been received. Our data protection officer will review and process it within the timeframe set in our Privacy Policy.",
    });
  } catch {
    return NextResponse.json({ success: true });
  }
}
