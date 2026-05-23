import { NextResponse } from "next/server";
import { allBlogPosts } from "@/content/blog/posts";
import { SITE } from "@/lib/constants";

export function GET(): NextResponse {
  const items = allBlogPosts
    .map(
      (post) => `
        <item>
          <title>${post.title}</title>
          <link>${SITE.url}${post.path}</link>
          <description>${post.description}</description>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${SITE.name} Blog</title>
      <link>${SITE.url}/blog</link>
      <description>Seed articles from Eastern Blueprint.</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
