import { NextResponse, type NextRequest } from "next/server";
import { contactSubmissionSchema, parseFormBody } from "@/lib/forms/submissions";
import { getPrisma } from "@/lib/prisma";
import { escapeHtml, sendEmail } from "@/lib/email/resend";
import {
  checkRateLimit,
  getClientIdentifier,
  isSameOriginRequest,
  readLimitedBody,
} from "@/lib/security/request";

function errorRedirect(request: NextRequest, error: string, retryAfter?: number): NextResponse {
  const destination = new URL("/contact", request.url);
  destination.searchParams.set("error", error);
  const response = NextResponse.redirect(destination, 303);
  if (retryAfter) response.headers.set("Retry-After", String(retryAfter));
  return response;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isSameOriginRequest(request)) return errorRedirect(request, "invalid");

  const rateLimit = checkRateLimit("contact", getClientIdentifier(request), {
    limit: 5,
    windowMs: 10 * 60_000,
  });
  if (!rateLimit.allowed) return errorRedirect(request, "rate_limited", rateLimit.retryAfterSeconds);

  const rawBody = await readLimitedBody(request, 12 * 1024);
  const parsed = contactSubmissionSchema.safeParse(rawBody === null ? null : parseFormBody(rawBody));

  if (!parsed.success) return errorRedirect(request, "invalid");

  // Honeypot submissions receive a neutral success response without reaching storage.
  if (parsed.data.website) return NextResponse.redirect(new URL("/contact/submit/success", request.url), 303);

  try {
    await getPrisma().contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    });

    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL?.trim();
    if (notificationEmail) {
      await sendEmail({
        to: notificationEmail,
        replyTo: parsed.data.email,
        subject: `New mingliatlas contact message from ${parsed.data.name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p><p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(parsed.data.message).replace(/\n/g, "<br />")}</p>`,
      });
    }
  } catch (error) {
    console.error("Contact submission storage failed", error);
    return errorRedirect(request, "unavailable");
  }

  return NextResponse.redirect(new URL("/contact/submit/success", request.url), 303);
}
