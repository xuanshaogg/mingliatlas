import { NextResponse, type NextRequest } from "next/server";
import { parseFormBody, unsubscribeSubmissionSchema } from "@/lib/forms/submissions";
import { getPrisma } from "@/lib/prisma";
import { readSubscriptionToken } from "@/lib/subscriptions/token";
import {
  checkRateLimit,
  getClientIdentifier,
  isSameOriginRequest,
  readLimitedBody,
} from "@/lib/security/request";

function redirect(request: NextRequest, status: string): NextResponse {
  const destination = new URL("/unsubscribe", request.url);
  destination.searchParams.set("status", status);
  return NextResponse.redirect(destination, 303);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isSameOriginRequest(request)) return redirect(request, "unavailable");

  const rateLimit = checkRateLimit("unsubscribe", getClientIdentifier(request), {
    limit: 5,
    windowMs: 60 * 60_000,
  });
  if (!rateLimit.allowed) return redirect(request, "rate_limited");

  const rawBody = await readLimitedBody(request, 2 * 1024);
  const parsed = unsubscribeSubmissionSchema.safeParse(rawBody === null ? null : parseFormBody(rawBody));

  if (!parsed.success || parsed.data.website) return redirect(request, "done");

  try {
    await getPrisma().subscriber.updateMany({
      where: { email: parsed.data.email },
      data: { unsubscribedAt: new Date() },
    });
  } catch (error) {
    console.error("Subscription removal failed", error);
    return redirect(request, "unavailable");
  }

  // Always show the same result for known and unknown addresses.
  return redirect(request, "done");
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const rateLimit = checkRateLimit("unsubscribe-token", getClientIdentifier(request), {
    limit: 10,
    windowMs: 10 * 60_000,
  });
  if (!rateLimit.allowed) return redirect(request, "rate_limited");

  const email = readSubscriptionToken(new URL(request.url).searchParams.get("token"), "unsubscribe");
  if (!email) return redirect(request, "unavailable");

  try {
    await getPrisma().subscriber.updateMany({ where: { email }, data: { unsubscribedAt: new Date() } });
    return redirect(request, "done");
  } catch (error) {
    console.error("Subscription removal failed", error);
    return redirect(request, "unavailable");
  }
}
