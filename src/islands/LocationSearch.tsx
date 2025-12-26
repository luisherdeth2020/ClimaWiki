/**
 * LocationSearch Island
 * 
 * Search bar with autocomplete for finding cities/addresses
 * Integrates with OpenWeatherMap Geocoding API
 * Uses debounce to optimize API calls
 */

import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { geocodeCity } from "../services/weather.service";
import type { GeocodingResult } from "../services/weather.service";
import { useTranslation } from "../i18n/translations";

interface Props {
  onLocationSelect?: (location: GeocodingResult) => void;
}

export default function LocationSearch({ onLocationSelect }: Props) {
  const t = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimer = useRef<number | null>(null);

  // Debounced search effect
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If query is too short, clear results
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setIsSearching(false);
      return;
    }

    // Show loading state immediately
    setIsSearching(true);

    // Set new timer for 400ms
    debounceTimer.current = window.setTimeout(async () => {
      try {
        const searchResults = await geocodeCity(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    // Cleanup on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleSelect = (result: GeocodingResult) => {
    // Redirect to weather page with coordinates
    const url = `/?lat=${result.lat}&lon=${result.lon}&name=${encodeURIComponent(result.name)}`;
    
    // Force full page reload to ensure server-side rendering
    window.location.replace(url);
  };

  return (
    <div class="relative">
      {/* Search Input */}
      <div class="relative">
        <input
          type="text"
          value={query}
          onInput={(e) => handleInputChange((e.target as HTMLInputElement).value)}
          onFocus={() => setIsOpen(results.length > 0)}
          placeholder={t.search.placeholder}
          class="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
        />
        <svg
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Loading spinner */}
        {isSearching && (
          <div class="absolute right-4 top-1/2 -translate-y-1/2">
            <div class="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div class="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => {
            const url = `/weather?lat=${result.lat}&lon=${result.lon}&name=${encodeURIComponent(result.name)}`;
            return (
              <a
                key={index}
                href={url}
                class="w-full px-5 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group block"
              >
                <div class="flex-1">
                  <p class="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {result.name}
                  </p>
                  <p class="text-sm text-gray-400">
                    {result.state ? `${result.state}, ` : ""}
                    {result.country}
                  </p>
                </div>
                <svg
                  class="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors"
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
              </a>
            );
          })}
        </div>
      )}

      {/* No results message */}
      {isOpen && !isSearching && query.length >= 2 && results.length === 0 && (
        <div class="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-2xl p-5 text-center text-gray-400">
          <p>{t.search.noResults} "{query}"</p>
          <p class="text-sm mt-1">{t.search.tryDifferent}</p>
        </div>
      )}
    </div>
  );
}
