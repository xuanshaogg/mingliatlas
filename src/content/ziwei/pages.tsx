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
];

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
    "Ziwei Doushu, often translated as Purple Star Astrology, is a Chinese metaphysics system that places major stars into 12 life palaces. It studies personality, relationships, career, wealth, health tendencies, and timing through palace structure rather than only stems and branches.",
  breadcrumbs: breadcrumbs("Overview", "/ziwei"),
  schema: { headline: "", description: "", url: "" },
  stats: [
    { value: "12", label: "Palaces", description: "Life areas such as career, wealth, spouse, and health." },
    { value: "14", label: "Major stars", description: "Core star vocabulary for chart interpretation." },
    { value: "4", label: "Transformations", description: "Si Hua dynamics used in many schools." },
  ],
  citations: [
    { label: "Ziwei Doushu Quan Shu", source: "Classical source tradition for Purple Star Astrology methods." },
    { label: "Chinese calendar tradition", source: "Ziwei chart construction depends on lunar date and birth hour." },
  ],
  sections: [
    {
      heading: "How Ziwei Doushu reads a chart",
      content: (
        <>
          <p>
            Purple Star Astrology (Ziwei Doushu) organizes a birth chart into 12 palaces. Each palace describes a life area, while major stars show style, pressure, support, and timing.
          </p>
          <p>
            Compared with <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>, Ziwei gives a more visual palace map. Bazi emphasizes element balance and stem-branch relationships.
          </p>
        </>
      ),
      quotes: [
        {
          text: "Ziwei is most helpful when stars, palaces, and timing are read as one connected chart.",
          author: "Jerry King",
          title: "Chinese Metaphysics Consultant",
          organization: "White Dragon Consulting",
        },
      ],
    },
    {
      heading: "The core vocabulary",
      content: (
        <p>
          Beginners should learn the 12 palaces, 14 major stars, and Four Transformations before reading advanced combinations. The same star can behave differently depending on palace, companions, and chart context.
        </p>
      ),
      stats: [
        { value: "1", label: "Life Palace", description: "The chart anchor for identity and basic direction." },
        { value: "10-year", label: "Cycles", description: "Major timing cycles are commonly read by decade." },
      ],
    },
    {
      heading: "Responsible use",
      content: (
        <p>
          Use Ziwei as a structured self-knowledge system. Avoid reading one star as a fixed label. A careful reading checks palace, star brightness, transformations, and timing together.
        </p>
      ),
    },
  ],
  faqs: defaultFaqs,
  relatedLinks,
  cta: cta(),
});

const topics: TopicInput[] = [
  { slug: "what-is-ziwei-doushu", label: "What Is Ziwei Doushu", title: "What Is Ziwei Doushu? Purple Star Astrology Explained", description: "An introduction to palace-based Chinese natal astrology and how it differs from Bazi.", statValue: "1,000+", statLabel: "Years of practice", group: "Introduction" },
  { slug: "ziwei-vs-bazi", label: "Ziwei vs Bazi", title: "Ziwei vs Bazi: Key Differences for Beginners", description: "A comparison of star-palace reading and stem-branch Four Pillars analysis.", statValue: "2", statLabel: "Core systems", group: "Introduction" },
  { slug: "twelve-palaces", label: "Twelve Palaces", title: "The 12 Ziwei Palaces: Complete Beginner Guide", description: "The 12 life areas used in Purple Star Astrology chart reading.", statValue: "12", statLabel: "Palaces", group: "Introduction" },
  { slug: "life-palace", label: "Life Palace", title: "Life Palace in Ziwei Doushu: Meaning and Use", description: "The central palace for identity, direction, temperament, and chart emphasis.", statValue: "1", statLabel: "Chart anchor", group: "Introduction" },
  { slug: "body-palace", label: "Body Palace", title: "Body Palace in Ziwei Doushu: Action and Embodiment", description: "The palace showing how chart patterns become behavior, action, and lived experience.", statValue: "1", statLabel: "Action palace", group: "Introduction" },
  { slug: "four-transformations", label: "Four Transformations", title: "Four Transformations (Si Hua) in Ziwei Doushu", description: "The transformation stars that show activation, support, pressure, and complication.", statValue: "4", statLabel: "Transformations", group: "Introduction" },
  { slug: "major-stars", label: "Major Stars", title: "14 Major Stars in Ziwei Doushu: Overview", description: "The core star vocabulary used for most Ziwei chart interpretation.", statValue: "14", statLabel: "Major stars", group: "Introduction" },
  { slug: "minor-stars", label: "Minor Stars", title: "Minor Stars in Ziwei Doushu: Support and Detail", description: "Secondary stars add nuance, triggers, and supporting context to a chart.", statValue: "100+", statLabel: "Named stars", group: "Introduction" },
  { slug: "reading-chart", label: "Reading a Ziwei Chart", title: "How to Read a Ziwei Doushu Chart", description: "A beginner workflow for reading palaces, major stars, transformations, and cycles.", statValue: "4", statLabel: "Reading layers", group: "Introduction" },
  { slug: "ziwei-compatibility", label: "Ziwei Compatibility", title: "Ziwei Compatibility: Reading Relationship Palaces", description: "A relationship-focused guide using spouse palace, Life Palace, and timing context.", statValue: "2+", statLabel: "Charts compared", group: "Introduction" },
  { slug: "major-stars/ziwei-star", label: "Ziwei Star", title: "Ziwei Star in Purple Star Astrology", description: "The emperor star associated with leadership, centrality, responsibility, and command.", statValue: "1", statLabel: "Emperor star", group: "Major Stars" },
  { slug: "major-stars/tianji", label: "Tianji Star", title: "Tianji Star in Ziwei Doushu", description: "A star linked with strategy, movement, planning, and mental flexibility.", statValue: "14", statLabel: "Major-star set", group: "Major Stars" },
  { slug: "major-stars/taiyang", label: "Taiyang Star", title: "Taiyang Star in Ziwei Doushu", description: "The Sun star associated with visibility, generosity, public life, and active support.", statValue: "1", statLabel: "Sun star", group: "Major Stars" },
  { slug: "major-stars/wuqu", label: "Wuqu Star", title: "Wuqu Star in Ziwei Doushu", description: "A finance and discipline star associated with structure, execution, and resource control.", statValue: "1", statLabel: "Finance star", group: "Major Stars" },
  { slug: "major-stars/tiantong", label: "Tiantong Star", title: "Tiantong Star in Ziwei Doushu", description: "A comfort and harmony star associated with ease, support, and emotional softness.", statValue: "1", statLabel: "Blessing star", group: "Major Stars" },
  { slug: "major-stars/lianzhen", label: "Lianzhen Star", title: "Lianzhen Star in Ziwei Doushu", description: "A complex star connected with charisma, boundaries, discipline, and refinement.", statValue: "1", statLabel: "Complex star", group: "Major Stars" },
  { slug: "major-stars/tianfu", label: "Tianfu Star", title: "Tianfu Star in Ziwei Doushu", description: "A treasury star associated with stewardship, resources, reliability, and support.", statValue: "1", statLabel: "Treasury star", group: "Major Stars" },
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
    directAnswer: `${topic.label} is a ${topic.group.toLowerCase()} concept in Ziwei Doushu. ${topic.description} It should be read with palace position, major stars, transformations, and timing context rather than as a single isolated label.`,
    breadcrumbs: breadcrumbs(topic.label, path),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: topic.statValue, label: topic.statLabel, description: "A practical anchor for this Ziwei topic." },
      { value: "12", label: "Palaces", description: "Every topic is interpreted through palace position." },
      { value: "14", label: "Major stars", description: "Core stars provide the first layer of meaning." },
    ],
    citations: [
      { label: "Ziwei Doushu Quan Shu", source: "Classical source tradition for palace and star interpretation." },
      { label: "Chinese lunar calendar practice", source: "Ziwei chart construction depends on lunar date and birth hour." },
    ],
    sections: [
      {
        heading: `What ${topic.label} means`,
        content: (
          <>
            <p>
              {topic.description} In Ziwei, meaning comes from the relationship between star, palace, transformation, and timing cycle.
            </p>
            <p>
              This MVP page establishes the entity, URL, structured data, and internal-link position for later longform expansion.
            </p>
          </>
        ),
        quotes: [
          {
            text: "A Ziwei symbol becomes useful only after it is placed back into the whole palace structure.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
      },
      {
        heading: "How to apply it responsibly",
        content: (
          <p>
            Read this topic with the Life Palace, the relevant life-area palace, the 14 major stars, and Four Transformations. Avoid turning one star or palace into a fixed verdict about a person.
          </p>
        ),
        stats: [{ value: "4+", label: "Context layers", description: "Palace, star, transformation, and timing should be read together." }],
      },
      {
        heading: "Where to go next",
        content: (
          <p>
            Continue through the Ziwei hub, then compare the chart logic with <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link> and the learning center.
          </p>
        ),
      },
    ],
    faqs: defaultFaqs,
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
