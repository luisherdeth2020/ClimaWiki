/**
 * Settings Page Island
 * Fully interactive settings page with i18n support
 *
 * Uses Nano Stores for reactive state management:
 * - Stores automatically persist to localStorage
 * - useStore hook provides automatic reactivity
 * - Works reliably in both dev and production
 */

import { useStore } from "@nanostores/preact";
import { useTranslation } from "../i18n/translations";
import LanguageSelector from "./LanguageSelector";
import type {
  TempUnit,
  WindUnit,
  PressureUnit,
  Theme,
} from "../stores/settings.store";
import {
  temperatureUnit,
  windSpeedUnit,
  pressureUnit,
  theme,
  setTemperatureUnit,
  setWindSpeedUnit,
  setPressureUnit,
  setTheme,
} from "../stores/settings.store";

export default function SettingsPage() {
  const translations = useTranslation();

  // Subscribe to stores for reactivity
  const tempUnit = useStore(temperatureUnit);
  const windUnit = useStore(windSpeedUnit);
  const pressUnit = useStore(pressureUnit);
  const currentTheme = useStore(theme);

  return (
    <main class="min-h-screen pb-20">
      {/* Header */}
      <header class="px-4 py-6">
        <div class="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            class="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={translations.common.back}
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 class="text-xl font-semibold">{translations.settings.title}</h1>
          <div class="w-10"></div> {/* Spacer */}
        </div>
      </header>

      {/* Language Selection */}
      <section class="px-4 mt-6">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          Language / Idioma
        </h2>

        <div class="glass rounded-2xl overflow-hidden">
          <LanguageSelector />
        </div>
      </section>

      {/* Settings Sections */}
      <section class="px-4 mt-6">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          {translations.settings.units}
        </h2>

        <div class="glass rounded-2xl overflow-hidden">
          {/* Temperature Unit */}
          <div class="p-4 border-b border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{translations.settings.temperature}</p>
                <p class="text-sm text-gray-400">
                  {translations.settings.temperatureDesc}
                </p>
              </div>
              <select
                value={tempUnit}
                onChange={(e) =>
                  setTemperatureUnit(e.currentTarget.value as TempUnit)
                }
                class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="celsius">{translations.units.celsius}</option>
                <option value="fahrenheit">
                  {translations.units.fahrenheit}
                </option>
              </select>
            </div>
          </div>

          {/* Wind Speed Unit */}
          <div class="p-4 border-b border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{translations.settings.windSpeed}</p>
                <p class="text-sm text-gray-400">
                  {translations.settings.windSpeedDesc}
                </p>
              </div>
              <select
                value={windUnit}
                onChange={(e) =>
                  setWindSpeedUnit(e.currentTarget.value as WindUnit)
                }
                class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="kmh">{translations.units.kmh}</option>
                <option value="mph">{translations.units.mph}</option>
                <option value="ms">{translations.units.ms}</option>
              </select>
            </div>
          </div>

          {/* Pressure Unit */}
          <div class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{translations.settings.pressure}</p>
                <p class="text-sm text-gray-400">
                  {translations.settings.pressureDesc}
                </p>
              </div>
              <select
                value={pressUnit}
                onChange={(e) =>
                  setPressureUnit(e.currentTarget.value as PressureUnit)
                }
                class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hpa">{translations.units.hpa}</option>
                <option value="inhg">{translations.units.inhg}</option>
                <option value="mmhg">{translations.units.mmhg}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section class="px-4 mt-8">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          {translations.settings.preferences}
        </h2>

        <div class="glass rounded-2xl overflow-hidden">
          {/* Theme */}
          <div class="p-4 border-b border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{translations.settings.theme}</p>
                <p class="text-sm text-gray-400">
                  {translations.settings.themeDesc}
                </p>
              </div>
              <select
                value={currentTheme}
                onChange={(e) => setTheme(e.currentTarget.value as Theme)}
                class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">{translations.theme.dark}</option>
                <option value="light">{translations.theme.light}</option>
                <option value="auto">{translations.theme.auto}</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div class="p-4 border-b border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{translations.settings.weatherAlerts}</p>
                <p class="text-sm text-gray-400">
                  {translations.settings.weatherAlertsDesc}
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Auto-Location */}
          <div class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">
                  {translations.settings.autoLocationToggle}
                </p>
                <p class="text-sm text-gray-400">
                  {translations.settings.autoLocationDesc}
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section class="px-4 mt-8">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          {translations.settings.about}
        </h2>

        <div class="glass rounded-2xl overflow-hidden">
          <div class="p-4 flex items-center justify-between border-b border-white/10">
            <p class="font-medium">{translations.settings.version}</p>
            <span class="text-gray-400">1.0.0</span>
          </div>

          {/* <a
            href="#"
            class="p-4 flex items-center justify-between border-b border-white/10 hover:bg-white/5 transition-colors"
          >
            <p class="font-medium">{translations.settings.privacyPolicy}</p>
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a> */}

          {/* <a
            href="#"
            class="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <p class="font-medium">{translations.settings.termsOfService}</p>
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a> */}
        </div>
      </section>

      {/* Data Source */}
      <section class="px-4 mt-8 mb-8">
        <div class="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4">
          <div class="flex gap-3">
            <svg
              class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div class="text-sm text-gray-300">
              <p class="font-medium mb-1">
                {translations.settings.dataSources}
              </p>
              <p class="text-gray-400">
                {translations.settings.dataSourcesText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div class="flex items-center justify-around max-w-2xl mx-auto">
          <a
            href="/welcome"
            class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span class="text-xs">{translations.nav.home}</span>
          </a>

          <a
            href="/map"
            class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span class="text-xs">{translations.nav.map}</span>
          </a>

          <a
            href="/saved"
            class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span class="text-xs">{translations.nav.saved}</span>
          </a>

          <a
            href="/settings"
            class="flex flex-col items-center gap-1 text-blue-400"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-xs font-medium">{translations.nav.settings}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
