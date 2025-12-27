/**
 * ForecastPage Island - Client-side forecast display
 * Reads lat/lon/name from URL query params
 */

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchCompleteWeather } from "../services/weather.service";
import {
  formatTemp,
  formatDayName,
  formatPrecipitation,
  getConfidenceIndicator,
} from "../utils/format";
import type { ProcessedWeatherData, Location } from "../types/weather";
import { useTranslation } from "../i18n/translations";

export default function ForecastPage() {
  const t = useTranslation();
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(
    null
  );
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
        setError(t.weather.failedToLoad);
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
          <p class="text-xl text-red-400 mb-4">
            {error || t.weather.failedToLoad}
          </p>
          <a href="/welcome" class="text-blue-400 hover:underline">
            {t.weather.goBackHome}
          </a>
        </div>
      </div>
    );
  }

  const { location, current, daily } = weatherData;

  // Split forecasts by confidence level
  const todayForecast = daily[0];
  const highConfidenceDays = daily.slice(1, 4); // Days 1-3
  const mediumConfidenceDays = daily.slice(4, 6); // Days 4-5
  const lowConfidenceDays = daily.slice(6); // Days 6-7

  return (
    <main class="min-h-screen pb-20">
      {/* Header */}
      <header class="px-4 py-6 flex items-center">
        <a
          href={`/weather?lat=${location.coord.lat}&lon=${
            location.coord.lon
          }&name=${encodeURIComponent(location.name)}`}
          class="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Back to weather"
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
        </a>
        <h1 class="flex-1 text-center text-xl font-semibold">
          {location.name}
        </h1>
        <div class="w-10"></div> {/* Spacer for centering */}
      </header>

      {/* Current Conditions Summary */}
      <section class="px-4 mb-6">
        <div class="glass rounded-3xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm text-green-400 font-medium mb-1 flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {t.forecast.updatedNow}
              </p>
              <h2 class="text-2xl font-light">{t.forecast.today}</h2>
            </div>
            <div class="text-6xl">{getWeatherEmoji(current.icon)}</div>
          </div>

          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-6xl font-light">{formatTemp(current.temp)}</span>
            <span class="text-xl text-gray-400">{current.condition}</span>
          </div>

          <div class="flex items-center gap-4 text-sm text-gray-400">
            <span>
              {t.forecast.low} / {t.forecast.high}
            </span>
            <span class="font-medium text-white">
              {formatTemp(todayForecast.tempMin)} /{" "}
              {formatTemp(todayForecast.tempMax)}
            </span>
          </div>
        </div>
      </section>

      {/* SHORT TERM Section (High Confidence) */}
      <section class="px-4 mb-6">
        <h2 class="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          {t.forecast.shortTerm}
        </h2>

        <div class="space-y-2">
          {highConfidenceDays.map((day) => (
            <div
              key={day.date.toString()}
              class="glass rounded-2xl p-4 flex items-center justify-between"
            >
              {/* Day */}
              <div class="flex-1">
                <p class="font-medium text-lg">
                  {formatDayName(day.date, new Date(), {
                    today: t.forecast.today,
                    tomorrow: t.forecast.tomorrow,
                  })}
                </p>
                <p class="text-sm text-gray-400">{day.condition}</p>
              </div>

              {/* Icon */}
              <div class="mx-4 text-4xl">{getWeatherEmoji(day.icon)}</div>

              {/* Temps & Precip */}
              <div class="text-right">
                <div class="flex items-center gap-3 mb-1">
                  <span class="text-gray-400">{formatTemp(day.tempMin)}</span>
                  <span class="text-xl font-semibold">
                    {formatTemp(day.tempMax)}
                  </span>
                </div>
                {day.precipitation > 20 && (
                  <div class="flex items-center gap-1 text-sm text-blue-400">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    <span>{formatPrecipitation(day.precipitation)}</span>
                  </div>
                )}
                {day.confidence === "high" && (
                  <div class="flex items-center gap-1 mt-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span class="text-xs text-green-400">
                      {t.forecast.confidenceHigh}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXTENDED FORECAST Section (Decreasing Confidence) */}
      <section class="px-4 mb-6">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-xs uppercase tracking-wide text-gray-400 font-semibold">
            {t.forecast.extendedForecast}
          </h2>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <svg
              class="w-4 h-4"
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
            <span>{t.forecast.orientativeForecast}</span>
          </div>
        </div>

        <div class="space-y-2">
          {[...mediumConfidenceDays, ...lowConfidenceDays].map((day) => {
            const confidence = getConfidenceIndicator(day.confidence);
            const isLowConfidence = day.confidence === "low";

            return (
              <div
                key={day.date.toString()}
                class={`glass rounded-2xl p-4 flex items-center justify-between ${
                  isLowConfidence ? "border-yellow-500/30" : ""
                }`}
              >
                {/* Day */}
                <div class="flex-1">
                  <p class="font-medium text-lg">
                    {formatDayName(day.date, new Date(), {
                      today: t.forecast.today,
                      tomorrow: t.forecast.tomorrow,
                    })}
                  </p>
                  <p class="text-sm text-gray-400">{day.condition}</p>
                </div>

                {/* Icon */}
                <div class="mx-4 text-4xl">{getWeatherEmoji(day.icon)}</div>

                {/* Temps & Confidence */}
                <div class="text-right">
                  {/* Show range for low confidence */}
                  {isLowConfidence ? (
                    <div class="mb-1">
                      <p class="text-sm text-gray-400">
                        {t.forecast.tempRange}
                      </p>
                      <p class="text-lg font-semibold">
                        {formatTemp(day.tempMin)} — {formatTemp(day.tempMax)}
                      </p>
                    </div>
                  ) : (
                    <div class="flex items-center gap-3 mb-1">
                      <span class="text-gray-400">
                        {formatTemp(day.tempMin)}
                      </span>
                      <span class="text-xl font-semibold">
                        {formatTemp(day.tempMax)}
                      </span>
                    </div>
                  )}

                  {/* Confidence Indicator */}
                  <div class="flex items-center justify-end gap-1 mt-2">
                    <div
                      class={`w-1.5 h-1.5 rounded-full ${
                        day.confidence === "medium"
                          ? "bg-yellow-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                    <span class={`text-xs ${confidence.color}`}>
                      {day.confidence === "medium"
                        ? t.forecast.confidenceMedium
                        : t.forecast.confidenceLow}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Card about Forecast Reliability */}
      <section class="px-4 mb-8">
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
              <p class="font-medium mb-1">{t.forecast.aboutAccuracy}</p>
              <p class="text-gray-400">{t.forecast.aboutAccuracyText}</p>
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
            <span class="text-xs">{t.nav.home}</span>
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
            <span class="text-xs">{t.nav.saved}</span>
          </a>

          <a
            href="/settings"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="text-xs">{t.nav.settings}</span>
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
