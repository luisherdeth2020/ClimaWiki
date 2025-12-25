/**
 * HourlyForecast Island (Interactive Component)
 * 
 * This is a Preact island that handles the horizontal scrollable
 * hourly forecast. Uses client-side interactivity for:
 * - Smooth horizontal scroll
 * - Touch/swipe gestures on mobile
 * - Highlighting current hour
 */

import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import type { ProcessedWeatherData } from "../types/weather";
import { getHourLabel, formatTemp, formatPrecipitation, formatWindSpeed } from "../utils/format";

interface Props {
  hourlyData: ProcessedWeatherData["hourly"];
  locationLat?: number;
  locationLon?: number;
  locationName?: string;
}

export default function HourlyForecast({ hourlyData, locationLat, locationLon, locationName }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Map icon codes to emoji (matching WeatherIcon component)
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

  const getIcon = (code: string) => iconMap[code] || "🌡️";

  // Build forecast URL with location params
  const forecastUrl = locationLat && locationLon 
    ? `/forecast?lat=${locationLat}&lon=${locationLon}&name=${encodeURIComponent(locationName || '')}`
    : '/forecast';

  return (
    <div class="w-full">
      {/* Header */}
      <div class="flex items-center justify-between mb-4 px-4">
        <div class="flex items-center gap-2">
          <svg
            class="w-5 h-5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 class="text-lg font-medium">Next 24 Hours</h2>
        </div>
        <a
          href={forecastUrl}
          class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          See Full Forecast
        </a>
      </div>

      {/* Scrollable hourly cards */}
      <div
        ref={scrollContainerRef}
        class="flex gap-3 overflow-x-auto scroll-smooth-x hide-scrollbar px-4 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {hourlyData.map((hour, index) => {
          const isNow = index === 0;
          const hourLabel = getHourLabel(hour.time, isNow);

          return (
            <div
              key={index}
              class={`
                flex-none w-24 rounded-2xl p-4 text-center
                transition-all duration-300
                ${
                  isNow
                    ? "bg-blue-600/40 border-2 border-blue-400"
                    : "bg-white/5 border border-white/10"
                }
              `}
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Time */}
              <div
                class={`text-xs font-medium mb-3 ${
                  isNow ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {hourLabel}
              </div>

              {/* Weather Icon */}
              <div class="text-3xl mb-2" role="img" aria-label="Weather icon">
                {getIcon(hour.icon)}
              </div>

              {/* Temperature */}
              <div class="text-xl font-semibold mb-3">
                {formatTemp(hour.temp)}
              </div>

              {/* Precipitation % with icon */}
              <div class="flex items-center justify-center gap-1 text-xs text-blue-300 mb-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 12 16" fill="currentColor">
                  <path d="M6 0C6 0 2 4.5 2 8c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3.5-4-8-4-8zm0 10.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.5 1.3-3.5 2.5-5.3 1.2 1.8 2.5 3.8 2.5 5.3 0 1.4-1.1 2.5-2.5 2.5z"/>
                </svg>
                <span>{formatPrecipitation(hour.precipitation)}</span>
              </div>

              {/* Wind speed with icon */}
              <div class="flex items-center justify-center gap-1 text-xs text-cyan-300">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{Math.round(hour.windSpeed)} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
