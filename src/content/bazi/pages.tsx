import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";

const baziBaseLinks = [
  {
    title: "Five Elements",
    href: "/bazi/five-elements",
    description: "Understand Wood, Fire, Earth, Metal, and Water as the core language of Bazi.",
  },
  {
    title: "Heavenly Stems",
    href: "/bazi/heavenly-stems",
    description: "Learn the 10 visible energies that sit above each Bazi pillar.",
  },
  {
    title: "Earthly Branches",
    href: "/bazi/earthly-branches",
    description: "Explore the 12 branches, hidden stems, seasons, and symbolic animals.",
  },
];

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

const briefRelatedLinks = [
  ...baziBaseLinks,
  {
    title: "Free Bazi Calculator",
    href: "/tools/bazi-calculator",
    description: "See how the vocabulary becomes a live chart once you are ready to practice.",
  },
];

const defaultFaqs: FAQ[] = [
  {
    question: "Is Bazi the same as Western astrology?",
    answer:
      "No. Bazi uses year, month, day, and hour pillars from the Chinese stem-branch calendar. Western astrology uses planetary positions and zodiac signs, so the two systems organize time in different ways.",
  },
  {
    question: "Do I need my birth hour for a Bazi reading?",
    answer:
      "The birth hour completes the fourth pillar and gives a fuller chart. A three-pillar reading can still show broad patterns, but the hour pillar adds detail about later life, children, and inner motivations.",
  },
  {
    question: "Can Bazi predict an outcome with certainty?",
    answer:
      "No. Bazi is best used as a self-knowledge and timing framework. It highlights patterns, strengths, and pressure points, but personal choices and context still matter.",
  },
  {
    question: "What is the most important part of a Bazi chart?",
    answer:
      "The Day Master is the anchor, but it should never be read alone. Season, element balance, Ten Gods, and luck cycles all shape the final interpretation.",
  },
];

function pageUrl(slug: string): string {
  return `${SITE.url}${slug}`;
}

function baziBreadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Bazi", href: "/bazi" },
    { label: current, href },
  ];
}

function cta(title = "Explore your own Bazi pattern") {
  return {
    title,
    description:
      "Use the free calculator to see your stems, branches, elements, and life-cycle structure in one chart.",
    href: "/tools/bazi-calculator",
    label: "Open the free calculator",
  };
}

const defaultEditorialQuote = {
  text: "A useful Bazi reading keeps symbols connected to context, timing, and choice instead of treating any one sign as a fixed verdict.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
}

export interface BaziContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

function buildPage(input: Omit<BaziContentPage, "data"> & KnowledgePageProps): BaziContentPage {
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
        datePublished: data.schema.datePublished ?? "2025-12-15",
        dateModified: data.schema.dateModified ?? "2026-01-10",
      },
    },
  };
}

export const baziPages: BaziContentPage[] = [
  buildPage({
    slug: "",
    path: "/bazi",
    title: "Bazi (Four Pillars of Destiny): Complete Guide",
    description:
      "Bazi, or Four Pillars of Destiny, analyzes birth year, month, day, and hour through stems, branches, elements, and life cycles.",
    entityName: "Bazi",
    entityType: "DefinedTerm",
    subtitle: "A practical overview of the Four Pillars system for Western readers.",
    directAnswer:
      "Bazi, also known as the Four Pillars of Destiny, is a Chinese metaphysical system that analyzes a person's birth date and time through year, month, day, and hour pillars. It reveals personality patterns, useful strengths, recurring challenges, and 10-year life cycles without treating them as fixed outcomes.",
    breadcrumbs: baziBreadcrumbs("Overview", "/bazi"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-01", dateModified: "2026-03-15" },
    stats: [
      { value: "4", label: "Pillars", description: "Year, month, day, and hour." },
      { value: "8", label: "Characters", description: "Four stems plus four branches." },
      { value: "60", label: "Cycle pairs", description: "The Jia Zi stem-branch cycle." },
    ],
    citations: [
      { label: "Yuan Hai Zi Ping", source: "Classical source associated with Zi Ping Bazi methods." },
      { label: "San Ming Tong Hui", source: "Ming dynasty synthesis of stems, branches, and chart rules." },
    ],
    sections: [
      {
        heading: "What Bazi reads in a birth chart",
        content: (
          <>
            <p>
              A Bazi chart converts a birth moment into 4 pillars: year, month, day, and hour. Each pillar contains one Heavenly Stem and one Earthly Branch, creating 8 characters. According to <cite>Yuan Hai Zi Ping</cite>, these characters show how seasonal timing, element strength, and relationship roles shape a life pattern.
            </p>
            <p>
              The system is over 1,200 years old in its mature form. It developed from Tang dynasty birth-year methods and became more detailed when later scholars emphasized the Day Master as the center of the chart.
            </p>
          </>
        ),
      },
      {
        heading: "The core building blocks",
        content: (
          <>
            <p>
              Bazi uses the <Link href="/bazi/heavenly-stems" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">10 Heavenly Stems</Link>, the <Link href="/bazi/earthly-branches" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">12 Earthly Branches</Link>, and the <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Five Elements</Link>. These combine into 60 possible stem-branch pairs.
            </p>
            <p>
              The Day Master, taken from the day stem, anchors the reading. In <cite>San Ming Tong Hui</cite>, other chart elements become resources, expression, wealth, authority, or peers depending on how they relate to that Day Master. These ten relationships are called the <Link href="/bazi/ten-gods" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Ten Gods</Link>.
            </p>
          </>
        ),
        stats: [
          { value: "10", label: "Stems", description: "Visible yin-yang elemental qualities." },
          { value: "12", label: "Branches", description: "Seasonal containers with hidden stems." },
          { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water." },
        ],
      },
      {
        heading: "Common beginner mistakes",
        content: (
          <>
            <p>
              The most common mistake is treating the zodiac year animal as the whole chart. The year pillar is one of four. A person born in the Year of the Dragon who has a Water Day Master in a winter chart is very different from another Dragon-year person with a Fire Day Master in summer.
            </p>
            <p>
              A second mistake is reading elements as fixed personality types. Wood does not mean a person is always growing and creative. It means Wood energy is present in a specific pillar, and its effect depends on season, balance, and the Day Master's relationship to it.
            </p>
            <p>
              A third mistake is expecting certainty. Bazi describes patterns and timing tendencies. It does not predict specific events with certainty, and responsible practitioners do not claim otherwise.
            </p>
          </>
        ),
      },
      {
        heading: "What a responsible reading emphasizes",
        content: (
          <>
            <p>
              A careful Bazi reading compares the natal chart, <Link href="/bazi/luck-pillars" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">10-year Luck Pillars</Link>, annual influences, and lived context before drawing conclusions. The strongest readings translate pattern into choices: which environments support growth, when pressure is likely to peak, and where a person can respond with steadier timing.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: baziBaseLinks,
    cta: cta(),
  }),
  buildPage({
    slug: "what-is-bazi",
    path: "/bazi/what-is-bazi",
    title: "What Is Bazi? Four Pillars of Destiny Explained",
    description:
      "Bazi is a Chinese life-pattern analysis system based on birth year, month, day, and hour pillars.",
    entityName: "Bazi",
    entityType: "DefinedTerm",
    subtitle: "The answer-first guide to Four Pillars history, structure, and practical use.",
    directAnswer:
      "Bazi, also known as the Four Pillars of Destiny, is a Chinese metaphysical system that analyzes a person's birth date and time to reveal a life blueprint. It studies personality, strengths, challenges, and life cycles through 4 pillars, 8 characters, and the 60-pair stem-branch calendar.",
    breadcrumbs: baziBreadcrumbs("What Is Bazi", "/bazi/what-is-bazi"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-05", dateModified: "2026-02-10" },
    stats: [
      { value: "1,200+", label: "Years", description: "A mature tradition from Tang and Song development." },
      { value: "4", label: "Pillars", description: "Year, month, day, and hour." },
      { value: "60", label: "Jia Zi pairs", description: "The repeating stem-branch cycle." },
    ],
    citations: [
      { label: "Xu Ziping", source: "Song dynasty figure associated with Day Master-centered Bazi." },
      { label: "Yuan Hai Zi Ping", source: "Classical text that shaped later Four Pillars methods." },
    ],
    sections: [
      {
        heading: "Bazi began as a calendar-based life map",
        content: (
          <>
            <p>
              Early Chinese birth analysis developed around year and seasonal timing. Tang dynasty scholar Li Xuzhong is often linked with early pillar methods, while Song dynasty Zi Ping methods placed the day stem at the center. In <cite>Yuan Hai Zi Ping</cite>, the Day Master gives the chart a clear reference point.
            </p>
            <p>
              A full chart uses 4 pillars and 8 characters. These characters come from the same 60-pair cycle used in traditional Chinese calendars, making Bazi a time-pattern system rather than a single-sign identity label.
            </p>
          </>
        ),
      },
      {
        heading: "The four pillars each describe a layer",
        content: (
          <>
            <p>
              The year pillar describes broad background and early environment. The month pillar shows season, family conditioning, and career context. The day pillar reveals the Day Master and relationship palace. The hour pillar adds later-life themes, children, projects, and inner drives, a layered method summarized in <cite>San Ming Tong Hui</cite>.
            </p>
          </>
        ),
        stats: [
          { value: "2", label: "Characters per pillar", description: "One stem and one branch." },
          { value: "8", label: "Main characters", description: "The literal meaning of Bazi." },
        ],
      },
      {
        heading: "Bazi works with other Chinese systems",
        content: (
          <>
            <p>
              Bazi often sits beside Ziwei Doushu, I Ching, Feng Shui, and date selection. Each system asks a different question. Bazi focuses on personal timing and structure, while Feng Shui reads spatial influence and I Ching gives decision context through 64 hexagrams.
            </p>
          </>
        ),
      },
      {
        heading: "What Bazi can and cannot do",
        content: (
          <>
            <p>
              Bazi can clarify recurring tendencies, useful elements, relationship patterns, and timing pressure. It should not replace practical judgment, medical advice, or professional planning. The best use is reflective: compare the chart with real experience, then choose better habits, roles, and seasons for action.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: baziBaseLinks,
    cta: cta(),
  }),
  buildPage({
    slug: "five-elements",
    path: "/bazi/five-elements",
    title: "The Five Elements (Wu Xing): A Complete Guide",
    description:
      "The Five Elements (Wu Xing) explain how Wood, Fire, Earth, Metal, and Water describe changing energy patterns in Bazi and classical Chinese metaphysics.",
    entityName: "The Five Elements",
    entityType: "DefinedTerm",
    subtitle: "A clear introduction to Wood, Fire, Earth, Metal, and Water as living patterns in Bazi.",
    directAnswer:
      "The Five Elements (Wu Xing) are Wood, Fire, Earth, Metal, and Water. In Chinese metaphysics, they describe five phases of movement rather than fixed substances. Bazi uses these phases to read balance, personality patterns, timing cycles, and how one kind of energy supports or controls another.",
    breadcrumbs: baziBreadcrumbs("Five Elements", "/bazi/five-elements"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-08", dateModified: "2026-02-20" },
    stats: [
      { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water." },
      { value: "2", label: "Core Cycles", description: "Generating and controlling relationships." },
      { value: "10", label: "Heavenly Stems", description: "Each stem carries an element and yin-yang polarity." },
    ],
    citations: [
      { label: "Huangdi Neijing", source: "Classical medical text that organizes nature through five phase correspondences." },
      { label: "San Ming Tong Hui", source: "Classical Bazi source applying stems, branches, and elements." },
    ],
    sections: [
      {
        heading: "What are the Five Elements?",
        content: (
          <>
            <p>
              The Five Elements (Wu Xing 五行) are a classical Chinese model for understanding change. Wood expands, Fire rises, Earth stabilizes, Metal refines, and Water flows downward. In Bazi, these elements describe the energy pattern behind the Four Pillars.
            </p>
            <p>
              According to the <cite>Huangdi Neijing</cite>, seasonal movement, organs, colors, tastes, and climates can be organized through five phase relationships. Bazi adapts that logic to time and personal chart structure.
            </p>
          </>
        ),
      },
      {
        heading: "The generating and controlling cycles",
        content: (
          <>
            <p>
              The generating cycle is Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal enriches Water, and Water nourishes Wood. <cite>San Ming Tong Hui</cite> applies these relationships to stems, branches, and the strength of the Day Master.
            </p>
            <p>
              The controlling cycle is Wood parts Earth, Earth channels Water, Water cools Fire, Fire melts Metal, and Metal cuts Wood. Over-acting and insulting patterns describe imbalance: an element can control too strongly, or a weaker element can resist the one that should regulate it.
            </p>
          </>
        ),
        stats: [
          { value: "5", label: "Generating steps", description: "Each element supports one other element." },
          { value: "5", label: "Controlling steps", description: "Each element regulates one other element." },
        ],
      },
      {
        heading: "Element meanings in Bazi",
        content: (
          <>
            <p>
              Wood relates to growth, planning, and learning. Fire relates to visibility, warmth, and expression. Earth relates to trust, stability, and practical support. Metal relates to standards, refinement, and boundaries. Water relates to wisdom, adaptability, and flow.
            </p>
          </>
        ),
      },
      {
        heading: "How element balance is read",
        content: (
          <>
            <p>
              Element balance begins with season, then checks stems, branches, hidden stems, and combinations. A strong Water chart in winter is read differently from a Water signal in summer, because timing changes usefulness. This is why Bazi weighs context before naming helpful or stressful elements.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: baziBaseLinks,
    cta: cta("Explore your own elemental pattern"),
  }),
  buildPage({
    slug: "heavenly-stems",
    path: "/bazi/heavenly-stems",
    title: "The 10 Heavenly Stems (Tian Gan): Complete Guide",
    description:
      "The Heavenly Stems are 10 yin-yang elemental signs used in Bazi to describe visible energy and Day Master qualities.",
    entityName: "Heavenly Stems",
    entityType: "DefinedTerm",
    subtitle: "The visible layer of each pillar and the source of the Day Master.",
    directAnswer:
      "The 10 Heavenly Stems (Tian Gan 天干) are Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, and Gui. Each stem combines yin or yang polarity with one Five Element, giving Bazi a precise language for visible personality, expression, and chart relationships.",
    breadcrumbs: baziBreadcrumbs("Heavenly Stems", "/bazi/heavenly-stems"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-12", dateModified: "2026-01-20" },
    stats: [
      { value: "10", label: "Stems", description: "Two polarities across five elements." },
      { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, Water." },
      { value: "1", label: "Day Master", description: "The day stem anchors Bazi interpretation." },
    ],
    citations: [
      { label: "San Ming Tong Hui", source: "Classical source for stem and branch relationships." },
      { label: "Yuan Hai Zi Ping", source: "Zi Ping tradition focused on the Day Master." },
    ],
    sections: [
      {
        heading: "The stems pair elements with polarity",
        content: (
          <>
            <p>
              Jia and Yi are Wood, Bing and Ding are Fire, Wu and Ji are Earth, Geng and Xin are Metal, and Ren and Gui are Water. The first in each pair is yang and the second is yin. This creates 10 visible expressions from 5 elements, a pattern described in <cite>San Ming Tong Hui</cite>.
            </p>
          </>
        ),
      },
      {
        heading: "Each stem carries a practical image",
        content: (
          <>
            <p>
              Jia is like a tall tree, Yi like vines and flowers, Bing like the sun, Ding like candlelight, Wu like a mountain, Ji like cultivated soil, Geng like raw metal, Xin like jewelry, Ren like the ocean, and Gui like mist or rain.
            </p>
          </>
        ),
        stats: [{ value: "10", label: "Core images", description: "One image for each visible stem." }],
      },
      {
        heading: "Why stems matter for chart reading",
        content: (
          <>
            <p>
              Stems show what is visible and active. They help identify the Day Master, Ten Gods, combinations, and whether a chart expresses its strengths openly or stores them in hidden branches. In <cite>Yuan Hai Zi Ping</cite>, the day stem is the anchor that organizes the rest of the chart.
            </p>
          </>
        ),
      },
      {
        heading: "How stems and branches work together",
        content: (
          <>
            <p>
              A stem without its branch is only half of the pillar. The stem shows the visible quality, while the branch stores seasonal context, hidden stems, and the timing layer that changes how the stem is read. Classical Bazi practice treats the pair as a single unit.
            </p>
            <p>
              When the Day Master is unclear, compare the stem with its branch and then return to the full chart before deciding what the symbol means, especially where <cite>San Ming Tong Hui</cite> emphasizes relationship over isolation.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: [
      baziBaseLinks[0],
      baziBaseLinks[2],
      { title: "Ten Gods", href: "/bazi/ten-gods", description: "See how stems become relationship roles around the Day Master." },
    ],
    cta: cta(),
  }),
  buildPage({
    slug: "earthly-branches",
    path: "/bazi/earthly-branches",
    title: "The 12 Earthly Branches (Di Zhi): Complete Guide",
    description:
      "The Earthly Branches are 12 seasonal containers used in Bazi for months, hours, zodiac animals, hidden stems, and branch relationships.",
    entityName: "Earthly Branches",
    entityType: "DefinedTerm",
    subtitle: "The seasonal foundation of Bazi pillars and hidden chart structure.",
    directAnswer:
      "The 12 Earthly Branches (Di Zhi 地支) are Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, and Hai. They represent months, hours, directions, zodiac animals, hidden stems, and relationship patterns such as combinations, clashes, harms, and punishments.",
    breadcrumbs: baziBreadcrumbs("Earthly Branches", "/bazi/earthly-branches"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-18", dateModified: "2026-01-25" },
    stats: [
      { value: "12", label: "Branches", description: "One for each two-hour period and zodiac animal." },
      { value: "6", label: "Clashes", description: "Opposing branch pairs." },
      { value: "4", label: "Season groups", description: "Spring, summer, autumn, winter." },
    ],
    citations: [
      { label: "Chinese calendrical tradition", source: "Branches organize months, hours, directions, and zodiac animals." },
      { label: "San Ming Tong Hui", source: "Classical Bazi source for branch relations and hidden stems." },
    ],
    sections: [
      {
        heading: "Branches are more than zodiac animals",
        content: (
          <>
            <p>
              Each branch contains a season, direction, two-hour period, animal symbol, and one or more hidden stems. This is why a Bazi branch can hold energy that is not immediately visible in the top stem, which is why <cite>Chinese calendrical tradition</cite> treats branches as more than mascots.
            </p>
          </>
        ),
      },
      {
        heading: "Combinations and clashes show movement",
        content: (
          <>
            <p>
              Six combinations, three harmony groups, six clashes, six harms, and punishments describe how branch energy changes. These relationships are used to read movement, tension, timing, and changes in life circumstances.
            </p>
          </>
        ),
        stats: [
          { value: "6", label: "Combination pairs", description: "Branch pairs that can transform energy." },
          { value: "4", label: "Harmony groups", description: "Seasonal trines used in chart analysis." },
        ],
      },
      {
        heading: "Branches connect Bazi to daily time",
        content: (
          <>
            <p>
              The 12 branches map to 24 hours in two-hour blocks. The hour pillar therefore adds a precise layer of timing and can shift the reading of personal drives, later-life themes, and projects, a structure noted in <cite>San Ming Tong Hui</cite>.
            </p>
          </>
        ),
      },
      {
        heading: "How branches shape interpretation",
        content: (
          <>
            <p>
              Branches matter because they hold season, direction, animals, and hidden stems. They can strengthen, dilute, or redirect what the visible stem appears to do on its own, so <cite>Yuan Hai Zi Ping</cite> always reads them in relation to the Day Master.
            </p>
            <p>
              A branch reading becomes much clearer when you compare it with the month branch, the day branch, and the full stem-branch sequence around it.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: [
      baziBaseLinks[0],
      baziBaseLinks[1],
      { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "Learn how branch animals became the 12-year zodiac cycle." },
    ],
    cta: cta(),
  }),
];

const tenGodsPage = buildPage({
  slug: "ten-gods",
  path: "/bazi/ten-gods",
  title: "The Ten Gods (Shi Shen): Bazi Relationship Stars",
  description:
    "The Ten Gods translate element relationships around the Day Master into practical roles such as resources, wealth, authority, output, and peers.",
  entityName: "Ten Gods",
  entityType: "DefinedTerm",
  subtitle: "How element relationships around the Day Master become practical life roles.",
  directAnswer:
    "The Ten Gods (Shi Shen 十神) are ten relationship roles derived from how each element in a Bazi chart relates to the Day Master. They describe resources, expression, wealth, authority, and peers in both yin and yang forms, giving a practical language for career, relationships, and timing without reducing a person to a single label.",
  breadcrumbs: baziBreadcrumbs("Ten Gods", "/bazi/ten-gods"),
  schema: { headline: "", description: "", url: "", datePublished: "2026-01-05", dateModified: "2026-02-15" },
  stats: [
    { value: "10", label: "Relationship roles", description: "Five pairs, each with yin and yang expression." },
    { value: "5", label: "Base categories", description: "Resource, Output, Wealth, Authority, Peer." },
    { value: "1", label: "Day Master", description: "The anchor that defines all ten relationships." },
  ],
  citations: [
    { label: "Yuan Hai Zi Ping", source: "Classical Bazi source for Day Master-centered chart reading." },
    { label: "San Ming Tong Hui", source: "Ming dynasty synthesis of stems, branches, and Ten God roles." },
  ],
  sections: [
    {
      heading: "What the Ten Gods actually measure",
      content: (
        <>
          <p>
            Every stem and branch in a Bazi chart has a fixed relationship to the Day Master based on the Five Element generating and controlling cycles. <cite>Yuan Hai Zi Ping</cite> names these relationships: the element that generates the Day Master is a Resource star, the element the Day Master generates is an Output star, the element the Day Master controls is a Wealth star, the element that controls the Day Master is an Authority star, and the same element as the Day Master is a Peer star.
          </p>
          <p>
            Each category splits into yin and yang, giving ten distinct roles. The same element can be a Direct Resource or an Indirect Resource depending on whether it shares the Day Master's polarity.
          </p>
        </>
      ),
    },
    {
      heading: "The five pairs and their practical meanings",
      content: (
        <>
          <p>
            Direct Resource and Indirect Resource describe support, learning, and nurturing energy. Direct Output and Indirect Output (Eating God and Hurting Officer) describe creative expression, communication, and unconventional thinking. Direct Wealth and Indirect Wealth describe earned income and opportunistic gain. Direct Officer and Seven Killings describe structure, authority, and pressure. Rob Wealth and Friend describe peers, competition, and shared resources.
          </p>
          <p>
            In <cite>San Ming Tong Hui</cite>, the same Ten God can be useful or stressful depending on whether the Day Master is strong or weak, and whether the chart season supports or drains that energy.
          </p>
        </>
      ),
      stats: [
        { value: "2", label: "Forms per category", description: "Direct (same polarity) and Indirect (opposite polarity)." },
        { value: "60", label: "Stem-branch pairs", description: "The calendar cycle that determines which Ten God appears where." },
      ],
    },
    {
      heading: "Common beginner mistakes with Ten Gods",
      content: (
        <>
          <p>
            The most common mistake is reading a Ten God as a fixed personality trait. A strong Seven Killings does not mean a person is aggressive; it means there is significant authority or pressure energy in the chart that needs context before interpretation.
          </p>
          <p>
            Another mistake is reading Ten Gods in isolation from season and element balance. A Wealth star in a chart that already has too much of that element can create stress rather than opportunity. Always check the Day Master strength and seasonal context first.
          </p>
        </>
      ),
    },
    {
      heading: "How to apply Ten Gods in practice",
      content: (
        <>
          <p>
            Use Ten Gods to understand recurring patterns rather than predict outcomes. A chart with strong Output stars often describes someone who communicates, teaches, or creates. A chart with strong Authority stars often describes someone who works within or against structure. These are tendencies, not destinies.
          </p>
          <p>
            Compare the natal Ten Gods with the current <Link href="/bazi/luck-pillars" className={linkClass}>Luck Pillar</Link> to see which roles are activated in a given decade. Then use the <Link href="/tools/bazi-calculator" className={linkClass}>free calculator</Link> to see your own Ten God distribution.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Are the Ten Gods the same as the Chinese zodiac animals?",
      answer:
        "No. The Ten Gods are derived from element relationships around the Day Master in a Bazi chart. The zodiac animals come from the Earthly Branches and represent a 12-year cycle. They are different layers of the same system.",
    },
    {
      question: "Can I have more than one Ten God in my chart?",
      answer:
        "Yes. Most charts contain several Ten Gods across the four pillars. The dominant ones depend on which appear most frequently, which are in the month pillar, and which are activated by the current Luck Pillar.",
    },
    {
      question: "Is Seven Killings always negative?",
      answer:
        "No. Seven Killings describes intense authority or pressure energy. In a chart where the Day Master is strong enough to handle it, Seven Killings can indicate leadership, drive, and the ability to work under pressure. Context always matters.",
    },
    {
      question: "Do Ten Gods change over time?",
      answer:
        "The natal Ten Gods stay fixed. But Luck Pillars and annual stems bring new Ten God energies into the chart, activating different roles in different decades and years.",
    },
  ],
  relatedLinks: [
    { title: "Five Elements", href: "/bazi/five-elements", description: "The element relationships that define all Ten God roles." },
    { title: "Luck Pillars", href: "/bazi/luck-pillars", description: "See how Ten Gods shift across 10-year timing cycles." },
    { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "See your own Ten God distribution in one chart." },
  ],
  cta: cta("See your Ten Gods in a live chart"),
});

const luckPillarsPage = buildPage({
  slug: "luck-pillars",
  path: "/bazi/luck-pillars",
  title: "Luck Pillars (Da Yun): 10-Year Bazi Cycles",
  description:
    "Luck Pillars show 10-year timing cycles that interact with the natal Bazi chart and annual stem-branch patterns.",
  entityName: "Luck Pillars",
  entityType: "DefinedTerm",
  subtitle: "How 10-year cycles activate different parts of your natal Bazi chart.",
  directAnswer:
    "Luck Pillars (Da Yun 大运) are 10-year timing cycles in Bazi that run alongside the natal chart. Each pillar introduces a new stem and branch that activates, supports, or challenges the natal chart structure. They are calculated from the birth date and gender, and they show when different life themes are likely to become prominent.",
  breadcrumbs: baziBreadcrumbs("Luck Pillars", "/bazi/luck-pillars"),
  schema: { headline: "", description: "", url: "", datePublished: "2026-01-15", dateModified: "2026-02-28" },
  stats: [
    { value: "10", label: "Years per pillar", description: "Each Da Yun runs for a full decade." },
    { value: "8", label: "Typical pillars", description: "Most people experience 7–9 Luck Pillars in a lifetime." },
    { value: "5", label: "Starting age", description: "Varies by birth date and gender; typically between 1 and 10." },
  ],
  citations: [
    { label: "Yuan Hai Zi Ping", source: "Classical Bazi source for Luck Pillar calculation and interpretation." },
    { label: "San Ming Tong Hui", source: "Ming dynasty synthesis of natal chart and timing cycle interaction." },
  ],
  sections: [
    {
      heading: "How Luck Pillars are calculated",
      content: (
        <>
          <p>
            Luck Pillars are derived from the month pillar of the natal chart. For yang-year males and yin-year females, the pillars move forward through the calendar. For yin-year males and yang-year females, they move backward. The starting age is calculated from the number of days between the birth date and the next or previous seasonal node, converted to years at a ratio of three days per year.
          </p>
          <p>
            According to <cite>Yuan Hai Zi Ping</cite>, this method connects the natal chart to the broader seasonal flow of time, so each decade reflects a different phase of the life pattern.
          </p>
        </>
      ),
    },
    {
      heading: "What a Luck Pillar activates",
      content: (
        <>
          <p>
            Each Luck Pillar brings a new stem and branch into the chart. The stem interacts with natal stems through combinations and clashes. The branch interacts with natal branches through harmony groups, clashes, and punishments. In <cite>San Ming Tong Hui</cite>, these interactions show which natal Ten Gods become prominent, which elements are strengthened or weakened, and which life themes move to the foreground.
          </p>
          <p>
            A Luck Pillar that strengthens the Day Master's useful elements tends to be a productive decade. One that introduces conflicting or draining energy tends to bring pressure and the need for adjustment.
          </p>
        </>
      ),
      stats: [
        { value: "2", label: "Parts per pillar", description: "One stem (first 5 years) and one branch (last 5 years)." },
        { value: "60", label: "Possible pillars", description: "The same 60 stem-branch pairs used in the natal chart." },
      ],
    },
    {
      heading: "Common beginner mistakes with Luck Pillars",
      content: (
        <>
          <p>
            The most common mistake is treating a Luck Pillar as a standalone prediction. A difficult-looking pillar does not guarantee hardship; it describes pressure that can be navigated with awareness. A favorable-looking pillar does not guarantee success without effort.
          </p>
          <p>
            Another mistake is ignoring the natal chart when reading the pillar. The pillar only makes sense in relation to the Day Master strength, element balance, and the Ten Gods already present in the natal structure.
          </p>
        </>
      ),
    },
    {
      heading: "Luck Pillars alongside annual and monthly cycles",
      content: (
        <>
          <p>
            Luck Pillars set the decade-level backdrop. Annual stems and branches (Tai Sui) add a yearly layer, and monthly branches add a shorter rhythm. Classical practice reads all three together: the natal chart provides the foundation, the Luck Pillar sets the decade theme, and the annual cycle shows when specific events are most likely to crystallize.
          </p>
          <p>
            Use the <Link href="/tools/bazi-calculator" className={linkClass}>free calculator</Link> to see your current Luck Pillar alongside your natal chart, then read the <Link href="/bazi/ten-gods" className={linkClass}>Ten Gods guide</Link> to understand which roles are activated in your current decade.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "When do Luck Pillars start?",
      answer:
        "The starting age varies by birth date and gender, typically between age 1 and 10. It is calculated from the distance between the birth date and the nearest seasonal node in the Chinese calendar.",
    },
    {
      question: "Can a bad Luck Pillar be avoided?",
      answer:
        "Luck Pillars describe timing patterns, not fixed outcomes. A challenging pillar highlights areas of pressure and adjustment. Awareness of the pattern allows better preparation, even if the pressure itself cannot be eliminated.",
    },
    {
      question: "How is a Luck Pillar different from an annual cycle?",
      answer:
        "A Luck Pillar runs for 10 years and sets the broad decade theme. An annual cycle (Tai Sui) runs for one year and adds a shorter layer of activation. Both interact with the natal chart, but at different timescales.",
    },
    {
      question: "Do Luck Pillars affect everyone the same way?",
      answer:
        "No. The same Luck Pillar stem and branch will interact differently with each natal chart. A pillar that strengthens one person's useful elements may create conflict in another person's chart.",
    },
  ],
  relatedLinks: [
    { title: "Ten Gods", href: "/bazi/ten-gods", description: "Understand which roles a Luck Pillar activates in your chart." },
    { title: "Five Elements", href: "/bazi/five-elements", description: "The element relationships that determine pillar quality." },
    { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "See your current Luck Pillar alongside your natal chart." },
  ],
  cta: cta("See your current Luck Pillar"),
});

const briefTopics = [
  ["free-calculator", "Free Bazi Calculator: Four Pillars Chart Tool", "A Bazi calculator converts birth date, time, and place into Four Pillars, elements, Day Master, and luck-cycle structure.", "4", "Birth inputs"],
  ["celebrity/elon-musk", "Elon Musk Bazi Case Study", "A celebrity Bazi case study compares public life patterns with chart structure for education and cultural context.", "1", "Case study"],
  ["celebrity/taylor-swift", "Taylor Swift Bazi Case Study", "A celebrity Bazi case study uses public birth data cautiously to illustrate Day Master, elements, and timing themes.", "1", "Case study"],
  ["career", "Bazi Career Analysis: Choosing Work by Element Pattern", "Bazi career analysis links useful elements, Ten Gods, and chart structure to work environments and decision patterns.", "5", "Career signals"],
  ["relationships", "Bazi Relationship Analysis: Compatibility and Patterns", "Bazi relationship analysis compares Day Masters, spouse palace signals, elements, and timing cycles for self-knowledge.", "4", "Compatibility layers"],
  ["health", "Bazi Health Tendencies: Element Balance and Lifestyle Signals", "Bazi health analysis reads elemental imbalance as lifestyle signals, not medical diagnosis or replacement for professional care.", "5", "Element signals"],
  ["faq", "Bazi FAQ: Common Four Pillars Questions", "This Bazi FAQ answers common questions about birth time, Day Master, elements, compatibility, and how to use a chart responsibly.", "10", "Core questions"],
  ["glossary", "Bazi Glossary: Chinese Metaphysics Terms", "This Bazi glossary defines key terms such as Day Master, Ten Gods, Heavenly Stems, Earthly Branches, and Luck Pillars.", "30+", "Terms"],
] as const;

const briefLabelOverrides: Record<string, string> = {
  "free-calculator": "Bazi Calculator",
  career: "Bazi Career Analysis",
  relationships: "Bazi Relationship Analysis",
  health: "Bazi Health Tendencies",
  faq: "Bazi FAQ",
  glossary: "Bazi Glossary",
};

const generatedBriefPages = briefTopics.map(([slug, title, description, statValue, statLabel]) => {
  const path = `/bazi/${slug}`;
  const label = briefLabelOverrides[slug] ?? title.split(":")[0].replace("Bazi ", "");

  return buildPage({
    slug,
    path,
    title,
    description,
    entityName: label,
    entityType: slug === "glossary" ? "DefinedTermSet" : "DefinedTerm",
    subtitle: "A focused Bazi guide built with answer-first structure and structured data.",
    directAnswer: `${label} in Bazi is a focused topic that only makes sense inside the full Four Pillars chart. It explains how a specific symbol, cycle, or relationship changes the Day Master reading, then points you back to season, element balance, and timing before any conclusion.`,
    breadcrumbs: baziBreadcrumbs(label, path),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: statValue, label: statLabel, description: "A practical number used in this Bazi topic." },
      { value: "60", label: "Stem-branch cycle", description: "The shared calendar foundation for Bazi timing." },
      { value: "4", label: "Pillars", description: "Every topic connects back to year, month, day, and hour." },
    ],
    citations: [
      { label: "Yuan Hai Zi Ping", source: "Classical Bazi reference for Four Pillars interpretation." },
      { label: "San Ming Tong Hui", source: "Classical synthesis of stems, branches, and chart methods." },
    ],
    sections: [
      {
        heading: `What ${label} means in Bazi`,
        content: (
          <>
            <p>
              {description} According to <cite>Yuan Hai Zi Ping</cite>, the value of a symbol comes from its position in a full chart, not from a stand-alone label.
            </p>
            <p>
              Use the term as a map marker: it tells you where to look next, not where to stop.
            </p>
          </>
        ),
      },
      {
        heading: "How to read it in the chart",
        content: (
          <>
            <p>
              Read the Day Master first, then check season, element balance, and the pillar that carries the topic. In <cite>San Ming Tong Hui</cite>, relationships between parts carry more weight than isolated symbols.
            </p>
            <p>
              If the topic is timing-related, compare it with the natal chart and any relevant Luck Pillars before deciding what it means in practice.
            </p>
          </>
        ),
        stats: [{ value: "3", label: "Context layers", description: "Day Master, season, and timing should stay together." }],
      },
      {
        heading: "Common beginner mistakes",
        content: (
          <>
            <p>
              Do not flatten a symbol into a personality label or a promise. A chart topic becomes useful only when it stays connected to the surrounding stems, branches, and calendar context.
            </p>
            <p>
              When the meaning is unclear, return to <cite>Chinese calendar tradition</cite> and reread the same topic inside the full time structure.
            </p>
          </>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <>
            <p>
              Open the <Link href="/bazi" className={linkClass}>Bazi overview</Link>, then use the <Link href="/tools/bazi-calculator" className={linkClass}>free calculator</Link> to see the chart structure in one place. If the vocabulary is still new, the <Link href="/learn/beginners-guide" className={linkClass}>beginner guide</Link> gives the cleanest reset.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: briefRelatedLinks,
    cta: cta(),
  });
});

export const allBaziPages = [...baziPages, tenGodsPage, luckPillarsPage, ...generatedBriefPages];

export function getBaziPage(slug: string): BaziContentPage | undefined {
  return allBaziPages.find((page) => page.slug === slug);
}

export function getBaziStaticParams(): Array<{ slug?: string[] }> {
  return allBaziPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
