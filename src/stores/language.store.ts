/**
 * Language Store - Manages app language with Preact Signals
 * 
 * Features:
 * - Auto-detects browser language on first load
 * - Persists selection in localStorage
 * - Supports EN (English) and ES (Spanish)
 * - Reactive updates across all components
 */

import { signal } from "@preact/signals";

// Supported languages
export type Language = "en" | "es";

const STORAGE_KEY = "climawiki_language";
const DEFAULT_LANGUAGE: Language = "en";

/**
 * Detect browser language
 * Returns "en" or "es" based on navigator.language
 */
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const browserLang = navigator.language.toLowerCase();
  
  // Check for Spanish variants (es, es-ES, es-MX, es-AR, etc.)
  if (browserLang.startsWith("es")) {
    return "es";
  }

  // Default to English
  return "en";
}

/**
 * Get initial language from localStorage or browser detection
 */
function getInitialLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  // 1. Check localStorage first (user preference)
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") {
    return stored;
  }

  // 2. Fallback to browser language detection
  const detected = detectBrowserLanguage();
  
  // Save detected language to localStorage
  localStorage.setItem(STORAGE_KEY, detected);
  
  return detected;
}

// Create reactive language signal
export const currentLanguage = signal<Language>(getInitialLanguage());

/**
 * Change app language
 */
export function setLanguage(lang: Language) {
  currentLanguage.value = lang;
  
  // Persist to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lang);
  }
}

/**
 * Get current language (non-reactive)
 */
export function getLanguage(): Language {
  return currentLanguage.value;
}

// Log language detection (for debugging)
if (typeof window !== "undefined") {
  console.log(`🌍 Language detected: ${currentLanguage.value}`);
}
