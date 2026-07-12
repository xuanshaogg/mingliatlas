import { NextResponse, type NextRequest } from "next/server";
import { parseFormBody, subscriberSubmissionSchema } from "@/lib/forms/submissions";
import { getPrisma } from "@/lib/prisma";
import {
  checkRateLimit,
  getClientIdentifier,
  isSameOriginRequest,
  readLimitedBody,
} from "@/lib/security/request";

function errorRedirect(request: NextRequest, error: string, retryAfter?: number): NextResponse {
  const destination = new URL("/subscribe", request.url);
  destination.searchParams.set("error", error);
  const response = NextResponse.redirect(destination, 303);
  if (retryAfter) response.headers.set("Retry-After", String(retryAfter));
  return response;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isSameOriginRequest(request)) return errorRedirect(request, "invalid");

  const rateLimit = checkRateLimit("subscribe", getClientIdentifier(request), {
    limit: 10,
    windowMs: 60 * 60_000,
  });
  if (!rateLimit.allowed) return errorRedirect(request, "rate_limited", rateLimit.retryAfterSeconds);

  const rawBody = await readLimitedBody(request, 2 * 1024);
  const parsed = subscriberSubmissionSchema.safeParse(rawBody === null ? null : parseFormBody(rawBody));

  if (!parsed.success) return errorRedirect(request, "invalid");
  if (parsed.data.website) return NextResponse.redirect(new URL("/subscribe/success", request.url), 303);

  try {
    await getPrisma().subscriber.upsert({
      where: { email: parsed.data.email },
      create: { email: parsed.data.email },
      update: { subscribedAt: new Date(), unsubscribedAt: null },
    });
  } catch (error) {
    console.error("Subscription storage failed", error);
    return errorRedirect(request, "unavailable");
  }

  return NextResponse.redirect(new URL("/subscribe/success", request.url), 303);
}
