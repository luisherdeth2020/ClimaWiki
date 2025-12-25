const API_KEY = "a0fe474adcc7851cca4f026287333a5d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
function msToKmh(ms) {
  return Math.round(ms * 3.6);
}
function unixToDate(unix) {
  return new Date(unix * 1e3);
}
function getForecastConfidence(daysAhead) {
  if (daysAhead <= 3) return "high";
  if (daysAhead <= 6) return "medium";
  return "low";
}
async function fetchCurrentWeather(lat, lon) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch current weather:", error);
    throw error;
  }
}
async function fetchForecast(lat, lon) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch forecast:", error);
    throw error;
  }
}
async function fetchCompleteWeather(location) {
  try {
    const {
      lat,
      lon
    } = location.coord;
    const [currentData, forecastData] = await Promise.all([fetchCurrentWeather(lat, lon), fetchForecast(lat, lon)]);
    const hourlyForecasts = forecastData.list.slice(0, 8).map((item) => ({
      time: unixToDate(item.dt),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      precipitation: Math.round(item.pop * 100),
      windSpeed: msToKmh(item.wind.speed)
    }));
    const dailyMap = /* @__PURE__ */ new Map();
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1e3);
      const dayKey = date.toISOString().split("T")[0];
      if (!dailyMap.has(dayKey)) {
        dailyMap.set(dayKey, []);
      }
      dailyMap.get(dayKey).push(item);
    });
    const dailyForecasts = Array.from(dailyMap.entries()).slice(0, 7).map(([dateStr, items], index) => {
      const temps = items.map((i) => i.main.temp);
      const tempMin = Math.round(Math.min(...temps));
      const tempMax = Math.round(Math.max(...temps));
      const middayItem = items.find((i) => {
        const hour = new Date(i.dt * 1e3).getHours();
        return hour >= 12 && hour <= 15;
      }) || items[0];
      const avgPop = items.reduce((sum, i) => sum + i.pop, 0) / items.length;
      return {
        date: new Date(dateStr),
        tempMin,
        tempMax,
        condition: middayItem.weather[0].main,
        icon: middayItem.weather[0].icon,
        precipitation: Math.round(avgPop * 100),
        confidence: getForecastConfidence(index)
      };
    });
    const processedData = {
      location,
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
          gust: currentData.wind.gust ? msToKmh(currentData.wind.gust) : void 0
        },
        humidity: currentData.main.humidity,
        pressure: Math.round(currentData.main.pressure),
        precipitation: forecastData.list[0]?.pop ? Math.round(forecastData.list[0].pop * 100) : 0,
        updatedAt: /* @__PURE__ */ new Date()
      },
      hourly: hourlyForecasts,
      daily: dailyForecasts
    };
    return processedData;
  } catch (error) {
    console.error("Failed to fetch complete weather data:", error);
    throw error;
  }
}
async function geocodeCity(query) {
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;
  try {
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "ClimaWiki Weather App"
      }
    });
    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }
    const data = await response.json();
    const results = data.map((item) => ({
      name: item.name || item.display_name.split(",")[0],
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      country: item.address?.country_code?.toUpperCase() || "Unknown",
      state: item.address?.state || item.address?.city || item.address?.town || ""
    }));
    return results;
  } catch (error) {
    console.error("Nominatim geocoding failed, trying OpenWeatherMap fallback:", error);
    try {
      const owmUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
      const fallbackResponse = await fetch(owmUrl);
      if (!fallbackResponse.ok) throw new Error("Fallback geocoding failed");
      const fallbackData = await fallbackResponse.json();
      return fallbackData;
    } catch (fallbackError) {
      console.error("Both geocoding services failed:", fallbackError);
      return [];
    }
  }
}
async function reverseGeocode(lat, lon) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Reverse geocoding error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Failed to reverse geocode:", error);
    throw error;
  }
}

export { fetchCompleteWeather as f, geocodeCity as g, reverseGeocode as r };
