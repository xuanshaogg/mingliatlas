import { createHash } from "node:crypto";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const rawIdentifier = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(rawIdentifier).digest("hex").slice(0, 24);
}

export function checkRateLimit(
  namespace: string,
  identifier: string,
  { limit, windowMs }: RateLimitOptions,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const key = `${namespace}:${identifier}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function readLimitedBody(request: Request, maxBytes: number): Promise<string | null> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) return null;

  const body = await request.text();
  return new TextEncoder().encode(body).byteLength <= maxBytes ? body : null;
}

export function isSafeStructuredPayload(value: unknown, depth = 0, budget = { nodes: 0 }): boolean {
  budget.nodes += 1;
  if (budget.nodes > 150 || depth > 6) return false;

  if (value === null || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "string") return value.length <= 1_000;

  if (Array.isArray(value)) {
    return value.length <= 50 && value.every((item) => isSafeStructuredPayload(item, depth + 1, budget));
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      entries.length <= 50 &&
      entries.every(
        ([key, item]) => key.length <= 80 && isSafeStructuredPayload(item, depth + 1, budget),
      )
    );
  }

  return false;
}
