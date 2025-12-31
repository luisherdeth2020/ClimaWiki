/**
 * OpenWeatherMap API Service
 *
 * This service handles all interactions with the OpenWeatherMap API.
 * It provides type-safe methods to fetch weather data and includes
 * error handling and data transformation.
 */

import type {
  CurrentWeatherResponse,
  ForecastResponse,
  ProcessedWeatherData,
  Location,
  ForecastConfidence,
} from "../types/weather";

// Load API key from environment variable
// In production (Cloudflare/Netlify), this comes from environment variables
// Prefix 'PUBLIC_' makes it available in both client and server code
const API_KEY = import.meta.env.PUBLIC_OPENWEATHER_API_KEY;

if (!API_KEY && typeof window !== "undefined") {
  // Only warn in browser (runtime), not during build time
  console.warn(
    "Missing OpenWeatherMap API key. Please set PUBLIC_OPENWEATHER_API_KEY in your environment variables"
  );
}

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert m/s to km/h
 */
function msToKmh(ms: number): number {
  return Math.round(ms * 3.6);
}

/**
 * Convert Unix timestamp to Date
 */
function unixToDate(unix: number): Date {
  return new Date(unix * 1000);
}

/**
 * Determine forecast confidence based on days ahead
 * Research shows confidence decreases significantly after 3 days
 */
function getForecastConfidence(daysAhead: number): ForecastConfidence {
  if (daysAhead <= 3) return "high";
  if (daysAhead <= 6) return "medium";
  return "low";
}

/**
 * Transform weather data into hourly forecast format
 * Centralizes the mapping logic to avoid duplication
 *
 * @param time - The timestamp for this forecast slot
 * @param temp - Temperature in Celsius
 * @param icon - OpenWeatherMap icon code
 * @param precipitation - Precipitation probability (0-1 or 0-100)
 * @param windSpeedMs - Wind speed in m/s
 * @param humidity - Humidity percentage
 */
function mapToHourlyFormat(
  time: Date,
  temp: number,
  icon: string,
  precipitation: number,
  windSpeedMs: number,
  humidity: number
) {
  return {
    time,
    temp: Math.round(temp),
    icon,
    precipitation: Math.round(
      precipitation >= 1 ? precipitation : precipitation * 100
    ),
    windSpeed: msToKmh(windSpeedMs),
    humidity: Math.round(humidity),
  };
}

// ============================================
// API FETCH FUNCTIONS
// ============================================

/**
 * Fetch current weather by coordinates
 */
export async function fetchCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeatherResponse> {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Weather API error: ${response.status} ${response.statusText}`
      );
    }

    const data: CurrentWeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch current weather:", error);
    throw error;
  }
}

/**
 * Fetch 5-day forecast (3-hour intervals)
 */
export async function fetchForecast(
  lat: number,
  lon: number
): Promise<ForecastResponse> {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Forecast API error: ${response.status} ${response.statusText}`
      );
    }

    const data: ForecastResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch forecast:", error);
    throw error;
  }
}

// ============================================
// COMBINED FETCH (FREE TIER COMPATIBLE)
// ============================================

/**
 * Fetch and process complete weather data using free API endpoints
 * This combines Current Weather + 5-day Forecast to create a complete picture
 */
export async function fetchCompleteWeather(
  location: Location
): Promise<ProcessedWeatherData> {
  try {
    const { lat, lon } = location.coord;

    // Fetch both current and forecast in parallel
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(lat, lon),
      fetchForecast(lat, lon),
    ]);

    /**
     * Build hourly forecast array for next 24 hours
     *
     * OpenWeatherMap free tier provides forecast in 3-hour intervals.
     * To show current conditions as "Now", we combine:
     * - Current weather (actual conditions right now)
     * - Next 7 forecast slots (3h intervals = 21h coverage)
     *
     * Result: 8 time slots covering ~24 hours starting from now
     */
    const hourlyForecasts = [
      // Current conditions as first slot ("Now")
      mapToHourlyFormat(
        new Date(),
        currentData.main.temp,
        currentData.weather[0].icon,
        forecastData.list[0]?.pop || 0,
        currentData.wind.speed,
        currentData.main.humidity
      ),
      // Future forecast slots (3h intervals)
      ...forecastData.list
        .slice(0, 7)
        .map((item) =>
          mapToHourlyFormat(
            unixToDate(item.dt),
            item.main.temp,
            item.weather[0].icon,
            item.pop,
            item.wind.speed,
            item.main.humidity
          )
        ),
    ];

    // Group forecast by day for daily forecast
    const dailyMap = new Map<string, typeof forecastData.list>();
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().split("T")[0];

      if (!dailyMap.has(dayKey)) {
        dailyMap.set(dayKey, []);
      }
      dailyMap.get(dayKey)!.push(item);
    });

    // Process daily forecasts (limit to 7 days)
    const dailyForecasts = Array.from(dailyMap.entries())
      .slice(0, 7)
      .map(([dateStr, items], index) => {
        const temps = items.map((i) => i.main.temp);
        const tempMin = Math.round(Math.min(...temps));
        const tempMax = Math.round(Math.max(...temps));

        // Use midday forecast for condition (around 12:00)
        const middayItem =
          items.find((i) => {
            const hour = new Date(i.dt * 1000).getHours();
            return hour >= 12 && hour <= 15;
          }) || items[0];

        const avgPop = items.reduce((sum, i) => sum + i.pop, 0) / items.length;
        const avgHumidity = items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length;

        return {
          date: new Date(dateStr),
          tempMin,
          tempMax,
          condition: middayItem.weather[0].main,
          icon: middayItem.weather[0].icon,
          precipitation: Math.round(avgPop * 100),
          humidity: Math.round(avgHumidity),
          confidence: getForecastConfidence(index),
        };
      });

    // Extract rainfall data from FORECAST (next 3h) instead of historical
    // This gives more useful data: "how much rain is expected" vs "how much it rained"
    const nextForecast = forecastData.list[0];
    const rainfall =
      nextForecast?.rain?.["3h"] ||
      currentData.rain?.["3h"] ||
      currentData.rain?.["1h"] ||
      0;

    // Determine rain type from current weather OR next forecast if current is clear
    const hasCurrentRain =
      currentData.weather[0].main === "Rain" ||
      currentData.weather[0].main === "Drizzle" ||
      currentData.weather[0].main === "Thunderstorm";
    const rainType = hasCurrentRain
      ? currentData.weather[0].description
      : nextForecast?.weather[0]?.description || "none";

    // Build processed data
    const processedData: ProcessedWeatherData = {
      location: {
        ...location,
        name: currentData.name || location.name, // Use real city name from API
        country: currentData.sys.country,
      },
      current: {
        temp: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        tempMin: Math.round(currentData.main.temp_min),
        tempMax: Math.round(currentData.main.temp_max),
        wind: {
          speed: msToKmh(currentData.wind.speed),
          direction: currentData.wind.deg,
          gust: currentData.wind.gust
            ? msToKmh(currentData.wind.gust)
            : undefined,
        },
        humidity: currentData.main.humidity,
        pressure: Math.round(currentData.main.pressure),
        precipitation: forecastData.list[0]?.pop
          ? Math.round(forecastData.list[0].pop * 100)
          : 0,
        rainfall: Math.round(rainfall * 10) / 10, // Round to 1 decimal place
        rainType: rainType,
        snowfall: currentData.snow?.["3h"] || currentData.snow?.["1h"] || 0,
        updatedAt: new Date(),
      },
      hourly: hourlyForecasts,
      daily: dailyForecasts,
    };

    return processedData;
  } catch (error) {
    console.error("Failed to fetch complete weather data:", error);
    throw error;
  }
}

// ============================================
// GEOCODING (City name to coordinates)
// ============================================

export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

/**
 * Convert city/address to coordinates using Nominatim (OpenStreetMap)
 * Supports full addresses, streets, cities, etc.
 * Example: "Calle Palma, Madrid" or just "Madrid"
 */
export async function geocodeCity(query: string): Promise<GeocodingResult[]> {
  // Use Nominatim for better address/street support
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=5&addressdetails=1`;

  try {
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "ClimaWiki Weather App",
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Nominatim results to our format
    const results: GeocodingResult[] = data.map((item: any) => ({
      name: item.name || item.display_name.split(",")[0],
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      country: item.address?.country_code?.toUpperCase() || "Unknown",
      state:
        item.address?.state || item.address?.city || item.address?.town || "",
    }));

    return results;
  } catch (error) {
    console.error(
      "Nominatim geocoding failed, trying OpenWeatherMap fallback:",
      error
    );

    // Fallback to OpenWeatherMap (only cities, not streets)
    try {
      const owmUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        query
      )}&limit=5&appid=${API_KEY}`;

      const fallbackResponse = await fetch(owmUrl);
      if (!fallbackResponse.ok) throw new Error("Fallback geocoding failed");

      const fallbackData: GeocodingResult[] = await fallbackResponse.json();
      return fallbackData;
    } catch (fallbackError) {
      console.error("Both geocoding services failed:", fallbackError);
      return [];
    }
  }
}

/**
 * Reverse geocode coordinates to location name using Nominatim
 */
export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<GeocodingResult | null> {
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

  try {
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "ClimaWiki Weather App",
      },
    });

    if (!response.ok) {
      throw new Error(`Reverse geocoding error: ${response.status}`);
    }

    const data: any = await response.json();

    // Extract city/town name
    const cityName =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      data.name ||
      "My Location";

    return {
      name: cityName,
      lat: parseFloat(data.lat),
      lon: parseFloat(data.lon),
      country: data.address?.country_code?.toUpperCase() || "",
      state: data.address?.state || "",
    };
  } catch (error) {
    console.error("Failed to reverse geocode:", error);
    throw error;
  }
}
