import type { MetadataRoute } from "next";
import { publishedSitePages, type SitePage } from "@/lib/content/sitePages";
import { SITE } from "@/lib/constants";

type SitemapEntry = MetadataRoute.Sitemap[number];

function changeFrequencyFor(page: SitePage): SitemapEntry["changeFrequency"] {
  if (page.href === "/") return "weekly";
  if (page.section === "Tools" || page.section === "Blog") return "weekly";
  if (page.section === "Utility" || page.section === "Company") return "monthly";
  if (page.section === "Legal") return "yearly";
  return "monthly";
}

function priorityFor(page: SitePage): number {
  if (page.href === "/") return 1;
  if (page.href === "/tools/bazi-calculator") return 0.95;
  if (page.section === "Tools") return 0.9;
  if (["Bazi", "Chinese Zodiac", "Learn", "Ziwei", "I Ching", "Feng Shui"].includes(page.section)) return 0.78;
  if (page.section === "Blog") return page.href === "/blog" ? 0.75 : 0.68;
  if (page.section === "Utility") return 0.45;
  if (page.section === "Company") return 0.35;
  return 0.25;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // noindex utility pages stay available to people but do not belong in the
  // XML sitemap that asks search engines to index canonical content.
  const indexablePages = publishedSitePages.filter((page) => page.href !== "/sitemap");
  const staticRoutes: MetadataRoute.Sitemap = indexablePages.map((page) => ({
    url: `${baseUrl}${page.href}`,
    lastModified: page.lastModified,
    changeFrequency: changeFrequencyFor(page),
    priority: priorityFor(page),
  }));

  return staticRoutes;
}
