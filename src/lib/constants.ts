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
  foundingDate: "2025",
  description:
    "A team of researchers and writers specializing in Chinese metaphysics. The team works directly from classical source texts — including the Yuan Hai Zi Ping (渊海子平), the San Ming Tong Hui (三命通会), and the Wilhelm/Baynes translation of the I Ching — and cross-references contemporary practitioners such as Joey Yap and Alfred Huang.",
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
      note: "Song-dynasty Zi Ping classic, c. 1100 CE — Day Master tradition in Bazi.",
    },
    {
      label: "San Ming Tong Hui (三命通会)",
      note: "Ming-dynasty compendium, c. 1550 CE — stem-branch relationships and chart structure.",
    },
    {
      label: "I Ching, Wilhelm/Baynes translation",
      note: "Standard English reference translation of the Book of Changes.",
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
