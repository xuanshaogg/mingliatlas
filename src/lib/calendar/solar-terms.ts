/**
 * Solar terms (节气) calculations
 * The 24 solar terms divide the solar year into 24 segments
 */

import { Solar } from 'lunar-typescript';

export interface SolarTerm {
  name: string;
  nameEn: string;
  date: Date;
  index: number; // 0-23
}

const SOLAR_TERM_NAMES = [
  { zh: '立春', en: 'Start of Spring' },
  { zh: '雨水', en: 'Rain Water' },
  { zh: '惊蛰', en: 'Awakening of Insects' },
  { zh: '春分', en: 'Spring Equinox' },
  { zh: '清明', en: 'Pure Brightness' },
  { zh: '谷雨', en: 'Grain Rain' },
  { zh: '立夏', en: 'Start of Summer' },
  { zh: '小满', en: 'Grain Buds' },
  { zh: '芒种', en: 'Grain in Ear' },
  { zh: '夏至', en: 'Summer Solstice' },
  { zh: '小暑', en: 'Minor Heat' },
  { zh: '大暑', en: 'Major Heat' },
  { zh: '立秋', en: 'Start of Autumn' },
  { zh: '处暑', en: 'End of Heat' },
  { zh: '白露', en: 'White Dew' },
  { zh: '秋分', en: 'Autumn Equinox' },
  { zh: '寒露', en: 'Cold Dew' },
  { zh: '霜降', en: 'Descent of Frost' },
  { zh: '立冬', en: 'Start of Winter' },
  { zh: '小雪', en: 'Minor Snow' },
  { zh: '大雪', en: 'Major Snow' },
  { zh: '冬至', en: 'Winter Solstice' },
  { zh: '小寒', en: 'Minor Cold' },
  { zh: '大寒', en: 'Major Cold' },
];

const SOLAR_TERM_ALIAS: Record<string, string> = {
  LI_CHUN: '立春',
  YU_SHUI: '雨水',
  JING_ZHE: '惊蛰',
  CHUN_FEN: '春分',
  QING_MING: '清明',
  GU_YU: '谷雨',
  LI_XIA: '立夏',
  XIAO_MAN: '小满',
  MANG_ZHONG: '芒种',
  XIA_ZHI: '夏至',
  XIAO_SHU: '小暑',
  DA_SHU: '大暑',
  LI_QIU: '立秋',
  CHU_SHU: '处暑',
  BAI_LU: '白露',
  QIU_FEN: '秋分',
  HAN_LU: '寒露',
  SHUANG_JIANG: '霜降',
  LI_DONG: '立冬',
  XIAO_XUE: '小雪',
  DA_XUE: '大雪',
  DONG_ZHI: '冬至',
  XIAO_HAN: '小寒',
  DA_HAN: '大寒',
};

const SOLAR_TERM_INDEX = new Map(
  SOLAR_TERM_NAMES.map((term, index) => [term.zh, index])
);

function toDate(solar: Solar): Date {
  return new Date(
    solar.getYear(),
    solar.getMonth() - 1,
    solar.getDay(),
    solar.getHour(),
    solar.getMinute(),
    solar.getSecond()
  );
}

function normalizeSolarTermName(name: string): string {
  return SOLAR_TERM_ALIAS[name] ?? name;
}

/**
 * Get all solar terms for a given year
 * @param year Solar year
 * @returns Array of 24 solar terms with dates
 */
export function getSolarTermsForYear(year: number): SolarTerm[] {
  const byName = new Map<string, SolarTerm>();

  // The library exposes the complete jieqi table from any date in the year,
  // but boundary terms can appear under pinyin-like keys. Scan the months and
  // normalize those aliases to the canonical Chinese 24-term names.
  for (let month = 1; month <= 12; month++) {
    const solar = Solar.fromYmd(year, month, 15);
    const lunar = solar.getLunar();
    const jieQi = lunar.getJieQiTable();

    for (const [name, solarObj] of Object.entries(jieQi)) {
      const termName = normalizeSolarTermName(name);
      const index = SOLAR_TERM_INDEX.get(termName);

      if (solarObj.getYear() === year && index !== undefined && !byName.has(termName)) {
        byName.set(termName, {
          name: termName,
          nameEn: SOLAR_TERM_NAMES[index].en,
          date: toDate(solarObj),
          index,
        });
      }
    }
  }

  return [...byName.values()].sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Get the current solar term for a given date
 * @param date Date to check
 * @returns Current solar term
 */
export function getCurrentSolarTerm(date: Date): SolarTerm | null {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  const currentTerm = lunar.getCurrentJieQi();

  if (!currentTerm) return null;

  const termName = normalizeSolarTermName(currentTerm.getName());
  const index = SOLAR_TERM_INDEX.get(termName) ?? -1;
  const termSolar = currentTerm.getSolar();

  return {
    name: termName,
    nameEn: index !== -1 ? SOLAR_TERM_NAMES[index].en : '',
    date: toDate(termSolar),
    index,
  };
}

/**
 * Get the next solar term after a given date
 * @param date Date to check from
 * @returns Next solar term
 */
export function getNextSolarTerm(date: Date): SolarTerm | null {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  const nextTerm = lunar.getNextJieQi();

  if (!nextTerm) return null;

  const termName = normalizeSolarTermName(nextTerm.getName());
  const index = SOLAR_TERM_INDEX.get(termName) ?? -1;

  return {
    name: termName,
    nameEn: index !== -1 ? SOLAR_TERM_NAMES[index].en : '',
    date: toDate(nextTerm.getSolar()),
    index,
  };
}

/**
 * Check if a date is a solar term day
 */
export function isSolarTermDay(date: Date): boolean {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  const jieQi = lunar.getJieQi();
  return jieQi !== '';
}
