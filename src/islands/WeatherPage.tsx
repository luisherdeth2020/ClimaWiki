/**
 * WeatherPage Island - Client-side weather display
 * Reads lat/lon/name from URL query params
 */

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchCompleteWeather } from "../services/weather.service";
import { formatTemp, formatLastUpdated } from "../utils/format";
import HourlyForecast from "./HourlyForecast";
import LocationSearch from "./LocationSearch";
import AutoLocation from "./AutoLocation";
import AddToFavorites from "./AddToFavorites";
import type { ProcessedWeatherData, Location } from "../types/weather";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read URL params
    const params = new URLSearchParams(window.location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");
    const locationName = params.get("name");

    if (!lat || !lon) {
      // Redirect to welcome if no location
      window.location.href = "/welcome";
      return;
    }

    // Fetch weather data
    const location: Location = {
      id: `${lat}-${lon}`,
      name: decodeURIComponent(locationName || "Current Location"),
      coord: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
    };

    fetchCompleteWeather(location)
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch weather:", err);
        setError("Failed to load weather data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        <div class="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="text-center">
          <p class="text-xl text-red-400 mb-4">{error || "Failed to load weather"}</p>
          <a href="/welcome" class="text-blue-400 hover:underline">
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  const { location, current, hourly } = weatherData;

  return (
    <main class="min-h-screen pb-20">
      {/* Header */}
      <header class="px-4 py-6">
        <div class="flex items-center justify-between mb-4">
          <AutoLocation />
          
          <div class="flex-1 text-center">
            <div class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <h1 class="text-lg font-medium uppercase tracking-wide">{location.name}</h1>
            </div>
            <p class="text-sm text-gray-400 mt-1">{formatLastUpdated(current.updatedAt)}</p>
          </div>

          <AddToFavorites
            name={location.name}
            lat={location.coord.lat}
            lon={location.coord.lon}
            country={location.country}
          />
        </div>

        <LocationSearch />
      </header>

      {/* Weather Display */}
      <section class="px-4 py-8 text-center">
        <div class="mb-6 text-8xl">{getWeatherEmoji(current.icon)}</div>
        <div class="text-7xl font-light mb-4">{formatTemp(current.temp)}</div>
        <p class="text-2xl text-gray-300 mb-2">{current.condition}</p>
        <p class="text-lg text-gray-400">
          H: {formatTemp(current.tempMax)} &nbsp; L: {formatTemp(current.tempMin)}
        </p>
      </section>

      {/* Metrics */}
      <section class="px-4 mb-8">
        <div class="grid grid-cols-3 gap-3">
          <div class="glass rounded-2xl p-4 text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-xs text-gray-400 mb-1">Feels Like</p>
            <p class="text-2xl font-semibold">{formatTemp(current.feelsLike)}</p>
          </div>

          <div class="glass rounded-2xl p-4 text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <p class="text-xs text-gray-400 mb-1">Wind</p>
            <p class="text-2xl font-semibold">{current.wind.speed}</p>
            <p class="text-xs text-gray-400">km/h</p>
          </div>

          <div class="glass rounded-2xl p-4 text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <p class="text-xs text-gray-400 mb-1">Rain</p>
            <p class="text-2xl font-semibold">{current.precipitation}</p>
            <p class="text-xs text-gray-400">%</p>
          </div>
        </div>
      </section>

      {/* Hourly Forecast */}
      <section class="mb-8">
        <HourlyForecast 
          hourlyData={hourly}
          locationLat={location.coord.lat}
          locationLon={location.coord.lon}
          locationName={location.name}
        />
      </section>

      {/* Bottom Nav */}
      <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div class="flex items-center justify-around max-w-2xl mx-auto">
          <a href="/welcome" class="flex flex-col items-center gap-1 text-blue-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="text-xs font-medium">Home</span>
          </a>
          <a href="/saved" class="flex flex-col items-center gap-1 text-gray-400">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span class="text-xs">Saved</span>
          </a>
          <a href="/settings" class="flex flex-col items-center gap-1 text-gray-400">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-xs">Settings</span>
          </a>
        </div>
      </nav>
    </main>
  );
}

// Helper function for weather emoji
function getWeatherEmoji(icon: string): string {
  const iconMap: Record<string, string> = {
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
  return iconMap[icon] || "🌡️";
}
