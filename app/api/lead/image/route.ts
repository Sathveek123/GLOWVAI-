import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";
import { storage } from "@/lib/storage";

export const maxDuration = 30; // 30s timeout for image uploads

export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get("gv_session")?.value;
  const verification = verifySessionToken(sessionCookie || "");

  const body = await req.json().catch(() => null);
  if (!body || !body.image_base64) {
    return NextResponse.json({ error: "Missing image data" }, { status: 400 });
  }

  // Use verified session ID, or session_id from request body, or fallback
  const sessionId = verification.valid && verification.sessionId
    ? verification.sessionId
    : body.session_id || "scan-session";

  try {
    const r = await storage.callSheet({
      action: "upload_image",
      session_id: sessionId,
      mime: body.mime || "image/jpeg",
      image_base64: body.image_base64,
    });

    return NextResponse.json({ ok: true, result: r });
  } catch (err) {
    console.error("Error uploading scan image (PII omitted):", String(err).slice(0, 100));
    return NextResponse.json({ ok: true, fallback: true });
  }
}
