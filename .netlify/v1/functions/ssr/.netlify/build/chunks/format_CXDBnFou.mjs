import { c as createComponent, d as createAstro, m as maybeRenderHead, f as addAttribute, r as renderTemplate } from './astro/server_CoLVhjdj.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

const $$Astro = createAstro();
const $$WeatherIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WeatherIcon;
  const { icon, size = "md", class: className = "" } = Astro2.props;
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };
  const sizeClass = sizeClasses[size];
  const iconMap = {
    "01d": "\u2600\uFE0F",
    // Clear sky day
    "01n": "\u{1F319}",
    // Clear sky night
    "02d": "\u{1F324}\uFE0F",
    // Few clouds day
    "02n": "\u2601\uFE0F",
    // Few clouds night
    "03d": "\u2601\uFE0F",
    // Scattered clouds
    "03n": "\u2601\uFE0F",
    "04d": "\u2601\uFE0F",
    // Broken clouds
    "04n": "\u2601\uFE0F",
    "09d": "\u{1F327}\uFE0F",
    // Shower rain
    "09n": "\u{1F327}\uFE0F",
    "10d": "\u{1F326}\uFE0F",
    // Rain day
    "10n": "\u{1F327}\uFE0F",
    // Rain night
    "11d": "\u26C8\uFE0F",
    // Thunderstorm
    "11n": "\u26C8\uFE0F",
    "13d": "\u2744\uFE0F",
    // Snow
    "13n": "\u2744\uFE0F",
    "50d": "\u{1F32B}\uFE0F",
    // Mist
    "50n": "\u{1F32B}\uFE0F"
  };
  const displayIcon = iconMap[icon] || "\u{1F321}\uFE0F";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([sizeClass, "flex items-center justify-center", className], "class:list")} data-astro-cid-2ule5itd> <span class="text-4xl" role="img" aria-label="Weather icon" data-astro-cid-2ule5itd> ${displayIcon} </span> </div> `;
}, "/Users/luisherdeth/Documents/ClimaWiki/src/components/WeatherIcon.astro", void 0);

function formatTemp(temp, decimals = 0) {
  return `${temp.toFixed(decimals)}°`;
}
function formatHourlyTime(date, use24Hour = false) {
  if (use24Hour) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }
  const hour = date.getHours();
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}
function getHourLabel(date, isNow = false) {
  if (isNow) return "Now";
  return formatHourlyTime(date);
}
function formatDayName(date, referenceDate = /* @__PURE__ */ new Date()) {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  const diffTime = compareDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1e3 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return date.toLocaleDateString("en-US", {
    weekday: "long"
  });
}
function formatLastUpdated(date) {
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 6e4);
  if (diffMins < 1) return "Updated just now";
  if (diffMins === 1) return "Updated 1 min ago";
  if (diffMins < 60) return `Updated ${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return "Updated 1 hour ago";
  if (diffHours < 24) return `Updated ${diffHours} hours ago`;
  return "Updated " + date.toLocaleDateString();
}
function formatPrecipitation(probability) {
  return `${Math.round(probability)}%`;
}
function getConfidenceIndicator(level) {
  const indicators = {
    high: {
      level: "high",
      label: "High Confidence",
      color: "text-green-500",
      description: "Forecast is highly reliable"
    },
    medium: {
      level: "medium",
      label: "Medium Confidence",
      color: "text-yellow-500",
      description: "Forecast accuracy may vary"
    },
    low: {
      level: "low",
      label: "Low Confidence",
      color: "text-orange-500",
      description: "Previsión orientativa"
    },
    volatile: {
      level: "volatile",
      label: "Volatile",
      color: "text-red-500",
      description: "Range widens due to pressure instability"
    }
  };
  return indicators[level];
}

export { $$WeatherIcon as $, formatDayName as a, formatPrecipitation as b, getHourLabel as c, formatLastUpdated as d, formatTemp as f, getConfidenceIndicator as g };
