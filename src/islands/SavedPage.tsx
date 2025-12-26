/**
 * Saved Locations Page Island
 * Fully interactive with i18n support
 */

import { useTranslation } from "../i18n/translations";
import LocationSearch from "./LocationSearch";
import AutoLocation from "./AutoLocation";
import FavoritesList from "./FavoritesList";

export default function SavedPage() {
  const t = useTranslation();

  return (
    <main class="min-h-screen pb-20">
      {/* Header */}
      <header class="px-4 py-6">
        <div class="flex items-center justify-between mb-6">
          <a
            href="/welcome"
            class="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={t.common.back}
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </a>

          <h1 class="text-xl font-semibold">
            {t.savedPage.title}
          </h1>

          <div class="w-10"></div> {/* Spacer */}
        </div>

        {/* Search Bar */}
        <LocationSearch />
      </header>

      {/* Quick Actions */}
      <section class="px-4 mt-6">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          {t.savedPage.quickAccess}
        </h2>

        {/* Use Current Location */}
        <div class="glass rounded-2xl p-5 hover:bg-white/10 transition-colors">
          <div class="flex items-center gap-4">
            <AutoLocation />
            <div class="flex-1">
              <p class="font-semibold">{t.savedPage.useCurrentLocation}</p>
              <p class="text-sm text-gray-400">{t.savedPage.useCurrentLocationDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section class="px-4 mt-8">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          {t.savedPage.popularCities}
        </h2>

        <div class="grid grid-cols-2 gap-3">
          <a href="/weather?lat=40.7128&lon=-74.0060&name=New%20York" class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <p class="font-semibold">New York</p>
            <p class="text-sm text-gray-400">USA</p>
          </a>

          <a href="/weather?lat=51.5074&lon=-0.1278&name=London" class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <p class="font-semibold">London</p>
            <p class="text-sm text-gray-400">UK</p>
          </a>

          <a href="/weather?lat=35.6762&lon=139.6503&name=Tokyo" class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <p class="font-semibold">Tokyo</p>
            <p class="text-sm text-gray-400">Japan</p>
          </a>

          <a href="/weather?lat=48.8566&lon=2.3522&name=Paris" class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <p class="font-semibold">Paris</p>
            <p class="text-sm text-gray-400">France</p>
          </a>

          <a href="/weather?lat=-33.8688&lon=151.2093&name=Sydney" class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <p class="font-semibold">Sydney</p>
            <p class="text-sm text-gray-400">Australia</p>
          </a>

          <a href="/weather?lat=40.4168&lon=-3.7038&name=Madrid" class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <p class="font-semibold">Madrid</p>
            <p class="text-sm text-gray-400">Spain</p>
          </a>
        </div>

        {/* Saved Favorites */}
        <FavoritesList />
      </section>

      {/* Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div class="flex items-center justify-around max-w-2xl mx-auto">
          <a href="/welcome" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-xs">{t.nav.home}</span>
          </a>

          <a href="/saved" class="flex flex-col items-center gap-1 text-blue-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span class="text-xs font-medium">{t.nav.saved}</span>
          </a>

          <a href="/settings" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-xs">{t.nav.settings}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
