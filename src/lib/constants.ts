const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://mingliatlas.com").replace(/\/+$/, "");

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
  foundingDate: "2025",
  description:
    "Shared editorial attribution for Mingli Atlas guides to Chinese metaphysics. Individual pages identify their references, calculation conventions and editorial interpretations; the About page explains the source and correction policy.",
  knowsAbout: [
    "Bazi (Four Pillars of Destiny, 八字)",
    "I Ching (Book of Changes, 易经)",
    "Feng Shui (风水)",
    "Ziwei Doushu (Purple Star Astrology, 紫微斗数)",
    "Chinese Zodiac (十二生肖)",
    "Wu Xing (Five Elements, 五行)",
    "Tian Gan (Ten Heavenly Stems, 天干)",
    "Di Zhi (Twelve Earthly Branches, 地支)",
  ],
  sources: [
    {
      label: "Yuan Hai Zi Ping (渊海子平)",
      note: "A received text of the Zi Ping tradition; consult the edition for textual and historical context.",
      url: "https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3",
    },
    {
      label: "San Ming Tong Hui (三命通会)",
      note: "Ming-dynasty compilation of stem-branch relationships and chart-reading traditions.",
      url: "https://zh.wikisource.org/wiki/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83",
    },
    {
      label: "I Ching, Wilhelm/Baynes translation",
      note: "Standard English reference translation of the Book of Changes.",
      url: "https://books.google.com/books?q=Wilhelm+Baynes+I+Ching",
    },
  ],
};

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Learn",
    href: "/learn",
    description: "Choose a learning path, compare systems, and check sources.",
  },
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
