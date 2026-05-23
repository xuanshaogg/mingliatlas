import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import type { RelatedLink } from "@/components/shared/RelatedLinks";
import TermLink from "@/components/shared/TermLink";
import { SITE } from "@/lib/constants";

export interface LearnContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

const overviewRelatedLinks: RelatedLink[] = [
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

const beginnerRelatedLinks: RelatedLink[] = [
  { title: "Five Elements", href: "/bazi/five-elements", description: "Learn Wood, Fire, Earth, Metal, and Water before deeper chart reading." },
  { title: "What Is Bazi?", href: "/bazi/what-is-bazi", description: "See how stems, branches, and four pillars become a chart." },
  { title: "Which System Should You Learn?", href: "/learn/which-system", description: "Choose a path after the beginner vocabulary is clear." },
];

const comparisonRelatedLinks: RelatedLink[] = [
  { title: "Bazi Overview", href: "/bazi", description: "Read the calendar-based Chinese chart framework." },
  { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "Compare zodiac signs with Western sun-sign language carefully." },
  { title: "Bazi vs Western Astrology", href: "/blog/bazi-vs-western-astrology", description: "Read the editorial comparison for search-intent context." },
];

const misconceptionRelatedLinks: RelatedLink[] = [
  { title: "Beginner's Guide", href: "/learn/beginners-guide", description: "Start with the calm learning path before advanced claims." },
  { title: "Common Bazi Basics", href: "/bazi/what-is-bazi", description: "See why a chart is more than one sign or element." },
  { title: "Chinese Zodiac Compatibility", href: "/blog/chinese-zodiac-compatibility-guide", description: "Learn relationship language without reducing people to signs." },
];

const systemRelatedLinks: RelatedLink[] = [
  { title: "Bazi", href: "/bazi", description: "Choose Bazi for personality patterns, timing, and Four Pillars structure." },
  { title: "I Ching", href: "/i-ching", description: "Choose I Ching for reflective decisions and symbolic change." },
  { title: "Feng Shui", href: "/feng-shui", description: "Choose Feng Shui for space, flow, support, and environmental context." },
];

const resourceRelatedLinks: RelatedLink[] = [
  { title: "Learn Overview", href: "/learn", description: "Return to the full roadmap when you want to reset your path." },
  { title: "I Ching for Beginners", href: "/blog/i-ching-for-beginners", description: "Practice question framing with a beginner-friendly editorial guide." },
  { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "Turn a birth date into a chart once the basics are clear." },
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
              Start with vocabulary. The <TermLink term="Five Elements">Five Elements</TermLink> explain how Wood, Fire, Earth, Metal, and Water describe change. The zodiac teaches the 12-branch cycle. Bazi then combines stems, branches, and timing into a complete chart.
            </p>
            <p>
              According to <cite>Chinese calendar tradition</cite>, time is not only counted; it is classified. That classification is the shared foundation beneath many Chinese metaphysics systems.
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
              <TermLink term="Bazi">Bazi</TermLink> is best for personality patterns and timing. <TermLink term="Chinese Zodiac">Chinese zodiac</TermLink> is best for quick cultural context. <TermLink term="I Ching">I Ching</TermLink> is best for reflective decisions. <TermLink term="Feng Shui">Feng Shui</TermLink> is best for spatial influence. <TermLink term="Ziwei Doushu">Ziwei Doushu</TermLink> is best for detailed chart structure.
            </p>
            <p>
              In the <cite>I Ching</cite>, change is read through structured symbols rather than through one-word answers. That same respect for structure helps across the learning center.
            </p>
          </>
        ),
        stats: [{ value: "4+", label: "Learning paths", description: "Time, space, decisions, and personality each have a system." }],
      },
      {
        heading: "How to choose your first path",
        content: (
          <>
            <p>
              If your question is about self-knowledge and timing, start with <Link href="/bazi" className={linkClass}>Bazi</Link>. If you want a quick cultural entry point, begin with the zodiac. If you want a decision tool, start with I Ching. If you want to think about a room or desk, start with Feng Shui. If you want chart detail, move into Ziwei.
            </p>
          </>
        ),
      },
      {
        heading: "How to learn without oversimplifying",
        content: (
          <>
            <p>
              Avoid reducing a person to one animal sign or one element. Use each concept as a layer. A complete reading looks at context, timing, relationship between symbols, and practical choices.
            </p>
            <p>
              A careful reader keeps the rules of each system separate, then compares them only after the basics are clear.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: overviewRelatedLinks,
    cta: cta(),
  }),
  buildPage({
    slug: "beginners-guide",
    path: "/learn/beginners-guide",
    title: "Chinese Metaphysics Beginner's Guide",
    description: "A beginner-friendly guide to Chinese metaphysics, major systems, decision tree, and free tools.",
    entityName: "Chinese Metaphysics Beginner Guide",
    entityType: "Article",
    subtitle: "A practical first path through Chinese metaphysics vocabulary, systems, and tools.",
    directAnswer:
      "A Chinese metaphysics beginner should first learn yin-yang, the Five Elements, the 12 zodiac animals, and the stems-and-branches calendar. After that, choose a system by question: Bazi for life patterns, I Ching for decisions, Feng Shui for space, and Ziwei Doushu for detailed chart analysis.",
    breadcrumbs: breadcrumbs("Beginner's Guide", "/learn/beginners-guide"),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "5", label: "Core concepts", description: "Yin-yang, Five Elements, stems, branches, and cycles." },
      { value: "12", label: "Zodiac branches", description: "The animal cycle is one layer of a larger calendar." },
      { value: "4", label: "Starter paths", description: "Personality, decisions, space, and chart detail." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Stems, branches, solar terms, and zodiac signs share one calendar foundation." },
      { label: "I Ching", source: "The Book of Changes models decision reflection through structured symbols." },
    ],
    sections: [
      {
        heading: "Start with the shared vocabulary",
        content: (
          <>
            <p>
              Begin with <TermLink term="Five Elements">Five Elements</TermLink>, yin-yang, and the stem-branch calendar. According to <cite>Chinese calendar tradition</cite>, the same timekeeping language supports zodiac years, Bazi pillars, solar terms, and many date-selection methods.
            </p>
            <p>
              Do not rush into interpretation. A beginner who knows what Wood, Fire, Earth, Metal, Water, stems, and branches mean will understand later guides much faster.
            </p>
          </>
        ),
        quotes: [
          {
            text: "A clear reading starts with clear terms, not with dramatic claims.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
      },
      {
        heading: "Choose one question before one system",
        content: (
          <>
            <p>
              If your question is about personality patterns and timing, start with <TermLink term="Bazi">Bazi</TermLink>. If it is about a decision, use <TermLink term="I Ching">I Ching</TermLink>. If it is about a room, desk, or building, begin with <TermLink term="Feng Shui">Feng Shui</TermLink>.
            </p>
            <p>
              The <cite>I Ching</cite> is useful here because it teaches a habit that applies everywhere: frame a good question before asking for an interpretation.
            </p>
          </>
        ),
        stats: [{ value: "1", label: "Question first", description: "The clearest path begins with what you want to learn." }],
      },
      {
        heading: "Use tools after the terms make sense",
        content: (
          <>
            <p>
              Tools are most helpful after you know what they are calculating. Try the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> after reading the Four Pillars overview, or the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> after learning how questions work.
            </p>
            <p>
              Record what the tool shows, then return to the guide pages to understand the terms in context.
            </p>
          </>
        ),
      },
      {
        heading: "Keep the tone practical",
        content: (
          <>
            <p>
              Use Chinese metaphysics as a structured reflection language. The best beginner habit is to translate symbols into better observations, better timing questions, and better choices.
            </p>
            <p>
              If a claim removes agency, reduces a person to one label, or makes you afraid to act, step back and return to the fundamentals.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: beginnerRelatedLinks,
    cta: cta("Compare the main systems next"),
  }),
  buildPage({
    slug: "chinese-vs-western-astrology",
    path: "/learn/chinese-vs-western-astrology",
    title: "Chinese vs Western Astrology: Key Differences",
    description: "Compare Chinese metaphysics and Western astrology through zodiac signs, planets, houses, Bazi, Ten Gods, and chart logic.",
    entityName: "Chinese and Western Astrology Comparison",
    entityType: "Article",
    subtitle: "A side-by-side guide that respects both systems instead of forcing them into one vocabulary.",
    directAnswer:
      "Chinese and Western astrology use different symbolic languages. Western astrology centers on planets, signs, aspects, and houses. Chinese systems use stems, branches, Five Elements, zodiac animals, palaces, and cycles. They can complement each other when each system is read by its own rules and compared by use case.",
    breadcrumbs: breadcrumbs("Chinese vs Western Astrology", "/learn/chinese-vs-western-astrology"),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "2", label: "Symbolic languages", description: "Planetary chart logic and Chinese calendar logic." },
      { value: "12", label: "Signs or branches", description: "Both use 12-part cycles, but not the same way." },
      { value: "4", label: "Bazi pillars", description: "Chinese chart reading uses year, month, day, and hour." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Bazi and zodiac systems use stems, branches, and seasonal timing." },
      { label: "Western astrology tradition", source: "Western charts use planets, signs, houses, and aspects as the core grammar." },
    ],
    sections: [
      {
        heading: "The root difference",
        content: (
          <>
            <p>
              Western astrology begins with the sky-based chart: planets, signs, houses, and aspects. Chinese systems such as <TermLink term="Bazi">Bazi</TermLink> begin with the calendar: stems, branches, elements, and cycles.
            </p>
            <p>
              In <cite>Chinese calendar tradition</cite>, the birth moment is classified through time cycles. In Western astrology, the birth moment is mapped through planetary positions.
            </p>
          </>
        ),
        quotes: [
          {
            text: "The systems compare best when you first let each one speak its own language.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
      },
      {
        heading: "Why the zodiac comparison can mislead",
        content: (
          <>
            <p>
              A Western sun sign and a <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> year animal are both popular entry points, but they do not carry the same technical role. The zodiac animal is one branch within a wider stem-branch calendar.
            </p>
            <p>
              <cite>Western astrology tradition</cite> reads the sun sign inside a chart that also includes the moon, rising sign, aspects, and houses.
            </p>
          </>
        ),
        stats: [{ value: "1", label: "Sign is not enough", description: "Both systems need the wider chart context." }],
      },
      {
        heading: "How to use both responsibly",
        content: (
          <>
            <p>
              Keep one notebook page for each system. Write Bazi observations in Chinese calendar terms, then write Western observations in planet-and-house terms. Compare themes only after both readings are complete.
            </p>
            <p>
              If both systems point to similar practical questions, treat that as a useful reflection prompt rather than a command.
            </p>
          </>
        ),
      },
      {
        heading: "Which one should you learn first?",
        content: (
          <>
            <p>
              Choose <Link href="/bazi" className={linkClass}>Bazi</Link> if you want Chinese calendar logic, element balance, and timing cycles. Choose Western astrology if you want planetary archetypes and house topics. If you are unsure, use the <Link href="/learn/which-system" className={linkClass}>system selector</Link> first.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: comparisonRelatedLinks,
    cta: cta("Pick the system that fits your question"),
  }),
  buildPage({
    slug: "common-misconceptions",
    path: "/learn/common-misconceptions",
    title: "Common Misconceptions About Chinese Metaphysics",
    description: "Clarify common misconceptions about Bazi, Feng Shui, Chinese zodiac, prediction, and traditional knowledge.",
    entityName: "Chinese Metaphysics Misconceptions",
    entityType: "Article",
    subtitle: "A calm guide to what Chinese metaphysics does and does not claim.",
    directAnswer:
      "The most common misconception is that Chinese metaphysics is only about fixed outcomes. In practice, Bazi is a personality and life-pattern analysis tool, Feng Shui studies spatial influence, the zodiac is one calendar layer, and I Ching readings work best as structured reflection rather than certainty.",
    breadcrumbs: breadcrumbs("Common Misconceptions", "/learn/common-misconceptions"),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "5", label: "Systems", description: "Each system has its own rules and scope." },
      { value: "1", label: "Animal sign", description: "A zodiac sign is never the whole person." },
      { value: "4", label: "Reading layers", description: "Symbol, context, timing, and practical choice." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Zodiac animals belong to a larger stem-branch calendar system." },
      { label: "I Ching", source: "The Book of Changes frames change through symbolic situations and moving lines." },
    ],
    sections: [
      {
        heading: "Misconception 1: one sign explains everything",
        content: (
          <>
            <p>
              The <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> is a helpful entry point, but it is only one layer. According to <cite>Chinese calendar tradition</cite>, each year belongs to a wider cycle of branches, stems, elements, and seasonal context.
            </p>
            <p>
              A complete Chinese reading never needs to flatten someone into a single animal, element, or keyword.
            </p>
          </>
        ),
        quotes: [
          {
            text: "Useful interpretation adds context; weak interpretation removes it.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
      },
      {
        heading: "Misconception 2: Feng Shui is only decor",
        content: (
          <>
            <p>
              <TermLink term="Feng Shui">Feng Shui</TermLink> is not just about objects or colors. A practical reading starts with flow, support, light, use, and the relationship between people and place.
            </p>
            <p>
              Decor can support a space, but function and layout matter first.
            </p>
          </>
        ),
        stats: [{ value: "3", label: "First checks", description: "Flow, support, and function before decorative fixes." }],
      },
      {
        heading: "Misconception 3: I Ching gives yes-or-no certainty",
        content: (
          <>
            <p>
              The <TermLink term="I Ching">I Ching</TermLink> is stronger as a decision mirror than as a shortcut. A reading describes a situation, its changing lines, and the direction of change.
            </p>
            <p>
              The classical <cite>I Ching</cite> works through images and judgments, so careful question framing matters more than asking for a one-word answer.
            </p>
          </>
        ),
      },
      {
        heading: "Misconception 4: traditional means unchangeable",
        content: (
          <>
            <p>
              Traditional systems can be studied with a modern, practical tone. The goal is to understand patterns, name tradeoffs, and make better choices within real constraints.
            </p>
            <p>
              If a page sounds like it removes judgment or agency, it is probably using the system poorly.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: misconceptionRelatedLinks,
    cta: cta("Choose a grounded learning path"),
  }),
  buildPage({
    slug: "which-system",
    path: "/learn/which-system",
    title: "Which Chinese Metaphysics System Should You Learn?",
    description: "Choose between Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese zodiac based on your question and learning style.",
    entityName: "Chinese Metaphysics System Selection",
    entityType: "Article",
    subtitle: "A practical chooser for matching the system to your question instead of starting everywhere at once.",
    directAnswer:
      "Choose Bazi if you want personality and timing patterns, Ziwei Doushu if you want detailed palace-based chart structure, I Ching if you want decision reflection, Feng Shui if you want to study space, and Chinese zodiac if you want a simple cultural entry point into the calendar cycle.",
    breadcrumbs: breadcrumbs("Which System", "/learn/which-system"),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "5", label: "System choices", description: "Bazi, Ziwei, I Ching, Feng Shui, and Zodiac." },
      { value: "4", label: "Bazi pillars", description: "A birth chart starts with year, month, day, and hour." },
      { value: "64", label: "I Ching outcomes", description: "Hexagrams describe situations and change." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Bazi, zodiac, and timing methods share stems, branches, and cycles." },
      { label: "I Ching", source: "A classical decision text built around hexagrams, lines, and change." },
    ],
    sections: [
      {
        heading: "If your question is about self-knowledge",
        content: (
          <>
            <p>
              Start with <TermLink term="Bazi">Bazi</TermLink>. It reads the birth moment through <TermLink term="Heavenly Stems">Heavenly Stems</TermLink>, <TermLink term="Earthly Branches">Earthly Branches</TermLink>, elements, and timing cycles.
            </p>
            <p>
              In <cite>Chinese calendar tradition</cite>, these symbols classify time. That makes Bazi a good fit for readers who want structured patterns rather than one-word labels.
            </p>
          </>
        ),
        quotes: [
          {
            text: "The right system is the one whose rules match the question you are actually asking.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
      },
      {
        heading: "If your question is about a decision",
        content: (
          <>
            <p>
              Choose <TermLink term="I Ching">I Ching</TermLink> when you need to clarify a decision, transition, or relationship between forces. It is especially helpful when the question can be phrased as, “What is the situation, and how is it changing?”
            </p>
            <p>
              The <cite>I Ching</cite> uses 64 hexagrams and moving lines to describe a pattern of change.
            </p>
          </>
        ),
        stats: [{ value: "6", label: "Lines", description: "Every hexagram is built from six line positions." }],
      },
      {
        heading: "If your question is about space",
        content: (
          <>
            <p>
              Choose <TermLink term="Feng Shui">Feng Shui</TermLink> when the question is about a home, office, desk, door, bedroom, or surrounding environment. Start with flow and support before advanced formulas.
            </p>
            <p>
              For a practical first step, read the <Link href="/feng-shui" className={linkClass}>Feng Shui hub</Link> and observe how the space is actually used.
            </p>
          </>
        ),
      },
      {
        heading: "If your question is about chart detail",
        content: (
          <>
            <p>
              Choose <TermLink term="Ziwei Doushu">Ziwei Doushu</TermLink> if you want a palace-based chart with stars, life areas, and timing layers. It asks for more study, but it rewards readers who like structured detail.
            </p>
            <p>
              If you want something simpler first, use the zodiac as cultural context, then come back to a full chart system later.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: systemRelatedLinks,
    cta: {
      title: "Start with a tool or hub",
      description: "Once you know the question, open the guide or calculator that matches that system.",
      href: "/tools",
      label: "Browse tools",
    },
  }),
  buildPage({
    slug: "resources",
    path: "/learn/resources",
    title: "Chinese Metaphysics Learning Resources",
    description: "Recommended books, communities, tools, and learning paths for Chinese metaphysics beginners.",
    entityName: "Chinese Metaphysics Learning Resources",
    entityType: "Article",
    subtitle: "A resource checklist for learning Chinese metaphysics with structure, context, and practical next steps.",
    directAnswer:
      "Good Chinese metaphysics resources combine clear beginner explanations, classical context, practical examples, and careful language. Start with Five Elements and calendar basics, then use books, courses, communities, and tools that explain reasoning, show examples, and avoid absolute claims about people or outcomes.",
    breadcrumbs: breadcrumbs("Resources", "/learn/resources"),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "4", label: "Resource types", description: "Guides, books, communities, and calculators." },
      { value: "2", label: "Classical anchors", description: "Calendar tradition and I Ching context appear often." },
      { value: "3", label: "Quality checks", description: "Definition, example, and practical next step." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Reliable Bazi and zodiac resources explain stems, branches, elements, and timing." },
      { label: "I Ching", source: "Reliable I Ching resources explain hexagrams, lines, and question framing." },
    ],
    sections: [
      {
        heading: "What makes a resource trustworthy",
        content: (
          <>
            <p>
              A strong resource defines terms, shows examples, and explains how it reaches an interpretation. For Bazi and zodiac topics, it should connect back to <cite>Chinese calendar tradition</cite> rather than treating signs as isolated labels.
            </p>
            <p>
              For I Ching resources, look for clear question framing, hexagram structure, and moving-line interpretation instead of one-line answers.
            </p>
          </>
        ),
        quotes: [
          {
            text: "The best resource teaches you how to think with the system, not only what to memorize.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
      },
      {
        heading: "Use this site's guide sequence",
        content: (
          <>
            <p>
              Start with <Link href="/learn/beginners-guide" className={linkClass}>the beginner guide</Link>, then read <TermLink term="Five Elements">Five Elements</TermLink>, <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink>, and <TermLink term="Bazi">Bazi</TermLink>. Add <TermLink term="I Ching">I Ching</TermLink> or <TermLink term="Feng Shui">Feng Shui</TermLink> when your question changes.
            </p>
            <p>
              The <cite>I Ching</cite> is a good second track if you want to practice structured questions rather than birth-chart analysis.
            </p>
          </>
        ),
        stats: [{ value: "1", label: "Sequence", description: "Vocabulary, system choice, guide, then tool." }],
      },
      {
        heading: "How to evaluate books, courses, and communities",
        content: (
          <>
            <p>
              Prefer resources that separate beginner, intermediate, and advanced material. A useful course explains why a symbol matters, where it appears, and how context changes interpretation.
            </p>
            <p>
              In communities, look for people who ask clarifying questions and cite their reasoning instead of offering dramatic one-line claims.
            </p>
          </>
        ),
      },
      {
        heading: "When to use tools",
        content: (
          <>
            <p>
              Use tools when you have enough vocabulary to read the output. The <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link>, <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link>, and <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link> are most useful when paired with the guide pages.
            </p>
            <p>
              Save the result, then return to the relevant knowledge page to interpret it in context.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: resourceRelatedLinks,
    cta: {
      title: "Use a tool after the guide",
      description: "Move from learning vocabulary into a structured calculator or oracle when you are ready to apply it.",
      href: "/tools",
      label: "Browse tools",
    },
  }),
];

export function getLearnPage(slug: string): LearnContentPage | undefined {
  return allLearnPages.find((page) => page.slug === slug);
}

export function getLearnStaticParams(): Array<{ slug?: string[] }> {
  return allLearnPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
