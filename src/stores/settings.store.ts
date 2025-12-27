/**
 * Settings Store - Manages app settings with Nano Stores
 *
 * Features:
 * - Persists settings in localStorage
 * - Reactive updates across all components
 * - Temperature, wind speed, pressure units
 * - Theme preference
 *
 * Using Nano Stores instead of Preact Signals for better Astro compatibility
 */

import { persistentAtom } from "@nanostores/persistent";

// Types
export type TempUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph" | "ms";
export type PressureUnit = "hpa" | "inhg" | "mmhg";
export type Theme = "dark" | "light" | "auto";

// Create persistent atoms (automatically sync with localStorage)
// For simple strings, we don't need JSON encode/decode
export const temperatureUnit = persistentAtom<TempUnit>(
  "climawiki_temp_unit",
  "celsius"
);

export const windSpeedUnit = persistentAtom<WindUnit>(
  "climawiki_wind_unit",
  "kmh"
);

export const pressureUnit = persistentAtom<PressureUnit>(
  "climawiki_pressure_unit",
  "hpa"
);

export const theme = persistentAtom<Theme>("climawiki_theme", "dark");

/**
 * Set temperature unit
 * With persistentAtom, we just set the value - it syncs to localStorage automatically
 */
export function setTemperatureUnit(unit: TempUnit) {
  temperatureUnit.set(unit);
}

/**
 * Set wind speed unit
 */
export function setWindSpeedUnit(unit: WindUnit) {
  windSpeedUnit.set(unit);
}

/**
 * Set pressure unit
 */
export function setPressureUnit(unit: PressureUnit) {
  pressureUnit.set(unit);
}

/**
 * Set theme
 */
export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
}

/**
 * Sync with localStorage - No longer needed with persistentAtom
 * persistentAtom automatically syncs on initialization
 */
export function syncSettingsFromStorage() {
  // No-op - persistentAtom handles this automatically
}
