import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { relationTo } from "./branch-facts";
import { formatLongDate, getZodiacYearDates } from "@/lib/zodiac/year-dates";

// 2027 Chinese zodiac forecast (Ding-Wei, Fire Goat). Added 2026-11-17 so the
// page is crawled and indexed before "2027 chinese zodiac" / "year of the goat
// 2027" demand builds in December. Dates come from the calendar library.

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

const y2027 = getZodiacYearDates(2027);
const y2026 = getZodiacYearDates(2026);

export const FORECAST_2027_LNY = formatLongDate(y2027.lunarNewYear);
export const FORECAST_2027_LAST_DAY = formatLongDate(y2027.lastDay);
export const FORECAST_2027_LI_CHUN = `${formatLongDate(y2027.liChun)} at ${y2027.liChunTime}`;

interface SignNote {
  animal: string;
  slug: string;
  years: string;
  note: string;
}

// Year lists are the last seven occurrences before 2027.
const SIGN_NOTES: SignNote[] = [
  {
    animal: "Rat",
    slug: "rat",
    years: "1960, 1972, 1984, 1996, 2008, 2020",
    note: "Zi and Wei form a six-harm pair, traditionally read as quiet friction rather than open conflict. Useful focus: say expectations out loud instead of assuming them.",
  },
  {
    animal: "Ox",
    slug: "ox",
    years: "1961, 1973, 1985, 1997, 2009, 2021",
    note: "Chou and Wei clash directly, and both sit in the Chou-Xu-Wei punishment group. Classical readers treat this as the year's main pressure point: plan changes deliberately rather than letting them arrive.",
  },
  {
    animal: "Tiger",
    slug: "tiger",
    years: "1962, 1974, 1986, 1998, 2010, 2022",
    note: "No traditional pair with Wei. After a 2026 Fire Horse year that sat inside the Tiger's own Fire triad, 2027 usually reads as a calmer consolidation year.",
  },
  {
    animal: "Rabbit",
    slug: "rabbit",
    years: "1963, 1975, 1987, 1999, 2011, 2023",
    note: "Mao is in the Hai-Mao-Wei Wood triad with the Goat, a supportive branch link. Good year for joint projects and long-term commitments that need goodwill.",
  },
  {
    animal: "Dragon",
    slug: "dragon",
    years: "1964, 1976, 1988, 2000, 2012, 2024",
    note: "No traditional pair with Wei; both are Earth branches. The year adds Earth to Earth, so the reading usually depends on whether the natal chart already has too much or too little Earth.",
  },
  {
    animal: "Snake",
    slug: "snake",
    years: "1965, 1977, 1989, 2001, 2013, 2025",
    note: "Si, Wu and Wei form the southern Fire seasonal group, so the Goat year completes a Fire set the Snake belongs to. Often read as a year of visibility and warmth.",
  },
  {
    animal: "Horse",
    slug: "horse",
    years: "1954, 1966, 1978, 1990, 2002, 2014, 2026",
    note: "Wu and Wei are a six-combination pair, the closest partnership in the cycle. After its own ben ming nian in 2026, the Horse usually finds 2027 easier.",
  },
  {
    animal: "Goat",
    slug: "goat",
    years: "1955, 1967, 1979, 1991, 2003, 2015",
    note: "2027 is the Goat's ben ming nian (本命年), the return of its own birth sign. Tradition advises steadiness and wearing red; Bazi reads it as a year that magnifies the natal Wei branch.",
  },
  {
    animal: "Monkey",
    slug: "monkey",
    years: "1956, 1968, 1980, 1992, 2004, 2016",
    note: "No traditional pair with Wei. A neutral year at sign level, so the Day Master and luck pillar carry most of the reading.",
  },
  {
    animal: "Rooster",
    slug: "rooster",
    years: "1957, 1969, 1981, 1993, 2005, 2017",
    note: "No traditional pair with Wei. Earth produces Metal in the Five Element cycle, so Wei Earth is often read as quietly supportive of the Rooster's You Metal.",
  },
  {
    animal: "Dog",
    slug: "dog",
    years: "1958, 1970, 1982, 1994, 2006, 2018",
    note: "Xu sits in the Chou-Xu-Wei punishment group with the Goat, so many almanacs list the Dog among signs that should move carefully in 2027, especially with contracts and disputes.",
  },
  {
    animal: "Pig",
    slug: "pig",
    years: "1959, 1971, 1983, 1995, 2007, 2019",
    note: "Hai is in the Hai-Mao-Wei Wood triad with the Goat. Supportive for cooperation, family, and creative work.",
  },
];

export const forecast2027DirectAnswer = `2027 is the Year of the Fire Goat (Ding-Wei, 丁未). It begins at Lunar New Year on ${FORECAST_2027_LNY} and ends on ${FORECAST_2027_LAST_DAY}; many Bazi schools start the year pillar at Li Chun on ${formatLongDate(y2027.liChun)}. Ding is Yin Fire and Wei is Yin Earth, so the year reads as steadier than the 2026 Fire Horse. Goat, Ox, Rat, and Dog have the strongest traditional links to the year branch.`;

export const forecast2027Sections: KnowledgePageProps["sections"] = [
  {
    heading: "2027 at a glance: dates and the Ding-Wei pillar",
    content: (
      <>
        <p>
          <strong>
            The Year of the Goat runs from {FORECAST_2027_LNY} to {FORECAST_2027_LAST_DAY}.
          </strong>{" "}
          It follows the 2026 Fire Horse year, which ends on {formatLongDate(y2026.lastDay)}. Li
          Chun, the solar-term boundary many Bazi schools use for the year pillar, falls on{" "}
          {FORECAST_2027_LI_CHUN} China Standard Time, two days before Lunar New Year. A birth
          between those two moments has a Ding-Wei year pillar in a Li Chun-based chart but is still
          a Horse in the popular zodiac.
        </p>
        <p>
          The year&rsquo;s stem is Ding (丁), Yin Fire, and its branch is Wei (未), Yin Earth. Fire
          produces Earth in the Five Element cycle, so the stem feeds the branch: a settled,
          cumulative year image rather than the double Fire of 2026. Wei also holds three hidden
          stems, Ji Earth, Ding Fire, and Yi Wood, which is why practitioners describe the year as
          warm, patient, and quietly productive. In Na Yin terms, Ding-Wei belongs to &ldquo;Heavenly
          River Water&rdquo; (天河水), the same pair as Bing-Wu.
        </p>
        <p>
          Goat, Sheep, and Ram all name the same sign (羊). See the{" "}
          <Link href="/chinese-zodiac/goat" className={linkClass}>
            Year of the Goat guide
          </Link>{" "}
          for every Goat year, element type, and the 2027 age table.
        </p>
      </>
    ),
    stats: [
      { value: "Feb 6", label: "Lunar New Year 2027", description: "Start of the Fire Goat year." },
      { value: "丁未", label: "Year pillar", description: "Ding Yin Fire over Wei Yin Earth." },
    ],
  },
  {
    heading: "2027 forecast for all 12 zodiac signs",
    content: (
      <>
        <p>
          Each sign&rsquo;s note starts from the fixed branch relationship between its own branch
          and Wei. These relationships are the traditional starting point for annual readings; they
          are not a ranking of good and bad years, and a personal reading still needs the{" "}
          <Link href="/tools/bazi-calculator" className={linkClass}>
            full Bazi chart
          </Link>
          .
        </p>
        <div className="overflow-x-auto" role="region" aria-label="2027 zodiac forecast by sign" tabIndex={0}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="text-left">How each sign&rsquo;s branch relates to the 2027 Wei branch</caption>
            <thead>
              <tr className="border-ink-300 border-b dark:border-white/20">
                <th scope="col" className="py-3 pr-4">Sign</th>
                <th scope="col" className="py-3 pr-4">Recent birth years</th>
                <th scope="col" className="py-3 pr-4">Relation to Wei</th>
                <th scope="col" className="py-3">2027 note</th>
              </tr>
            </thead>
            <tbody className="divide-ink-200 divide-y dark:divide-white/10">
              {SIGN_NOTES.map((sign) => (
                <tr key={sign.slug}>
                  <th scope="row" className="py-3 pr-4 align-top font-normal">
                    <Link href={`/chinese-zodiac/${sign.slug}`} className={linkClass}>
                      {sign.animal}
                    </Link>
                  </th>
                  <td className="py-3 pr-4 align-top">{sign.years}</td>
                  <td className="py-3 pr-4 align-top">{relationTo(sign.animal, "Goat")}</td>
                  <td className="py-3 align-top">{sign.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    heading: "Which signs clash with Tai Sui in 2027?",
    content: (
      <>
        <p>
          Almanacs call the year branch Tai Sui (太岁), and list the signs whose branch meets it in a
          strong pattern as &ldquo;offending Tai Sui&rdquo; (犯太岁). For a Wei year the usual list
          is:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Goat:</strong> the year of its own branch (值太岁, ben ming nian).
          </li>
          <li>
            <strong>Ox:</strong> the direct Chou-Wei clash (冲太岁), traditionally the strongest
            pattern.
          </li>
          <li>
            <strong>Dog:</strong> the Chou-Xu-Wei punishment group (刑太岁).
          </li>
          <li>
            <strong>Rat:</strong> the Zi-Wei six-harm pair (害太岁).
          </li>
        </ul>
        <p>
          Customs for these signs include visiting a temple early in the year, wearing red, and
          avoiding unnecessary big moves. In Bazi the same patterns are read against the whole
          chart: an Ox year branch with strong support elsewhere can absorb a clash that would
          unsettle a weaker chart.
        </p>
      </>
    ),
  },
  {
    heading: "Career, money, relationships, and wellbeing in a Fire Goat year",
    content: (
      <>
        <p>
          Wei is late-summer Earth: the season when crops ripen rather than sprout. Career themes
          therefore favor finishing, refining, and building on what 2026 started, over launching
          many new things. Teams, service work, design, teaching, and care work fit the Goat image.
        </p>
        <p>
          Money themes favor steady saving and assets that grow slowly. Relationship themes favor
          cooperation and repair, helped by the Horse-Goat six combination that links 2026 and
          2027. For wellbeing, the symbolism of warm, damp Earth is usually turned into practical
          advice about routine, digestion, and rest; treat it as a prompt for habits, not a medical
          prediction.
        </p>
      </>
    ),
  },
  {
    heading: "How to personalize the 2027 forecast",
    content: (
      <>
        <p>
          Start with the year sign, then check three things in a{" "}
          <Link href="/tools/bazi-calculator" className={linkClass}>
            Bazi chart
          </Link>
          : whether Fire and Earth help or burden the Day Master, whether Wei clashes or combines
          with any branch in the chart (not only the year branch), and which luck pillar is running.
          A Wei year that meets an Ox day or month branch can matter more than one that meets only
          the Ox year branch.
        </p>
        <p>
          For relationship questions, compare two signs with the{" "}
          <Link href="/tools/zodiac-compatibility" className={linkClass}>
            compatibility calculator
          </Link>{" "}
          or the{" "}
          <Link href="/blog/chinese-zodiac-compatibility-chart" className={linkClass}>
            compatibility chart
          </Link>
          . For the year now ending, see the{" "}
          <Link href="/chinese-zodiac/2026-forecast" className={linkClass}>
            2026 Fire Horse forecast
          </Link>
          .
        </p>
      </>
    ),
  },
];

export const forecast2027Faqs: FAQ[] = [
  {
    question: "What Chinese zodiac year is 2027?",
    answer: `2027 is the Year of the Fire Goat (Ding-Wei, 丁未), also called the Year of the Sheep or Ram. It runs from ${FORECAST_2027_LNY} to ${FORECAST_2027_LAST_DAY}.`,
  },
  {
    question: "When does Chinese New Year 2027 start?",
    answer: `Chinese New Year 2027 falls on ${FORECAST_2027_LNY} (China Standard Time). Li Chun, the solar-term year boundary used in many Bazi charts, is ${FORECAST_2027_LI_CHUN}.`,
  },
  {
    question: "Which zodiac signs offend Tai Sui in 2027?",
    answer:
      "The usual list for a Wei year is Goat (its own year), Ox (direct clash), Dog (Chou-Xu-Wei punishment), and Rat (six harm). These are traditional patterns; their effect depends on the full chart.",
  },
  {
    question: "Which signs have a good year in 2027?",
    answer:
      "Signs with a harmonious link to Wei are the Horse (six combination) and the Rabbit and Pig (Hai-Mao-Wei Wood triad). The Snake and Horse also share the southern Fire seasonal group with the Goat. A good year still depends on the personal chart.",
  },
  {
    question: "Is 2027 a Fire Goat or an Earth Goat?",
    answer:
      "Fire Goat. The zodiac element comes from the year stem, Ding (丁), which is Yin Fire. The Wei branch itself is Earth, so the full pillar is Fire over Earth. The next Earth Goat year is 2039 (Ji-Wei).",
  },
  {
    question: "What is the 2027 ben ming nian?",
    answer:
      "2027 is the ben ming nian (本命年) for people born in Goat years: 1955, 1967, 1979, 1991, 2003, and 2015. Tradition advises wearing red and avoiding unnecessary risks during the year of one's own sign.",
  },
];
