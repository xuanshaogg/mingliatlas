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
}

export const generalPages: SitePage[] = [
  {
    title: "About",
    href: "/about",
    description: "Mission, editorial standards, and the educational scope of Eastern Blueprint.",
    section: "Company",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Contact the editorial team about content corrections, partnerships, or support.",
    section: "Company",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    description: "How this site handles analytics, cookies, contact messages, and privacy requests.",
    section: "Legal",
  },
  {
    title: "Terms of Service",
    href: "/terms",
    description: "Use terms, entertainment disclaimer, content rights, and AI-content limitations.",
    section: "Legal",
  },
  {
    title: "HTML Sitemap",
    href: "/sitemap",
    description: "A human-readable index of all published pages.",
    section: "Utility",
  },
  {
    title: "Subscribe",
    href: "/subscribe",
    description: "A placeholder page for the newsletter workflow.",
    section: "Utility",
  },
  {
    title: "Search",
    href: "/search",
    description: "Find guides, tools, and learning resources across the knowledge base.",
    section: "Utility",
  },
];

export const systemLandingPages: SitePage[] = [
  {
    title: "Free Tools",
    href: "/tools",
    description: "Free calculators and workflows for Chinese metaphysics learning.",
    section: "Tools",
  },
  {
    title: "Free Bazi Calculator",
    href: "/tools/bazi-calculator",
    description: "Generate a Four Pillars chart with Day Master, Ten Gods, hidden stems, and Five Element balance.",
    section: "Tools",
  },
  {
    title: "I Ching Oracle",
    href: "/tools/i-ching-oracle",
    description: "Cast a six-line hexagram with changing lines and reflective guidance.",
    section: "Tools",
  },
  {
    title: "Zodiac Compatibility Calculator",
    href: "/tools/zodiac-compatibility",
    description: "Compare two zodiac signs through harmony, triad, and clash patterns.",
    section: "Tools",
  },
];

export const knowledgePages: SitePage[] = [
  ...allBaziPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Bazi",
  })),
  ...allZodiacPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Chinese Zodiac",
  })),
  ...allLearnPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Learn",
  })),
  ...allZiweiPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Ziwei",
  })),
  ...allIChingPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "I Ching",
  })),
  ...allFengShuiPages.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Feng Shui",
  })),
];

export const blogPages: SitePage[] = [
  {
    title: "Blog",
    href: "/blog",
    description: "Seed articles for the content library and editorial workflow.",
    section: "Blog",
  },
  ...allBlogPosts.map((page) => ({
    title: page.title,
    href: page.path,
    description: page.description,
    section: "Blog",
  })),
];

export const publishedSitePages: SitePage[] = [
  {
    title: "Home",
    href: "/",
    description: "Chinese metaphysics guides and free tools for Western readers.",
    section: "Home",
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
