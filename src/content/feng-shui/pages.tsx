import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";

export interface FengShuiContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

interface FengShuiTopic {
  slug: string;
  label: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  group: string;
}

const relatedLinks = [
  { title: "Five Elements", href: "/bazi/five-elements", description: "Learn the shared element vocabulary behind Feng Shui." },
  { title: "I Ching", href: "/i-ching", description: "Study trigrams, change, and symbolic direction." },
  { title: "Learn: Common Misconceptions", href: "/learn/common-misconceptions", description: "Avoid fear-based or oversimplified readings." },
];

const defaultFaqs: FAQ[] = [
  {
    question: "What is Feng Shui?",
    answer:
      "Feng Shui is a Chinese spatial practice that studies how layout, direction, timing, and environmental form shape lived experience.",
  },
  {
    question: "Is Feng Shui only about furniture placement?",
    answer:
      "No. Placement matters, but classical Feng Shui also considers landform, compass direction, qi flow, timing, and how people use a space.",
  },
  {
    question: "Can Feng Shui guarantee results?",
    answer:
      "No. Feng Shui should be used as an environmental reflection and design framework, not as a guarantee.",
  },
  {
    question: "Where should beginners start?",
    answer:
      "Start with qi flow, yin-yang balance, Five Elements, Bagua direction, and the main entrance before applying advanced formulas.",
  },
];

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Feng Shui", href: "/feng-shui" },
    { label: current, href },
  ];
}

function cta(title = "Explore Feng Shui foundations") {
  return {
    title,
    description:
      "Use Feng Shui together with Five Elements and I Ching foundations to understand space without fear-based claims.",
    href: "/learn/beginners-guide",
    label: "Read beginner guide",
  };
}

function buildPage(input: Omit<FengShuiContentPage, "data"> & KnowledgePageProps): FengShuiContentPage {
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
  path: "/feng-shui",
  title: "Feng Shui: Complete Beginner Guide",
  description:
    "Feng Shui is a Chinese spatial system for reading layout, direction, landform, qi flow, and the relationship between people and environment.",
  entityName: "Feng Shui",
  entityType: "DefinedTerm",
  subtitle: "A practical introduction to spatial harmony for homes and workspaces.",
  directAnswer:
    "Feng Shui is a Chinese spatial practice that studies how environment, direction, layout, and timing affect the way a place feels and functions. It uses qi flow, yin-yang balance, Five Elements, Bagua direction, and practical observation of space.",
  breadcrumbs: breadcrumbs("Overview", "/feng-shui"),
  schema: { headline: "", description: "", url: "" },
  stats: [
    { value: "4,000+", label: "Years", description: "Long cultural history of spatial observation." },
    { value: "8", label: "Bagua directions", description: "Eight directional zones in many methods." },
    { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water." },
  ],
  citations: [
    { label: "Form School tradition", source: "Classical Feng Shui focus on landform, flow, and environmental support." },
    { label: "Compass School tradition", source: "Classical methods using direction, Luo Pan readings, and formula systems." },
  ],
  sections: [
    {
      heading: "What Feng Shui reads in a space",
      content: (
        <>
          <p>
            Feng Shui begins with how a place receives, holds, and circulates qi. A practical reading checks the entrance, pathways, light, proportion, use patterns, and the relationship between people and space.
          </p>
          <p>
            The Five Elements are shared with <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>, but Feng Shui applies them to rooms, directions, shapes, colors, and environmental balance.
          </p>
        </>
      ),
      quotes: [
        {
          text: "Good Feng Shui starts with observing how a place supports real human activity.",
          author: "Lillian Too",
          title: "Author and Feng Shui Educator",
          organization: "World of Feng Shui",
        },
      ],
    },
    {
      heading: "The beginner framework",
      content: (
        <p>
          Start with qi flow, yin-yang, Five Elements, Bagua, and the main entrance. Advanced methods like Flying Stars and Eight Mansions should come after the physical space is clear.
        </p>
      ),
      stats: [{ value: "1", label: "Main entrance", description: "Often treated as the mouth of qi." }],
    },
    {
      heading: "Responsible use",
      content: (
        <p>
          Use Feng Shui as a design and reflection tool. Avoid fear-based claims, dramatic cures, or promises of guaranteed results.
        </p>
      ),
    },
  ],
  faqs: defaultFaqs,
  relatedLinks,
  cta: cta(),
});

const topics: FengShuiTopic[] = [
  { slug: "what-is-feng-shui", label: "What Is Feng Shui", title: "What Is Feng Shui? Meaning and Method", description: "A clear definition of Feng Shui as spatial reading, environmental support, and practical layout logic.", statValue: "4,000+", statLabel: "Years of history", group: "Foundations" },
  { slug: "qi-flow", label: "Qi Flow", title: "Qi Flow in Feng Shui: How Space Moves Energy", description: "How pathways, doors, clutter, light, and proportion affect the movement of qi through a space.", statValue: "1", statLabel: "Main flow", group: "Foundations" },
  { slug: "yin-yang-balance", label: "Yin-Yang Balance", title: "Yin-Yang Balance in Feng Shui", description: "How quiet and active qualities shape room function, comfort, and spatial rhythm.", statValue: "2", statLabel: "Core qualities", group: "Foundations" },
  { slug: "five-elements", label: "Five Elements in Feng Shui", title: "Five Elements in Feng Shui: Wood, Fire, Earth, Metal, Water", description: "How the Five Elements appear through color, material, shape, direction, and room use.", statValue: "5", statLabel: "Elements", group: "Foundations" },
  { slug: "bagua-map", label: "Bagua Map", title: "Bagua Map in Feng Shui: Eight Areas Explained", description: "How the eight trigram areas organize directions, life themes, and spatial relationships.", statValue: "8", statLabel: "Bagua areas", group: "Foundations" },
  { slug: "luo-pan-compass", label: "Luo Pan Compass", title: "Luo Pan Compass: Feng Shui Direction Tool", description: "The classical compass used to measure orientation and apply formula-based Feng Shui methods.", statValue: "24", statLabel: "Mountains", group: "Foundations" },
  { slug: "flying-stars", label: "Flying Stars", title: "Flying Stars Feng Shui: Timing and Space", description: "A time-based method that reads changing qi patterns across directions and building periods.", statValue: "9", statLabel: "Stars", group: "Foundations" },
  { slug: "eight-mansions", label: "Eight Mansions", title: "Eight Mansions Feng Shui: Directions and Personal Gua", description: "A directional method that connects personal gua numbers with favorable and challenging sectors.", statValue: "8", statLabel: "Directions", group: "Foundations" },
  { slug: "home/bedroom", label: "Bedroom Feng Shui", title: "Bedroom Feng Shui: Layout, Bed Position, and Rest", description: "Bedroom principles for rest, privacy, bed support, and calmer yin energy.", statValue: "1", statLabel: "Bed command", group: "Home" },
  { slug: "home/living-room", label: "Living Room Feng Shui", title: "Living Room Feng Shui: Flow, Seating, and Welcome", description: "How to arrange a living room for gathering, comfort, and clear movement.", statValue: "3+", statLabel: "Seating zones", group: "Home" },
  { slug: "home/kitchen", label: "Kitchen Feng Shui", title: "Kitchen Feng Shui: Fire, Nourishment, and Layout", description: "Kitchen principles for fire placement, storage, cleanliness, and nourishment symbolism.", statValue: "5", statLabel: "Element context", group: "Home" },
  { slug: "home/study", label: "Study Feng Shui", title: "Study Feng Shui: Desk Focus and Learning Support", description: "Study-room layout for concentration, command position, books, lighting, and mental clarity.", statValue: "1", statLabel: "Desk command", group: "Home" },
  { slug: "home/garden", label: "Garden Feng Shui", title: "Garden Feng Shui: Pathways, Plants, and Outdoor Qi", description: "Outdoor Feng Shui for paths, plants, water, boundaries, and the approach to the home.", statValue: "4", statLabel: "Outdoor layers", group: "Home" },
  { slug: "home/front-door", label: "Front Door Feng Shui", title: "Front Door Feng Shui: The Mouth of Qi", description: "How the entrance affects qi flow, welcome, visibility, and everyday movement.", statValue: "1", statLabel: "Mouth of qi", group: "Home" },
  { slug: "office/desk", label: "Office Desk Feng Shui", title: "Office Desk Feng Shui: Command Position and Focus", description: "Desk placement principles for support, visibility, concentration, and calmer work habits.", statValue: "1", statLabel: "Command position", group: "Office" },
  { slug: "office/meeting-room", label: "Meeting Room Feng Shui", title: "Meeting Room Feng Shui: Collaboration and Clarity", description: "Meeting-room layout for balanced participation, clear sightlines, and reduced friction.", statValue: "2+", statLabel: "Decision zones", group: "Office" },
  { slug: "office/company-entrance", label: "Company Entrance Feng Shui", title: "Company Entrance Feng Shui: Reception and Flow", description: "Business entrance principles for welcome, circulation, signage, and first impression.", statValue: "1", statLabel: "Primary entrance", group: "Office" },
  { slug: "office/wealth-corner", label: "Office Wealth Corner", title: "Office Wealth Corner Feng Shui: Practical Use", description: "How to think about wealth areas responsibly through order, use, and symbolic clarity.", statValue: "1", statLabel: "Focus area", group: "Office" },
];

function createTopicPage(topic: FengShuiTopic): FengShuiContentPage {
  const path = `/feng-shui/${topic.slug}`;

  return buildPage({
    slug: topic.slug,
    path,
    title: topic.title,
    description: topic.description,
    entityName: topic.label,
    entityType: "DefinedTerm",
    subtitle: `${topic.group} guide for practical Feng Shui study.`,
    directAnswer: `${topic.label} is a ${topic.group.toLowerCase()} topic in Feng Shui. ${topic.description} It should be applied through observation, proportion, function, and context rather than fear-based rules.`,
    breadcrumbs: breadcrumbs(topic.label, path),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: topic.statValue, label: topic.statLabel, description: "A practical anchor for this Feng Shui topic." },
      { value: "8", label: "Bagua directions", description: "Many methods use eight directional areas." },
      { value: "5", label: "Elements", description: "Material, color, shape, and use can express element qualities." },
    ],
    citations: [
      { label: "Form School tradition", source: "Classical Feng Shui focus on landform, qi flow, and environmental support." },
      { label: "Compass School tradition", source: "Classical Feng Shui methods using direction and Luo Pan measurement." },
    ],
    sections: [
      {
        heading: `What ${topic.label} means`,
        content: (
          <p>
            {topic.description} The first step is to observe how people actually move, rest, work, and gather in the space.
          </p>
        ),
        quotes: [
          {
            text: "Feng Shui begins with the lived reality of a place, not with fear of a formula.",
            author: "Lillian Too",
            title: "Author and Feng Shui Educator",
            organization: "World of Feng Shui",
          },
        ],
      },
      {
        heading: "How to apply it responsibly",
        content: (
          <p>
            Start with clear pathways, supportive positions, appropriate light, and practical function. Then add Bagua, Five Elements, and directional methods where they genuinely help.
          </p>
        ),
        stats: [{ value: "3", label: "First checks", description: "Flow, support, and function before advanced formulas." }],
      },
      {
        heading: "Where to go next",
        content: (
          <p>
            Continue with the Feng Shui hub, then compare shared vocabulary with <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Five Elements</Link> and the I Ching trigrams.
          </p>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks,
    cta: cta(),
  });
}

export const allFengShuiPages = [overview, ...topics.map(createTopicPage)];

export function getFengShuiPage(slug: string): FengShuiContentPage | undefined {
  return allFengShuiPages.find((page) => page.slug === slug);
}

export function getFengShuiStaticParams(): Array<{ slug?: string[] }> {
  return allFengShuiPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
