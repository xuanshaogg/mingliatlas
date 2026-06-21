import { allBaziPages } from "@/content/bazi/pages";
import { allBlogPosts } from "@/content/blog/posts";
import { allFengShuiPages } from "@/content/feng-shui/pages";
import { allIChingPages } from "@/content/i-ching/pages";
import { allLearnPages } from "@/content/learn/pages";
import { allZodiacPages } from "@/content/zodiac/pages";
import { allZiweiPages } from "@/content/ziwei/pages";

export interface SitePage {
  title: string;
  href: string;
  description: string;
  section: string;
  lastModified: string;
}

const CONTENT_LAST_MODIFIED = "2026-06-21";
const SITE_STRUCTURE_LAST_MODIFIED = "2026-06-21";

function latestModified(dates: Array<string | undefined>): string {
  return dates.filter(Boolean).sort().at(-1) ?? CONTENT_LAST_MODIFIED;
}

const latestKnowledgeModified = latestModified([
  ...allBaziPages.map((page) => page.data.schema.dateModified),
  ...allZodiacPages.map((page) => page.data.schema.dateModified),
  ...allLearnPages.map((page) => page.data.schema.dateModified),
  ...allZiweiPages.map((page) => page.data.schema.dateModified),
  ...allIChingPages.map((page) => page.data.schema.dateModified),
  ...allFengShuiPages.map((page) => page.data.schema.dateModified),
]);

const latestBlogModified = latestModified(
  allBlogPosts.map((post) => post.data.schema.dateModified)
);
const latestIndexModified = latestModified([
  latestKnowledgeModified,
  latestBlogModified,
  SITE_STRUCTURE_LAST_MODIFIED,
]);

export const generalPages: SitePage[] = [
  {
    title: "About",
    href: "/about",
    description: "Mission, editorial standards, and the educational scope of mingliatlas.",
    section: "Company",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Contact the editorial team about content corrections, partnerships, or support.",
    section: "Company",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    description:
      "How this site handles analytics, cookies, contact messages, and privacy requests.",
    section: "Legal",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    title: "Terms of Service",
    href: "/terms",
    description: "Use terms, entertainment disclaimer, content rights, and AI-content limitations.",
    section: "Legal",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    title: "HTML Sitemap",
    href: "/sitemap",
    description: "A human-readable index of all published pages.",
    section: "Utility",
    lastModified: latestIndexModified,
  },
  {
    title: "Subscribe",
    href: "/subscribe",
    description: "Get practical explainers, seasonal notes, and new tool updates by email.",
    section: "Utility",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
  {
    title: "Search",
    href: "/search",
    description: "Find guides, tools, and learning resources across the knowledge base.",
    section: "Utility",
    lastModified: latestIndexModified,
  },
];

export const systemLandingPages: SitePage[] = [
  {
    title: "Free Tools",
    href: "/tools",
    description: "Free calculators and workflows for Chinese metaphysics learning.",
    section: "Tools",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
  {
    title: "Free Bazi Calculator",
    href: "/tools/bazi-calculator",
    description:
      "Generate a Four Pillars chart with Day Master, Ten Gods, hidden stems, and Five Element balance.",
    section: "Tools",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
  {
    title: "I Ching Oracle",
    href: "/tools/i-ching-oracle",
    description: "Cast a six-line hexagram with changing lines and reflective guidance.",
    section: "Tools",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
  {
    title: "Zodiac Compatibility Calculator",
    href: "/tools/zodiac-compatibility",
    description: "Compare two zodiac signs through harmony, triad, and clash patterns.",
    section: "Tools",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
];

export const knowledgePages: SitePage[] = [
  ...allBaziPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Bazi",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
  ...allZodiacPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Chinese Zodiac",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
  ...allLearnPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Learn",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
  ...allZiweiPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Ziwei",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
  ...allIChingPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "I Ching",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
  ...allFengShuiPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Feng Shui",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
];

export const blogPages: SitePage[] = [
  {
    title: "Blog",
    href: "/blog",
    description:
      "Practical Chinese metaphysics articles with source notes, examples, and learning paths.",
    section: "Blog",
    lastModified: latestBlogModified,
  },
  ...allBlogPosts.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Blog",
    lastModified: page.data.schema.dateModified ?? CONTENT_LAST_MODIFIED,
  })),
];

export const publishedSitePages: SitePage[] = [
  {
    title: "Home",
    href: "/",
    description: "Chinese metaphysics guides and free tools for Western readers.",
    section: "Home",
    lastModified: SITE_STRUCTURE_LAST_MODIFIED,
  },
  ...blogPages,
  ...knowledgePages,
  ...systemLandingPages,
  ...generalPages,
];

export function groupPagesBySection(pages: SitePage[]): Map<string, SitePage[]> {
  const grouped = new Map<string, SitePage[]>();

  for (const page of pages) {
    const group = grouped.get(page.section) ?? [];
    group.push(page);
    grouped.set(page.section, group);
  }

  return grouped;
}
