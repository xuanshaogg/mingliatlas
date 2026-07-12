import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";

export interface ZiweiContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

interface TopicInput {
  slug: string;
  label: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  group: string;
  datePublished?: string;
  dateModified?: string;
}

const relatedLinks = [
  { title: "Bazi Overview", href: "/bazi", description: "Compare Ziwei with Four Pillars chart logic." },
  { title: "I Ching Oracle", href: "/tools/i-ching-oracle", description: "Use a decision-focused Chinese classic alongside natal systems." },
  { title: "Learn: Which System?", href: "/learn/which-system", description: "Choose the right Chinese metaphysics system for your question." },
];

const defaultFaqs: FAQ[] = [
  {
    question: "Is Ziwei Doushu the same as Bazi?",
    answer:
      "No. Bazi reads stems, branches, elements, and timing cycles. Ziwei Doushu reads a palace-based star chart with 12 palaces, 14 major stars, and transformation patterns.",
  },
  {
    question: "Do I need an exact birth hour for Ziwei?",
    answer:
      "Yes. Ziwei chart placement is sensitive to birth hour. A wrong hour can move the Life Palace and change the chart structure.",
  },
  {
    question: "Can this page replace a full Ziwei reading?",
    answer:
      "No. These pages explain concepts and vocabulary. A full reading needs complete chart calculation, school-specific rules, and careful context.",
  },
  {
    question: "How should beginners study Ziwei?",
    answer:
      "Start with the 12 palaces, then learn the 14 major stars, Four Transformations, and how stars behave differently by palace.",
  },
  {
    question: "What makes Ziwei Doushu different from Western astrology?",
    answer:
      "Ziwei Doushu builds a chart from the Chinese lunar calendar and birth hour, then arranges 14 major stars across 12 fixed palaces tied to life areas such as career, wealth, and relationships. Western astrology maps planetary positions against the tropical zodiac instead, so the two systems use different inputs, symbols, and chart logic.",
  },
];

// Per-topic FAQ overrides for Ziwei pages that already earn search impressions
// (e.g. four-transformations ranks ~pos 4 for "ziwei four transformations").
// Pages without an override fall back to defaultFaqs.
const topicFaqs: Partial<Record<string, FAQ[]>> = {
  "four-transformations": [
    {
      question: "What are the Four Transformations (Si Hua) in Ziwei Doushu?",
      answer:
        "The Four Transformations (四化, Si Hua) are four activations a Heavenly Stem assigns to specific stars: Hua Lu (化祿, prosperity and smooth flow), Hua Quan (化權, power and authority), Hua Ke (化科, reputation and support), and Hua Ji (化忌, obstruction and fixation). They show which stars are activated, supported, elevated, or complicated in a chart.",
    },
    {
      question: "What does Hua Ji (化忌) mean in a Ziwei chart?",
      answer:
        "Hua Ji is the transformation of obstruction or attachment. It marks the star and palace where energy gets stuck, over-focused, or complicated. It is not purely negative — it shows where attention concentrates and where the most growth or friction tends to occur, depending on the rest of the chart.",
    },
    {
      question: "How do the Four Transformations work with the birth-year stem?",
      answer:
        "The birth-year Heavenly Stem determines the natal Four Transformations: each of the 10 stems maps to a fixed set of four stars that receive Lu, Quan, Ke, and Ji. Decade and annual stems then add their own transformations on top, which is how Ziwei reads changing timing across life cycles.",
    },
    {
      question: "Why are the Four Transformations important in Ziwei Doushu?",
      answer:
        "They are the dynamic layer of the chart. Palaces and stars describe a static structure; the transformations show what is actually activated and where energy moves. Many Ziwei schools read the Si Hua first because they reveal the chart's live themes and timing rather than fixed traits.",
    },
  ],
  "major-stars": [
    {
      question: "What are the 14 major stars in Ziwei Doushu?",
      answer:
        "The 14 major stars are Ziwei, Tianji, Taiyang, Wuqu, Tiantong, Lianzhen, Tianfu, Taiyin, Tanlang, Jumen, Tianxiang, Tianliang, Qisha, and Pojun. They form the primary vocabulary of a Ziwei chart — each carries a core theme that shifts depending on the palace it occupies and the transformations acting on it.",
    },
    {
      question: "Which major star is the most important in Ziwei?",
      answer:
        "Ziwei (the emperor star) is the namesake and anchor of the system, associated with leadership and centrality, but no star is universally most important. The decisive factor is which star sits in your Life Palace and how the Four Transformations activate the chart, not a fixed ranking of stars.",
    },
    {
      question: "How do major stars differ from minor stars?",
      answer:
        "Major stars set the main theme and style of each palace; minor stars add nuance, triggers, and supporting detail. A reading starts with the 14 major stars to establish structure, then layers in minor stars for texture. Reading minor stars before the majors usually produces a confused interpretation.",
    },
    {
      question: "How do I read the major star in my Life Palace?",
      answer:
        "The major star in the Life Palace gives the chart's central style: how the person approaches choices, pressure, visibility, and responsibility. Read that star first, then check its brightness, companion stars, opposite palace, and Four Transformations. A Life Palace star is important, but it is never interpreted alone.",
    },
  ],
};

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Ziwei", href: "/ziwei" },
    { label: current, href },
  ];
}

function cta(title = "Compare Ziwei with Bazi") {
  return {
    title,
    description:
      "Ziwei is strongest when you understand how it differs from Bazi, I Ching, and Chinese zodiac systems.",
    href: "/learn/which-system",
    label: "Choose a system",
  };
}

const defaultEditorialQuote = {
  text: "A careful Ziwei reading uses palaces and stars as a structured map, then checks timing and lived context.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
}

function buildPage(input: Omit<ZiweiContentPage, "data"> & KnowledgePageProps): ZiweiContentPage {
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
        datePublished: data.schema.datePublished ?? "2026-02-20",
        dateModified: data.schema.dateModified ?? "2026-03-10",
      },
    },
  };
}

const overview = buildPage({
  slug: "",
  path: "/ziwei",
  title: "Ziwei Doushu: Purple Star Astrology Guide",
  description:
    "Ziwei Doushu, or Purple Star Astrology, is a Chinese natal chart system built from palaces, stars, transformations, and life-cycle timing.",
  entityName: "Ziwei Doushu",
  entityType: "DefinedTerm",
  subtitle: "A structured introduction to Purple Star Astrology for Western readers.",
  directAnswer:
    "Ziwei Doushu, often translated as Purple Star Astrology, is a Chinese metaphysics system that places major stars into 12 life palaces. It studies personality, relationships, career, wealth, health tendencies, and timing through palace structure rather than only stems and branches. A careful reading checks the Life Palace, major stars, Four Transformations, and decade cycles before drawing conclusions.",
  breadcrumbs: breadcrumbs("Overview", "/ziwei"),
  schema: { headline: "", description: "", url: "", datePublished: "2025-12-05", dateModified: "2026-07-12" },
  stats: [
    { value: "12", label: "Palaces", description: "Life areas such as career, wealth, spouse, and health." },
    { value: "14", label: "Major stars", description: "Core star vocabulary for chart interpretation." },
    { value: "4", label: "Transformations", description: "Si Hua dynamics used in many schools." },
  ],
  citations: [
    { label: "Ziwei Doushu Quan Shu", source: "Classical source tradition for Purple Star Astrology methods.", url: "https://zh.wikisource.org/wiki/%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B8%E5%85%A8%E6%9B%B8" },
    { label: "Hong Kong Observatory: Gregorian-Lunar Calendar Conversion", source: "Reference tables for checking the lunar calendar dates used in chart construction.", url: "https://www.hko.gov.hk/en/gts/time/conversion.htm" },
  ],
  sections: [
    {
      heading: "How Ziwei Doushu reads a chart",
      content: (
        <>
          <p>
            Purple Star Astrology organizes a birth chart into 12 palaces. Each palace describes a life area: career, wealth, relationships, health, travel, and more. Major stars placed in those palaces show style, pressure, support, and timing patterns.
          </p>
          <p>
            Compared with <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>, Ziwei gives a more visual palace map. Bazi emphasizes element balance and stem-branch relationships. Ziwei emphasizes star placement, palace interactions, and the Four Transformations that activate different life areas across time.
          </p>
        </>
      ),
    },
    {
      heading: "Ziwei vs Bazi: key differences",
      content: (
        <>
          <p>
            Both systems use the Chinese calendar and birth time, but they ask different questions. Bazi reads stems, branches, and element balance to understand personality patterns and decade timing. Ziwei reads star placement across 12 palaces to understand life-area themes and transformation cycles.
          </p>
          <p>
            Bazi is often described as more element-focused and analytical. Ziwei is often described as more visual and palace-based. Neither is more accurate; they are different lenses. Many practitioners use both together: Bazi for element and timing structure, Ziwei for palace-level life-area detail.
          </p>
        </>
      ),
      stats: [
        { value: "12", label: "Palaces", description: "Life areas such as career, wealth, spouse, and health." },
        { value: "14", label: "Major stars", description: "Core star vocabulary for chart interpretation." },
        { value: "4", label: "Transformations", description: "Si Hua dynamics used in many schools." },
      ],
    },
    {
      heading: "Common beginner mistakes",
      content: (
        <>
          <p>
            The most common mistake is reading a single star as a fixed personality label. The same star behaves differently depending on which palace it occupies, which other stars accompany it, and which transformations are active. A star that looks challenging in one palace can be productive in another.
          </p>
          <p>
            A second mistake is ignoring the birth hour. Ziwei chart placement is sensitive to birth hour. A wrong hour can move the Life Palace and change the entire chart structure. If the birth hour is uncertain, the chart should be treated with caution.
          </p>
          <p>
            A third mistake is treating Ziwei as a fixed destiny map. Like Bazi, it describes patterns and tendencies, not guaranteed outcomes. The best use is to understand recurring themes and timing, then make better-informed choices.
          </p>
        </>
      ),
    },
    {
      heading: "How to start learning Ziwei",
      content: (
        <>
          <p>
            Start with the 12 palaces, then learn the 14 major stars, then the Four Transformations. After that, study how stars behave differently by palace and how decade cycles activate different life areas.
          </p>
          <p>
            <cite>Ziwei Doushu Quan Shu</cite> emphasizes palace structure and star placement, while <cite>Chinese calendar tradition</cite> provides the birth-time frame used to build the chart. Read the two systems together when you want both character patterns and timing context.
          </p>
          <p>
            Compare Ziwei with <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link> using the <Link href="/learn/which-system" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">which system guide</Link> to decide where to focus your study first.
          </p>
        </>
      ),
    },
  ],
  faqs: defaultFaqs,
  relatedLinks,
  cta: cta(),
});

const topics: TopicInput[] = [
  { slug: "what-is-ziwei-doushu", datePublished: "2025-12-10", dateModified: "2026-03-12", label: "What Is Ziwei Doushu", title: "What Is Ziwei Doushu? Purple Star Astrology Explained", description: "An introduction to palace-based Chinese natal astrology and how it differs from Bazi.", statValue: "1,000+", statLabel: "Years of practice", group: "Introduction" },
  { slug: "ziwei-vs-bazi", datePublished: "2025-12-15", dateModified: "2026-03-14", label: "Ziwei vs Bazi", title: "Ziwei vs Bazi: Key Differences for Beginners", description: "A comparison of star-palace reading and stem-branch Four Pillars analysis.", statValue: "2", statLabel: "Core systems", group: "Introduction" },
  { slug: "twelve-palaces", datePublished: "2025-12-20", dateModified: "2026-03-16", label: "Twelve Palaces", title: "The 12 Ziwei Palaces: Complete Beginner Guide", description: "The 12 life areas used in Purple Star Astrology chart reading.", statValue: "12", statLabel: "Palaces", group: "Introduction" },
  { slug: "life-palace", datePublished: "2025-12-25", dateModified: "2026-03-18", label: "Life Palace", title: "Life Palace in Ziwei Doushu: Meaning and Use", description: "The central palace for identity, direction, temperament, and chart emphasis.", statValue: "1", statLabel: "Chart anchor", group: "Introduction" },
  { slug: "body-palace", datePublished: "2026-01-02", dateModified: "2026-03-20", label: "Body Palace", title: "Body Palace in Ziwei Doushu: Action and Embodiment", description: "The palace showing how chart patterns become behavior, action, and lived experience.", statValue: "1", statLabel: "Action palace", group: "Introduction" },
  { slug: "four-transformations", datePublished: "2026-01-08", dateModified: "2026-06-29", label: "Four Transformations", title: "Four Transformations (Si Hua) in Ziwei Doushu", description: "The transformation stars that show activation, support, pressure, and complication.", statValue: "4", statLabel: "Transformations", group: "Introduction" },
  { slug: "major-stars", datePublished: "2026-01-14", dateModified: "2026-06-29", label: "Major Stars", title: "14 Major Stars in Ziwei Doushu: Overview", description: "The core star vocabulary used for most Ziwei chart interpretation.", statValue: "14", statLabel: "Major stars", group: "Introduction" },
  { slug: "minor-stars", datePublished: "2026-01-20", dateModified: "2026-03-26", label: "Minor Stars", title: "Minor Stars in Ziwei Doushu: Support and Detail", description: "Secondary stars add nuance, triggers, and supporting context to a chart.", statValue: "100+", statLabel: "Named stars", group: "Introduction" },
  { slug: "reading-chart", datePublished: "2026-01-26", dateModified: "2026-03-28", label: "Reading a Ziwei Chart", title: "How to Read a Ziwei Doushu Chart", description: "A beginner workflow for reading palaces, major stars, transformations, and cycles.", statValue: "4", statLabel: "Reading layers", group: "Introduction" },
  { slug: "ziwei-compatibility", datePublished: "2026-02-01", dateModified: "2026-03-30", label: "Ziwei Compatibility", title: "Ziwei Compatibility: Reading Relationship Palaces", description: "A relationship-focused guide using spouse palace, Life Palace, and timing context.", statValue: "2+", statLabel: "Charts compared", group: "Introduction" },
  { slug: "major-stars/ziwei-star", datePublished: "2026-02-05", dateModified: "2026-04-01", label: "Ziwei Star", title: "Ziwei Star in Purple Star Astrology", description: "The emperor star associated with leadership, centrality, responsibility, and command.", statValue: "1", statLabel: "Emperor star", group: "Major Stars" },
  { slug: "major-stars/tianji", datePublished: "2026-02-08", dateModified: "2026-04-02", label: "Tianji Star", title: "Tianji Star in Ziwei Doushu", description: "A star linked with strategy, movement, planning, and mental flexibility.", statValue: "14", statLabel: "Major-star set", group: "Major Stars" },
  { slug: "major-stars/taiyang", datePublished: "2026-02-11", dateModified: "2026-04-03", label: "Taiyang Star", title: "Taiyang Star in Ziwei Doushu", description: "The Sun star associated with visibility, generosity, public life, and active support.", statValue: "1", statLabel: "Sun star", group: "Major Stars" },
  { slug: "major-stars/wuqu", datePublished: "2026-02-14", dateModified: "2026-04-04", label: "Wuqu Star", title: "Wuqu Star in Ziwei Doushu", description: "A finance and discipline star associated with structure, execution, and resource control.", statValue: "1", statLabel: "Finance star", group: "Major Stars" },
  { slug: "major-stars/tiantong", datePublished: "2026-02-17", dateModified: "2026-04-05", label: "Tiantong Star", title: "Tiantong Star in Ziwei Doushu", description: "A comfort and harmony star associated with ease, support, and emotional softness.", statValue: "1", statLabel: "Blessing star", group: "Major Stars" },
  { slug: "major-stars/lianzhen", datePublished: "2026-02-20", dateModified: "2026-04-06", label: "Lianzhen Star", title: "Lianzhen Star in Ziwei Doushu", description: "A complex star connected with charisma, boundaries, discipline, and refinement.", statValue: "1", statLabel: "Complex star", group: "Major Stars" },
  { slug: "major-stars/tianfu", datePublished: "2026-02-23", dateModified: "2026-04-07", label: "Tianfu Star", title: "Tianfu Star in Ziwei Doushu", description: "A treasury star associated with stewardship, resources, reliability, and support.", statValue: "1", statLabel: "Treasury star", group: "Major Stars" },
  { slug: "major-stars/taiyin", label: "Taiyin Star", title: "Taiyin Star in Ziwei Doushu", description: "The Moon star associated with reflection, sensitivity, storage, and inner life.", statValue: "1", statLabel: "Moon star", group: "Major Stars" },
  { slug: "major-stars/tanlang", label: "Tanlang Star", title: "Tanlang Star in Ziwei Doushu", description: "A desire and talent star associated with charisma, appetite, arts, and social magnetism.", statValue: "1", statLabel: "Talent star", group: "Major Stars" },
  { slug: "major-stars/jumen", label: "Jumen Star", title: "Jumen Star in Ziwei Doushu", description: "A speech and debate star associated with analysis, questions, communication, and shadows.", statValue: "1", statLabel: "Speech star", group: "Major Stars" },
  { slug: "major-stars/tianxiang", label: "Tianxiang Star", title: "Tianxiang Star in Ziwei Doushu", description: "A minister star associated with service, balance, governance, and mediation.", statValue: "1", statLabel: "Minister star", group: "Major Stars" },
  { slug: "major-stars/tianliang", label: "Tianliang Star", title: "Tianliang Star in Ziwei Doushu", description: "A protection star associated with guidance, ethics, elders, and problem solving.", statValue: "1", statLabel: "Protection star", group: "Major Stars" },
  { slug: "major-stars/qisha", label: "Qisha Star", title: "Qisha Star in Ziwei Doushu", description: "A decisive star associated with courage, pressure, disruption, and breakthrough action.", statValue: "1", statLabel: "Decisive star", group: "Major Stars" },
  { slug: "major-stars/pojun", label: "Pojun Star", title: "Pojun Star in Ziwei Doushu", description: "A transformation star associated with breaking old forms and rebuilding under pressure.", statValue: "1", statLabel: "Breakthrough star", group: "Major Stars" },
  { slug: "palaces/life-palace", label: "Life Palace", title: "Life Palace in Ziwei Doushu", description: "The palace for identity, temperament, direction, and main chart emphasis.", statValue: "12", statLabel: "Palace system", group: "Palaces" },
  { slug: "palaces/siblings-palace", label: "Siblings Palace", title: "Siblings Palace in Ziwei Doushu", description: "The palace for sibling dynamics, peer support, and close horizontal relationships.", statValue: "1", statLabel: "Relationship palace", group: "Palaces" },
  { slug: "palaces/spouse-palace", label: "Spouse Palace", title: "Spouse Palace in Ziwei Doushu", description: "The palace for partnership style, marriage themes, and intimate relationship patterns.", statValue: "1", statLabel: "Partner palace", group: "Palaces" },
  { slug: "palaces/children-palace", label: "Children Palace", title: "Children Palace in Ziwei Doushu", description: "The palace for children, creative output, legacy, and downstream responsibilities.", statValue: "1", statLabel: "Legacy palace", group: "Palaces" },
  { slug: "palaces/wealth-palace", label: "Wealth Palace", title: "Wealth Palace in Ziwei Doushu", description: "The palace for earning style, resource flow, financial pressure, and asset habits.", statValue: "1", statLabel: "Money palace", group: "Palaces" },
  { slug: "palaces/health-palace", label: "Health Palace", title: "Health Palace in Ziwei Doushu", description: "The palace for vitality patterns, stress expression, and body-related caution signals.", statValue: "1", statLabel: "Health palace", group: "Palaces" },
  { slug: "palaces/travel-palace", label: "Travel Palace", title: "Travel Palace in Ziwei Doushu", description: "The palace for movement, external opportunities, relocation, and public-facing life.", statValue: "1", statLabel: "Movement palace", group: "Palaces" },
  { slug: "palaces/friends-palace", label: "Friends Palace", title: "Friends Palace in Ziwei Doushu", description: "The palace for networks, teams, clients, collaborators, and social support.", statValue: "1", statLabel: "Network palace", group: "Palaces" },
  { slug: "palaces/career-palace", label: "Career Palace", title: "Career Palace in Ziwei Doushu", description: "The palace for vocation, work direction, reputation, and professional structure.", statValue: "1", statLabel: "Work palace", group: "Palaces" },
  { slug: "palaces/property-palace", label: "Property Palace", title: "Property Palace in Ziwei Doushu", description: "The palace for home, property, family assets, and long-term material stability.", statValue: "1", statLabel: "Asset palace", group: "Palaces" },
  { slug: "palaces/mental-palace", label: "Fortune Palace", title: "Fortune Palace in Ziwei Doushu", description: "The palace for inner state, enjoyment, values, and mental-emotional rhythm.", statValue: "1", statLabel: "Inner-life palace", group: "Palaces" },
  { slug: "palaces/parents-palace", label: "Parents Palace", title: "Parents Palace in Ziwei Doushu", description: "The palace for parents, elders, authority figures, and early support patterns.", statValue: "1", statLabel: "Elder palace", group: "Palaces" },
];

function chartFunctionGuide(topic: TopicInput): string {
  if (topic.group === "Major Stars") {
    return `For ${topic.label}, first record the palace it occupies, its opposite palace, companion major stars, relevant minor stars, and any Four Transformation attached to it. Only then translate its core keywords into behavior; the same star can lead, support, question, protect, or disrupt depending on that structure.`;
  }
  if (topic.group === "Palaces") {
    return `For ${topic.label}, begin with the major stars seated there, then compare the opposite palace and the two linked three-harmony palaces. This shows whether the life-area theme is directly emphasized, supported from elsewhere, or mainly activated during a decade or annual cycle.`;
  }
  return `Use ${topic.label} as a reading step rather than a standalone result. Identify which chart layer the concept belongs to, what birth-time assumptions it depends on, and which palace, star, transformation, or timing layer must be checked next.`;
}

function comparisonGuide(topic: TopicInput): string {
  if (topic.group === "Major Stars") {
    return `Compare ${topic.label} across at least two palace contexts before assigning a fixed meaning. A star associated with visibility in the Career Palace, for example, raises a different question from the same star in the Spouse or Fortune Palace.`;
  }
  if (topic.group === "Palaces") {
    return `Compare the natal condition of ${topic.label} with the active decade palace. This separates a long-running life-area pattern from a temporary period when that palace receives more attention or pressure.`;
  }
  return `Compare the output of ${topic.label} with the Life Palace, Body Palace, and current decade cycle. If those layers disagree, preserve the difference instead of forcing them into a single personality label.`;
}

function createTopicPage(topic: TopicInput): ZiweiContentPage {
  const path = `/ziwei/${topic.slug}`;

  return buildPage({
    slug: topic.slug,
    path,
    title: topic.title,
    description: topic.description,
    entityName: topic.label,
    entityType: "DefinedTerm",
    subtitle: `${topic.group} guide for Purple Star Astrology students.`,
    directAnswer: `${topic.label} is a ${topic.group.toLowerCase()} concept in Ziwei Doushu. ${topic.description} Read it through the full chart structure: palace position, major stars, minor stars, Four Transformations, decade cycles, and birth-hour confidence. A single palace or star can describe a theme, but it should not become a fixed verdict about a person.`,
    breadcrumbs: breadcrumbs(topic.label, path),
    schema: { headline: "", description: "", url: "", datePublished: topic.datePublished, dateModified: "2026-07-12" },
    stats: [
      { value: topic.statValue, label: topic.statLabel, description: "A practical anchor for this Ziwei topic." },
      { value: "12", label: "Palaces", description: "Every topic is interpreted through palace position." },
      { value: "14", label: "Major stars", description: "Core stars provide the first layer of meaning." },
    ],
    citations: [
      { label: "Ziwei Doushu Quan Shu", source: "Classical source tradition for palace and star interpretation.", url: "https://zh.wikisource.org/wiki/%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B8%E5%85%A8%E6%9B%B8" },
      { label: "Hong Kong Observatory: Gregorian-Lunar Calendar Conversion", source: "Reference tables for checking the lunar calendar dates used in chart construction.", url: "https://www.hko.gov.hk/en/gts/time/conversion.htm" },
    ],
    sections: [
      {
        heading: `What ${topic.label} means`,
        content: (
          <>
            <p>
              {topic.description} In Ziwei, meaning comes from the relationship between star, palace, transformation, and timing cycle rather than from one keyword alone.
            </p>
            <p>
              Use this page as a reference point for vocabulary and reading order. A complete interpretation still needs the full chart, the exact birth hour, and the school-specific rules used to calculate the chart.
            </p>
          </>
        ),
      },
      {
        heading: "How it functions in the chart",
        content: (
          <>
            <p>
              {chartFunctionGuide(topic)}
            </p>
            <p>
              Then locate the topic in relation to the Life Palace, Body Palace, and relevant life-area palace. The same star can read differently in career, spouse, wealth, or health contexts, especially when decade cycles activate a different palace.
            </p>
          </>
        ),
        stats: [{ value: "4+", label: "Context layers", description: "Palace, star, transformation, and timing should be read together." }],
      },
      {
        heading: "What to compare before judging",
        content: (
          <>
            <p>
              {comparisonGuide(topic)}
            </p>
            <p>
              Also compare Ziwei findings with <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link> when the question depends on element balance, seasonal strength, or stem-branch timing. The systems can support each other, but they should not be collapsed into one method.
            </p>
          </>
        ),
      },
      {
        heading: "Common mistakes",
        content: (
          <>
            <p>
              The biggest mistake is reading {topic.label} as a fixed personality label. Ziwei keywords are starting points, not final judgments. Palace context, companion stars, transformations, and timing can all change how the theme shows up.
            </p>
            <p>
              A second mistake is ignoring birth-hour uncertainty. Ziwei is sensitive to birth hour, so an uncertain time should be treated as a hypothesis. A careful reading names that limitation instead of pretending the chart is exact.
            </p>
          </>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <>
            <p>
              Continue through the <Link href="/ziwei" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Ziwei hub</Link>, then study the <Link href="/ziwei/twelve-palaces" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">12 palaces</Link>, <Link href="/ziwei/major-stars" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">14 major stars</Link>, and <Link href="/ziwei/four-transformations" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Four Transformations</Link>.
            </p>
            <p>
              For system choice, compare Ziwei with <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link> and the <Link href="/learn/which-system" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">which system guide</Link> before deciding which method fits your question.
            </p>
          </>
        ),
      },
    ],
    faqs: topicFaqs[topic.slug] ?? defaultFaqs,
    relatedLinks,
    cta: cta(),
  });
}

export const allZiweiPages = [overview, ...topics.map(createTopicPage)];

export function getZiweiPage(slug: string): ZiweiContentPage | undefined {
  return allZiweiPages.find((page) => page.slug === slug);
}

export function getZiweiStaticParams(): Array<{ slug?: string[] }> {
  return allZiweiPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
