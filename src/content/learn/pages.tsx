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
  { title: "Ziwei Doushu", href: "/ziwei", description: "Choose Ziwei for a detailed palace-and-star natal chart." },
  { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "Choose the zodiac for a simple cultural entry into the branch cycle." },
];

const resourceRelatedLinks: RelatedLink[] = [
  { title: "What Is Bazi?", href: "/bazi/what-is-bazi", description: "Apply the source-checking method to a documented Four Pillars overview." },
  { title: "I Ching", href: "/i-ching", description: "See how a classical text, hexagram structure, and modern practice fit together." },
  { title: "Five Elements", href: "/bazi/five-elements", description: "Compare a shared Chinese term across calendar, Bazi, and change traditions." },
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

const defaultEditorialQuote = {
  text: "The best starting point is the one that matches the question, keeps the rules clear, and avoids certainty theater.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
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
      sections: withEditorialQuote(data.sections),
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-03-05",
        dateModified: data.schema.dateModified ?? "2026-03-20",
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
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-01", dateModified: "2026-03-20" },
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
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-10", dateModified: "2026-03-22" },
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
              Do not rush into interpretation. A beginner who knows what Wood, Fire, Earth, Metal, Water, stems, and branches mean will understand later guides much faster. The same patience appears in the <cite>I Ching</cite>, where symbols are read through situation and change rather than one-word answers.
            </p>
          </>
        ),
      },
      {
        heading: "Which system answers which question",
        content: (
          <>
            <p>
              Each Chinese metaphysics system is designed for a different kind of question. Choosing the right system first saves a lot of confusion.
            </p>
            <p>
              <strong>Bazi (Four Pillars)</strong> answers: What are my recurring patterns, strengths, and timing cycles? It reads a natal chart built from birth year, month, day, and hour.
            </p>
            <p>
              <strong>I Ching</strong> answers: What is the pattern in this specific situation right now? It responds to a question cast in the present moment, not a fixed birth chart.
            </p>
            <p>
              <strong>Feng Shui</strong> answers: How does this space support or hinder the people in it? It reads environment, direction, layout, and qi flow.
            </p>
            <p>
              <strong>Ziwei Doushu</strong> answers: What are the detailed life-area themes in my natal chart? It uses 12 palaces and 14 major stars for a more granular chart map.
            </p>
            <p>
              <strong>Chinese Zodiac</strong> answers: What is the cultural symbolism of my birth year? It is the most accessible entry point but the least detailed system.
            </p>
          </>
        ),
        stats: [
          { value: "5", label: "Core systems", description: "Each designed for a different kind of question." },
          { value: "1", label: "Question first", description: "The clearest path begins with what you want to learn." },
        ],
      },
      {
        heading: "Common beginner mistakes",
        content: (
          <>
            <p>
              The most common mistake is reducing a person to one label: one zodiac animal, one element, or one star. Every system uses multiple layers. A zodiac animal is one branch in a four-pillar chart. An element is one of five in a balance. A star is one of fourteen in a palace map.
            </p>
            <p>
              A second mistake is mixing system rules. Bazi and Western astrology use different grammars. Reading a Bazi Day Master as a Western sun sign produces confusion, not insight. Keep each system's rules separate until you understand both independently.
            </p>
            <p>
              A third mistake is treating any reading as a fixed outcome. Chinese metaphysics describes patterns and tendencies, not guaranteed events. The best use is to understand recurring themes and make better-informed choices.
            </p>
          </>
        ),
      },
      {
        heading: "Use tools after the terms make sense",
        content: (
          <>
            <p>
              Tools are most helpful after you know what they are calculating. Try the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> after reading the Four Pillars overview, or the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> after learning how questions work.
            </p>
            <p>
              Record what the tool shows, then return to the guide pages to understand the terms in context. If a claim removes agency, reduces a person to one label, or makes you afraid to act, step back and return to the fundamentals.
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
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-18", dateModified: "2026-03-24" },
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
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-05", dateModified: "2026-03-26" },
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
    description: "Compare Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese zodiac by question, required input, output, and learning commitment.",
    entityName: "Chinese Metaphysics System Selection",
    entityType: "Article",
    subtitle: "A decision guide for matching one system to the question, information, and type of answer you actually have.",
    directAnswer:
      "Choose by question and required input: Bazi for birth-chart patterns and timing, Ziwei Doushu for detailed life-area structure, I Ching for one present decision, Feng Shui for a physical environment, and Chinese zodiac for cultural year-sign context. If you lack a reliable birth time, begin with I Ching, Feng Shui, or zodiac basics rather than forcing a precise natal chart.",
    breadcrumbs: breadcrumbs("Which System", "/learn/which-system"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-15", dateModified: "2026-08-07" },
    stats: [
      { value: "5", label: "System choices", description: "Bazi, Ziwei, I Ching, Feng Shui, and Zodiac." },
      { value: "3", label: "Input types", description: "Birth data, a present question, or a physical space." },
      { value: "1", label: "First decision", description: "Choose the question before choosing the system." },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A stable reference for Gregorian, lunar, stem-branch, and solar-term calendar data.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      { label: "Yuan Hai Zi Ping (渊海子平)", source: "A foundational text in the Four Pillars / Zi Ping textual tradition." },
      { label: "Zhouyi (周易 / I Ching)", source: "The received Changes text containing 64 hexagram statements and line texts." },
      { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac", source: "A secondary reference for Chinese almanac concepts and calendar customs." },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols", source: "A cultural-symbol reference useful for checking broad associations without turning them into chart rules." },
    ],
    sections: [
      {
        heading: "Choose the question before the tradition",
        content: (
          <>
            <p>
              The systems overlap in vocabulary, but they do not answer the same question. A birth chart describes a fixed starting pattern; an I Ching reading responds to a present question; Feng Shui evaluates a place; and the zodiac supplies a broad calendar layer. Starting with the method you heard about first often creates a mismatch between the information you have and the answer you want.
            </p>
            <p>
              Write one neutral sentence before choosing: “I want to understand a recurring personal pattern,” “I need perspective on this decision,” or “I want to improve how this room supports its actual use.” Then list the reliable inputs you possess. The best first system is the one whose inputs and output match that sentence without inventing missing data.
            </p>
          </>
        ),
      },
      {
        heading: "System comparison matrix",
        content: (
          <>
            <p>
              Use this matrix to narrow the field. “Output” means the structure the method can responsibly provide, not a guaranteed prediction.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-[52rem] border-collapse text-left text-sm leading-6">
                <thead>
                  <tr className="border-b border-ink-200 dark:border-white/10">
                    <th scope="col" className="px-3 py-3 font-semibold">System</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Best-fit question</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Required input</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Typical output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">Bazi</th><td className="px-3 py-3">What patterns and timing cycles recur?</td><td className="px-3 py-3">Birth date, preferably exact time and place</td><td className="px-3 py-3">Four Pillars, Day Master, relationships, timing layers</td></tr>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">Ziwei Doushu</th><td className="px-3 py-3">How are life areas organized in a detailed natal chart?</td><td className="px-3 py-3">Accurate birth date and time; school conventions</td><td className="px-3 py-3">Twelve palaces, stars, transformations, timing</td></tr>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">I Ching</th><td className="px-3 py-3">What is happening in this situation and how is it changing?</td><td className="px-3 py-3">One present, open question and a casting</td><td className="px-3 py-3">Primary hexagram, moving lines, relating pattern</td></tr>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">Feng Shui</th><td className="px-3 py-3">How does this environment support its occupants and use?</td><td className="px-3 py-3">A real space, orientation, layout, occupants, goals</td><td className="px-3 py-3">Form, flow, support, orientation, practical changes</td></tr>
                  <tr><th scope="row" className="px-3 py-3 font-semibold">Chinese Zodiac</th><td className="px-3 py-3">What is the cultural meaning of this birth-year branch?</td><td className="px-3 py-3">Birth year, with Lunar New Year boundary checked</td><td className="px-3 py-3">Animal branch, element-year context, broad relationships</td></tr>
                </tbody>
              </table>
            </div>
          </>
        ),
        stats: [{ value: "5", label: "Different outputs", description: "A chart, a situation, a place, or cultural context are not interchangeable." }],
      },
      {
        heading: "Choose Bazi or Ziwei for natal-chart study",
        content: (
          <>
            <p>
              Choose <TermLink term="Bazi">Bazi</TermLink> when you want a compact framework built from year, month, day, and hour pillars. It organizes the birth moment through <TermLink term="Heavenly Stems">Heavenly Stems</TermLink>, <TermLink term="Earthly Branches">Earthly Branches</TermLink>, the Day Master, Five Element relationships, and later timing cycles. The <cite>Hong Kong Observatory Chinese calendar conversion tables</cite> are useful for checking calendar boundaries, while <cite>Yuan Hai Zi Ping (渊海子平)</cite> anchors the historical Four Pillars vocabulary.
            </p>
            <p>
              Choose <TermLink term="Ziwei Doushu">Ziwei Doushu</TermLink> if you prefer a more granular visual map of twelve life palaces, major stars, auxiliary stars, transformations, and timing. It usually has a steeper vocabulary curve and greater sensitivity to birth-time and school conventions. A detailed diagram is not automatically more accurate; it is simply a different grammar with more named components.
            </p>
            <p>
              If you are undecided, begin with the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> and the <Link href="/blog/day-master-bazi-complete-guide" className={linkClass}>Day Master guide</Link>. Move to Ziwei only if you specifically want palace-based life-area study and can verify the birth time. Do not blend a Bazi Ten God with a Ziwei star merely because their English descriptions sound similar.
            </p>
          </>
        ),
      },
      {
        heading: "Choose I Ching for one present situation",
        content: (
          <>
            <p>
              Choose <TermLink term="I Ching">I Ching</TermLink> when the question can be stated as, “What is the pattern in this situation, and how is it changing?” The received <cite>Zhouyi (周易 / I Ching)</cite> contains 64 hexagram statements and line texts. A reading connects a cast structure to that specific question; it is not a permanent personality chart and it does not require a birth time.
            </p>
            <p>
              Use one open question, provide the context that makes the choice meaningful, and avoid repeatedly recasting until an answer feels comfortable. Start with <Link href="/i-ching/how-to-cast" className={linkClass}>how to cast</Link>, then use the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> and read the primary and relating hexagrams separately. If you want a fixed life-pattern profile instead, choose Bazi or Ziwei.
            </p>
          </>
        ),
      },
      {
        heading: "Choose Feng Shui for a real environment",
        content: (
          <>
            <p>
              Choose <TermLink term="Feng Shui">Feng Shui</TermLink> when the subject is a home, office, bedroom, entrance, desk, site, or surrounding landform. The method begins with a place and the people using it. Photographs, a plan, compass orientation, movement paths, light, noise, furniture, and the room&apos;s actual purpose are more relevant inputs than a birth chart alone.
            </p>
            <p>
              Start with observable Form School questions: Can people enter and move comfortably? Is the main seat supported? Does the layout fit the work or rest expected there? Only then add compass or timing formulas whose school and measurements are declared. <cite>Martin Palmer&apos;s T&apos;ung Shu</cite> provides useful almanac context, but calendar customs are not a substitute for observing the site. Read the <Link href="/feng-shui" className={linkClass}>Feng Shui hub</Link> before buying symbolic cures.
            </p>
          </>
        ),
      },
      {
        heading: "Choose the Chinese zodiac as an entry layer",
        content: (
          <>
            <p>
              Choose the <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> when you want the cultural symbolism of a birth-year Earthly Branch or a simple introduction to the 12-year cycle. Check the Lunar New Year boundary before assigning an animal to a January or February birth. Then add the Heavenly Stem and element-year pairing instead of treating every Dragon, Rat, or Tiger year as identical.
            </p>
            <p>
              The zodiac is accessible, but it is intentionally broad. <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> can help check cultural associations, while the <Link href="/chinese-zodiac" className={linkClass}>Chinese Zodiac hub</Link> connects animals back to the branches. Use Bazi when you need month, day, hour, Day Master, or timing detail; do not ask year-sign compatibility to decide a relationship.
            </p>
          </>
        ),
      },
      {
        heading: "Let missing data change the choice",
        content: (
          <>
            <p>
              A reliable birth date with no birth hour can still support limited calendar and Bazi study, but the hour pillar is missing and some boundary cases require location or time-zone care. Ziwei is often more sensitive to the birth hour. State the uncertainty rather than guessing an hour from personality descriptions. If the date itself is approximate, avoid a precise natal chart.
            </p>
            <p>
              I Ching does not repair missing birth data; it answers a different kind of present question. Feng Shui does not require birth data to begin with form and function, but advanced schools may add occupant or timing information. Zodiac basics need only a correctly bounded birth year. The easiest available input is not always the best method, but it should limit what you claim.
            </p>
            <p>
              Use one system long enough to learn its grammar before combining methods. Keep a note of inputs, calculation conventions, source, interpretation, and uncertainty. Compare systems only after each has produced its own answer; otherwise shared words such as “element,” “palace,” or “energy” can conceal different rules.
            </p>
          </>
        ),
      },
      {
        heading: "Run a small learning experiment before committing",
        content: (
          <>
            <p>
              Spend one week on the shared vocabulary: yin-yang, Five Elements, stems, branches, and calendar boundaries. In week two, choose one system and complete one bounded exercise. Build and annotate one Bazi chart; cast and journal one I Ching question; map one room&apos;s movement and support; label one Ziwei chart without predicting; or research one zodiac branch using two sources.
            </p>
            <p>
              At the end, ask three questions: Can I reproduce the input and structure? Can I explain where the interpretation comes from? Did the method help me describe tradeoffs without removing agency? If the answer is no, review the <Link href="/learn/resources" className={linkClass}>source evaluation guide</Link> before buying a longer course or adding another system.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Should I learn Bazi or Ziwei Doushu first?",
        answer:
          "Learn Bazi first if you want a smaller core vocabulary and a chart organized around four pillars, the Day Master, elements, and relationship roles. Choose Ziwei first if you specifically want twelve palaces and star-based life-area detail. Both benefit from an accurate birth time, but Ziwei is usually less forgiving when the hour is uncertain.",
      },
      {
        question: "Which Chinese metaphysics system is easiest for beginners?",
        answer:
          "The Chinese zodiac is the easiest cultural entry point, but it gives the broadest answer. I Ching can be started without birth data, yet careful question framing and line interpretation take practice. Bazi offers a structured next step after calendar basics. Easy access should not be confused with shallow or guaranteed interpretation.",
      },
      {
        question: "What should I use if I do not know my birth time?",
        answer:
          "Use zodiac and calendar basics, begin a limited Bazi study that explicitly omits the hour pillar, ask one present question with I Ching, or study the observable form of a real space through Feng Shui. Do not invent a birth hour to make a precise Bazi or Ziwei chart appear complete.",
      },
      {
        question: "Can I study Bazi, I Ching, Feng Shui, and Ziwei together?",
        answer:
          "Yes, but learn them sequentially. Give each method its own question, inputs, calculation rules, source notes, and output. Compare the finished answers afterward. Mixing vocabulary before learning each grammar makes similarities look stronger than they are and makes errors difficult to trace.",
      },
    ],
    relatedLinks: systemRelatedLinks,
    cta: {
      title: "Verify the next source you use",
      description: "After choosing a system, learn how to compare primary texts, translations, reference data, teachers, communities, and calculators.",
      href: "/learn/resources",
      label: "Open the source guide",
    },
  }),
  buildPage({
    slug: "resources",
    path: "/learn/resources",
    title: "Chinese Metaphysics Books & Source Evaluation Guide",
    description: "A curated beginner source guide for Bazi, I Ching, Chinese calendars, translations, courses, communities, and calculator verification.",
    entityName: "Chinese Metaphysics Books and Source Evaluation",
    entityType: "Article",
    subtitle: "A practical method for choosing books, translations, teachers, communities, and tools without mistaking confidence for evidence.",
    directAnswer:
      "The best Chinese metaphysics resources identify the system, define translated terms, cite primary texts or stable reference tables, show a worked example, and state where interpretation begins. Start with a calendar reference, a primary source such as the Zhouyi or Yuan Hai Zi Ping, and a modern commentary; compare at least two sources before accepting a predictive or historical claim.",
    breadcrumbs: breadcrumbs("Resources", "/learn/resources"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-25", dateModified: "2026-08-07" },
    stats: [
      { value: "4", label: "Source layers", description: "Primary text, translation, reference data, and explanation." },
      { value: "5", label: "Verification steps", description: "Trace a claim before using it in interpretation." },
      { value: "2+", label: "Sources per claim", description: "Compare wording, context, and limits before concluding." },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A stable public reference for Gregorian, lunar, stem-branch, and solar-term calendar data.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      { label: "Yuan Hai Zi Ping (渊海子平)", source: "An early foundational text in the Four Pillars / Zi Ping textual tradition." },
      { label: "San Ming Tong Hui (三命通会)", source: "A Ming-dynasty compilation preserving terminology and methods from multiple fate-calculation traditions." },
      { label: "Zhouyi (周易 / I Ching)", source: "The received Changes text containing the 64 hexagram statements and line texts." },
      { label: "Alfred Huang, The Complete I Ching", source: "A modern English translation and commentary that identifies its interpretive choices." },
      { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac", source: "A secondary reference for calendar customs, almanac concepts, and cultural context." },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols", source: "A cross-reference for cultural symbols and associations rather than a chart-reading manual." },
    ],
    sections: [
      {
        heading: "Use four source layers instead of one authority",
        content: (
          <>
            <p>
              Chinese metaphysics resources do different jobs. A <strong>primary text</strong> preserves historical wording; a translation or commentary explains one reading of that wording; a calendar table or calculation reference supplies reproducible data; and a modern guide connects the material to a beginner&apos;s question. A trustworthy article tells you which layer it is using instead of presenting every sentence as timeless doctrine.
            </p>
            <p>
              No layer is sufficient alone. A classical passage can be terse, copied through later editions, and difficult to apply without context. A modern explanation can be clear while silently combining schools. A calculator can produce consistent pillars while saying nothing about why an interpretation follows. Use the layers together: confirm the data, locate the vocabulary, compare explanations, and mark the point where interpretation begins.
            </p>
          </>
        ),
      },
      {
        heading: "A starter shelf by subject",
        content: (
          <>
            <p>
              For calendar foundations, begin with the <cite>Hong Kong Observatory Chinese calendar conversion tables</cite>. They provide stable year tables and conversion data that help check lunar dates, stem-branch labels, and solar terms. Use a reference like this for calculation facts; do not ask it to supply personality meanings it was never designed to explain.
            </p>
            <p>
              For <TermLink term="Bazi">Bazi</TermLink>, treat <cite>Yuan Hai Zi Ping (渊海子平)</cite> and <cite>San Ming Tong Hui (三命通会)</cite> as textual anchors, not quick beginner manuals. Read them alongside a clear guide to the <Link href="/bazi/heavenly-stems" className={linkClass}>Heavenly Stems</Link>, <Link href="/bazi/earthly-branches" className={linkClass}>Earthly Branches</Link>, <Link href="/bazi/ten-gods" className={linkClass}>Ten Gods</Link>, and seasonal strength. When two authors disagree, record the school, rule, and chart context rather than choosing the more dramatic answer.
            </p>
            <p>
              For <TermLink term="I Ching">I Ching</TermLink>, read the received <cite>Zhouyi (周易 / I Ching)</cite> before relying on a list of one-line hexagram keywords. A translation such as <cite>Alfred Huang&apos;s The Complete I Ching</cite> can help, but compare its wording with another translation and keep the hexagram statement, line text, and later commentary distinct. For broader cultural context, <cite>Martin Palmer&apos;s T&apos;ung Shu</cite> and <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> are useful secondary references, not substitutes for system-specific rules.
            </p>
          </>
        ),
        stats: [{ value: "3", label: "Source roles", description: "Verify data, preserve text, and explain interpretation separately." }],
      },
      {
        heading: "A five-step claim verification workflow",
        content: (
          <>
            <p>
              Use the same short workflow for a book, video, course lesson, forum answer, or AI response. It is deliberately slower than accepting a polished explanation, but it creates notes you can reuse and correct.
            </p>
            <ol className="list-decimal space-y-3 pl-6">
              <li><strong>Name the system and claim.</strong> “Wood means growth” is too broad; ask whether the claim concerns Five Phase theory, a Bazi Day Master, seasonal qi, medicine, or symbolism.</li>
              <li><strong>Identify the source layer.</strong> Is the evidence a classical passage, a translator&apos;s note, a teacher&apos;s rule, a calendar table, or a modern analogy?</li>
              <li><strong>Locate the exact term.</strong> Record Chinese characters, pinyin, the quoted wording, chapter or hexagram, edition, translator, and URL or page number when available.</li>
              <li><strong>Compare an independent source.</strong> Check whether another edition or author agrees, narrows the rule, or assigns it to a different school.</li>
              <li><strong>Write the limit.</strong> Note what the source does not prove and which chart, date, question, or cultural context is required before applying it.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "How to evaluate translations and terminology",
        content: (
          <>
            <p>
              Translation choices are part of the interpretation. The character 氣 may appear as qi, energy, breath, influence, or material force; 用神 may be rendered as useful god, useful deity, or useful influence. None of those English labels explains the rule by itself. Keep the Chinese term beside the translation and ask how the author uses it in that specific system.
            </p>
            <p>
              Prefer translations that identify their base text or edition, distinguish original text from commentary, explain unusual choices, and preserve ambiguity where the source is ambiguous. Be cautious when a resource replaces every technical term with modern psychology: accessibility is helpful, but an analogy should not erase the calendar, line position, palace, season, or relationship that gives the term its technical meaning.
            </p>
          </>
        ),
      },
      {
        heading: "How to evaluate teachers, courses, and communities",
        content: (
          <>
            <p>
              A useful teacher shows a syllabus, names the school or lineage when it matters, demonstrates a rule on more than one example, and explains how errors are corrected. A useful community welcomes requests for definitions and sources. Neither needs to pretend that every tradition agrees. Disagreement becomes informative when participants can name the rule, source, and conditions behind it.
            </p>
            <p>
              Treat guaranteed outcomes, fear-based deadlines, secret-rule upsells, copied case studies, and refusal to show calculation steps as warning signs. Testimonials can describe a learner&apos;s experience, but they cannot verify a historical claim or prediction method. Before paying, review a sample lesson and ask whether the course separates calculation, interpretation, ethics, and cultural history.
            </p>
          </>
        ),
      },
      {
        heading: "Use calculators as reproducible tools, not authorities",
        content: (
          <>
            <p>
              A calculator should make its inputs and conventions visible: calendar date, time, time zone, boundary rules, solar-term handling, and any assumptions used when the birth hour is unknown. Re-enter one example in a second tool and compare the four pillars before interpreting them. If the outputs differ, investigate the boundary rule instead of averaging the readings.
            </p>
            <p>
              Use the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> to generate a chart, then verify its vocabulary with the <Link href="/bazi/what-is-bazi" className={linkClass}>Bazi overview</Link>. Use the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> only after writing a single, open question and learning how primary and relating hexagrams are formed. Use the <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link> as a branch-pattern reference, not a verdict on a relationship.
            </p>
          </>
        ),
      },
      {
        heading: "Build notes that remain useful when your view changes",
        content: (
          <>
            <p>
              For every important concept, record the Chinese term, pinyin, working translation, system, source, exact passage, your paraphrase, one example, and a confidence level. Separate quotation from summary and summary from your own inference. This makes it possible to update one layer without rewriting the entire subject from memory.
            </p>
            <p>
              End each note with a next check: compare another translation, test a calendar boundary, find a counterexample, or ask a teacher which school uses the rule. That habit turns a resource list into a research practice and keeps future explanations—human or AI-generated—traceable to evidence.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Which Chinese metaphysics book should a beginner read first?",
        answer:
          "Start with a clear overview of stems, branches, Five Elements, and the Chinese calendar, then choose a primary text that matches your system: the Zhouyi for I Ching or a guided introduction to the Zi Ping textual tradition for Bazi. A primary text alone is rarely the easiest first teacher, so pair it with a transparent modern commentary.",
      },
      {
        question: "How can I tell whether an I Ching or Bazi translation is reliable?",
        answer:
          "Look for the Chinese term or source text, the edition or translator, a distinction between original passage and commentary, and notes explaining difficult choices. Compare at least one passage with another translation. Reliability does not require identical wording; it requires enough transparency to see why the wording differs.",
      },
      {
        question: "How do I verify an online Chinese metaphysics claim?",
        answer:
          "Name the system, locate the exact term or rule, identify whether the evidence is primary text, commentary, calculation data, or analogy, and compare an independent source. Then state the conditions and limits. If the author cannot show where a rule comes from or when it applies, treat it as an unsupported interpretation.",
      },
      {
        question: "Can a calculator replace a source text or teacher?",
        answer:
          "No. A calculator can reproduce calendar or chart calculations when its conventions are clear, but it cannot establish the historical meaning of a term or prove that one interpretation follows. Use tools to verify inputs and structures, then use documented sources and worked examples to evaluate interpretation.",
      },
    ],
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
