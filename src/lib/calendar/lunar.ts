/**
 * Lunar calendar conversion module
 * Uses lunar-typescript for accurate solar-to-lunar conversion
 */

import { Solar } from 'lunar-typescript';

export interface SolarDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
}

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  yearInGanZhi: string;
  monthInGanZhi: string;
  dayInGanZhi: string;
}

/**
 * Convert solar (Gregorian) date to lunar date
 * @param date Solar date with year, month, day, hour
 * @returns Lunar date with gan-zhi information
 */
export function solarToLunar(date: SolarDate): LunarDate {
  const solar = Solar.fromYmdHms(date.year, date.month, date.day, date.hour, date.minute ?? 0, 0);
  const lunar = solar.getLunar();
  const month = lunar.getMonth();

  return {
    year: lunar.getYear(),
    month: Math.abs(month), // Negative month indicates leap month
    day: lunar.getDay(),
    isLeapMonth: month < 0, // negative month indicates leap month
    yearInGanZhi: lunar.getYearInGanZhi(),
    monthInGanZhi: lunar.getMonthInGanZhi(),
    dayInGanZhi: lunar.getDayInGanZhi(),
  };
}

/**
 * Get lunar month name in Chinese
 */
export function getLunarMonthName(month: number, isLeap: boolean): string {
  const monthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  const absMonth = Math.abs(month);
  const prefix = isLeap ? '闰' : '';
  return prefix + monthNames[absMonth - 1] + '月';
}

/**
 * Get lunar day name in Chinese
 */
export function getLunarDayName(day: number): string {
  const dayNames = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
  ];
  return dayNames[day - 1] || '';
}
