/**
 * Favorites List Component
 * Displays saved locations with current weather
 */

import { useState, useEffect } from 'preact/hooks';
import type { FavoriteLocation } from '../services/favorites.service';
import { getFavorites, removeFavorite } from '../services/favorites.service';
import { fetchCurrentWeather } from '../services/weather.service';

interface FavoriteWithWeather extends FavoriteLocation {
  temp?: number;
  weatherIcon?: string;
  description?: string;
  loading?: boolean;
  error?: boolean;
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteWithWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    setLoading(true);
    const stored = getFavorites();
    
    // Set favorites first (without weather data)
    setFavorites(stored.map(f => ({ ...f, loading: true })));
    setLoading(false);

    // Load weather data for each favorite
    const withWeather = await Promise.all(
      stored.map(async (fav) => {
        try {
          const weather = await fetchCurrentWeather(fav.lat, fav.lon);
          return {
            ...fav,
            temp: weather.temp,
            weatherIcon: getWeatherIcon(weather.weather[0]?.main),
            description: weather.weather[0]?.description,
            loading: false,
            error: false,
          };
        } catch (error) {
          console.error(`Error loading weather for ${fav.name}:`, error);
          return {
            ...fav,
            loading: false,
            error: true,
          };
        }
      })
    );

    setFavorites(withWeather);
  }

  function handleRemove(id: string) {
    if (confirm('Remove this location from favorites?')) {
      removeFavorite(id);
      setFavorites(prev => prev.filter(f => f.id !== id));
    }
  }

  function getWeatherIcon(condition: string = ''): string {
    const icons: Record<string, string> = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '🌫️',
      Haze: '🌫️',
      Dust: '🌫️',
      Fog: '🌫️',
      Sand: '🌫️',
      Ash: '🌫️',
      Squall: '💨',
      Tornado: '🌪️',
    };
    return icons[condition] || '🌡️';
  }

  if (loading) {
    return (
      <div class="px-4 mt-8">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          Saved Locations
        </h2>
        <div class="glass rounded-2xl p-6 text-center">
          <div class="animate-pulse">Loading favorites...</div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div class="px-4 mt-8">
        <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
          Saved Locations
        </h2>
        <div class="glass rounded-2xl p-6 text-center">
          <p class="text-gray-400 mb-2">No saved locations yet</p>
          <p class="text-sm text-gray-500">
            Search for a city and save it to see weather updates here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div class="px-4 mt-8">
      <h2 class="text-sm uppercase tracking-wide text-gray-400 mb-3 font-semibold">
        Saved Locations ({favorites.length})
      </h2>

      <div class="space-y-3">
        {favorites.map((fav) => (
          <a
            key={fav.id}
            href={`/weather?lat=${fav.lat}&lon=${fav.lon}&name=${encodeURIComponent(fav.name)}`}
            class="glass rounded-2xl p-4 hover:bg-white/10 transition-colors flex items-center justify-between group"
          >
            <div class="flex items-center gap-4 flex-1">
              {/* Weather Icon */}
              <div class="text-4xl">
                {fav.loading ? '⏳' : fav.error ? '❌' : fav.weatherIcon}
              </div>

              {/* Location Info */}
              <div class="flex-1">
                <p class="font-semibold">{fav.name}</p>
                {fav.country && (
                  <p class="text-sm text-gray-400">{fav.country}</p>
                )}
                {fav.loading ? (
                  <p class="text-sm text-gray-500 animate-pulse">Loading weather...</p>
                ) : fav.error ? (
                  <p class="text-sm text-red-400">Failed to load</p>
                ) : (
                  <p class="text-sm text-gray-400 capitalize">{fav.description}</p>
                )}
              </div>

              {/* Temperature */}
              {!fav.loading && !fav.error && fav.temp !== undefined && (
                <div class="text-right">
                  <p class="text-2xl font-bold">{Math.round(fav.temp)}°</p>
                </div>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(fav.id);
              }}
              class="ml-3 p-2 rounded-full hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Remove from favorites"
            >
              <svg class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}
