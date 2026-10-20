// Core Bazi and Mingli vocabulary for /bazi/glossary. Definitions are short,
// convention-level explanations; each term links to the site's canonical page
// where one exists so definitions and long-form guides stay consistent.

export type GlossaryGroup =
  | "Chart structure"
  | "Elements and polarity"
  | "Relationships and strength"
  | "Timing and calendar";

export const glossaryGroups: GlossaryGroup[] = [
  "Chart structure",
  "Elements and polarity",
  "Relationships and strength",
  "Timing and calendar",
];

export interface GlossaryTerm {
  group: GlossaryGroup;
  term: string;
  chinese: string;
  alternateNames?: string[];
  definition: string;
  href?: string;
}

export const baziGlossaryTerms: GlossaryTerm[] = [
  {
    group: "Chart structure",
    term: "Mingli",
    chinese: "命理",
    alternateNames: ["Ming Li", "life-pattern principles"],
    definition:
      "Life-pattern principles: the Chinese study of timing, temperament, and recurring patterns through systems such as Bazi, Ziwei Doushu, and the Chinese calendar.",
    href: "/",
  },
  {
    group: "Chart structure",
    term: "Bazi",
    chinese: "八字",
    alternateNames: ["Eight Characters", "Four Pillars of Destiny"],
    definition:
      "A birth-chart system that converts the year, month, day, and hour of birth into four stem-branch pillars, eight characters in total.",
    href: "/bazi/what-is-bazi",
  },
  {
    group: "Chart structure",
    term: "Four Pillars",
    chinese: "四柱",
    definition:
      "The year, month, day, and hour pillars of a Bazi chart. Each pillar pairs one Heavenly Stem above one Earthly Branch.",
    href: "/bazi",
  },
  {
    group: "Chart structure",
    term: "Heavenly Stems",
    chinese: "天干",
    alternateNames: ["Tian Gan"],
    definition:
      "The ten stems Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, and Gui. Each is a Yang or Yin form of one of the Five Elements.",
    href: "/bazi/heavenly-stems",
  },
  {
    group: "Chart structure",
    term: "Earthly Branches",
    chinese: "地支",
    alternateNames: ["Di Zhi"],
    definition:
      "The twelve branches Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, and Hai. They mark months, two-hour periods, and the twelve zodiac animals, and each contains hidden stems.",
    href: "/bazi/earthly-branches",
  },
  {
    group: "Chart structure",
    term: "Sexagenary cycle",
    chinese: "六十甲子",
    alternateNames: ["Jiazi cycle", "stem-branch cycle"],
    definition:
      "The repeating sequence of 60 stem-branch pairs, from Jia-Zi to Gui-Hai, used to label years, months, days, and hours.",
    href: "/bazi/heavenly-stems",
  },
  {
    group: "Chart structure",
    term: "Day Master",
    chinese: "日主",
    alternateNames: ["Day Stem", "Ri Yuan (日元)"],
    definition:
      "The Heavenly Stem of the day pillar. It represents the self in a Bazi chart, and every other stem and branch is read in relation to it.",
    href: "/blog/day-master-bazi-complete-guide",
  },
  {
    group: "Elements and polarity",
    term: "Five Elements",
    chinese: "五行",
    alternateNames: ["Wu Xing", "Five Phases"],
    definition:
      "Wood, Fire, Earth, Metal, and Water: five phases that describe how energies generate and control one another.",
    href: "/bazi/five-elements",
  },
  {
    group: "Elements and polarity",
    term: "Generating cycle",
    chinese: "相生",
    definition:
      "The supporting sequence of the Five Elements: Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal carries Water, and Water nourishes Wood.",
    href: "/bazi/five-elements",
  },
  {
    group: "Elements and polarity",
    term: "Controlling cycle",
    chinese: "相克",
    definition:
      "The restraining sequence of the Five Elements: Wood controls Earth, Earth controls Water, Water controls Fire, Fire controls Metal, and Metal controls Wood.",
    href: "/bazi/five-elements",
  },
  {
    group: "Elements and polarity",
    term: "Yin and Yang",
    chinese: "阴阳",
    definition:
      "The paired polarity carried by every stem and branch. In Bazi it decides, for example, which of two related Ten Gods a stem becomes.",
    href: "/bazi/heavenly-stems",
  },
  {
    group: "Elements and polarity",
    term: "Hidden Stems",
    chinese: "藏干",
    definition:
      "The one to three Heavenly Stems contained inside each Earthly Branch. They add elements to the chart that are not visible in the stems above.",
    href: "/bazi/earthly-branches",
  },
  {
    group: "Relationships and strength",
    term: "Ten Gods",
    chinese: "十神",
    alternateNames: ["Shi Shen", "Ten Relationship Stars"],
    definition:
      "Ten relationship roles named by comparing each stem with the Day Master by element and polarity, grouped as Peer, Output, Wealth, Authority, and Resource.",
    href: "/bazi/ten-gods",
  },
  {
    group: "Relationships and strength",
    term: "Month Branch",
    chinese: "月令",
    alternateNames: ["Month Commander"],
    definition:
      "The Earthly Branch of the month pillar. It sets the season of the chart and is traditionally the strongest single factor in judging an element's strength.",
    href: "/bazi/earthly-branches",
  },
  {
    group: "Relationships and strength",
    term: "Day Master strength",
    chinese: "身强 / 身弱",
    definition:
      "Whether the Day Master is well supported (strong) or under-supported (weak) by season, roots, and the surrounding stems and branches. Element counts alone do not decide it.",
    href: "/blog/day-master-bazi-complete-guide",
  },
  {
    group: "Relationships and strength",
    term: "Useful God",
    chinese: "用神",
    alternateNames: ["Yong Shen", "favorable element"],
    definition:
      "The element or Ten God that best balances a particular chart. Schools differ in how they choose it, so it should be stated together with the method used.",
    href: "/bazi/five-elements",
  },
  {
    group: "Timing and calendar",
    term: "Luck Pillars",
    chinese: "大运",
    alternateNames: ["Da Yun", "ten-year luck cycles"],
    definition:
      "Ten-year stem-branch periods that run forward or backward from the month pillar. Direction depends on the year stem's polarity and the traditional gender rule.",
    href: "/bazi/luck-pillars",
  },
  {
    group: "Timing and calendar",
    term: "Annual Pillar",
    chinese: "流年",
    alternateNames: ["Liu Nian", "flowing year"],
    definition:
      "The stem-branch pair of a calendar year, such as Bing-Wu for 2026, compared with the natal chart and the current Luck Pillar.",
    href: "/bazi/luck-pillars",
  },
  {
    group: "Timing and calendar",
    term: "Solar terms",
    chinese: "节气",
    alternateNames: ["Jie Qi"],
    definition:
      "The 24 points of the solar year. The twelve Jie (节) terms mark the start of each Bazi month.",
    href: "/tools/bazi-calculator",
  },
  {
    group: "Timing and calendar",
    term: "Li Chun",
    chinese: "立春",
    alternateNames: ["Start of Spring"],
    definition:
      "The solar term around February 4 that begins the Tiger month. Many Bazi schools, and the mingliatlas calculator, change the year pillar at its exact moment rather than at Lunar New Year.",
    href: "/chinese-zodiac",
  },
  {
    group: "Timing and calendar",
    term: "True solar time",
    chinese: "真太阳时",
    definition:
      "Clock time adjusted for the birthplace's longitude and the equation of time. Some practitioners use it to set the hour pillar.",
    href: "/tools/bazi-calculator",
  },
  {
    group: "Relationships and strength",
    term: "Clash",
    chinese: "冲",
    alternateNames: ["Chong"],
    definition:
      "The opposition between two branches six positions apart, such as Zi and Wu (Rat and Horse) or Chen and Xu (Dragon and Dog).",
    href: "/bazi/earthly-branches",
  },
  {
    group: "Relationships and strength",
    term: "Six Combinations",
    chinese: "六合",
    alternateNames: ["Liu He"],
    definition:
      "Six pairs of branches that combine, such as Zi-Chou (Rat-Ox) and Chen-You (Dragon-Rooster).",
    href: "/blog/chinese-zodiac-compatibility-chart",
  },
  {
    group: "Relationships and strength",
    term: "Three Harmony",
    chinese: "三合",
    alternateNames: ["San He", "triad"],
    definition:
      "Four groups of three branches that form an element frame: Shen-Zi-Chen (Water), Yin-Wu-Xu (Fire), Hai-Mao-Wei (Wood), and Si-You-Chou (Metal).",
    href: "/blog/chinese-zodiac-compatibility-chart",
  },
];
