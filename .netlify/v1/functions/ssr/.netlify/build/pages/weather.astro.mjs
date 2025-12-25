import { c as createComponent, d as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CoLVhjdj.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BlIK-sSH.mjs';
import { c as getHourLabel, f as formatTemp, b as formatPrecipitation, d as formatLastUpdated, $ as $$WeatherIcon } from '../chunks/format_CXDBnFou.mjs';
import 'preact';
import { useRef, useState } from 'preact/hooks';
import { jsxs, jsx } from 'preact/jsx-runtime';
import { A as AutoLocation, L as LocationSearch } from '../chunks/AutoLocation_NHYnkwXG.mjs';
import { f as fetchCompleteWeather } from '../chunks/weather.service_COgYmghG.mjs';
export { renderers } from '../renderers.mjs';

function HourlyForecast({
  hourlyData,
  locationLat,
  locationLon,
  locationName
}) {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const iconMap = {
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
    "50n": "🌫️"
  };
  const getIcon = (code) => iconMap[code] || "🌡️";
  const forecastUrl = locationLat && locationLon ? `/forecast?lat=${locationLat}&lon=${locationLon}&name=${encodeURIComponent(locationName || "")}` : "/forecast";
  return jsxs("div", {
    class: "w-full",
    children: [jsxs("div", {
      class: "flex items-center justify-between mb-4 px-4",
      children: [jsxs("div", {
        class: "flex items-center gap-2",
        children: [jsx("svg", {
          class: "w-5 h-5 text-blue-400",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: jsx("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          })
        }), jsx("h2", {
          class: "text-lg font-medium",
          children: "Next 24 Hours"
        })]
      }), jsx("a", {
        href: forecastUrl,
        class: "text-sm text-blue-400 hover:text-blue-300 transition-colors",
        children: "See Full Forecast"
      })]
    }), jsx("div", {
      ref: scrollContainerRef,
      class: "flex gap-3 overflow-x-auto scroll-smooth-x hide-scrollbar px-4 pb-4",
      style: {
        scrollSnapType: "x mandatory"
      },
      children: hourlyData.map((hour, index) => {
        const isNow = index === 0;
        const hourLabel = getHourLabel(hour.time, isNow);
        return jsxs("div", {
          class: `
                flex-none w-24 rounded-2xl p-4 text-center
                transition-all duration-300
                ${isNow ? "bg-blue-600/40 border-2 border-blue-400" : "bg-white/5 border border-white/10"}
              `,
          style: {
            scrollSnapAlign: "start"
          },
          children: [jsx("div", {
            class: `text-xs font-medium mb-3 ${isNow ? "text-blue-200" : "text-gray-400"}`,
            children: hourLabel
          }), jsx("div", {
            class: "text-3xl mb-2",
            role: "img",
            "aria-label": "Weather icon",
            children: getIcon(hour.icon)
          }), jsx("div", {
            class: "text-xl font-semibold mb-3",
            children: formatTemp(hour.temp)
          }), jsxs("div", {
            class: "flex items-center justify-center gap-1 text-xs text-blue-300 mb-2",
            children: [jsx("svg", {
              class: "w-3.5 h-3.5",
              viewBox: "0 0 12 16",
              fill: "currentColor",
              children: jsx("path", {
                d: "M6 0C6 0 2 4.5 2 8c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3.5-4-8-4-8zm0 10.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.5 1.3-3.5 2.5-5.3 1.2 1.8 2.5 3.8 2.5 5.3 0 1.4-1.1 2.5-2.5 2.5z"
              })
            }), jsx("span", {
              children: formatPrecipitation(hour.precipitation)
            })]
          }), jsxs("div", {
            class: "flex items-center justify-center gap-1 text-xs text-cyan-300",
            children: [jsx("svg", {
              class: "w-3.5 h-3.5",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              children: jsx("path", {
                d: "M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            }), jsxs("span", {
              children: [Math.round(hour.windSpeed), " km/h"]
            })]
          })]
        }, index);
      })
    })]
  });
}

const $$Astro = createAstro();
const $$Weather = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Weather;
  const url = new URL(Astro2.request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const locationName = url.searchParams.get("name");
  if (!lat || !lon) {
    return Astro2.redirect("/");
  }
  const currentLocation = {
    id: `${lat}-${lon}`,
    name: decodeURIComponent(locationName || "Current Location"),
    coord: {
      lat: parseFloat(lat),
      lon: parseFloat(lon)
    }
  };
  let weatherData;
  try {
    weatherData = await fetchCompleteWeather(currentLocation);
  } catch (e) {
    console.error("Failed to fetch weather:", e);
    return Astro2.redirect("/");
  }
  const { location, current, hourly } = weatherData;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Weather in ${location.name} - ClimaWiki` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pb-20">  <header class="px-4 py-6"> <div class="flex items-center justify-between mb-4">  ${renderComponent($$result2, "AutoLocation", AutoLocation, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/luisherdeth/Documents/ClimaWiki/src/islands/AutoLocation", "client:component-export": "default" })}  <div class="flex-1 text-center"> <div class="flex items-center justify-center gap-2"> <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path> </svg> <h1 class="text-lg font-medium uppercase tracking-wide"> ${location.name} </h1> </div> <p class="text-sm text-gray-400 mt-1"> ${formatLastUpdated(current.updatedAt)} </p> </div>  <a href="/saved" class="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Saved locations"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> </a> </div>  ${renderComponent($$result2, "LocationSearch", LocationSearch, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/luisherdeth/Documents/ClimaWiki/src/islands/LocationSearch", "client:component-export": "default" })} </header>  <section class="px-4 py-8 text-center">  <div class="mb-6 flex justify-center"> ${renderComponent($$result2, "WeatherIcon", $$WeatherIcon, { "icon": current.icon, "size": "xl" })} </div>  <div class="temp-display mb-4"> ${formatTemp(current.temp)} </div>  <p class="text-2xl text-gray-300 mb-2"> ${current.condition} </p>  <p class="text-lg text-gray-400">
H: ${formatTemp(current.tempMax)} &nbsp; L: ${formatTemp(current.tempMin)} </p> </section>  <section class="px-4 mb-8"> <div class="grid grid-cols-3 gap-3">  <div class="glass rounded-2xl p-4 text-center"> <svg class="w-8 h-8 mx-auto mb-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path> </svg> <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Feels Like</p> <p class="text-2xl font-semibold">${formatTemp(current.feelsLike)}</p> </div>  <div class="glass rounded-2xl p-4 text-center"> <svg class="w-8 h-8 mx-auto mb-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> </svg> <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Wind</p> <p class="text-2xl font-semibold">${current.wind.speed}</p> <p class="text-xs text-gray-400">km/h</p> </div>  <div class="glass rounded-2xl p-4 text-center"> <svg class="w-8 h-8 mx-auto mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path> </svg> <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Rain</p> <p class="text-2xl font-semibold">${current.precipitation}</p> <p class="text-xs text-gray-400">%</p> </div> </div> </section>  <section class="mb-8"> ${renderComponent($$result2, "HourlyForecast", HourlyForecast, { "hourlyData": hourly, "locationLat": currentLocation.coord.lat, "locationLon": currentLocation.coord.lon, "locationName": currentLocation.name, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/luisherdeth/Documents/ClimaWiki/src/islands/HourlyForecast", "client:component-export": "default" })} </section>  <section class="px-4 mb-8 grid grid-cols-2 gap-3">  <div class="glass rounded-2xl p-4"> <div class="flex items-center gap-2 mb-2"> <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path> </svg> <p class="text-xs text-gray-400 uppercase tracking-wide">Humidity</p> </div> <p class="text-2xl font-semibold">${current.humidity}%</p> </div>  <div class="glass rounded-2xl p-4"> <div class="flex items-center gap-2 mb-2"> <svg class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path> </svg> <p class="text-xs text-gray-400 uppercase tracking-wide">Pressure</p> </div> <p class="text-2xl font-semibold">${current.pressure}</p> <p class="text-xs text-gray-400">hPa</p> </div> </section>  <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-3"> <div class="flex items-center justify-around max-w-2xl mx-auto"> <a href="/welcome" class="flex flex-col items-center gap-1 text-blue-400"> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"> <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path> </svg> <span class="text-xs font-medium">Home</span> </a> <a href="/map" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </svg> <span class="text-xs">Map</span> </a> <a href="/saved" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> <span class="text-xs">Saved</span> </a> <a href="/settings" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span class="text-xs">Settings</span> </a> </div> </nav> </main> ` })}`;
}, "/Users/luisherdeth/Documents/ClimaWiki/src/pages/weather.astro", void 0);

const $$file = "/Users/luisherdeth/Documents/ClimaWiki/src/pages/weather.astro";
const $$url = "/weather";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Weather,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
