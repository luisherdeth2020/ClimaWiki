/**
 * Weather icon utilities
 * Centralizes weather icon emoji mapping to avoid duplication
 */

/**
 * Map OpenWeatherMap icon codes to emoji
 *
 * Icon codes:
 * - 01d/01n: Clear sky
 * - 02d/02n: Few clouds
 * - 03d/03n: Scattered clouds
 * - 04d/04n: Broken clouds
 * - 09d/09n: Shower rain
 * - 10d/10n: Rain
 * - 11d/11n: Thunderstorm
 * - 13d/13n: Snow
 * - 50d/50n: Mist
 */
const ICON_MAP: Record<string, string> = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "🌤️",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧️",
  "09n": "🌧️",
  "10d": "🌦️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};

/**
 * Get weather emoji from OpenWeatherMap icon code
 * @param iconCode - OpenWeatherMap icon code (e.g., "01d", "10n")
 * @returns Weather emoji (defaults to thermometer if code not found)
 */
export function getWeatherEmoji(iconCode: string): string {
  return ICON_MAP[iconCode] || "🌡️";
}
