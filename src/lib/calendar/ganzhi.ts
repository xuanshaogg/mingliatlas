/**
 * Gan-Zhi (天干地支) sexagenary cycle calculations
 * Used for Chinese calendar year, month, day, and hour pillars
 */

import { Solar } from 'lunar-typescript';

export interface GanZhiPillar {
  stem: string;      // 天干 (Heavenly Stem)
  branch: string;    // 地支 (Earthly Branch)
  chinese: string;   // Combined Chinese characters
}

export interface GanZhi {
  year: GanZhiPillar;
  month: GanZhiPillar;
  day: GanZhiPillar;
  hour: GanZhiPillar;
}

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/**
 * Parse gan-zhi string into stem and branch
 */
function parseGanZhi(ganZhiStr: string): GanZhiPillar {
  const stem = ganZhiStr.charAt(0);
  const branch = ganZhiStr.charAt(1);
  return {
    stem,
    branch,
    chinese: ganZhiStr,
  };
}

/**
 * Calculate complete four pillars (八字) from solar date
 * @param year Solar year
 * @param month Solar month (1-12)
 * @param day Solar day
 * @param hour Hour (0-23)
 * @returns Complete gan-zhi for year, month, day, and hour
 */
export function calculateGanZhi(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
): GanZhi {
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();

  return {
    year: parseGanZhi(lunar.getYearInGanZhi()),
    month: parseGanZhi(lunar.getMonthInGanZhi()),
    day: parseGanZhi(lunar.getDayInGanZhi()),
    hour: parseGanZhi(lunar.getTimeInGanZhi()),
  };
}

/**
 * Get the index of a heavenly stem (0-9)
 */
export function getStemIndex(stem: string): number {
  return HEAVENLY_STEMS.indexOf(stem);
}

/**
 * Get the index of an earthly branch (0-11)
 */
export function getBranchIndex(branch: string): number {
  return EARTHLY_BRANCHES.indexOf(branch);
}

/**
 * Get heavenly stem by index
 */
export function getStemByIndex(index: number): string {
  return HEAVENLY_STEMS[index % 10];
}

/**
 * Get earthly branch by index
 */
export function getBranchByIndex(index: number): string {
  return EARTHLY_BRANCHES[index % 12];
}

/**
 * Format gan-zhi as a readable string
 */
export function formatGanZhi(ganZhi: GanZhi): string {
  return `${ganZhi.year.chinese}年 ${ganZhi.month.chinese}月 ${ganZhi.day.chinese}日 ${ganZhi.hour.chinese}时`;
}
