import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { isPreviewDeployment } from "@/lib/seo/environment";

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: [
      "*",
      "GPTBot",
      "OAI-SearchBot",
      "ChatGPT-User",
      "PerplexityBot",
      "ClaudeBot",
      "Claude-SearchBot",
      "anthropic-ai",
      "CCBot",
      "Google-Extended",
    ].map((userAgent) => ({
      userAgent,
      allow: ["/", "/api/share-card"],
      disallow: ["/api/", "/admin/"],
    })),
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
