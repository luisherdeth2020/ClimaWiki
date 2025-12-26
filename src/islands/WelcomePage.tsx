/**
 * Welcome Page Island
 * Landing page with i18n support
 */

import { useTranslation } from "../i18n/translations";
import AutoLocation from "./AutoLocation";
import LocationSearch from "./LocationSearch";

export default function WelcomePage() {
  const t = useTranslation();

  return (
    <main class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-2xl w-full text-center">
        {/* Logo/Title */}
        <div class="mb-12">
          <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t.welcome.title}
          </h1>
          <p class="text-xl text-gray-300">
            {t.welcome.subtitle}
          </p>
        </div>

        {/* Main Actions */}
        <div class="space-y-4 mb-12">
          {/* Auto Location Card */}
          <div class="glass rounded-3xl p-6 hover:bg-white/10 transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <AutoLocation />
              </div>
              <div class="text-left flex-1">
                <h2 class="text-xl font-semibold mb-1">{t.welcome.useMyLocation}</h2>
                <p class="text-gray-400 text-sm">
                  {t.welcome.autoDetect}
                </p>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <a href="/map" class="glass rounded-3xl p-6 hover:bg-white/10 transition-all group block">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <svg class="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div class="text-left flex-1">
                <h2 class="text-xl font-semibold mb-1">{t.map.useMap}</h2>
                <p class="text-gray-400 text-sm">
                  {t.map.useMapDesc}
                </p>
              </div>
            </div>
          </a>

          {/* OR Divider */}
          <div class="flex items-center gap-4">
            <div class="flex-1 h-px bg-white/10"></div>
            <span class="text-gray-500 text-sm uppercase tracking-wide">{t.welcome.or}</span>
            <div class="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Search Location */}
          <div>
            <h3 class="text-lg font-medium mb-4 text-gray-300">
              {t.welcome.searchForCity}
            </h3>
            <LocationSearch />
          </div>
        </div>

        {/* Popular Cities */}
        <div>
          <h3 class="text-sm uppercase tracking-wide text-gray-500 mb-4">
            {t.welcome.popularCities}
          </h3>
          <div class="grid grid-cols-3 gap-3">
            <a href="/weather?lat=40.7128&lon=-74.0060&name=New%20York" class="glass rounded-xl p-3 hover:bg-white/10 transition-colors text-sm">
              New York
            </a>
            <a href="/weather?lat=51.5074&lon=-0.1278&name=London" class="glass rounded-xl p-3 hover:bg-white/10 transition-colors text-sm">
              London
            </a>
            <a href="/weather?lat=35.6762&lon=139.6503&name=Tokyo" class="glass rounded-xl p-3 hover:bg-white/10 transition-colors text-sm">
              Tokyo
            </a>
            <a href="/weather?lat=48.8566&lon=2.3522&name=Paris" class="glass rounded-xl p-3 hover:bg-white/10 transition-colors text-sm">
              Paris
            </a>
            <a href="/weather?lat=40.4168&lon=-3.7038&name=Madrid" class="glass rounded-xl p-3 hover:bg-white/10 transition-colors text-sm">
              Madrid
            </a>
            <a href="/weather?lat=-34.6037&lon=-58.3816&name=Buenos%20Aires" class="glass rounded-xl p-3 hover:bg-white/10 transition-colors text-sm">
              Buenos Aires
            </a>
          </div>
        </div>

        {/* Info */}
        <div class="mt-12 text-sm text-gray-500">
          <p>{t.welcome.needLocation}</p>
          <p class="mt-1">{t.welcome.privacyNote}</p>
        </div>
      </div>
    </main>
  );
}
