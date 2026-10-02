import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";
import { storage } from "@/lib/storage";

export async function POST(req: NextRequest) {
  // HMAC Cookie signature verification
  const sessionCookie = req.cookies.get("gv_session")?.value;
  const verification = verifySessionToken(sessionCookie || "");

  if (!verification.valid || !verification.sessionId) {
    return NextResponse.json(
      { error: "Unauthorized session or expired token" },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.image_base64) {
    return NextResponse.json({ error: "Missing image data" }, { status: 400 });
  }

  try {
    const r = await storage.callSheet({
      action: "upload_image",
      session_id: verification.sessionId,
      mime: body.mime || "image/jpeg",
      image_base64: body.image_base64,
    });

    if (!r.ok) {
      return NextResponse.json({ error: r.error || "Upload failed" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error uploading scan image (PII omitted):", String(err).slice(0, 100));
    return NextResponse.json({ error: "Server upload error" }, { status: 500 });
  }
}
