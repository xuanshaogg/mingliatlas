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
    question: "Can Bazi guarantee an outcome?",
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
    href: "/bazi/free-calculator",
    label: "Open the free calculator",
  };
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
    schema: { headline: "", description: "", url: "" },
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
        quotes: [
          {
            text: "A Bazi chart is a map of tendencies and timing, not a script that removes personal agency.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
      },
      {
        heading: "The core building blocks",
        content: (
          <>
            <p>
              Bazi uses the <Link href="/bazi/heavenly-stems" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">10 Heavenly Stems</Link>, the <Link href="/bazi/earthly-branches" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">12 Earthly Branches</Link>, and the <Link href="/bazi/five-elements" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Five Elements</Link>. These combine into 60 possible stem-branch pairs.
            </p>
            <p>
              The Day Master, taken from the day stem, anchors the reading. Other chart elements become resources, expression, wealth, authority, or peers depending on how they relate to that Day Master.
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
        heading: "How to use this section",
        content: (
          <>
            <p>
              Start with Five Elements, then learn stems and branches. After that, Ten Gods and Luck Pillars explain how chart structure becomes practical language for career, relationships, health tendencies, and personal timing.
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
    schema: { headline: "", description: "", url: "" },
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
              Early Chinese birth analysis developed around year and seasonal timing. Tang dynasty scholar Li Xuzhong is often linked with early pillar methods, while Song dynasty Zi Ping methods placed the day stem at the center. According to classical Bazi texts, the Day Master gives the chart a clear reference point.
            </p>
            <p>
              A full chart uses 4 pillars and 8 characters. These characters come from the same 60-pair cycle used in traditional Chinese calendars, making Bazi a time-pattern system rather than a single-sign identity label.
            </p>
          </>
        ),
        quotes: [
          {
            text: "Four Pillars analysis is most useful when it describes patterns clearly and leaves room for better decisions.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
      },
      {
        heading: "The four pillars each describe a layer",
        content: (
          <>
            <p>
              The year pillar describes broad background and early environment. The month pillar shows season, family conditioning, and career context. The day pillar reveals the Day Master and relationship palace. The hour pillar adds later-life themes, children, projects, and inner drives.
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
    schema: { headline: "", description: "", url: "" },
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
        quotes: [
          {
            text: "Bazi is not about fixed labels; it is a way to understand how different energies interact within a person’s life pattern.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
      },
      {
        heading: "The generating and controlling cycles",
        content: (
          <>
            <p>
              The generating cycle is Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal enriches Water, and Water nourishes Wood. The controlling cycle is Wood parts Earth, Earth channels Water, Water cools Fire, Fire melts Metal, and Metal cuts Wood.
            </p>
            <p>
              Over-acting and insulting patterns describe imbalance. An element can control too strongly, or a weaker element can resist the one that should regulate it.
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
    schema: { headline: "", description: "", url: "" },
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
              Jia and Yi are Wood, Bing and Ding are Fire, Wu and Ji are Earth, Geng and Xin are Metal, and Ren and Gui are Water. The first in each pair is yang and the second is yin. This creates 10 visible expressions from 5 elements.
            </p>
          </>
        ),
        quotes: [
          {
            text: "The Day Master is the reference point; every other symbol is interpreted through its relationship to that stem.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
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
              Stems show what is visible and active. They help identify the Day Master, Ten Gods, combinations, and whether a chart expresses its strengths openly or stores them in hidden branches.
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
    schema: { headline: "", description: "", url: "" },
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
              Each branch contains a season, direction, two-hour period, animal symbol, and one or more hidden stems. This is why a Bazi branch can hold energy that is not immediately visible in the top stem.
            </p>
          </>
        ),
        quotes: [
          {
            text: "The branches often explain the roots beneath a chart, especially when visible stems do not tell the full story.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
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
              The 12 branches map to 24 hours in two-hour blocks. The hour pillar therefore adds a precise layer of timing and can shift the reading of personal drives, later-life themes, and projects.
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

const briefTopics = [
  ["ten-gods", "The Ten Gods (Shi Shen): Bazi Relationship Stars", "The Ten Gods translate element relationships around the Day Master into practical roles such as resources, wealth, authority, output, and peers.", "10", "Relationship Stars"],
  ["luck-pillars", "Luck Pillars (Da Yun): 10-Year Bazi Cycles", "Luck Pillars show 10-year timing cycles that interact with the natal Bazi chart and annual stem-branch patterns.", "10", "Years per pillar"],
  ["free-calculator", "Free Bazi Calculator: Four Pillars Chart Tool", "A Bazi calculator converts birth date, time, and place into Four Pillars, elements, Day Master, and luck-cycle structure.", "4", "Birth inputs"],
  ["celebrity/elon-musk", "Elon Musk Bazi Case Study", "A celebrity Bazi case study compares public life patterns with chart structure for education and cultural context.", "1", "Case study"],
  ["celebrity/taylor-swift", "Taylor Swift Bazi Case Study", "A celebrity Bazi case study uses public birth data cautiously to illustrate Day Master, elements, and timing themes.", "1", "Case study"],
  ["career", "Bazi Career Analysis: Choosing Work by Element Pattern", "Bazi career analysis links useful elements, Ten Gods, and chart structure to work environments and decision patterns.", "5", "Career signals"],
  ["relationships", "Bazi Relationship Analysis: Compatibility and Patterns", "Bazi relationship analysis compares Day Masters, spouse palace signals, elements, and timing cycles for self-knowledge.", "4", "Compatibility layers"],
  ["health", "Bazi Health Tendencies: Element Balance and Lifestyle Signals", "Bazi health analysis reads elemental imbalance as lifestyle signals, not medical diagnosis or replacement for professional care.", "5", "Element signals"],
  ["faq", "Bazi FAQ: Common Four Pillars Questions", "This Bazi FAQ answers common questions about birth time, Day Master, elements, compatibility, and how to use a chart responsibly.", "10", "Core questions"],
  ["glossary", "Bazi Glossary: Chinese Metaphysics Terms", "This Bazi glossary defines key terms such as Day Master, Ten Gods, Heavenly Stems, Earthly Branches, and Luck Pillars.", "30+", "Terms"],
] as const;

const generatedBriefPages = briefTopics.map(([slug, title, description, statValue, statLabel]) => {
  const path = `/bazi/${slug}`;
  const label = title.split(":")[0].replace("Bazi ", "");

  return buildPage({
    slug,
    path,
    title,
    description,
    entityName: label,
    entityType: slug === "glossary" ? "DefinedTermSet" : "DefinedTerm",
    subtitle: "A focused Bazi guide built with answer-first structure and structured data.",
    directAnswer: `${label} is part of Four Pillars of Destiny (Bazi) analysis. It helps translate stems, branches, elements, and timing cycles into practical self-knowledge. The page gives a clear definition, core rules, useful statistics, and next steps for responsible interpretation.`,
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
              {description} According to classical Bazi texts, the topic should be read through the Day Master, season, element balance, and the wider pillar structure rather than as a single isolated symbol.
            </p>
            <p>
              This guide is intentionally concise for the first content release. Later editorial passes can expand examples, tables, and case studies while keeping the same schema and layout.
            </p>
          </>
        ),
        quotes: [
          {
            text: "Bazi becomes useful when the symbols are connected to choices, timing, and self-awareness.",
            author: "Joey Yap",
            title: "Chief Consultant",
            organization: "Joey Yap Consulting Group",
          },
        ],
      },
      {
        heading: "How to apply it responsibly",
        content: (
          <>
            <p>
              Use this topic as one layer of analysis. Compare it with Five Elements, Heavenly Stems, Earthly Branches, and Luck Pillars before drawing a conclusion. Interpretations vary by school, so clear reasoning matters more than dramatic claims.
            </p>
          </>
        ),
        stats: [{ value: "3+", label: "Context layers", description: "Element, pillar position, and timing should be read together." }],
      },
      {
        heading: "Where to go next",
        content: (
          <>
            <p>
              Continue with the core Bazi guides, then use the calculator page when you are ready to map these concepts onto a personal Four Pillars chart.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: baziBaseLinks,
    cta: cta(),
  });
});

export const allBaziPages = [...baziPages, ...generatedBriefPages];

export function getBaziPage(slug: string): BaziContentPage | undefined {
  return allBaziPages.find((page) => page.slug === slug);
}

export function getBaziStaticParams(): Array<{ slug?: string[] }> {
  return allBaziPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
