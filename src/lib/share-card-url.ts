export type ShareTool = "bazi" | "i-ching" | "zodiac";

export interface ShareCardUrlOptions {
  baseUrl?: string;
  tool: ShareTool;
  params: Record<string, string | number | boolean | null | undefined>;
}

const DEFAULT_BASE_URL = "https://mingliatlas.com";
const SHARE_CARD_PATH = "/api/share-card";
const SUMMARY_MAX_LENGTH = 180;
const QUERY_VALUE_MAX_LENGTH = 80;

export function buildShareCardUrl({ baseUrl = DEFAULT_BASE_URL, tool, params }: ShareCardUrlOptions): string {
  const url = new URL(SHARE_CARD_PATH, normalizeBaseUrl(baseUrl));
  url.searchParams.set("tool", tool);

  for (const [key, value] of Object.entries(params)) {
    const encoded = encodeShareParam(value);
    if (encoded) {
      url.searchParams.set(key, encoded);
    }
  }

  return url.toString();
}

export function encodeShareParam(value: string | number | boolean | null | undefined): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return sanitizeShareText(String(value), QUERY_VALUE_MAX_LENGTH) || undefined;
}

export function sanitizeShareText(value: string, maxLength = SUMMARY_MAX_LENGTH): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeBaseUrl(baseUrl: string): string {
  try {
    return new URL(baseUrl).toString();
  } catch {
    return DEFAULT_BASE_URL;
  }
}
