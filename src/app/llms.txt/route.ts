import { NextResponse } from "next/server";
import { buildLlmsText } from "@/lib/seo/llms";

export const dynamic = "force-static";

export function GET(): NextResponse {
  return new NextResponse(buildLlmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
