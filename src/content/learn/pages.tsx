import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";

export interface LearnContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

const relatedLinks = [
  {
    title: "Bazi Overview",
    href: "/bazi",
    description: "Start with Four Pillars if you want a structured personality and timing framework.",
  },
  {
    title: "Chinese Zodiac",
    href: "/chinese-zodiac",
    description: "Use zodiac signs as an easy cultural entry point into Chinese calendars.",
  },
  {
    title: "Five Elements",
    href: "/bazi/five-elements",
    description: "Learn the shared language behind Bazi, Feng Shui, and many Chinese systems.",
  },
];

const defaultFaqs: FAQ[] = [
  {
    question: "Where should a beginner start with Chinese metaphysics?",
    answer:
      "Start with the Five Elements, then learn the Chinese zodiac and Bazi basics. This gives you enough vocabulary to understand deeper systems without getting lost.",
  },
  {
    question: "Is Chinese metaphysics only about personality?",
    answer:
      "No. Some systems focus on personality and timing, while others focus on space, decisions, calendars, or symbolic reflection.",
  },
  {
    question: "Can I combine Chinese and Western systems?",
    answer:
      "Yes. Many readers compare systems as different symbolic languages. Keep the rules separate first, then look for useful overlaps.",
  },
  {
    question: "Are these pages professional advice?",
    answer:
      "No. They are for education, entertainment, and self-reflection. They should not replace medical, legal, financial, or mental health advice.",
  },
];

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: current, href },
  ];
}

function cta(title = "Choose your starting point") {
  return {
    title,
    description:
      "Move from beginner concepts into Bazi, Chinese Zodiac, I Ching, Feng Shui, or another system when you know what question you want to answer.",
    href: "/learn/which-system",
    label: "Compare the systems",
  };
}

function buildPage(input: Omit<LearnContentPage, "data"> & KnowledgePageProps): LearnContentPage {
  const { slug, path, title, description, ...data } = input;

  return {
    slug,
    path,
    title,
    description,
    data: {
      ...data,
      title,
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-05-23",
        dateModified: data.schema.dateModified ?? "2026-05-23",
      },
    },
  };
}

export const allLearnPages: LearnContentPage[] = [
  buildPage({
    slug: "",
    path: "/learn",
    title: "Learn Chinese Metaphysics: Beginner Roadmap",
    description:
      "A beginner roadmap for Chinese metaphysics, including Bazi, Chinese zodiac, I Ching, Feng Shui, and system selection.",
    entityName: "Chinese Metaphysics Learning Center",
    entityType: "Article",
    subtitle: "A clear path for learning Chinese metaphysics without fear-based claims or confusing jargon.",
    directAnswer:
      "Chinese metaphysics is a family of traditional systems that study time, space, symbols, and natural cycles. Beginners should start with the Five Elements, Chinese zodiac, and Bazi basics before choosing a deeper path such as I Ching, Feng Shui, Ziwei Doushu, or Four Pillars analysis.",
    breadcrumbs: breadcrumbs("Overview", "/learn"),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "5", label: "Core systems", description: "Bazi, Zodiac, I Ching, Feng Shui, Ziwei." },
      { value: "24", label: "Solar Terms", description: "Seasonal markers used in Chinese calendars." },
      { value: "64", label: "I Ching hexagrams", description: "A complete symbolic decision system." },
    ],
    citations: [
      { label: "I Ching", source: "Classical Book of Changes used for structured reflection." },
      { label: "Chinese calendar tradition", source: "Stems, branches, zodiac signs, and solar terms share one timekeeping foundation." },
    ],
    sections: [
      {
        heading: "The beginner path",
        content: (
          <>
            <p>
              Start with vocabulary. The <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Five Elements</Link> explain how Wood, Fire, Earth, Metal, and Water describe change. The zodiac teaches the 12-branch cycle. Bazi then combines stems, branches, and timing into a complete chart.
            </p>
            <p>
              According to classical Chinese calendar practice, time is not only counted; it is classified. That classification is the shared foundation beneath many Chinese metaphysics systems.
            </p>
          </>
        ),
        quotes: [
          {
            text: "Learn the language of the system first; interpretation becomes much clearer after that.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
      },
      {
        heading: "The main systems at a glance",
        content: (
          <>
            <p>
              Bazi is best for personality patterns and timing. Chinese zodiac is best for quick cultural context. I Ching is best for reflective decisions. Feng Shui is best for spatial influence. Ziwei Doushu is best for detailed chart structure.
            </p>
          </>
        ),
        stats: [{ value: "4+", label: "Learning paths", description: "Time, space, decisions, and personality each have a system." }],
      },
      {
        heading: "How to learn without oversimplifying",
        content: (
          <>
            <p>
              Avoid reducing a person to one animal sign or one element. Use each concept as a layer. A complete reading looks at context, timing, relationship between symbols, and practical choices.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks,
    cta: cta(),
  }),
];

const simplePages = [
  {
    slug: "beginners-guide",
    title: "Chinese Metaphysics Beginner's Guide",
    description:
      "A beginner-friendly guide to Chinese metaphysics, major systems, decision tree, and free tools.",
    entity: "Beginner Guide",
    answer:
      "A Chinese metaphysics beginner should first learn the Five Elements, yin-yang, the 12 zodiac animals, and the idea of stems and branches. After that, choose a system based on your question: Bazi for life patterns, I Ching for decisions, Feng Shui for space, and Ziwei for detailed chart analysis.",
    stat: ["5", "Core systems"],
  },
  {
    slug: "chinese-vs-western-astrology",
    title: "Chinese vs Western Astrology: Key Differences",
    description:
      "Compare Chinese metaphysics and Western astrology through zodiac signs, planets, houses, Bazi, Ten Gods, and chart logic.",
    entity: "Chinese and Western Astrology Comparison",
    answer:
      "Chinese and Western astrology use different symbolic languages. Western astrology centers on planets, signs, aspects, and houses. Chinese systems use stems, branches, Five Elements, zodiac animals, palaces, and cycles. They can complement each other when each system is read by its own rules.",
    stat: ["2", "Symbolic languages"],
  },
  {
    slug: "common-misconceptions",
    title: "Common Misconceptions About Chinese Metaphysics",
    description:
      "Clarify common misconceptions about Bazi, Feng Shui, Chinese zodiac, prediction, and traditional knowledge.",
    entity: "Chinese Metaphysics Misconceptions",
    answer:
      "The most common misconception is that Chinese metaphysics is only about fixed outcomes. In practice, Bazi is a personality and life-pattern analysis tool, Feng Shui studies spatial influence, and the zodiac is only one layer of a larger calendar system.",
    stat: ["3", "Common myths"],
  },
  {
    slug: "which-system",
    title: "Which Chinese Metaphysics System Should You Learn?",
    description:
      "Choose between Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese zodiac based on your question and learning style.",
    entity: "Chinese Metaphysics System Selection",
    answer:
      "Choose Bazi if you want personality and timing patterns, Ziwei Doushu if you want detailed chart structure, I Ching if you want decision reflection, Feng Shui if you want to study space, and Chinese zodiac if you want a simple cultural entry point.",
    stat: ["5", "System choices"],
  },
  {
    slug: "resources",
    title: "Chinese Metaphysics Learning Resources",
    description:
      "Recommended books, communities, tools, and learning paths for Chinese metaphysics beginners.",
    entity: "Chinese Metaphysics Resources",
    answer:
      "Good Chinese metaphysics resources combine clear beginner explanations, classical context, practical examples, and careful language. Start with Five Elements and calendar basics, then use books, courses, communities, and tools that explain reasoning instead of making absolute claims.",
    stat: ["4", "Resource types"],
  },
] as const;

for (const page of simplePages) {
  allLearnPages.push(
    buildPage({
      slug: page.slug,
      path: `/learn/${page.slug}`,
      title: page.title,
      description: page.description,
      entityName: page.entity,
      entityType: "Article",
      subtitle: "A focused learning-center guide for choosing and understanding Chinese metaphysics systems.",
      directAnswer: page.answer,
      breadcrumbs: breadcrumbs(page.entity, `/learn/${page.slug}`),
      schema: { headline: "", description: "", url: "" },
      stats: [
        { value: page.stat[0], label: page.stat[1], description: "A practical anchor for this guide." },
        { value: "8-10", label: "Reading level", description: "Written for accessible learning." },
        { value: "3+", label: "Next links", description: "Each guide routes readers to deeper topics." },
      ],
      citations: [
        { label: "I Ching", source: "Classical Chinese text used for structured reflection and symbolic reasoning." },
        { label: "Chinese calendar tradition", source: "Foundation for stems, branches, zodiac signs, and seasonal timing." },
      ],
      sections: [
        {
          heading: `What ${page.entity} means`,
          content: (
            <>
              <p>
                {page.description} According to classical Chinese learning traditions, the safest path is to understand terms before interpretation. That keeps symbolic systems useful without turning them into fear-based claims.
              </p>
              <p>
                Use this page as a decision guide. Then move into Bazi, Chinese zodiac, I Ching, Feng Shui, or Ziwei Doushu when your question is clearer.
              </p>
            </>
          ),
          quotes: [
            {
              text: "Good metaphysics education translates symbols into better questions.",
              author: "Jerry King",
              title: "Chinese Metaphysics Consultant",
              organization: "White Dragon Consulting",
            },
          ],
        },
        {
          heading: "How to apply it",
          content: (
            <>
              <p>
                Start with one system and one question. If you want personal timing, read Bazi. If you want symbolic decision context, read I Ching. If you want a space-focused lens, read Feng Shui.
              </p>
            </>
          ),
        },
        {
          heading: "Next steps",
          content: (
            <>
              <p>
                Continue through the related guides below and keep notes on terms that repeat across systems, especially Five Elements, yin-yang, stems, branches, and cycles.
              </p>
            </>
          ),
        },
      ],
      faqs: defaultFaqs,
      relatedLinks,
      cta: cta(),
    })
  );
}

export function getLearnPage(slug: string): LearnContentPage | undefined {
  return allLearnPages.find((page) => page.slug === slug);
}

export function getLearnStaticParams(): Array<{ slug?: string[] }> {
  return allLearnPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
