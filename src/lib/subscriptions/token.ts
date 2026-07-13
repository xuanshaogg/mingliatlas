import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE } from "@/lib/constants";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1_000;

export type SubscriptionTokenPurpose = "confirm" | "unsubscribe";

interface TokenPayload {
  email: string;
  purpose: SubscriptionTokenPurpose;
  issuedAt: number;
}

function tokenSecret(): string | null {
  return process.env.SUBSCRIPTION_TOKEN_SECRET?.trim() || null;
}

export function createSubscriptionToken(email: string, purpose: SubscriptionTokenPurpose): string | null {
  const secret = tokenSecret();
  if (!secret) return null;

  const payload: TokenPayload = { email, purpose, issuedAt: Date.now() };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function readSubscriptionToken(token: string | null, purpose: SubscriptionTokenPurpose): string | null {
  const secret = tokenSecret();
  if (!secret || !token) return null;

  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) return null;

  const expectedSignature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  const received = Buffer.from(encodedSignature);
  const expected = Buffer.from(expectedSignature);
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as TokenPayload;
    if (payload.purpose !== purpose || Date.now() - payload.issuedAt > TOKEN_TTL_MS) return null;
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

export function buildSubscriptionUrl(email: string, purpose: SubscriptionTokenPurpose): string | null {
  const token = createSubscriptionToken(email, purpose);
  if (!token) return null;

  const path = purpose === "confirm" ? "/api/subscribe/confirm" : "/api/subscribe/unsubscribe";
  return `${SITE.url}${path}?token=${encodeURIComponent(token)}`;
}
