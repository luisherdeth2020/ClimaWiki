/**
 * Types for OpenWeatherMap API responses
 * Docs: https://openweathermap.org/api
 */

// ============================================
// CORE WEATHER DATA
// ============================================

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string; // "Clear", "Clouds", "Rain", etc.
  description: string;
  icon: string; // "01d", "02n", etc.
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number; // hPa
  humidity: number; // %
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number; // m/s
  deg: number; // degrees
  gust?: number;
}

export interface Clouds {
  all: number; // cloudiness %
}

export interface Rain {
  "1h"?: number; // mm
  "3h"?: number; // mm
}

export interface Snow {
  "1h"?: number; // mm
  "3h"?: number; // mm
}

export interface Sys {
  type?: number;
  id?: number;
  country?: string;
  sunrise: number; // unix timestamp
  sunset: number; // unix timestamp
}

// ============================================
// CURRENT WEATHER RESPONSE
// ============================================

export interface CurrentWeatherResponse {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number; // meters
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number; // unix timestamp
  sys: Sys;
  timezone: number; // shift in seconds from UTC
  id: number; // city ID
  name: string; // city name
  cod: number; // internal parameter
}

// ============================================
// FORECAST RESPONSE (5 day / 3 hour)
// ============================================

export interface ForecastItem {
  dt: number; // unix timestamp
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of Precipitation (0-1)
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: "d" | "n"; // part of day (day/night)
  };
  dt_txt: string; // "2024-12-25 18:00:00"
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number; // number of forecast items
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// ============================================
// ONE CALL API (Current + Hourly + Daily)
// ============================================

export interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  pop: number; // Probability of Precipitation
  rain?: { "1h": number };
  snow?: { "1h": number };
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    rain?: { "1h": number };
    snow?: { "1h": number };
  };
  minutely?: Array<{
    dt: number;
    precipitation: number;
  }>;
  hourly?: HourlyForecast[];
  daily?: DailyForecast[];
  alerts?: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }>;
}

// ============================================
// APPLICATION TYPES (Processed Data)
// ============================================

export interface Location {
  id: string;
  name: string;
  country?: string;
  state?: string;
  coord: Coordinates;
  isCurrentLocation?: boolean;
  customName?: string; // For "Mom's House" type labels
}

export interface ProcessedWeatherData {
  location: Location;
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    description: string;
    icon: string;
    tempMin: number;
    tempMax: number;
    wind: {
      speed: number; // converted to km/h or mph
      direction: number;
      gust?: number;
    };
    humidity: number;
    pressure: number; // hPa
    precipitation: number; // probability %
    updatedAt: Date;
  };
  hourly: Array<{
    time: Date;
    temp: number;
    icon: string;
    precipitation: number;
    windSpeed: number;
  }>;
  daily: Array<{
    date: Date;
    tempMin: number;
    tempMax: number;
    condition: string;
    icon: string;
    precipitation: number;
    confidence: "high" | "medium" | "low"; // Based on forecast day
  }>;
}

// ============================================
// CONFIDENCE LEVELS FOR UI
// ============================================

export type ForecastConfidence = "high" | "medium" | "low" | "volatile";

export interface ConfidenceIndicator {
  level: ForecastConfidence;
  label: string;
  color: string; // Tailwind color class
  description: string;
}
