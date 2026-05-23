/**
 * Chinese Calendar Integration Module
 *
 * Provides comprehensive Chinese calendar calculations including:
 * - Solar to Lunar conversion
 * - Gan-Zhi (天干地支) sexagenary cycle
 * - 24 Solar Terms (节气)
 * - Swiss Ephemeris adapter (typed interface)
 */

export {
  solarToLunar,
  getLunarMonthName,
  getLunarDayName,
  type SolarDate,
  type LunarDate,
} from './lunar';

export {
  calculateGanZhi,
  getStemIndex,
  getBranchIndex,
  getStemByIndex,
  getBranchByIndex,
  formatGanZhi,
  type GanZhi,
  type GanZhiPillar,
} from './ganzhi';

export {
  getSolarTermsForYear,
  getCurrentSolarTerm,
  getNextSolarTerm,
  isSolarTermDay,
  type SolarTerm,
} from './solar-terms';

export {
  calculateEphemeris,
  calculateApproximateSunLongitude,
  isEphemerisAvailable,
  getEphemerisStatus,
  EphemerisNotAvailableError,
  type EphemerisData,
  type PlanetPosition,
  type HousePosition,
  type GeographicCoordinates,
} from './ephemeris';
