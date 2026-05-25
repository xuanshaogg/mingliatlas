const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://mingliatlas.com";

export const SITE = {
  name: "mingliatlas",
  alternateNames: ["mingliatlas.com"],
  tagline: "Where Eastern Wisdom Meets Modern Logic",
  url: siteUrl,
  description:
    "Explore Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese Zodiac through clear, modern Chinese metaphysics guides and tools.",
};

export const AUTHOR = {
  name: "Mingli Atlas Editorial Team",
  url: `${siteUrl}/about`,
  jobTitle: "Chinese Metaphysics Researchers and Writers",
  description:
    "A team of researchers and writers specializing in Chinese metaphysics, including Bazi, I Ching, Feng Shui, and Ziwei Doushu.",
  knowsAbout: [
    "Bazi (Four Pillars of Destiny)",
    "I Ching (Book of Changes)",
    "Feng Shui",
    "Ziwei Doushu (Purple Star Astrology)",
    "Chinese Zodiac",
    "Wu Xing (Five Elements)",
  ],
};

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Bazi",
    href: "/bazi",
    description: "Four Pillars of Destiny for life-pattern analysis.",
  },
  {
    label: "Ziwei",
    href: "/ziwei",
    description: "Purple Star Astrology charts and interpretation guides.",
  },
  {
    label: "I Ching",
    href: "/i-ching",
    description: "Book of Changes wisdom for structured reflection.",
  },
  {
    label: "Feng Shui",
    href: "/feng-shui",
    description: "Spatial harmony principles for modern homes and workspaces.",
  },
  {
    label: "Chinese Zodiac",
    href: "/chinese-zodiac",
    description: "Twelve animal signs explained with cultural context.",
  },
  {
    label: "Tools",
    href: "/tools",
    description: "Free calculators and guided analysis tools.",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Practical articles on Chinese metaphysics and culture.",
  },
];

export const footerNavigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "XML Sitemap", href: "/sitemap.xml" },
];
