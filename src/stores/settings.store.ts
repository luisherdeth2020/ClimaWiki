/**
 * Settings Store - Manages app settings with Preact Signals
 *
 * Features:
 * - Persists settings in localStorage
 * - Reactive updates across all components
 * - Temperature, wind speed, pressure units
 * - Theme preference
 */

import { signal } from "@preact/signals";

// Storage keys
const STORAGE_KEY_TEMP = "climawiki_temp_unit";
const STORAGE_KEY_WIND = "climawiki_wind_unit";
const STORAGE_KEY_PRESSURE = "climawiki_pressure_unit";
const STORAGE_KEY_THEME = "climawiki_theme";

// Types
export type TempUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph" | "ms";
export type PressureUnit = "hpa" | "inhg" | "mmhg";
export type Theme = "dark" | "light" | "auto";

/**
 * Get initial value from localStorage or return default
 */
function getInitialValue<T extends string>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  const stored = localStorage.getItem(key);
  return (stored as T) || defaultValue;
}

// Create reactive signals
export const temperatureUnit = signal<TempUnit>(
  getInitialValue(STORAGE_KEY_TEMP, "celsius")
);

export const windSpeedUnit = signal<WindUnit>(
  getInitialValue(STORAGE_KEY_WIND, "kmh")
);

export const pressureUnit = signal<PressureUnit>(
  getInitialValue(STORAGE_KEY_PRESSURE, "hpa")
);

export const theme = signal<Theme>(getInitialValue(STORAGE_KEY_THEME, "dark"));

/**
 * Set temperature unit
 */
export function setTemperatureUnit(unit: TempUnit) {
  temperatureUnit.value = unit;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_TEMP, unit);
  }
}

/**
 * Set wind speed unit
 */
export function setWindSpeedUnit(unit: WindUnit) {
  windSpeedUnit.value = unit;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_WIND, unit);
  }
}

/**
 * Set pressure unit
 */
export function setPressureUnit(unit: PressureUnit) {
  pressureUnit.value = unit;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PRESSURE, unit);
  }
}

/**
 * Set theme
 */
export function setTheme(newTheme: Theme) {
  theme.value = newTheme;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_THEME, newTheme);
  }
}

/**
 * Sync signals with localStorage (useful when component remounts)
 */
export function syncSettingsFromStorage() {
  if (typeof window === "undefined") return;

  const storedTemp = localStorage.getItem(STORAGE_KEY_TEMP);
  if (storedTemp === "celsius" || storedTemp === "fahrenheit") {
    temperatureUnit.value = storedTemp;
  }

  const storedWind = localStorage.getItem(STORAGE_KEY_WIND);
  if (storedWind === "kmh" || storedWind === "mph" || storedWind === "ms") {
    windSpeedUnit.value = storedWind;
  }

  const storedPressure = localStorage.getItem(STORAGE_KEY_PRESSURE);
  if (
    storedPressure === "hpa" ||
    storedPressure === "inhg" ||
    storedPressure === "mmhg"
  ) {
    pressureUnit.value = storedPressure;
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY_THEME);
  if (
    storedTheme === "dark" ||
    storedTheme === "light" ||
    storedTheme === "auto"
  ) {
    theme.value = storedTheme;
  }
}
