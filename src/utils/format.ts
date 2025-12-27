/**
 * Formatting utilities for weather data display
 * These functions handle the presentation layer concerns
 */

import type { ForecastConfidence, ConfidenceIndicator } from "../types/weather";

// ============================================
// TEMPERATURE FORMATTING
// ============================================

/**
 * Format temperature with degree symbol
 */
export function formatTemp(temp: number, decimals: number = 0): string {
  return `${temp.toFixed(decimals)}°`;
}

/**
 * Format temperature range
 */
export function formatTempRange(min: number, max: number): string {
  return `${Math.round(min)}° - ${Math.round(max)}°`;
}

// ============================================
// WIND FORMATTING
// ============================================

/**
 * Convert wind direction degrees to cardinal direction
 */
export function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
}

/**
 * Format wind speed with units
 */
export function formatWindSpeed(kmh: number): string {
  return `${Math.round(kmh)} km/h`;
}

/**
 * Format wind information (speed + direction)
 */
export function formatWind(speed: number, direction: number): string {
  return `${getWindDirection(direction)} ${formatWindSpeed(speed)}`;
}

// ============================================
// TIME FORMATTING
// ============================================

/**
 * Format time for hourly forecast (e.g., "2 PM", "14:00")
 */
export function formatHourlyTime(
  date: Date,
  use24Hour: boolean = false
): string {
  if (use24Hour) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const hour = date.getHours();
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

/**
 * Get simple hour label (e.g., "Now", "2 PM", "3 PM")
 */
export function getHourLabel(date: Date, isNow: boolean = false): string {
  if (isNow) return "Now";
  return formatHourlyTime(date);
}

/**
 * Format day name (e.g., "Today", "Tomorrow", "Monday")
 * @param date - The date to format
 * @param referenceDate - Reference date (defaults to today)
 * @param translations - Optional translations object with `today` and `tomorrow` keys
 */
export function formatDayName(
  date: Date,
  referenceDate: Date = new Date(),
  translations?: { today: string; tomorrow: string }
): string {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = compareDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return translations?.today || "Today";
  if (diffDays === 1) return translations?.tomorrow || "Tomorrow";

  // Use the locale from translations if available, otherwise default to en-US
  const locale = translations
    ? translations.today === "Hoy"
      ? "es-ES"
      : "en-US"
    : "en-US";
  const dayName = date.toLocaleDateString(locale, { weekday: "long" });
  // Capitalize first letter
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

/**
 * Format short day name (e.g., "Today", "Tue", "Wed")
 */
export function formatShortDay(
  date: Date,
  referenceDate: Date = new Date()
): string {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = compareDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tom";

  return date.toLocaleDateString("en-US", { weekday: "short" });
}

/**
 * Format last updated time (e.g., "Updated just now", "Updated 5 min ago")
 */
export function formatLastUpdated(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Updated just now";
  if (diffMins === 1) return "Updated 1 min ago";
  if (diffMins < 60) return `Updated ${diffMins} min ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return "Updated 1 hour ago";
  if (diffHours < 24) return `Updated ${diffHours} hours ago`;

  return "Updated " + date.toLocaleDateString();
}

// ============================================
// PRECIPITATION FORMATTING
// ============================================

/**
 * Format precipitation probability
 */
export function formatPrecipitation(probability: number): string {
  return `${Math.round(probability)}%`;
}

/**
 * Get precipitation risk level
 */
export function getPrecipitationRisk(
  probability: number
): "low" | "medium" | "high" {
  if (probability < 30) return "low";
  if (probability < 70) return "medium";
  return "high";
}

// ============================================
// CONFIDENCE INDICATORS
// ============================================

/**
 * Get confidence indicator with UI metadata
 */
export function getConfidenceIndicator(
  level: ForecastConfidence
): ConfidenceIndicator {
  const indicators: Record<ForecastConfidence, ConfidenceIndicator> = {
    high: {
      level: "high",
      label: "High Confidence",
      color: "text-green-500",
      description: "Forecast is highly reliable",
    },
    medium: {
      level: "medium",
      label: "Medium Confidence",
      color: "text-yellow-500",
      description: "Forecast accuracy may vary",
    },
    low: {
      level: "low",
      label: "Low Confidence",
      color: "text-orange-500",
      description: "Previsión orientativa",
    },
    volatile: {
      level: "volatile",
      label: "Volatile",
      color: "text-red-500",
      description: "Range widens due to pressure instability",
    },
  };

  return indicators[level];
}

/**
 * Get simplified confidence label for UI
 */
export function getConfidenceLabel(level: ForecastConfidence): string {
  if (level === "high") return "";
  if (level === "medium") return "Medium Confidence";
  return "Previsión orientativa";
}

// ============================================
// HUMIDITY FORMATTING
// ============================================

/**
 * Format humidity percentage
 */
export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`;
}

// ============================================
// CONDITION TEXT HELPERS
// ============================================

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
