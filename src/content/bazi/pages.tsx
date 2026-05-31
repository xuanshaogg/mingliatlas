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
  {
    question: "How accurate does my birth time need to be for Bazi?",
    answer:
      "Aim for accuracy within the two-hour window that defines the hour pillar, since each Earthly Branch covers two clock hours. If your birth falls near the boundary between two branches, a small error can shift the hour pillar, so check the birth certificate time and, when in doubt, compare both possible charts.",
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
      { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical source associated with Zi Ping Bazi methods." },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Ming dynasty synthesis of stems, branches, and chart rules." },
      { label: "Joey Yap, Bazi: The Destiny Code (2007)", source: "Modern English-language reference that introduces Four Pillars logic to contemporary readers." },
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
            <p>
              The most important point for beginners is that Bazi is not the same as the Chinese zodiac. The zodiac year animal is only one branch in the year pillar. A full reading also checks the month pillar, day pillar, hour pillar, hidden stems, element balance, and 10-year Luck Pillars before drawing a practical conclusion.
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
            <p>
              Each layer answers a different question. Stems show what is visible, branches show seasonal context, hidden stems show what is stored below the surface, and Ten Gods explain relationship roles around the Day Master. When the layers agree, the theme is strong. When they conflict, the chart needs more careful reading.
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
        heading: "A practical reading order",
        content: (
          <>
            <p>
              A reliable beginner reading follows a fixed order: first identify the Day Master, then check the month branch for season, then compare element balance, then read the Ten Gods, and only after that add the 10-year Luck Pillars. This order keeps the chart grounded. Starting with a dramatic clash or a favorite element often leads to a shallow interpretation.
            </p>
            <p>
              The free <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> follows the same logic by separating calculation from interpretation. It shows the four pillars, Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance in one view so readers can verify each statement against a visible chart feature.
            </p>
          </>
        ),
        stats: [
          { value: "5", label: "Reading steps", description: "Day Master, season, elements, Ten Gods, timing." },
          { value: "10", label: "Luck years per pillar", description: "Da Yun cycles usually span 10 years." },
          { value: "24", label: "Solar terms", description: "Month boundaries follow the solar calendar." },
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
            <p>
              A fourth mistake is treating a useful element as a simple lifestyle prescription. If Water is useful in a chart, that does not automatically mean a person should wear blue or move north. Classical analysis first asks why Water is useful: does it support the Day Master, cool excessive Fire, release Metal pressure, or complete a combination? The reason matters more than the label.
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
            <p>
              Responsible use also keeps domain boundaries clear. Bazi can help a reader reflect on temperament, work style, relationship dynamics, and timing pressure. It should not replace medical, legal, financial, or mental health advice. When a question carries real-world risk, the chart can be a reflection tool, but the decision still belongs to practical judgment and qualified professionals.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: [
      ...baziBaseLinks,
      { title: "Ten Gods", href: "/bazi/ten-gods", description: "Read relationship roles around the Day Master." },
      { title: "Luck Pillars", href: "/bazi/luck-pillars", description: "Understand how 10-year cycles change the chart environment." },
      { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "Generate a chart and follow the reading order." },
    ],
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
      { label: "Xu Ziping (徐子平, Song Dynasty)", source: "Song dynasty figure associated with Day Master-centered Bazi." },
      { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical text that shaped later Four Pillars methods." },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Comprehensive classical synthesis of stem-branch interactions, Ten Gods, and chart structure." },
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
            <p>
              The word Bazi literally means "eight characters" because the chart has four stems and four branches. Those eight characters are not read as isolated personality symbols. They are read as a structured calendar snapshot: the climate of the birth moment, the visible stems, the hidden branch contents, and the relationship each part has to the Day Master.
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
            <p>
              The month pillar usually carries the most weight because it sets the season. A Fire Day Master born in summer starts from a very different environment than the same Fire Day Master born in winter. The day stem identifies the self, but the month branch tells you whether that self is supported, pressured, drained, or out of season.
            </p>
          </>
        ),
        stats: [
          { value: "2", label: "Characters per pillar", description: "One stem and one branch." },
          { value: "8", label: "Main characters", description: "The literal meaning of Bazi." },
        ],
      },
      {
        heading: "How Bazi turns a birth time into a chart",
        content: (
          <>
            <p>
              Bazi calculation begins by converting the birth moment into the Chinese solar calendar. Month pillars follow the 24 solar terms, not the lunar new year. This is why a person born in early February may still belong to the previous solar month for Bazi even if popular zodiac calendars say the new animal year has started.
            </p>
            <p>
              Once the year, month, day, and hour pillars are calculated, the reader identifies the Day Master from the day stem. Then every other visible stem and hidden stem is translated into a Ten God relationship: resource, peer, output, wealth, or authority. This translation is what turns a calendar table into a personal chart.
            </p>
            <p>
              Timing enters through Luck Pillars (Da Yun), which usually shift in 10-year blocks, and annual pillars, which change every year. The natal chart describes the starting structure; Luck Pillars describe the changing environment around that structure. A chart theme may remain quiet for years and then become active when the arriving pillar triggers it.
            </p>
          </>
        ),
        stats: [
          { value: "24", label: "Solar terms", description: "Bazi month boundaries use solar terms." },
          { value: "10", label: "Ten Gods", description: "Relationship roles are calculated from the Day Master." },
          { value: "10", label: "Years per Luck Pillar", description: "Da Yun cycles form the main timing layer." },
        ],
      },
      {
        heading: "Bazi works with other Chinese systems",
        content: (
          <>
            <p>
              Bazi often sits beside Ziwei Doushu, I Ching, Feng Shui, and date selection. Each system asks a different question. Bazi focuses on personal timing and structure, while Feng Shui reads spatial influence and I Ching gives decision context through 64 hexagrams.
            </p>
            <p>
              Compared with <Link href="/ziwei" className={linkClass}>Ziwei Doushu</Link>, Bazi is more compact and element-driven. Ziwei uses a 12-palace chart with stars and transformations. Compared with the <Link href="/chinese-zodiac" className={linkClass}>Chinese Zodiac</Link>, Bazi is much more detailed because the year animal is only one branch out of the full four-pillar chart.
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
            <p>
              It can also help separate structure from story. A chart may show strong Output stars, but that does not automatically mean someone should become an artist; it means expression, production, teaching, or problem-solving may be important channels. A chart may show strong Authority stars, but that does not guarantee status; it points to pressure, standards, responsibility, or rule systems that need careful handling.
            </p>
          </>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks: [
      ...baziBaseLinks,
      { title: "Ten Gods", href: "/bazi/ten-gods", description: "Understand how other elements become roles around the Day Master." },
      { title: "Luck Pillars", href: "/bazi/luck-pillars", description: "Learn the 10-year timing layer used after the natal chart." },
      { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "Generate the four pillars and Day Master before reading." },
    ],
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
      { label: "《黄帝内经》Huangdi Neijing (Han Dynasty, ~200 BCE)", source: "Classical medical text that organizes nature through five phase correspondences." },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Classical Bazi source applying stems, branches, and elements." },
    ],
    sections: [
      {
        heading: "What the Five Elements actually describe",
        content: (
          <>
            <p>
              The Five Elements (Wu Xing 五行) are not five substances — they are five phases of movement. Wood expands outward, Fire rises and radiates, Earth stabilizes and centers, Metal contracts and refines, and Water descends and flows. The Chinese character 行 means movement or process, not material. This distinction matters for Bazi: when a chart shows strong Wood, it does not mean the person is made of wood. It means the expanding, outward-moving quality is dominant in their birth pattern.
            </p>
            <p>
              According to the <cite>Huangdi Neijing</cite>, the five phases organize seasonal movement, organs, directions, colors, tastes, and climates into a coherent system of correspondences. The Neijing applies this framework to medicine; Bazi applies the same logic to time and personal chart structure. Both systems treat the five phases as a language for describing how energy moves through cycles rather than as a fixed taxonomy.
            </p>
            <p>
              The framework appears in Chinese thought as early as the Warring States period (475–221 BCE), when philosophers systematized earlier observations about seasonal change into a formal model. By the Han dynasty, Wu Xing had become the organizing principle behind medicine, cosmology, music, and governance. Bazi inherited this framework and applied it specifically to the stem-branch calendar and birth timing.
            </p>
          </>
        ),
      },
      {
        heading: "The generating and controlling cycles",
        content: (
          <>
            <p>
              The generating cycle (相生 xiāng shēng) describes how each element supports the next: Wood feeds Fire, Fire creates Earth (ash), Earth bears Metal (ore), Metal enriches Water (condensation), and Water nourishes Wood. This cycle describes productive flow — each phase creates the conditions for the next to arise. In a Bazi chart, a Day Master that is supported by its generating element tends to have more resources available.
            </p>
            <p>
              The controlling cycle (相克 xiāng kè) describes how each element regulates another: Wood parts Earth, Earth channels Water, Water cools Fire, Fire melts Metal, and Metal cuts Wood. Control is not inherently negative — it provides structure and prevents excess. A chart with no controlling relationships can become unbalanced in a different way than one with too much control.
            </p>
            <p>
              <cite>San Ming Tong Hui</cite> applies these relationships to stems, branches, and the strength of the Day Master. Two additional patterns describe imbalance: over-acting (侮, wǔ) occurs when a controlling element is too strong and damages what it should regulate; insulting (乘, chéng) occurs when a weakened element fails to control what it should, and the controlled element turns against it. These patterns help explain why a chart that looks balanced on paper can still produce difficult timing.
            </p>
          </>
        ),
        stats: [
          { value: "5", label: "Generating steps", description: "Each element supports one other element." },
          { value: "5", label: "Controlling steps", description: "Each element regulates one other element." },
          { value: "2", label: "Imbalance patterns", description: "Over-acting and insulting describe excess and deficiency." },
        ],
      },
      {
        heading: "What each element means in a Bazi chart",
        content: (
          <>
            <p>
              Wood relates to growth, planning, learning, and the drive to expand. In a chart, strong Wood often shows up as someone who initiates projects, values development, and can struggle with completion when Wood has no controlling Metal. Wood governs the liver and gallbladder in classical medicine, the east direction, and the spring season.
            </p>
            <p>
              Fire relates to visibility, warmth, expression, and the drive to connect. Strong Fire in a chart often produces charisma and social presence, but without Water to moderate it, Fire can become scattered or exhausting. Fire governs the heart and small intestine, the south direction, and summer.
            </p>
            <p>
              Earth relates to trust, stability, practical support, and the capacity to hold things together. Earth appears in all four seasonal transitions (the last 18 days of each season) and in the center direction. Strong Earth in a chart often produces reliability and caretaking, but excess Earth without Wood to break it up can become stagnation.
            </p>
            <p>
              Metal relates to standards, refinement, boundaries, and the drive to clarify. Strong Metal in a chart often produces precision and the ability to cut through ambiguity, but without Fire to temper it, Metal can become rigid or critical. Metal governs the lungs and large intestine, the west direction, and autumn.
            </p>
            <p>
              Water relates to wisdom, adaptability, depth, and the capacity to flow around obstacles. Strong Water in a chart often produces intelligence and flexibility, but without Earth to contain it, Water can become unfocused or anxious. Water governs the kidneys and bladder, the north direction, and winter.
            </p>
          </>
        ),
      },
      {
        heading: "How element balance is read in practice",
        content: (
          <>
            <p>
              Element balance in Bazi begins with the birth season, which determines which elements are naturally strong or weak at the time of birth. A person born in winter (Water season) already has strong Water in the environment, so additional Water in the chart may be excessive rather than supportive. A person born in summer (Fire season) has strong Fire in the environment, which affects how the Day Master uses its own element.
            </p>
            <p>
              After season, the reader checks stems, branches, hidden stems inside branches, and any combinations that transform elements. A branch combination can change a Wood branch into a Fire branch, for example, which shifts the element count significantly. This is why two people with the same Day Master can have very different element balances depending on their birth month and the combinations present in their chart.
            </p>
            <p>
              The goal is not to have all five elements present in equal measure. The goal is to identify which elements support the Day Master's function and which create pressure. A chart that is missing one element is not automatically weak — the missing element may be supplied by the luck cycle or annual influences. Bazi reads element balance as a dynamic pattern across time, not a fixed snapshot.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "What are the Five Elements in Chinese metaphysics?",
        answer:
          "The Five Elements (Wu Xing, 五行) are Wood (木), Fire (火), Earth (土), Metal (金), and Water (水). Unlike the Western four-element model, Wu Xing describes five phases of cyclical energy rather than static substances. Each element has associated seasons, organs, directions, emotions, and qualities used across Bazi, Feng Shui, and Traditional Chinese Medicine.",
      },
      {
        question: "What is the difference between the generating and controlling cycles?",
        answer:
          "The generating cycle (相生, xiāng shēng) is the nourishing sequence: Wood feeds Fire, Fire produces Earth ash, Earth yields Metal ore, Metal collects Water, Water nourishes Wood. The controlling cycle (相克, xiāng kè) is the restraining sequence: Wood parts Earth, Earth dams Water, Water extinguishes Fire, Fire melts Metal, Metal chops Wood. Both cycles operate simultaneously in every Bazi chart.",
      },
      {
        question: "How do I find my element in Bazi?",
        answer:
          "Your primary element in Bazi is determined by your Day Master — the Heavenly Stem of the day pillar in your Four Pillars chart. For example, a Jiǎ (甲) or Yǐ (乙) Day Master is a Wood person. The full chart will also contain other stems and branches that add, drain, or restrain that element, so the Day Master is a starting point, not the complete picture.",
      },
      {
        question: "What do Wood, Fire, Earth, Metal, and Water represent in Bazi?",
        answer:
          "Wood represents growth, vision, and expansion — linked to spring and the liver. Fire represents expression, clarity, and warmth — linked to summer and the heart. Earth represents stability, transition, and nurturing — linked to the seasonal change between seasons and the stomach. Metal represents structure, precision, and contraction — linked to autumn and the lungs. Water represents wisdom, adaptability, and depth — linked to winter and the kidneys.",
      },
      {
        question: "How is Wu Xing different from Western four elements?",
        answer:
          "The Western model (fire, water, earth, air) describes static substances and temperament archetypes rooted in ancient Greek philosophy. Wu Xing describes dynamic phases of change in a cyclical relationship — each element transforms into the next through the generating cycle. Wu Xing is also embedded in time (each element governs specific hours, days, months, and years) and is used as a practical calculation system rather than a symbolic framework alone.",
      },
      {
        question: "Can I balance my Five Elements through lifestyle choices?",
        answer:
          "Classical Bazi does not prescribe specific remedies for element imbalance in the same way modern wellness culture does. The primary tool is awareness: knowing which elements are weak or excessive in your chart helps you interpret the luck cycles and annual influences that supply or drain those elements over time. Some practitioners do suggest colour, direction, or diet associations derived from Five Element theory, but these are supplementary interpretations rather than core classical doctrine.",
      },
    ],
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
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Classical source for stem and branch relationships." },
      { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Zi Ping tradition focused on the Day Master." },
    ],
    sections: [
      {
        heading: "The ten stems pair elements with polarity",
        content: (
          <>
            <p>
              The 10 Heavenly Stems (Tian Gan 天干) are Jia (甲), Yi (乙), Bing (丙), Ding (丁), Wu (戊), Ji (己), Geng (庚), Xin (辛), Ren (壬), and Gui (癸). Each stem combines one of the Five Elements with yin or yang polarity: Jia and Yi are Wood, Bing and Ding are Fire, Wu and Ji are Earth, Geng and Xin are Metal, and Ren and Gui are Water. The first in each pair is yang and the second is yin. This creates 10 distinct visible expressions from 5 elements, a pattern described in <cite>San Ming Tong Hui</cite>.
            </p>
            <p>
              The stems appear in the top position of each Bazi pillar. They represent what is visible, active, and expressed outwardly. The Earthly Branch below each stem holds the seasonal context and hidden stems that modify how the visible stem actually functions. Classical Bazi practice always reads the stem in relation to its branch, not in isolation.
            </p>
            <p>
              The stem cycle has been used in the Chinese calendar for over 3,000 years. Oracle bone inscriptions from the Shang dynasty (c. 1600–1046 BCE) already used the ten stems to mark days. By the time Bazi developed its mature form in the Song dynasty, the stems had accumulated a rich layer of symbolic meaning that practitioners applied to personality, timing, and chart relationships.
            </p>
          </>
        ),
      },
      {
        heading: "Each stem carries a practical image",
        content: (
          <>
            <p>
              Classical Bazi uses natural images to make each stem concrete. Jia (甲) is like a tall tree — upright, direct, and growth-oriented, with strong roots but limited flexibility. Yi (乙) is like vines and flowers — adaptable, persistent, and able to find support in unexpected places. Bing (丙) is like the sun — warm, generous, and visible to everyone, but unable to focus its light on one person. Ding (丁) is like candlelight — precise, intimate, and capable of sustained illumination in a small space.
            </p>
            <p>
              Wu (戊) is like a mountain or dry earth — solid, reliable, and capable of holding great weight, but slow to change direction. Ji (己) is like cultivated soil — fertile, receptive, and able to nourish what is planted in it, but dependent on what it receives. Geng (庚) is like raw metal or an axe — strong, decisive, and capable of cutting through obstacles, but requiring refinement before it becomes truly useful. Xin (辛) is like jewelry or a refined blade — precise, beautiful, and sensitive to its environment.
            </p>
            <p>
              Ren (壬) is like the ocean or a great river — vast, powerful, and capable of carrying enormous loads, but difficult to direct without strong banks. Gui (癸) is like mist, rain, or underground water — subtle, penetrating, and able to reach places that direct force cannot, but easily dispersed without containment. These images are not decorative — they are practical tools for reading how a Day Master expresses itself and what kind of environment supports or depletes it.
            </p>
          </>
        ),
        stats: [
          { value: "10", label: "Core images", description: "One natural image for each visible stem." },
          { value: "5", label: "Yang stems", description: "Jia, Bing, Wu, Geng, Ren — outward-moving expression." },
          { value: "5", label: "Yin stems", description: "Yi, Ding, Ji, Xin, Gui — inward-moving expression." },
        ],
      },
      {
        heading: "The Day Master and why it anchors the chart",
        content: (
          <>
            <p>
              The Day Master is the stem of the day pillar. In <cite>Yuan Hai Zi Ping</cite>, the Day Master is the self — the reference point from which all other chart elements are interpreted. Every other stem and branch in the chart becomes a Ten God (a relationship role) based on how its element relates to the Day Master's element. A Jia Wood Day Master, for example, reads Bing Fire as its Output star, Geng Metal as its Authority star, and Ren Water as its Resource star.
            </p>
            <p>
              This is why two people born in the same year with the same zodiac animal can have completely different Bazi readings: if one has a Jia Wood Day Master and the other has a Ren Water Day Master, the same surrounding elements play entirely different roles in each chart. The Day Master is not just one of eight characters — it is the lens through which all eight are read.
            </p>
            <p>
              Identifying the Day Master is the first step in any Bazi reading. Once the Day Master is known, the reader can determine element strength, Ten Gods, useful and stressful elements, and how the luck cycle interacts with the natal chart. Without the Day Master as an anchor, the chart is a collection of symbols without a center.
            </p>
          </>
        ),
      },
      {
        heading: "Stem combinations and their effects",
        content: (
          <>
            <p>
              Five stem combinations (天干合 tiān gān hé) describe pairs of stems that attract each other and can transform into a new element when conditions are right: Jia-Ji combine toward Earth, Yi-Geng combine toward Metal, Bing-Xin combine toward Water, Ding-Ren combine toward Wood, and Wu-Gui combine toward Fire. These combinations are significant because they can change the element count in a chart and alter how the Day Master functions.
            </p>
            <p>
              A combination does not always transform. Classical practice checks whether the resulting element is supported by the season and surrounding branches before confirming the transformation. A Jia-Ji combination in a summer chart surrounded by Fire may not produce Earth, because the conditions for Earth to dominate are not present. This is why <cite>San Ming Tong Hui</cite> treats combinations as conditional rather than automatic.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "What are the 10 Heavenly Stems in Bazi?",
        answer: "The 10 Heavenly Stems (天干 Tian Gan) are Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, and Gui. Each stem is the yang or yin expression of one of the Five Elements: Wood, Fire, Earth, Metal, and Water. In a Bazi chart, the stems occupy the top row of the four pillars and represent visible, expressed energy.",
      },
      {
        question: "What is the Day Master in Bazi?",
        answer: "The Day Master is the Heavenly Stem of the day pillar in your Bazi chart. It represents the self — the reference point from which every other stem and branch is interpreted. All Ten God relationships are calculated relative to the Day Master's element, making it the single most important character in the chart.",
      },
      {
        question: "What is the difference between yang and yin stems?",
        answer: "Yang stems (Jia, Bing, Wu, Geng, Ren) represent outward, expanding, and direct expressions of their element. Yin stems (Yi, Ding, Ji, Xin, Gui) represent inward, subtle, and adaptive expressions. For example, Jia Wood is like a tall tree — upright and visible — while Yi Wood is like a vine that bends and adapts to its environment.",
      },
      {
        question: "How do Heavenly Stem combinations work?",
        answer: "Adjacent yang and yin stems of complementary elements can combine and transform into a new element. For example, Jia (Yang Wood) and Ji (Yin Earth) combine to produce Earth energy. These combinations are conditional — they require seasonal support from the month branch to fully transform, and a clashing stem can block the combination.",
      },
      {
        question: "Can two people have the same Day Master but different charts?",
        answer: "Yes. The Day Master is determined by the day of birth, but the remaining seven characters — the year, month, and hour stems and branches — create an entirely different surrounding context. Two Jia Wood Day Masters born in different months, hours, or years will have different elemental balances, Ten God patterns, and luck cycle timings.",
      },
      {
        question: "Which stem represents me in Bazi?",
        answer: "Your Day Master stem — the top character of your day pillar — represents you. You can identify it by entering your birth date and time into a Bazi calculator. The stem's element and polarity (yang or yin) describe the core quality of how you express yourself and engage with the world.",
      },
    ],
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
      { label: "Chinese calendrical tradition (干支历法)", source: "Branches organize months, hours, directions, and zodiac animals." },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Classical Bazi source for branch relations and hidden stems." },
    ],
    sections: [
      {
        heading: "Branches are more than zodiac animals",
        content: (
          <>
            <p>
              The 12 Earthly Branches (Di Zhi 地支) are Zi (子), Chou (丑), Yin (寅), Mao (卯), Chen (辰), Si (巳), Wu (午), Wei (未), Shen (申), You (酉), Xu (戌), and Hai (亥). Each branch contains a season, direction, two-hour period, animal symbol, and one or more hidden stems. This layered structure is why <cite>Chinese calendrical tradition</cite> treats branches as far more than mascots — they are containers of seasonal energy that hold information invisible at the surface level.
            </p>
            <p>
              The hidden stems inside each branch are the most important feature for Bazi reading. Zi holds only Gui Water. Chou holds Ji Earth, Gui Water, and Xin Metal. Yin holds Jia Wood, Bing Fire, and Wu Earth. Each branch's hidden stems represent the energies stored within that seasonal container, and they can activate or be activated by stems and branches elsewhere in the chart. A chart that appears to lack a certain element at the surface level may hold it in hidden form inside a branch.
            </p>
            <p>
              The branch system has been used in Chinese timekeeping for over 3,000 years. Oracle bone inscriptions from the Shang dynasty already used the 12 branches to mark days and months. The association with zodiac animals developed later, probably during the Han dynasty, as a mnemonic device for a largely non-literate population. The animal names are cultural overlays on a technical calendar system.
            </p>
          </>
        ),
      },
      {
        heading: "Branch relationships: combinations, clashes, and more",
        content: (
          <>
            <p>
              Six combinations (六合 liù hé) pair branches that attract each other: Zi-Chou, Yin-Hai, Mao-Xu, Chen-You, Si-Shen, and Wu-Wei. When two branches in a chart form a combination, their energy can merge or transform, which changes the element balance. Like stem combinations, branch combinations are conditional — they require seasonal support and the absence of a clashing branch to fully transform.
            </p>
            <p>
              Three harmony groups (三合 sān hé) describe triangular affinity: Yin-Wu-Xu form a Fire frame, Si-You-Chou form a Metal frame, Shen-Zi-Chen form a Water frame, and Hai-Mao-Wei form a Wood frame. When all three branches of a harmony group appear in a chart, they can produce a strong elemental frame that dominates the chart's energy. Two of the three branches can form a partial harmony, which is weaker but still significant.
            </p>
            <p>
              Six clashes (六冲 liù chōng) describe opposing branch pairs: Zi-Wu, Chou-Wei, Yin-Shen, Mao-You, Chen-Xu, and Si-Hai. Clashes describe tension, disruption, and movement. In <cite>San Ming Tong Hui</cite>, a clash in the year or month pillar can indicate instability in early life or career; a clash in the day or hour pillar can affect relationships and later-life themes. Clashes are not always negative — they can also break up stagnation and force necessary change.
            </p>
            <p>
              Six harms (六害 liù hài) and punishments (刑 xíng) describe subtler forms of tension. Harms describe indirect damage — one branch undermining another without direct confrontation. Punishments describe self-defeating patterns: the self-punishment of Chen, Wu, and You; the unkind punishment of Yin, Si, and Shen; and the bullying punishment of Chou, Xu, and Wei. These patterns are used to identify recurring difficulties that are not explained by clashes alone.
            </p>
          </>
        ),
        stats: [
          { value: "6", label: "Combination pairs", description: "Branch pairs that can transform energy." },
          { value: "4", label: "Harmony groups", description: "Seasonal trines used in chart analysis." },
          { value: "6", label: "Clash pairs", description: "Opposing branches that create tension and movement." },
        ],
      },
      {
        heading: "Branches map to daily time and seasons",
        content: (
          <>
            <p>
              The 12 branches divide the 24-hour day into two-hour periods: Zi governs 11pm–1am, Chou 1–3am, Yin 3–5am, and so on through the cycle. The hour pillar in a Bazi chart is determined by this system, which is why birth time matters for a complete reading. The hour pillar adds a precise layer of timing and can shift the reading of personal drives, later-life themes, and the relationship between the self and its environment.
            </p>
            <p>
              The four seasons are organized into three branches each: Yin, Mao, and Chen govern spring (Wood season); Si, Wu, and Wei govern summer (Fire season); Shen, You, and Xu govern autumn (Metal season); Hai, Zi, and Chou govern winter (Water season). The middle branch of each season — Mao, Wu, You, and Zi — is the strongest expression of that season's element. The first and last branches of each season are transitional, holding mixed energies.
            </p>
          </>
        ),
      },
      {
        heading: "How branches shape the full chart reading",
        content: (
          <>
            <p>
              Branches matter because they hold season, direction, animals, and hidden stems. They can strengthen, dilute, or redirect what the visible stem appears to do on its own. A Jia Wood Day Master sitting on a Zi Water branch is supported by its resource element from below — the branch nourishes the stem. The same Jia Wood sitting on a Shen Metal branch faces its controlling element from below, which creates a different dynamic entirely.
            </p>
            <p>
              Reading branches requires checking the month branch first, because the month branch determines the season and therefore the strength of all elements in the chart. A branch that looks strong in isolation may be weak in context if the season does not support it. <cite>Yuan Hai Zi Ping</cite> always reads branches in relation to the Day Master and the month branch before drawing conclusions about any individual pillar.
            </p>
            <p>
              A branch reading becomes much clearer when you compare it with the full stem-branch sequence around it, check for combinations and clashes, and identify which hidden stems are likely to activate based on the luck cycle and annual branches. This is why Bazi practitioners spend more time on branches than on stems — the visible layer is only the beginning of the chart's information.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "What are the 12 Earthly Branches in Bazi?",
        answer:
          "The 12 Earthly Branches (地支 dì zhī) are Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, and Hai. Each branch carries an element, a yin-yang polarity, a season, a two-hour time period, and one or more hidden stems inside it. They form the lower row of all four pillars in a Bazi chart.",
      },
      {
        question: "What are hidden stems and why do they matter?",
        answer:
          "Hidden stems (藏干 cáng gān) are the Heavenly Stems concealed inside each Earthly Branch. For example, the branch Yin hides Jia Wood (main), Bing Fire, and Wu Earth. These hidden stems carry additional elemental energy that can activate Ten God relationships not visible in the surface layer of the chart, making them critical for accurate chart reading.",
      },
      {
        question: "What is a branch clash (六冲) in Bazi?",
        answer:
          "A branch clash (六冲 liù chōng) occurs when two opposing branches appear in the same chart or luck cycle. The six clash pairs are Zi-Wu, Chou-Wei, Yin-Shen, Mao-You, Chen-Xu, and Si-Hai. Clashes indicate tension, disruption, or forced change in the life area governed by the affected pillar. They are not always negative — clashes can break stagnation and trigger necessary transitions.",
      },
      {
        question: "How do branch combinations (六合) differ from clashes?",
        answer:
          "Branch combinations (六合 liù hé) pair branches that attract and potentially transform each other: Zi-Chou, Yin-Hai, Mao-Xu, Chen-You, Si-Shen, and Wu-Wei. Unlike clashes, combinations suggest merging or blending energy. When conditions are met — seasonal support and no blocking clash — a combination can transform both branches into a new dominant element, altering the chart's elemental balance.",
      },
      {
        question: "What is the difference between a branch and a zodiac animal?",
        answer:
          "Each of the 12 Earthly Branches corresponds to one zodiac animal: Zi is Rat, Chou is Ox, Yin is Tiger, and so on. The animal is the popular name for the branch, but in Bazi analysis the branch is defined by its element, hidden stems, season, and relationships — not by personality traits associated with the zodiac. The animal label is a mnemonic; the elemental analysis is what matters in chart reading.",
      },
      {
        question: "Why does the month branch have the most weight in a Bazi chart?",
        answer:
          "The month branch sets the season, which determines whether any given element is in season (strong) or out of season (weak). A Day Master's strength is assessed primarily against the month branch. Classical texts like Yuan Hai Zi Ping (渊海子平) consistently read the month branch first because it provides the environmental context that makes all other branch and stem readings meaningful.",
      },
    ],
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
    { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Bazi source for Day Master-centered chart reading." },
    { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Ming dynasty synthesis of stems, branches, and Ten God roles." },
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
    { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Bazi source for Luck Pillar calculation and interpretation." },
    { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Ming dynasty synthesis of natal chart and timing cycle interaction." },
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
    directAnswer: slug === "free-calculator"
      ? "A Bazi calculator converts a birth date and local birth time into the Four Pillars: year, month, day, and hour. A useful calculator should show the Day Master, Ten Gods, hidden stems, Five Element balance, and timing context while keeping interpretation educational rather than deterministic."
      : `${label} in Bazi is a focused topic that only makes sense inside the full Four Pillars chart. It explains how a specific symbol, cycle, or relationship changes the Day Master reading, then points you back to season, element balance, and timing before any conclusion.`,
    breadcrumbs: baziBreadcrumbs(label, path),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: statValue, label: statLabel, description: "A practical number used in this Bazi topic." },
      { value: "60", label: "Stem-branch cycle", description: "The shared calendar foundation for Bazi timing." },
      { value: "4", label: "Pillars", description: "Every topic connects back to year, month, day, and hour." },
    ],
    citations: [
      { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Bazi reference for Four Pillars interpretation." },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Classical synthesis of stems, branches, and chart methods." },
    ],
    sections: [
      {
        heading: `What ${label} means in Bazi`,
        content: (
          <>
            {slug === "free-calculator" ? (
              <>
                <p>
                  A Bazi calculator is a chart-construction tool, not an automatic destiny verdict. It turns a birth date and local civil birth time into 4 pillars and 8 characters, then displays the Day Master, Ten Gods, hidden stems, and Five Element balance. According to <cite>Yuan Hai Zi Ping</cite>, those chart parts only become meaningful when read against the Day Master and the birth season.
                </p>
                <p>
                  The calculator is useful because it removes the most error-prone first step: converting ordinary calendar data into the stem-branch system. Once the chart is visible, the reader can slow down and ask better questions: which element anchors the self, which branch sets the season, which Ten Gods are visible, and what support or pressure appears around the chart.
                </p>
              </>
            ) : (
              <>
                <p>
                  {description} According to <cite>Yuan Hai Zi Ping</cite>, the value of a symbol comes from its position in a full chart, not from a stand-alone label.
                </p>
                <p>
                  Use the term as a map marker: it tells you where to look next, not where to stop.
                </p>
              </>
            )}
          </>
        ),
      },
      {
        heading: "How to read it in the chart",
        content: (
          <>
            {slug === "free-calculator" ? (
              <>
                <p>
                  Start with the Day Master, then read the month branch for season. After that, compare visible stems, hidden stems, and Five Element balance. In <cite>San Ming Tong Hui</cite>, relationships between parts carry more weight than isolated symbols, so a calculator result should be read as a connected structure.
                </p>
                <p>
                  Next, check the Ten Gods around the Day Master. A Wealth star, Resource star, or Authority star does not mean the same thing for every chart; it changes according to Day Master strength, season, and timing. Finally, compare the natal chart with Luck Pillars and annual influences before treating a theme as active.
                </p>
              </>
            ) : (
              <>
                <p>
                  Read the Day Master first, then check season, element balance, and the pillar that carries the topic. In <cite>San Ming Tong Hui</cite>, relationships between parts carry more weight than isolated symbols.
                </p>
                <p>
                  If the topic is timing-related, compare it with the natal chart and any relevant Luck Pillars before deciding what it means in practice.
                </p>
              </>
            )}
          </>
        ),
        stats: [{ value: "3", label: "Context layers", description: "Day Master, season, and timing should stay together." }],
      },
      ...(slug === "free-calculator"
        ? [
            {
              heading: "What the calculator should show",
              content: (
                <>
                  <p>
                    A strong Four Pillars calculator should show the year, month, day, and hour pillars in both Heavenly Stem and Earthly Branch form. It should also show hidden stems inside each branch, because many important chart relationships are not visible in the top row. The Day Master should be clearly marked, since it is the reference point for the entire chart.
                  </p>
                  <p>
                    The tool should also show the Ten Gods for visible and hidden stems. This makes the chart easier to read because it translates raw elements into relationship roles: Resource, Peer, Output, Wealth, and Authority. Element balance is useful as a first overview, but it should not be treated as the whole reading.
                  </p>
                </>
              ),
              stats: [
                { value: "8", label: "Visible characters", description: "Four stems plus four branches." },
                { value: "10", label: "Ten Gods", description: "Relationship roles around the Day Master." },
                { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water." },
              ],
            },
          ]
        : []),
      {
        heading: "Common beginner mistakes",
        content: (
          <>
            {slug === "free-calculator" ? (
              <>
                <p>
                  The first mistake is reading the year animal as the whole result. The calculator may show Dragon, Tiger, or Rat in the year branch, but that is only one of four branches. The Day Master and month branch usually matter more for a serious Bazi reading.
                </p>
                <p>
                  The second mistake is treating element percentages as a quick personality test. Element balance is useful, but it must be checked against season, Day Master strength, combinations, and timing. The third mistake is expecting a calculator to replace interpretation. A calculator builds the chart; a careful reader still has to connect the parts.
                </p>
              </>
            ) : (
              <>
                <p>
                  Do not flatten a symbol into a personality label or a promise. A chart topic becomes useful only when it stays connected to the surrounding stems, branches, and calendar context.
                </p>
                <p>
                  When the meaning is unclear, return to <cite>Chinese calendar tradition</cite> and reread the same topic inside the full time structure.
                </p>
              </>
            )}
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
