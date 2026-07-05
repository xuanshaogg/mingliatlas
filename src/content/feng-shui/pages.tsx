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
  datePublished?: string;
  dateModified?: string;
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
    question: "Can Feng Shui determine results?",
    answer:
      "No. Feng Shui should be used as an environmental reflection and design framework, not as a promise of outcomes.",
  },
  {
    question: "Where should beginners start?",
    answer:
      "Start with qi flow, yin-yang balance, Five Elements, Bagua direction, and the main entrance before applying advanced formulas.",
  },
  {
    question: "What is the difference between Form School and Compass School Feng Shui?",
    answer:
      "Form School (峦头, Luan Tou) reads the visible landscape — mountains, water, roads, and the shape of a space — to judge how qi gathers or scatters. Compass School (理气, Li Qi) uses the Luo Pan and formulas such as Flying Stars and Eight Mansions to read direction and timing. Classical practice combines both rather than treating either as complete on its own.",
  },
];

// Per-topic FAQ overrides for Feng Shui pages that earn search impressions or
// are core entity references. Pages without an override use defaultFaqs.
const topicFaqs: Partial<Record<string, FAQ[]>> = {
  "bagua-map": [
    {
      question: "What is the Bagua map in Feng Shui?",
      answer:
        "The Bagua (八卦) map is an eight-sided energy grid based on the eight trigrams of the I Ching. Each of the eight areas — plus the center — corresponds to a life theme (such as wealth, career, relationships, and health), a direction, and an element. It is laid over a floor plan to connect spaces with the life areas they influence.",
    },
    {
      question: "How do I use the Bagua map on my home?",
      answer:
        "Align the map with your floor plan using one of two common methods: the compass method orients the grid to actual directions with a Luo Pan, while the BTB (Black Sect) method aligns the bottom edge with the wall containing the front door. Then read which rooms fall into which Bagua areas and adjust each space for its theme.",
    },
    {
      question: "What are the nine areas of the Bagua map?",
      answer:
        "The nine zones are wealth and abundance, fame and reputation, love and relationships, family and health, the center (overall wellbeing), children and creativity, knowledge and self-cultivation, career and path, and helpful people and travel. Each ties to a direction, element, and color used to refine a space.",
    },
    {
      question: "Should I use the compass Bagua or the BTB Bagua?",
      answer:
        "Use one method consistently. The compass Bagua aligns the eight areas to actual directions and is closer to classical directional practice; the BTB Bagua aligns the grid to the front-door wall and is simpler for apartment layouts. Mixing both on the same floor plan creates contradictory readings, so choose the method that matches the school you are following.",
    },
  ],
  "qi-flow": [
    {
      question: "What is qi in Feng Shui?",
      answer:
        "Qi (氣) is the vital energy that moves through and around a space. Good Feng Shui aims for qi that flows smoothly and gathers gently, rather than rushing through in a straight line or stagnating in cluttered corners. Doors, hallways, light, and proportion all shape how qi moves through a home.",
    },
    {
      question: "How do I improve qi flow in my home?",
      answer:
        "Keep entryways and pathways clear, avoid long straight runs from the front door to a back window (which let qi rush out), use light and mirrors to lift dark corners, clear clutter that traps stagnant qi, and arrange furniture so movement curves gently. The goal is steady circulation, not blockage or rush.",
    },
    {
      question: "What blocks or disrupts qi flow?",
      answer:
        "Clutter, blocked doorways, sharp corners pointing at seating or beds (poison arrows), long straight corridors, and overly dark or cramped spaces all disrupt qi. Stagnant qi accumulates where air and movement do not reach; rushing qi occurs where a straight path lets energy move too fast to settle.",
    },
    {
      question: "How can I tell if qi is rushing or stagnant?",
      answer:
        "Rushing qi usually appears where the eye and body move too quickly, such as a front door aligned directly with a back door, window, or long hallway. Stagnant qi feels heavy, dim, blocked, or unused, often in cluttered corners and rooms with poor circulation. A balanced space lets people move easily while still giving qi places to gather.",
    },
  ],
  "five-elements": [
    {
      question: "How are the five elements used in Feng Shui?",
      answer:
        "The Five Elements (Wood, Fire, Earth, Metal, Water) appear in a space through color, material, shape, and direction. Feng Shui balances them using the generating cycle (Wood feeds Fire, Fire makes Earth, Earth holds Metal, Metal carries Water, Water grows Wood) and the controlling cycle, adding or reducing an element to harmonize a room.",
    },
    {
      question: "What colors and shapes represent each element?",
      answer:
        "Wood is green and columnar shapes; Fire is red and triangular or pointed shapes; Earth is yellow and earth tones with flat, square shapes; Metal is white and grey with round shapes; Water is black and blue with wavy, irregular shapes. Introducing an element can be as simple as adjusting color, material, or form in a room.",
    },
    {
      question: "How do I balance the five elements in a room?",
      answer:
        "First identify which element a room needs based on its direction and use, then add that element through color, material, or shape — and reduce any element that overwhelms the space. The aim is a supportive generating cycle, not equal amounts of all five; balance depends on the room's function and orientation.",
    },
    {
      question: "Which Feng Shui element should I add first?",
      answer:
        "Start with the room's purpose and the element already dominating the space. A bedroom often benefits from calmer Earth or soft Wood support, while an office may need clearer Wood growth or Metal focus. Add one element at a time through color, material, shape, or lighting, then observe whether the room feels more usable and settled.",
    },
  ],
};

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

const defaultEditorialQuote = {
  text: "A responsible Feng Shui reading starts with observable space, human use, and proportion before symbolic conclusions.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
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
      sections: withEditorialQuote(data.sections),
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-02-10",
        dateModified: data.schema.dateModified ?? "2026-03-01",
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
    "Feng Shui is a Chinese spatial practice that studies how environment, direction, layout, and timing affect the way a place feels and functions. It uses qi flow, yin-yang balance, Five Elements, Bagua direction, and practical observation of space. Responsible practice starts with the entrance, pathways, light, proportion, and how people actually use the room.",
  breadcrumbs: breadcrumbs("Overview", "/feng-shui"),
  schema: { headline: "", description: "", url: "", datePublished: "2025-11-20", dateModified: "2026-03-01" },
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
            The Five Elements are shared with <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>, but Feng Shui applies them to rooms, directions, shapes, colors, and environmental balance rather than to a birth chart.
          </p>
        </>
      ),
    },
    {
      heading: "Form School vs Compass School",
      content: (
        <>
          <p>
            <cite>Form School tradition</cite> focuses on landform, movement, and what a space supports physically: how water flows, where hills provide shelter, how a building sits in its landscape. This is the older layer and applies to both outdoor and indoor environments.
          </p>
          <p>
            <cite>Compass School tradition</cite> adds directional formulas and measurement using the Luo Pan compass. Methods like Flying Stars and Eight Mansions calculate favorable and challenging sectors based on building orientation and timing.
          </p>
          <p>
            Most practical applications combine both: observe the physical space first, then apply directional formulas where they improve function. Neither school should be used to generate fear-based claims about a space.
          </p>
        </>
      ),
      stats: [
        { value: "2", label: "Classical schools", description: "Form School and Compass School." },
        { value: "8", label: "Bagua directions", description: "Eight directional zones used in many methods." },
        { value: "9", label: "Flying Stars", description: "Time-based qi patterns in Compass School methods." },
      ],
    },
    {
      heading: "Common beginner mistakes",
      content: (
        <>
          <p>
            The most common mistake is treating Feng Shui as a set of rigid rules rather than a framework for observation. Moving furniture to a prescribed position without considering how the room is actually used rarely improves anything.
          </p>
          <p>
            A second mistake is applying advanced formulas like Flying Stars before understanding basic qi flow, yin-yang balance, and the Five Elements. The foundation matters more than the formula.
          </p>
          <p>
            A third mistake is using Feng Shui to generate anxiety about a space. Classical practice is about improving function and support, not about identifying threats. If a recommendation creates fear rather than clarity, it is being misapplied.
          </p>
        </>
      ),
    },
    {
      heading: "How to start applying Feng Shui",
      content: (
        <>
          <p>
            Start with the entrance, pathways, light, and proportion. A clear entrance, unobstructed pathways, and balanced light address the most common issues before any formula is needed. Advanced methods like Flying Stars and Eight Mansions should come after the physical space is clear and functional.
          </p>
          <p>
            Use Feng Shui as a design and reflection tool. Explore the <Link href="/feng-shui/home/bedroom" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">bedroom guide</Link>, <Link href="/feng-shui/bagua-map" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bagua map</Link>, and <Link href="/feng-shui/qi-flow" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">qi flow principles</Link> as practical starting points.
          </p>
        </>
      ),
    },
  ],
  faqs: defaultFaqs,
  relatedLinks,
  cta: cta(),
});

const topics: FengShuiTopic[] = [
  { slug: "what-is-feng-shui", datePublished: "2025-11-25", dateModified: "2026-02-05", label: "What Is Feng Shui", title: "What Is Feng Shui? Meaning and Method", description: "A clear definition of Feng Shui as spatial reading, environmental support, and practical layout logic.", statValue: "4,000+", statLabel: "Years of history", group: "Foundations" },
  { slug: "qi-flow", datePublished: "2025-12-01", dateModified: "2026-06-29", label: "Qi Flow", title: "Qi Flow in Feng Shui: How Space Moves Energy", description: "How pathways, doors, clutter, light, and proportion affect the movement of qi through a space.", statValue: "1", statLabel: "Main flow", group: "Foundations" },
  { slug: "yin-yang-balance", datePublished: "2025-12-05", dateModified: "2026-02-10", label: "Yin-Yang Balance", title: "Yin-Yang Balance in Feng Shui", description: "How quiet and active qualities shape room function, comfort, and spatial rhythm.", statValue: "2", statLabel: "Core qualities", group: "Foundations" },
  { slug: "five-elements", datePublished: "2025-12-10", dateModified: "2026-06-29", label: "Five Elements in Feng Shui", title: "Five Elements in Feng Shui: Wood, Fire, Earth, Metal, Water", description: "How the Five Elements appear through color, material, shape, direction, and room use.", statValue: "5", statLabel: "Elements", group: "Foundations" },
  { slug: "bagua-map", datePublished: "2025-12-15", dateModified: "2026-06-29", label: "Bagua Map", title: "Bagua Map in Feng Shui: Eight Areas Explained", description: "How the eight trigram areas organize directions, life themes, and spatial relationships.", statValue: "8", statLabel: "Bagua areas", group: "Foundations" },
  { slug: "luo-pan-compass", datePublished: "2025-12-20", dateModified: "2026-02-18", label: "Luo Pan Compass", title: "Luo Pan Compass: Feng Shui Direction Tool", description: "The classical compass used to measure orientation and apply formula-based Feng Shui methods.", statValue: "24", statLabel: "Mountains", group: "Foundations" },
  { slug: "flying-stars", datePublished: "2025-12-28", dateModified: "2026-02-20", label: "Flying Stars", title: "Flying Stars Feng Shui: Timing and Space", description: "A time-based method that reads changing qi patterns across directions and building periods.", statValue: "9", statLabel: "Stars", group: "Foundations" },
  { slug: "eight-mansions", datePublished: "2026-01-05", dateModified: "2026-02-22", label: "Eight Mansions", title: "Eight Mansions Feng Shui: Directions and Personal Gua", description: "A directional method that connects personal gua numbers with favorable and challenging sectors.", statValue: "8", statLabel: "Directions", group: "Foundations" },
  { slug: "home/bedroom", datePublished: "2026-01-10", dateModified: "2026-02-25", label: "Bedroom Feng Shui", title: "Bedroom Feng Shui: Layout, Bed Position, and Rest", description: "Bedroom principles for rest, privacy, bed support, and calmer yin energy.", statValue: "1", statLabel: "Bed command", group: "Home" },
  { slug: "home/living-room", datePublished: "2026-01-15", dateModified: "2026-02-28", label: "Living Room Feng Shui", title: "Living Room Feng Shui: Flow, Seating, and Welcome", description: "How to arrange a living room for gathering, comfort, and clear movement.", statValue: "3+", statLabel: "Seating zones", group: "Home" },
  { slug: "home/kitchen", datePublished: "2026-01-20", dateModified: "2026-03-02", label: "Kitchen Feng Shui", title: "Kitchen Feng Shui: Fire, Nourishment, and Layout", description: "Kitchen principles for fire placement, storage, cleanliness, and nourishment symbolism.", statValue: "5", statLabel: "Element context", group: "Home" },
  { slug: "home/study", datePublished: "2026-01-25", dateModified: "2026-03-05", label: "Study Feng Shui", title: "Study Feng Shui: Desk Focus and Learning Support", description: "Study-room layout for concentration, command position, books, lighting, and mental clarity.", statValue: "1", statLabel: "Desk command", group: "Home" },
  { slug: "home/garden", datePublished: "2026-01-30", dateModified: "2026-03-08", label: "Garden Feng Shui", title: "Garden Feng Shui: Pathways, Plants, and Outdoor Qi", description: "Outdoor Feng Shui for paths, plants, water, boundaries, and the approach to the home.", statValue: "4", statLabel: "Outdoor layers", group: "Home" },
  { slug: "home/front-door", datePublished: "2026-02-05", dateModified: "2026-03-10", label: "Front Door Feng Shui", title: "Front Door Feng Shui: The Mouth of Qi", description: "How the entrance affects qi flow, welcome, visibility, and everyday movement.", statValue: "1", statLabel: "Mouth of qi", group: "Home" },
  { slug: "office/desk", datePublished: "2026-02-10", dateModified: "2026-03-12", label: "Office Desk Feng Shui", title: "Office Desk Feng Shui: Command Position and Focus", description: "Desk placement principles for support, visibility, concentration, and calmer work habits.", statValue: "1", statLabel: "Command position", group: "Office" },
  { slug: "office/meeting-room", datePublished: "2026-02-15", dateModified: "2026-03-15", label: "Meeting Room Feng Shui", title: "Meeting Room Feng Shui: Collaboration and Clarity", description: "Meeting-room layout for balanced participation, clear sightlines, and reduced friction.", statValue: "2+", statLabel: "Decision zones", group: "Office" },
  { slug: "office/company-entrance", datePublished: "2026-02-20", dateModified: "2026-03-18", label: "Company Entrance Feng Shui", title: "Company Entrance Feng Shui: Reception and Flow", description: "Business entrance principles for welcome, circulation, signage, and first impression.", statValue: "1", statLabel: "Primary entrance", group: "Office" },
  { slug: "office/wealth-corner", datePublished: "2026-02-25", dateModified: "2026-03-20", label: "Office Wealth Corner", title: "Office Wealth Corner Feng Shui: Practical Use", description: "How to think about wealth areas responsibly through order, use, and symbolic clarity.", statValue: "1", statLabel: "Focus area", group: "Office" },
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
    directAnswer: `${topic.label} is a ${topic.group.toLowerCase()} topic in Feng Shui. ${topic.description} Read it first through visible conditions: entrance quality, movement paths, light, proportion, support, and how people use the space each day. Directional formulas, Bagua areas, and Five Element adjustments work best after the physical room already supports calm function.`,
    breadcrumbs: breadcrumbs(topic.label, path),
    schema: { headline: "", description: "", url: "", datePublished: topic.datePublished, dateModified: topic.dateModified },
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
          <>
            <p>
              {topic.description} In practical Feng Shui, the meaning is not a fixed rule pulled from a chart. It is a way to read whether the space supports the activity it is meant to hold.
            </p>
            <p>
              A good reading starts with the same questions every time: where qi enters, where it slows down, where people feel supported, and where the layout creates friction. This keeps the interpretation tied to observable space instead of superstition.
            </p>
          </>
        ),
      },
      {
        heading: "What to observe first",
        content: (
          <>
            <p>
              Begin with the entrance and the main path through the room. A blocked door, awkward walking line, exposed resting position, or harsh light usually matters more than a symbolic cure.
            </p>
            <p>
              Then check support and proportion. Seats, beds, desks, and gathering areas should feel stable, visible, and easy to use. Materials, color, plants, mirrors, and water features should reinforce the room purpose rather than compete with it.
            </p>
          </>
        ),
        stats: [{ value: "3", label: "First checks", description: "Flow, support, and function before advanced formulas." }],
      },
      {
        heading: "How to apply it responsibly",
        content: (
          <>
            <p>
              Apply Feng Shui in layers. First improve clear pathways, supportive positions, appropriate light, air, cleanliness, and practical function. Then use Bagua, Five Elements, Luo Pan direction, or Flying Stars only where they add useful detail.
            </p>
            <p>
              Form School observation and Compass School measurement should support each other. If a formula suggests a change that makes the space harder to use, treat that as a signal to review the context rather than force the rule.
            </p>
          </>
        ),
      },
      {
        heading: "Common mistakes",
        content: (
          <>
            <p>
              One common mistake is treating {topic.label} as a universal prescription. The same arrangement can feel supportive in one home and awkward in another because door position, light, furniture scale, and daily habits are different.
            </p>
            <p>
              Another mistake is using Feng Shui language to create anxiety. A responsible interpretation describes tradeoffs and practical improvements. It should not turn a room, object, or direction into a threat.
            </p>
          </>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <>
            <p>
              Continue with the <Link href="/feng-shui" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Feng Shui hub</Link> for the full reading order, then study <Link href="/feng-shui/qi-flow" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">qi flow</Link>, <Link href="/feng-shui/bagua-map" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bagua map</Link>, and <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Five Elements</Link>.
            </p>
            <p>
              For comparison across systems, use the <Link href="/learn/which-system" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">which system guide</Link> to see when Feng Shui, Bazi, I Ching, or Ziwei is the better lens for a question.
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

export const allFengShuiPages = [overview, ...topics.map(createTopicPage)];

export function getFengShuiPage(slug: string): FengShuiContentPage | undefined {
  return allFengShuiPages.find((page) => page.slug === slug);
}

export function getFengShuiStaticParams(): Array<{ slug?: string[] }> {
  return allFengShuiPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
