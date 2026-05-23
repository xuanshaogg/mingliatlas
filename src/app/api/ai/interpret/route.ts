import { NextResponse } from "next/server";
import { z } from "zod";
import { buildInterpretationPrompt } from "@/lib/ai/prompt";

const requestSchema = z.object({
  tool: z.enum(["bazi", "i-ching", "zodiac-compatibility"]),
  payload: z.unknown(),
});

const providerUrl = process.env.AI_PROVIDER_BASE_URL;
const providerKey = process.env.AI_PROVIDER_API_KEY;
const providerModel = process.env.AI_PROVIDER_MODEL ?? "gpt-5.5";

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));

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
