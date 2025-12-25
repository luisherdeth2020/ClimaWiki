/**
 * Mock Weather Data
 * 
 * Used for development and testing when API is not available
 */

import type { ProcessedWeatherData, Location } from "../types/weather";

export function getMockWeatherData(location: Location): ProcessedWeatherData {
  const now = new Date();
  
  return {
    location,
    current: {
      temp: 22,
      feelsLike: 20,
      condition: "Partly Cloudy",
      description: "partly cloudy",
      icon: "02d",
      tempMin: 18,
      tempMax: 26,
      wind: {
        speed: 12,
        direction: 180,
        gust: 18,
      },
      humidity: 65,
      precipitation: 15,
      updatedAt: now,
    },
    hourly: Array.from({ length: 8 }, (_, i) => {
      const time = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
      return {
        time,
        temp: 22 - i * 0.5,
        icon: i < 2 ? "02d" : i < 5 ? "03d" : "10d",
        precipitation: i < 2 ? 10 : i < 5 ? 30 : 70,
        windSpeed: 10 + i * 2,
      };
    }),
    daily: Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
      
      let confidence: "high" | "medium" | "low";
      if (i < 3) confidence = "high";
      else if (i < 6) confidence = "medium";
      else confidence = "low";
      
      return {
        date,
        tempMin: 14 + i,
        tempMax: 24 + i,
        condition: i % 3 === 0 ? "Clear Sky" : i % 3 === 1 ? "Cloudy" : "Rain",
        icon: i % 3 === 0 ? "01d" : i % 3 === 1 ? "04d" : "10d",
        precipitation: i % 3 === 2 ? 80 : 20,
        confidence,
      };
    }),
  };
}
