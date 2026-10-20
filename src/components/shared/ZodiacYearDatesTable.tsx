import Link from "next/link";
import { formatShortDate, getZodiacYearDates } from "@/lib/zodiac/year-dates";

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

interface ZodiacYearDatesTableProps {
  animalName: string;
  years: number[];
  hrefFor?: (year: number) => string | undefined;
}

export default function ZodiacYearDatesTable({
  animalName,
  years,
  hrefFor,
}: ZodiacYearDatesTableProps) {
  const rows = years.map((year) => ({ ...getZodiacYearDates(year), href: hrefFor?.(year) }));

  return (
    <div className="mt-4 overflow-x-auto" role="region" aria-label="Scrollable table" tabIndex={0}>
      <table className="w-full border-collapse text-sm">
        <caption className="text-ink-600 dark:text-ink-300 mb-3 text-left text-xs leading-5">
          Year of the {animalName} start and end dates. Lunar New Year and Li Chun dates are civil
          dates in China Standard Time (UTC+8), calculated with the same calendar library as the
          mingliatlas Bazi calculator. Many Bazi schools, and the mingliatlas calculator, start the
          year pillar at the exact Li Chun moment.
        </caption>
        <thead>
          <tr className="border-ink-200 border-b dark:border-white/10">
            <th scope="col" className="py-2 pr-4 text-left font-semibold">
              Year
            </th>
            <th scope="col" className="py-2 pr-4 text-left font-semibold">
              Element and stem-branch
            </th>
            <th scope="col" className="py-2 pr-4 text-left font-semibold">
              Zodiac year (Lunar New Year)
            </th>
            <th scope="col" className="py-2 text-left font-semibold">
              Li Chun (solar-term year)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.year}
              className="border-ink-100 border-b last:border-b-0 dark:border-white/5"
            >
              <th scope="row" className="py-2 pr-4 text-left font-normal">
                {row.href ? (
                  <Link href={row.href} className={linkClass}>
                    {row.year}
                  </Link>
                ) : (
                  row.year
                )}
              </th>
              <td className="py-2 pr-4">
                {row.element} {animalName} — {row.pinyin} ({row.ganZhi})
              </td>
              <td className="py-2 pr-4">
                <time dateTime={row.lunarNewYear}>{formatShortDate(row.lunarNewYear)}</time> –{" "}
                <time dateTime={row.lastDay}>{formatShortDate(row.lastDay)}</time>
              </td>
              <td className="py-2">
                <time dateTime={row.liChun}>{formatShortDate(row.liChun)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
