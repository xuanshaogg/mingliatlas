import { describe, expect, it } from "vitest";
import type { SitePage } from "@/lib/content/sitePages";
import { searchPages } from "@/lib/search";

const pages: SitePage[] = [
  {
    title: "Reading a chart",
    description: "Use Bazi to explore your Day Master",
    section: "Blog",
    href: "/reading",
    lastModified: "2026-09-24",
  },
  {
    title: "Bazi Day Master",
    description: "A guide to the day stem",
    section: "Bazi",
    href: "/bazi/day-master",
    lastModified: "2026-09-24",
  },
  {
    title: "I Ching Oracle",
    description: "Cast a hexagram",
    section: "Tools",
    href: "/tools/i-ching-oracle",
    lastModified: "2026-09-24",
  },
  {
    title: "Mìnglǐ glossary",
    description: "命理 terms explained",
    section: "Learn",
    href: "/glossary",
    lastModified: "2026-09-24",
  },
];

describe("search directory relevance", () => {
  it("ranks title matches before incidental mentions in descriptions", () => {
    expect(searchPages(pages, "Bazi Day Master").map((page) => page.href)).toEqual([
      "/bazi/day-master",
      "/reading",
    ]);
  });
  it("matches every query word regardless of order or punctuation", () => {
    expect(searchPages(pages, "MASTER, bazi")).toHaveLength(2);
    expect(searchPages(pages, "bazi hexagram")).toHaveLength(0);
    expect(searchPages(pages, "I-Ching")[0].href).toBe("/tools/i-ching-oracle");
  });
  it("supports accented romanization and Chinese queries", () => {
    expect(searchPages(pages, "mingli")[0].href).toBe("/glossary");
    expect(searchPages(pages, "命理")[0].href).toBe("/glossary");
  });
  it("handles empty and punctuation-only input without removing content", () => {
    expect(searchPages(pages, "   ")).toHaveLength(pages.length);
    expect(searchPages(pages, "[]()?!")).toHaveLength(pages.length);
    expect(searchPages(pages, "")[0].section).toBe("Tools");
  });
  it("keeps the original directory order and data intact", () => {
    const original = JSON.stringify(pages);
    searchPages(pages, "bazi");
    expect(JSON.stringify(pages)).toBe(original);
  });
});
