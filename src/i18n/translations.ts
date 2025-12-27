/**
 * i18n Translations
 * Complete translation dictionary for EN and ES
 */

import type { Language } from "../stores/language.store";

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    cancel: string;
    save: string;
    delete: string;
    confirm: string;
    back: string;
    home: string;
    settings: string;
    saved: string;
  };

  // Navigation
  nav: {
    home: string;
    map: string;
    saved: string;
    settings: string;
  };

  // Weather Page
  weather: {
    feelsLike: string;
    wind: string;
    rain: string;
    snow: string;
    humidity: string;
    pressure: string;
    visibility: string;
    updatedNow: string;
    lastUpdated: string;
    goBackHome: string;
    failedToLoad: string;
    no: string; // For "No" snow/rain
    probability: string; // For "probability" %
  };

  // Forecast Page
  forecast: {
    title: string;
    today: string;
    tomorrow: string;
    shortTerm: string;
    extendedForecast: string;
    seeFullForecast: string;
    next24Hours: string;
    updatedNow: string;
    low: string;
    high: string;
    tempRange: string;
    aboutAccuracy: string;
    aboutAccuracyText: string;
    confidenceHigh: string;
    confidenceMedium: string;
    confidenceLow: string;
    orientativeForecast: string;
  };

  // Location Search
  search: {
    placeholder: string;
    searchCity: string;
    noResults: string;
    tryDifferent: string;
  };

  // Auto Location
  autoLocation: {
    useMyLocation: string;
    detecting: string;
    permissionDenied: string;
    locationUnavailable: string;
    timeout: string;
    failed: string;
    autoDetect: string;
  };

  // Favorites
  favorites: {
    savedLocations: string;
    noSaved: string;
    noSavedDescription: string;
    removeConfirm: string;
    saveLocation: string;
    saved: string;
    saving: string;
    loadingWeather: string;
    failedToLoad: string;
    loadingFavorites: string;
  };

  // Welcome Page
  welcome: {
    title: string;
    subtitle: string;
    useMyLocation: string;
    autoDetect: string;
    or: string;
    searchForCity: string;
    popularCities: string;
    needLocation: string;
    privacyNote: string;
  };

  // Settings Page
  settings: {
    title: string;
    units: string;
    temperature: string;
    temperatureDesc: string;
    windSpeed: string;
    windSpeedDesc: string;
    pressure: string;
    pressureDesc: string;
    preferences: string;
    theme: string;
    themeDesc: string;
    weatherAlerts: string;
    weatherAlertsDesc: string;
    autoLocationToggle: string;
    autoLocationDesc: string;
    about: string;
    version: string;
    privacyPolicy: string;
    termsOfService: string;
    dataSources: string;
    dataSourcesText: string;
    language: string;
    languageDesc: string;
  };

  // Saved Locations Page
  savedPage: {
    title: string;
    quickAccess: string;
    useCurrentLocation: string;
    useCurrentLocationDesc: string;
    popularCities: string;
  };

  // Map Page
  map: {
    title: string;
    clickToSelect: string;
    manualCoords: string;
    latitude: string;
    longitude: string;
    showPreview: string;
    goToWeather: string;
    invalidCoords: string;
    loading: string;
    zoomIn: string;
    zoomOut: string;
    currentTemp: string;
    precipitation: string;
    wind: string;
    myLocation: string;
    centeringMap: string;
    useMap: string;
    useMapDesc: string;
  };

  // Units
  units: {
    celsius: string;
    fahrenheit: string;
    kmh: string;
    mph: string;
    ms: string;
    hpa: string;
    inhg: string;
    mmhg: string;
    mm: string; // millimeters
    percent: string;
  };

  // Theme
  theme: {
    dark: string;
    light: string;
    auto: string;
  };

  // Languages
  languages: {
    english: string;
    spanish: string;
  };

  // Weather Conditions (for consistency)
  conditions: {
    clear: string;
    clouds: string;
    rain: string;
    snow: string;
    thunderstorm: string;
    drizzle: string;
    mist: string;
    fog: string;
  };

  // Rain type descriptions from OpenWeatherMap API
  rainDescriptions: {
    [key: string]: string; // Flexible mapping for all rain descriptions
  };

  // Time-related
  time: {
    now: string;
    today: string;
    tomorrow: string;
    yesterday: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
  };
}

// English Translations
const en: Translations = {
  common: {
    loading: "Loading...",
    error: "Error",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    confirm: "Confirm",
    back: "Back",
    home: "Home",
    settings: "Settings",
    saved: "Saved",
  },

  nav: {
    home: "Home",
    map: "Map",
    saved: "Saved",
    settings: "Settings",
  },

  weather: {
    feelsLike: "Feels Like",
    wind: "Wind",
    rain: "Rain",
    snow: "Snow",
    humidity: "Humidity",
    pressure: "Pressure",
    visibility: "Visibility",
    updatedNow: "Updated now",
    lastUpdated: "Last updated",
    goBackHome: "Go back to home",
    failedToLoad: "Failed to load weather data",
    no: "No",
    probability: "chance",
  },

  forecast: {
    tomorrow: "Tomorrow",
    title: "Forecast",
    today: "Today",
    shortTerm: "Short Term",
    extendedForecast: "Extended Forecast",
    seeFullForecast: "See Full Forecast",
    next24Hours: "Next 24 Hours",
    updatedNow: "Updated now",
    low: "L",
    high: "H",
    tempRange: "Temp Range",
    aboutAccuracy: "About Forecast Accuracy",
    aboutAccuracyText:
      "Weather forecasts become less precise over time. Confidence decreases significantly beyond 3 days. Extended forecasts show temperature ranges to reflect this uncertainty.",
    confidenceHigh: "High",
    confidenceMedium: "Medium",
    confidenceLow: "Low",
    orientativeForecast: "Indicative forecast",
  },

  search: {
    placeholder: "Search city or address...",
    searchCity: "Search for a City",
    noResults: "No locations found for",
    tryDifferent: "Try a different city or address",
  },

  autoLocation: {
    useMyLocation: "Use My Location",
    detecting: "Detecting location...",
    permissionDenied: "Location permission denied",
    locationUnavailable: "Location unavailable",
    timeout: "Location request timed out",
    failed: "Failed to detect location",
    autoDetect: "Automatically detect where you are",
  },

  favorites: {
    savedLocations: "Saved Locations",
    noSaved: "No saved locations yet",
    noSavedDescription:
      "Search for a city and save it to see weather updates here",
    removeConfirm: "Remove this location from favorites?",
    saveLocation: "Save Location",
    saved: "Saved",
    saving: "Saving...",
    loadingWeather: "Loading weather...",
    failedToLoad: "Failed to load",
    loadingFavorites: "Loading favorites...",
  },

  welcome: {
    title: "ClimaWiki",
    subtitle: "Weather Forecast You Can Trust",
    useMyLocation: "Use My Location",
    autoDetect: "Automatically detect where you are",
    or: "Or",
    searchForCity: "Search for a City",
    popularCities: "Popular Cities",
    needLocation: "We need your location to show accurate weather forecasts.",
    privacyNote: "Your location data is never stored or shared.",
  },

  settings: {
    title: "Settings",
    units: "Units",
    temperature: "Temperature",
    temperatureDesc: "Display temperature in",
    windSpeed: "Wind Speed",
    windSpeedDesc: "Display wind speed in",
    pressure: "Pressure",
    pressureDesc: "Display pressure in",
    preferences: "Preferences",
    theme: "Theme",
    themeDesc: "App appearance",
    weatherAlerts: "Weather Alerts",
    weatherAlertsDesc: "Receive severe weather notifications",
    autoLocationToggle: "Auto-Location",
    autoLocationDesc: "Automatically detect your location",
    about: "About",
    version: "Version",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    dataSources: "Data Sources",
    dataSourcesText:
      "Weather data provided by OpenWeatherMap. Geocoding by Nominatim & OpenStreetMap.",
    language: "Language",
    languageDesc: "App language",
  },

  savedPage: {
    title: "Find Location",
    quickAccess: "Quick Access",
    useCurrentLocation: "Use My Current Location",
    useCurrentLocationDesc: "Automatically detect where you are",
    popularCities: "Popular Cities",
  },

  map: {
    title: "Weather Map",
    clickToSelect: "Click on the map to select a location",
    manualCoords: "Or enter coordinates manually",
    latitude: "Latitude",
    longitude: "Longitude",
    showPreview: "Show Preview",
    goToWeather: "View Weather",
    invalidCoords: "Invalid coordinates",
    loading: "Loading weather data...",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    currentTemp: "Current",
    precipitation: "Precipitation",
    wind: "Wind",
    myLocation: "My Location",
    centeringMap: "Centering map...",
    useMap: "Use Map",
    useMapDesc: "Select location on interactive map",
  },

  units: {
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kmh: "km/h",
    mph: "mph",
    ms: "m/s",
    hpa: "hPa",
    inhg: "inHg",
    mmhg: "mmHg",
    mm: "mm",
    percent: "%",
  },

  theme: {
    dark: "Dark",
    light: "Light",
    auto: "Auto",
  },

  languages: {
    english: "English",
    spanish: "Spanish",
  },

  conditions: {
    clear: "Clear",
    clouds: "Clouds",
    rain: "Rain",
    snow: "Snow",
    thunderstorm: "Thunderstorm",
    drizzle: "Drizzle",
    mist: "Mist",
    fog: "Fog",
  },

  rainDescriptions: {
    "light rain": "Light Rain",
    "moderate rain": "Moderate Rain",
    "heavy intensity rain": "Heavy Rain",
    "very heavy rain": "Very Heavy Rain",
    "extreme rain": "Extreme Rain",
    "freezing rain": "Freezing Rain",
    "light intensity shower rain": "Light Showers",
    "shower rain": "Showers",
    "heavy intensity shower rain": "Heavy Showers",
    "ragged shower rain": "Scattered Showers",
    "light intensity drizzle": "Light Drizzle",
    drizzle: "Drizzle",
    "heavy intensity drizzle": "Heavy Drizzle",
    "light intensity drizzle rain": "Light Drizzle",
    "drizzle rain": "Drizzle",
    "heavy intensity drizzle rain": "Heavy Drizzle",
    "shower rain and drizzle": "Showers & Drizzle",
    "heavy shower rain and drizzle": "Heavy Showers & Drizzle",
    "shower drizzle": "Shower Drizzle",
    "thunderstorm with light rain": "Light Thunderstorm",
    "thunderstorm with rain": "Thunderstorm",
    "thunderstorm with heavy rain": "Heavy Thunderstorm",
    "light thunderstorm": "Light Thunderstorm",
    thunderstorm: "Thunderstorm",
    "heavy thunderstorm": "Heavy Thunderstorm",
    "ragged thunderstorm": "Scattered Thunderstorms",
    "thunderstorm with light drizzle": "Thunderstorm & Drizzle",
    "thunderstorm with drizzle": "Thunderstorm & Drizzle",
    "thunderstorm with heavy drizzle": "Heavy Thunderstorm & Drizzle",
  },

  time: {
    now: "Now",
    today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday",
    justNow: "Just now",
    minutesAgo: "min ago",
    hoursAgo: "h ago",
  },
};

// Spanish Translations
const es: Translations = {
  common: {
    loading: "Cargando...",
    error: "Error",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    confirm: "Confirmar",
    back: "Volver",
    home: "Inicio",
    settings: "Ajustes",
    saved: "Guardado",
  },

  nav: {
    home: "Inicio",
    map: "Mapa",
    saved: "Guardados",
    settings: "Ajustes",
  },

  weather: {
    feelsLike: "Sensación",
    wind: "Viento",
    rain: "Lluvia",
    snow: "Nieve",
    humidity: "Humedad",
    pressure: "Presión",
    visibility: "Visibilidad",
    updatedNow: "Actualizado ahora",
    lastUpdated: "Última actualización",
    goBackHome: "Volver al inicio",
    failedToLoad: "Error al cargar datos del clima",
    no: "No",
    probability: "probabilidad",
  },

  forecast: {
    title: "Pronóstico",
    today: "Hoy",
    tomorrow: "Mañana",
    shortTerm: "Corto Plazo",
    extendedForecast: "Pronóstico Extendido",
    seeFullForecast: "Ver Pronóstico Completo",
    next24Hours: "Próximas 24 Horas",
    updatedNow: "Actualizado ahora",
    low: "M",
    high: "M",
    tempRange: "Rango Temp",
    aboutAccuracy: "Sobre la Precisión del Pronóstico",
    aboutAccuracyText:
      "Los pronósticos del tiempo se vuelven menos precisos con el tiempo. La confianza disminuye significativamente después de 3 días. Los pronósticos extendidos muestran rangos de temperatura para reflejar esta incertidumbre.",
    confidenceHigh: "Alta",
    confidenceMedium: "Media",
    confidenceLow: "Baja",
    orientativeForecast: "Pronóstico orientativo",
  },

  search: {
    placeholder: "Buscar ciudad o dirección...",
    searchCity: "Buscar una Ciudad",
    noResults: "No se encontraron ubicaciones para",
    tryDifferent: "Prueba con otra ciudad o dirección",
  },

  autoLocation: {
    useMyLocation: "Usar Mi Ubicación",
    detecting: "Detectando ubicación...",
    permissionDenied: "Permiso de ubicación denegado",
    locationUnavailable: "Ubicación no disponible",
    timeout: "Tiempo de espera agotado",
    failed: "Error al detectar ubicación",
    autoDetect: "Detectar automáticamente dónde estás",
  },

  favorites: {
    savedLocations: "Ubicaciones Guardadas",
    noSaved: "No hay ubicaciones guardadas",
    noSavedDescription:
      "Busca una ciudad y guárdala para ver actualizaciones del clima aquí",
    removeConfirm: "¿Eliminar esta ubicación de favoritos?",
    saveLocation: "Guardar Ubicación",
    saved: "Guardado",
    saving: "Guardando...",
    loadingWeather: "Cargando clima...",
    failedToLoad: "Error al cargar",
    loadingFavorites: "Cargando favoritos...",
  },

  welcome: {
    title: "ClimaWiki",
    subtitle: "Pronóstico del Tiempo en el que Puedes Confiar",
    useMyLocation: "Usar Mi Ubicación",
    autoDetect: "Detectar automáticamente dónde estás",
    or: "O",
    searchForCity: "Buscar una Ciudad",
    popularCities: "Ciudades Populares",
    needLocation: "Necesitamos tu ubicación para mostrar pronósticos precisos.",
    privacyNote: "Tus datos de ubicación nunca se almacenan ni se comparten.",
  },

  settings: {
    title: "Ajustes",
    units: "Unidades",
    temperature: "Temperatura",
    temperatureDesc: "Mostrar temperatura en",
    windSpeed: "Velocidad del Viento",
    windSpeedDesc: "Mostrar velocidad del viento en",
    pressure: "Presión",
    pressureDesc: "Mostrar presión en",
    preferences: "Preferencias",
    theme: "Tema",
    themeDesc: "Apariencia de la app",
    weatherAlerts: "Alertas Meteorológicas",
    weatherAlertsDesc: "Recibir notificaciones de clima severo",
    autoLocationToggle: "Ubicación Automática",
    autoLocationDesc: "Detectar automáticamente tu ubicación",
    about: "Acerca de",
    version: "Versión",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    dataSources: "Fuentes de Datos",
    dataSourcesText:
      "Datos del clima proporcionados por OpenWeatherMap. Geocodificación por Nominatim y OpenStreetMap.",
    language: "Idioma",
    languageDesc: "Idioma de la aplicación",
  },

  savedPage: {
    title: "Buscar Ubicación",
    quickAccess: "Acceso Rápido",
    useCurrentLocation: "Usar Mi Ubicación Actual",
    useCurrentLocationDesc: "Detectar automáticamente dónde estás",
    popularCities: "Ciudades Populares",
  },

  map: {
    title: "Mapa del Clima",
    clickToSelect: "Haz clic en el mapa para seleccionar una ubicación",
    manualCoords: "O ingresa las coordenadas manualmente",
    latitude: "Latitud",
    longitude: "Longitud",
    showPreview: "Mostrar Vista Previa",
    goToWeather: "Ver Clima",
    invalidCoords: "Coordenadas inválidas",
    loading: "Cargando datos del clima...",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    currentTemp: "Actual",
    precipitation: "Precipitación",
    wind: "Viento",
    myLocation: "Mi Ubicación",
    centeringMap: "Centrando mapa...",
    useMap: "Usar Mapa",
    useMapDesc: "Seleccionar ubicación en mapa interactivo",
  },

  units: {
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kmh: "km/h",
    mph: "mph",
    ms: "m/s",
    hpa: "hPa",
    inhg: "inHg",
    mmhg: "mmHg",
    mm: "mm",
    percent: "%",
  },

  theme: {
    dark: "Oscuro",
    light: "Claro",
    auto: "Auto",
  },

  languages: {
    english: "Inglés",
    spanish: "Español",
  },

  conditions: {
    clear: "Despejado",
    clouds: "Nubes",
    rain: "Lluvia",
    snow: "Nieve",
    thunderstorm: "Tormenta",
    drizzle: "Llovizna",
    mist: "Neblina",
    fog: "Niebla",
  },

  rainDescriptions: {
    "light rain": "Lluvia Ligera",
    "moderate rain": "Lluvia Moderada",
    "heavy intensity rain": "Lluvia Fuerte",
    "very heavy rain": "Lluvia Muy Fuerte",
    "extreme rain": "Lluvia Extrema",
    "freezing rain": "Lluvia Helada",
    "light intensity shower rain": "Chubascos Ligeros",
    "shower rain": "Chubascos",
    "heavy intensity shower rain": "Chubascos Fuertes",
    "ragged shower rain": "Chubascos Dispersos",
    "light intensity drizzle": "Llovizna Ligera",
    drizzle: "Llovizna",
    "heavy intensity drizzle": "Llovizna Fuerte",
    "light intensity drizzle rain": "Llovizna Ligera",
    "drizzle rain": "Llovizna",
    "heavy intensity drizzle rain": "Llovizna Fuerte",
    "shower rain and drizzle": "Chubascos y Llovizna",
    "heavy shower rain and drizzle": "Chubascos Fuertes y Llovizna",
    "shower drizzle": "Llovizna Intermitente",
    "thunderstorm with light rain": "Tormenta con Lluvia Ligera",
    "thunderstorm with rain": "Tormenta con Lluvia",
    "thunderstorm with heavy rain": "Tormenta con Lluvia Fuerte",
    "light thunderstorm": "Tormenta Ligera",
    thunderstorm: "Tormenta",
    "heavy thunderstorm": "Tormenta Fuerte",
    "ragged thunderstorm": "Tormentas Dispersas",
    "thunderstorm with light drizzle": "Tormenta con Llovizna",
    "thunderstorm with drizzle": "Tormenta con Llovizna",
    "thunderstorm with heavy drizzle": "Tormenta con Llovizna Fuerte",
  },

  time: {
    now: "Ahora",
    today: "Hoy",
    tomorrow: "Mañana",
    yesterday: "Ayer",
    justNow: "Justo ahora",
    minutesAgo: "min atrás",
    hoursAgo: "h atrás",
  },
};

// Translation dictionary
const translations: Record<Language, Translations> = {
  en,
  es,
};

/**
 * Get translations for a specific language
 */
export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

/**
 * Get a specific translation key
 */
export function t(lang: Language, key: string): string {
  const trans = translations[lang];
  const keys = key.split(".");

  let value: any = trans;
  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

/**
 * Custom hook for using translations in Preact components
 * Automatically subscribes to language changes
 */
import { useComputed } from "@preact/signals";
import { currentLanguage } from "../stores/language.store";

export function useTranslation() {
  // This computed value will auto-update when currentLanguage changes
  const t = useComputed(() => {
    return getTranslations(currentLanguage.value);
  });

  return t.value;
}

/**
 * Translate rain description from OpenWeatherMap API
 * Falls back to original description if no translation exists
 */
export function translateRainDescription(
  description: string,
  lang: Language
): string {
  const translations = getTranslations(lang);
  const translated = translations.rainDescriptions[description.toLowerCase()];

  // Return translation if exists, otherwise capitalize original
  return (
    translated || description.charAt(0).toUpperCase() + description.slice(1)
  );
}

/**
 * Translate weather condition from OpenWeatherMap API
 */
export function translateCondition(condition: string, lang: Language): string {
  const translations = getTranslations(lang);
  const conditionMap: Record<string, string> = {
    Clear: translations.conditions.clear,
    Clouds: translations.conditions.clouds,
    Rain: translations.conditions.rain,
    Snow: translations.conditions.snow,
    Thunderstorm: translations.conditions.thunderstorm,
    Drizzle: translations.conditions.drizzle,
    Mist: translations.conditions.mist,
    Fog: translations.conditions.fog,
  };

  return conditionMap[condition] || condition;
}
