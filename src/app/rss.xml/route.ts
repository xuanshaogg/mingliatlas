import { NextResponse } from "next/server";
import { allBlogPosts } from "@/content/blog/posts";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rssDate(date: string | undefined): string {
  const safeDate = date ?? "2026-05-23";
  return new Date(`${safeDate}T00:00:00.000Z`).toUTCString();
}

export function GET(): NextResponse {
  const latestPostDate = allBlogPosts
    .map((post) => post.data.schema.dateModified ?? post.data.schema.datePublished)
    .filter(Boolean)
    .sort()
    .at(-1);
  const items = allBlogPosts
    .map(
      (post) => `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${SITE.url}${post.path}</link>
          <guid isPermaLink="true">${SITE.url}${post.path}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${rssDate(post.data.schema.datePublished)}</pubDate>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escapeXml(SITE.name)} Blog</title>
      <link>${SITE.url}/blog</link>
      <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
      <description>${escapeXml(SITE.description)}</description>
      <language>en-us</language>
      <lastBuildDate>${rssDate(latestPostDate)}</lastBuildDate>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
