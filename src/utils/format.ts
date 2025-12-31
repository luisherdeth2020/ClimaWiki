/**
 * Formatting utilities for weather data display
 * These functions handle the presentation layer concerns
 */

import { temperatureUnit } from "../stores/settings.store";

// ============================================
// TEMPERATURE FORMATTING
// ============================================

/**
 * Convert Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Format temperature with degree symbol and unit (°C or °F)
 * Automatically converts based on user settings
 * 
 * NOTE: This function is not reactive. Use TempDisplay component for reactive updates.
 */
export function formatTemp(temp: number, decimals: number = 0): string {
  const unit = temperatureUnit.get();
  
  if (unit === "fahrenheit") {
    const fahrenheit = celsiusToFahrenheit(temp);
    return `${fahrenheit.toFixed(decimals)}°F`;
  }
  
  return `${temp.toFixed(decimals)}°C`;
}

// ============================================
// WIND FORMATTING
// ============================================

/**
 * Format wind speed with units
 */
export function formatWindSpeed(kmh: number): string {
  return `${Math.round(kmh)} km/h`;
}

// ============================================
// TIME FORMATTING
// ============================================

/**
 * Format time for hourly forecast in 24-hour format (e.g., "14:00", "09:00")
 */
export function formatHourlyTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
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

