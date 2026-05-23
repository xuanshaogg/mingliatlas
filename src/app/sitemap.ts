import type { MetadataRoute } from "next";
import { publishedSitePages } from "@/lib/content/sitePages";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const currentDate = new Date();

  // Keep this list limited to routes with real page files so the sitemap never
  // advertises URLs that currently resolve to the 404 page.
  const staticRoutes: MetadataRoute.Sitemap = publishedSitePages.map((page) => ({
    url: `${baseUrl}${page.href}`,
    lastModified: currentDate,
    changeFrequency: page.href === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: page.href === "/" ? 1.0 : 0.7,
  }));

  return staticRoutes;
}
