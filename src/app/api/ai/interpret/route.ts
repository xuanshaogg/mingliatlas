import { NextResponse } from "next/server";
import { z } from "zod";
import { buildInterpretationPrompt } from "@/lib/ai/prompt";
import {
  checkRateLimit,
  getClientIdentifier,
  isSafeStructuredPayload,
  isSameOriginRequest,
  readLimitedBody,
} from "@/lib/security/request";

const requestSchema = z.object({
  tool: z.enum(["bazi", "i-ching", "zodiac-compatibility"]),
  payload: z.unknown().refine(isSafeStructuredPayload, "Payload is too large or deeply nested."),
});

const providerUrl = process.env.AI_PROVIDER_BASE_URL;
const providerKey = process.env.AI_PROVIDER_API_KEY;
const providerModel = process.env.AI_PROVIDER_MODEL ?? "gpt-5.5";
const isEnabled = process.env.AI_INTERPRETATION_ENABLED === "true";
const maxRequestBytes = 16 * 1024;

export async function POST(request: Request) {
  if (!isEnabled) {
    return NextResponse.json(
      {
        status: "disabled",
        message: "AI interpretation is not currently available. The deterministic calculator result is still available.",
      },
      { status: 503, headers: { "Retry-After": "86400" } },
    );
  }

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  const rateLimit = checkRateLimit("ai-interpret", getClientIdentifier(request), {
    limit: 5,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many interpretation requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const rawBody = await readLimitedBody(request, maxRequestBytes);
  if (rawBody === null) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }

  const parsed = requestSchema.safeParse(
    (() => {
      try {
        return JSON.parse(rawBody);
      } catch {
        return null;
      }
    })(),
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid interpretation request.", details: "Expected tool and structured payload fields." },
      { status: 400 },
    );
  }

  if (!providerUrl || !providerKey) {
    return NextResponse.json(
      {
        status: "disabled",
        message: "AI interpretation is not configured yet. The deterministic calculator result is still available.",
        disclaimer: "For entertainment and self-reflection purposes.",
      },
      { status: 503 },
    );
  }

  const prompt = buildInterpretationPrompt(parsed.data);

  try {
    const response = await fetch(`${providerUrl.replace(/\/$/, "")}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${providerKey}`,
      },
      body: JSON.stringify({
        model: providerModel,
        messages: [
          { role: "system", content: prompt.system },
          { role: "user", content: prompt.user },
        ],
        temperature: 0.4,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "unavailable",
          message: "AI interpretation is temporarily unavailable. Please use the deterministic result for now.",
          disclaimer: "For entertainment and self-reflection purposes.",
        },
        { status: 502 },
      );
    }

    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const interpretation = data.choices?.[0]?.message?.content;

    if (!interpretation) {
      return NextResponse.json(
        {
          status: "unavailable",
          message: "AI interpretation returned an empty response. Please use the deterministic result for now.",
          disclaimer: "For entertainment and self-reflection purposes.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      status: "ok",
      interpretation,
      disclaimer: "For entertainment and self-reflection purposes.",
    });
  } catch {
    return NextResponse.json(
      {
        status: "unavailable",
        message: "AI interpretation is temporarily unavailable. Please use the deterministic result for now.",
        disclaimer: "For entertainment and self-reflection purposes.",
      },
      { status: 502 },
    );
  }
}
