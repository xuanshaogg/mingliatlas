/**
 * Swiss Ephemeris adapter for planetary calculations
 *
 * NOTE: This is a typed adapter that does NOT provide actual Swiss Ephemeris calculations.
 * The swisseph npm package requires native bindings (node-gyp) which may not work reliably
 * in Next.js/Vercel environments.
 *
 * For production use, implement one of these approaches:
 * 1. Deploy Swiss Ephemeris as a separate API service (Python/FastAPI)
 * 2. Use WASM-compiled Swiss Ephemeris (requires custom build)
 * 3. Use an external ephemeris API service
 *
 * This adapter provides type definitions and clear error messages for now.
 */

export interface PlanetPosition {
  longitude: number;  // Ecliptic longitude in degrees (0-360)
  latitude: number;   // Ecliptic latitude in degrees
  distance: number;   // Distance from Earth in AU
  speed: number;      // Daily motion in degrees
}

export interface HousePosition {
  house: number;      // House number (1-12)
  cusp: number;       // House cusp in degrees (0-360)
}

export interface EphemerisData {
  sun: PlanetPosition;
  moon: PlanetPosition;
  planets: {
    mercury: PlanetPosition;
    venus: PlanetPosition;
    mars: PlanetPosition;
    jupiter: PlanetPosition;
    saturn: PlanetPosition;
    uranus: PlanetPosition;
    neptune: PlanetPosition;
    pluto: PlanetPosition;
  };
  ascendant: number;      // Ascendant degree (0-360)
  midheaven: number;      // Midheaven/MC degree (0-360)
  houses: HousePosition[]; // 12 houses
}

export interface GeographicCoordinates {
  latitude: number;   // Latitude in decimal degrees (-90 to 90)
  longitude: number;  // Longitude in decimal degrees (-180 to 180)
  altitude?: number;  // Altitude in meters (optional)
}

export class EphemerisNotAvailableError extends Error {
  constructor(message: string = 'Swiss Ephemeris is not available in this environment') {
    super(message);
    this.name = 'EphemerisNotAvailableError';
  }
}

/**
 * Calculate planetary positions for a given date and location
 *
 * @throws {EphemerisNotAvailableError} Always throws - Swiss Ephemeris not implemented
 */
export function calculateEphemeris(
  _date: Date,
  _coordinates: GeographicCoordinates
): EphemerisData {
  throw new EphemerisNotAvailableError(
    'Swiss Ephemeris calculation is not yet implemented. ' +
    'This requires either: (1) a separate API service, (2) WASM compilation, or (3) external API integration. ' +
    'See src/lib/calendar/ephemeris.ts for implementation options.'
  );
}

/**
 * Calculate approximate sun longitude using simplified formula
 * Accuracy: ~1 degree (sufficient for solar term verification)
 *
 * This is NOT Swiss Ephemeris precision and should only be used for:
 * - Development/testing
 * - Approximate solar term calculations
 * - Non-critical applications
 */
export function calculateApproximateSunLongitude(date: Date): number {
  // Julian Day Number calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() + date.getHours() / 24 + date.getMinutes() / 1440;

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y +
              Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Days since J2000.0
  const n = jdn - 2451545.0;

  // Mean longitude of the Sun
  const L = (280.460 + 0.9856474 * n) % 360;

  // Mean anomaly of the Sun
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;

  // Ecliptic longitude
  const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) % 360;

  return lambda < 0 ? lambda + 360 : lambda;
}

/**
 * Check if Swiss Ephemeris is available
 * @returns false - not implemented in this environment
 */
export function isEphemerisAvailable(): boolean {
  return false;
}

/**
 * Get implementation status and recommendations
 */
export function getEphemerisStatus(): {
  available: boolean;
  message: string;
  recommendations: string[];
} {
  return {
    available: false,
    message: 'Swiss Ephemeris is not implemented. Approximate calculations available for development only.',
    recommendations: [
      'Deploy Swiss Ephemeris as a Python/FastAPI service on a separate server',
      'Use WASM-compiled Swiss Ephemeris (requires custom build pipeline)',
      'Integrate with external ephemeris API (e.g., astro-api.com)',
      'For solar terms only: use approximate sun longitude (±1° accuracy)',
    ],
  };
}
