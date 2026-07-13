import { z } from "zod";

const emailSchema = z.string().trim().max(254).email().transform((value) => value.toLowerCase());

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: emailSchema,
  message: z.string().trim().min(10).max(5_000),
  website: z.string().max(200).optional().default(""),
});

export const subscriberSubmissionSchema = z.object({
  email: emailSchema,
  source: z.enum(["footer", "subscribe_page", "knowledge_page", "bazi_chart", "unknown"]).optional().default("unknown"),
  website: z.string().max(200).optional().default(""),
});

export const unsubscribeSubmissionSchema = z.object({
  email: emailSchema,
  website: z.string().max(200).optional().default(""),
});

export function parseFormBody(body: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(body));
}
