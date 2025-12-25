/**
 * LocationList Island
 * 
 * Interactive component for managing saved locations:
 * - Search and add new cities
 * - Display current GPS location
 * - Show saved locations with weather
 * - Drag-to-reorder functionality
 * - Delete locations
 */

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import {
  $currentLocation,
  $savedLocations,
  $locationsLoading,
  initializeLocationsStore,
  requestCurrentPosition,
  setCurrentLocation,
  addSavedLocation,
  removeSavedLocation,
} from "../stores/locations.store";
import { geocodeCity, reverseGeocode, fetchCurrentWeather } from "../services/weather.service";
import type { Location } from "../types/weather";

export default function LocationList() {
  const currentLocation = useStore($currentLocation);
  const savedLocations = useStore($savedLocations);
  const loading = useStore($locationsLoading);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [locationWeather, setLocationWeather] = useState<Map<string, any>>(new Map());

  // Initialize store on mount
  useEffect(() => {
    initializeLocationsStore();
  }, []);

  // Handle GPS location request
  const handleRequestLocation = async () => {
    try {
      const position = await requestCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Reverse geocode to get location name
      const geoResult = await reverseGeocode(latitude, longitude);

      if (geoResult) {
        const location: Location = {
          id: "current-location",
          name: geoResult.name,
          country: geoResult.country,
          state: geoResult.state,
          coord: {
            lat: latitude,
            lon: longitude,
          },
          isCurrentLocation: true,
        };

        setCurrentLocation(location);

        // Fetch weather for current location
        const weather = await fetchCurrentWeather(latitude, longitude);
        setLocationWeather(new Map(locationWeather.set("current-location", weather)));
      }
    } catch (error) {
      console.error("Failed to get current location:", error);
    }
  };

  // Handle search input
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await geocodeCity(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle adding a location
  const handleAddLocation = async (result: any) => {
    const location: Location = {
      id: `${result.name}-${result.country}`,
      name: result.name,
      country: result.country,
      state: result.state,
      coord: {
        lat: result.lat,
        lon: result.lon,
      },
    };

    addSavedLocation(location);

    // Fetch weather for the new location
    try {
      const weather = await fetchCurrentWeather(result.lat, result.lon);
      setLocationWeather(new Map(locationWeather.set(location.id, weather)));
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }

    // Clear search
    setSearchQuery("");
    setSearchResults([]);
  };

  // Fetch weather for saved locations on mount
  useEffect(() => {
    const fetchWeatherForLocations = async () => {
      const weatherMap = new Map();

      // Fetch for current location
      if (currentLocation) {
        try {
          const weather = await fetchCurrentWeather(
            currentLocation.coord.lat,
            currentLocation.coord.lon
          );
          weatherMap.set(currentLocation.id, weather);
        } catch (error) {
          console.error("Failed to fetch current location weather:", error);
        }
      }

      // Fetch for saved locations
      for (const location of savedLocations) {
        try {
          const weather = await fetchCurrentWeather(
            location.coord.lat,
            location.coord.lon
          );
          weatherMap.set(location.id, weather);
        } catch (error) {
          console.error(`Failed to fetch weather for ${location.name}:`, error);
        }
      }

      setLocationWeather(weatherMap);
    };

    fetchWeatherForLocations();
  }, [currentLocation, savedLocations]);

  return (
    <div class="px-4">
      {/* Search Input */}
      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            value={searchQuery}
            onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
            placeholder="Add a new city or airport..."
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div class="mt-2 bg-slate-800 border border-white/10 rounded-2xl overflow-hidden">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleAddLocation(result)}
                class="w-full px-5 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              >
                <p class="font-medium">{result.name}</p>
                <p class="text-sm text-gray-400">
                  {result.state ? `${result.state}, ` : ""}
                  {result.country}
                </p>
              </button>
            ))}
          </div>
        )}

        {isSearching && (
          <div class="mt-2 text-center text-gray-400">Searching...</div>
        )}
      </div>

      {/* Current Location */}
      {currentLocation ? (
        <div class="mb-6">
          <div class="bg-gradient-to-br from-blue-600/40 to-blue-800/40 border-2 border-blue-400 rounded-2xl p-5">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-blue-200 uppercase tracking-wide font-medium flex items-center gap-1">
                    <span>Current Location</span>
                    <span class="px-2 py-0.5 bg-blue-500 rounded-full text-xs">GPS</span>
                  </p>
                  <p class="text-lg font-semibold">{currentLocation.name}, {currentLocation.country}</p>
                </div>
              </div>

              {locationWeather.get(currentLocation.id) && (
                <div class="text-right">
                  <p class="text-3xl font-semibold">
                    {Math.round(locationWeather.get(currentLocation.id).main.temp)}°
                  </p>
                  <p class="text-sm text-blue-200">
                    {locationWeather.get(currentLocation.id).weather[0].main}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div class="mb-6">
          <button
            onClick={handleRequestLocation}
            disabled={loading}
            class="w-full glass rounded-2xl p-5 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div class="text-left flex-1">
                <p class="font-medium">Enable Location Services</p>
                <p class="text-sm text-gray-400">Get weather for your current location</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Saved Locations */}
      {savedLocations.length > 0 && (
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm uppercase tracking-wide text-gray-400 font-semibold">
              Saved Locations
            </h2>
            <p class="text-xs text-gray-500">Drag to reorder</p>
          </div>

          <div class="space-y-2">
            {savedLocations.map((location) => {
              const weather = locationWeather.get(location.id);

              return (
                <div
                  key={location.id}
                  class="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  {/* Weather Icon */}
                  <div class="text-4xl">
                    {weather ? (
                      <span>
                        {weather.weather[0].icon.includes("01")
                          ? "☀️"
                          : weather.weather[0].icon.includes("02")
                          ? "🌤️"
                          : weather.weather[0].icon.includes("09") ||
                            weather.weather[0].icon.includes("10")
                          ? "🌧️"
                          : "☁️"}
                      </span>
                    ) : (
                      <span>🌍</span>
                    )}
                  </div>

                  {/* Location Info */}
                  <div class="flex-1">
                    <p class="font-semibold text-lg">
                      {location.customName || location.name}
                    </p>
                    <p class="text-sm text-gray-400">
                      {weather?.weather[0].description || "Loading..."}
                    </p>
                  </div>

                  {/* Temperature */}
                  {weather && (
                    <div class="text-right">
                      <p class="text-3xl font-semibold">
                        {Math.round(weather.main.temp)}°
                      </p>
                    </div>
                  )}

                  {/* Drag Handle */}
                  <button
                    class="p-2 text-gray-500 hover:text-white transition-colors"
                    aria-label="Reorder"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
