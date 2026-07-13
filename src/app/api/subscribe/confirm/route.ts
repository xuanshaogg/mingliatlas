import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/resend";
import { getPrisma } from "@/lib/prisma";
import { buildSubscriptionUrl, readSubscriptionToken } from "@/lib/subscriptions/token";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/request";

function redirect(request: NextRequest, status: string): NextResponse {
  const destination = new URL("/subscribe/confirmed", request.url);
  destination.searchParams.set("status", status);
  return NextResponse.redirect(destination, 303);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const rateLimit = checkRateLimit("subscribe-confirm", getClientIdentifier(request), { limit: 10, windowMs: 10 * 60_000 });
  if (!rateLimit.allowed) return redirect(request, "rate-limited");

  const email = readSubscriptionToken(new URL(request.url).searchParams.get("token"), "confirm");
  if (!email) return redirect(request, "invalid");

  try {
    const result = await getPrisma().subscriber.updateMany({
      where: { email, unsubscribedAt: null },
      data: { verified: true, subscribedAt: new Date() },
    });
    if (result.count !== 1) return redirect(request, "invalid");

    const unsubscribeUrl = buildSubscriptionUrl(email, "unsubscribe");
    const delivery = await sendEmail({
      to: email,
      subject: "Welcome to mingliatlas",
      html: `<p>Your mingliatlas subscription is confirmed.</p><p>We will share practical explainers, seasonal notes, and new free tools.</p>${unsubscribeUrl ? `<p><a href="${unsubscribeUrl}">Unsubscribe at any time</a></p>` : ""}`,
    });
    return redirect(request, delivery.sent ? "confirmed" : "confirmed-no-email");
  } catch (error) {
    console.error("Subscription confirmation failed", error);
    return redirect(request, "unavailable");
  }
}
