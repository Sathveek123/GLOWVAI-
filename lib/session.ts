import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "gv_session";
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

function getSecret(): string {
  return process.env.SESSION_SECRET || "glow-vai-default-dev-hmac-secret-key-32-chars";
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(sessionId: string): string {
  const expiresAt = Date.now() + TWO_HOURS_MS;
  const payload = `${sessionId}:${expiresAt}`;
  const signature = sign(payload, getSecret());
  return `${payload}:${signature}`;
}

export function verifySessionToken(token: string): { valid: boolean; sessionId?: string } {
  if (!token || typeof token !== "string") return { valid: false };

  const parts = token.split(":");
  if (parts.length !== 3) return { valid: false };

  const [sessionId, expiresAtStr, signature] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return { valid: false };
  }

  const expectedSignature = sign(`${sessionId}:${expiresAtStr}`, getSecret());

  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedSignature, "hex");
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false };
    }
  } catch {
    return { valid: false };
  }

  return { valid: true, sessionId };
}

export async function setSessionCookie(sessionId: string) {
  const token = createSessionToken(sessionId);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7200, // 2 hours
  });
  return token;
}

export async function getSessionFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return null;

  const result = verifySessionToken(cookie.value);
  return result.valid && result.sessionId ? result.sessionId : null;
}
