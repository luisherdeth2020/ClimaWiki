import { c as createComponent, d as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_CoLVhjdj.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BlIK-sSH.mjs';
import { f as formatTemp, $ as $$WeatherIcon, a as formatDayName, b as formatPrecipitation, g as getConfidenceIndicator } from '../chunks/format_CXDBnFou.mjs';
import { f as fetchCompleteWeather } from '../chunks/weather.service_COgYmghG.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Forecast = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Forecast;
  const url = new URL(Astro2.request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const locationName = url.searchParams.get("name");
  if (!lat || !lon) {
    return Astro2.redirect("/welcome");
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
    return Astro2.redirect("/welcome");
  }
  const { location, current, daily } = weatherData;
  const todayForecast = daily[0];
  const highConfidenceDays = daily.slice(1, 4);
  const mediumConfidenceDays = daily.slice(4, 6);
  const lowConfidenceDays = daily.slice(6);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `7-Day Forecast for ${location.name} - ClimaWiki` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pb-20">  <header class="px-4 py-6 flex items-center"> <a${addAttribute(`/weather?lat=${currentLocation.coord.lat}&lon=${currentLocation.coord.lon}&name=${encodeURIComponent(currentLocation.name)}`, "href")} class="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to weather"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> </a> <h1 class="flex-1 text-center text-xl font-semibold"> ${location.name} </h1> <div class="w-10"></div>  </header>  <section class="px-4 mb-6"> <div class="glass rounded-3xl p-6"> <div class="flex items-center justify-between mb-4"> <div> <p class="text-sm text-green-400 font-medium mb-1 flex items-center gap-2"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg>
Updated 10m ago
</p> <h2 class="text-2xl font-light">Today</h2> </div> ${renderComponent($$result2, "WeatherIcon", $$WeatherIcon, { "icon": current.icon, "size": "lg" })} </div> <div class="flex items-baseline gap-2 mb-2"> <span class="temp-display">${formatTemp(current.temp)}</span> <span class="text-xl text-gray-400">${current.condition}</span> </div> <div class="flex items-center gap-4 text-sm text-gray-400"> <span>Low / High</span> <span class="font-medium text-white"> ${formatTemp(todayForecast.tempMin)} / ${formatTemp(todayForecast.tempMax)} </span> </div> </div> </section>  <section class="px-4 mb-6"> <h2 class="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">
Short Term
</h2> <div class="space-y-2"> ${highConfidenceDays.map((day) => {
    return renderTemplate`<div class="glass rounded-2xl p-4 flex items-center justify-between">  <div class="flex-1"> <p class="font-medium text-lg">${formatDayName(day.date)}</p> <p class="text-sm text-gray-400">${day.condition}</p> </div>  <div class="mx-4"> ${renderComponent($$result2, "WeatherIcon", $$WeatherIcon, { "icon": day.icon, "size": "md" })} </div>  <div class="text-right"> <div class="flex items-center gap-3 mb-1"> <span class="text-gray-400">${formatTemp(day.tempMin)}</span> <span class="text-xl font-semibold">${formatTemp(day.tempMax)}</span> </div> ${day.precipitation > 20 && renderTemplate`<div class="flex items-center gap-1 text-sm text-blue-400"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path> </svg> <span>${formatPrecipitation(day.precipitation)}</span> </div>`} ${day.confidence === "high" && renderTemplate`<div class="flex items-center gap-1 mt-1"> <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> <span class="text-xs text-green-400">High</span> </div>`} </div> </div>`;
  })} </div> </section>  <section class="px-4 mb-6"> <div class="flex items-center justify-between mb-3"> <h2 class="text-xs uppercase tracking-wide text-gray-400 font-semibold">
Extended Forecast
</h2> <div class="flex items-center gap-2 text-xs text-gray-500"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span>Previsión orientativa</span> </div> </div> <div class="space-y-2"> ${[...mediumConfidenceDays, ...lowConfidenceDays].map((day) => {
    const confidence = getConfidenceIndicator(day.confidence);
    const isLowConfidence = day.confidence === "low";
    return renderTemplate`<div${addAttribute(`glass rounded-2xl p-4 flex items-center justify-between ${isLowConfidence ? "border-yellow-500/30" : ""}`, "class")}>  <div class="flex-1"> <p class="font-medium text-lg">${formatDayName(day.date)}</p> <p class="text-sm text-gray-400">${day.condition}</p> </div>  <div class="mx-4"> ${renderComponent($$result2, "WeatherIcon", $$WeatherIcon, { "icon": day.icon, "size": "md" })} </div>  <div class="text-right">  ${isLowConfidence ? renderTemplate`<div class="mb-1"> <p class="text-sm text-gray-400">Temp Range</p> <p class="text-lg font-semibold"> ${formatTemp(day.tempMin)} — ${formatTemp(day.tempMax)} </p> </div>` : renderTemplate`<div class="flex items-center gap-3 mb-1"> <span class="text-gray-400">${formatTemp(day.tempMin)}</span> <span class="text-xl font-semibold">${formatTemp(day.tempMax)}</span> </div>`}  <div class="flex items-center justify-end gap-1 mt-2"> <div${addAttribute(`w-1.5 h-1.5 rounded-full ${day.confidence === "medium" ? "bg-yellow-500" : "bg-orange-500"}`, "class")}></div> <span${addAttribute(`text-xs ${confidence.color}`, "class")}> ${day.confidence === "medium" ? "Medium" : "Low"} </span> </div> </div> </div>`;
  })} </div> </section>  <section class="px-4 mb-8"> <div class="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4"> <div class="flex gap-3"> <svg class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <div class="text-sm text-gray-300"> <p class="font-medium mb-1">About Forecast Accuracy</p> <p class="text-gray-400">
Weather forecasts become less precise over time. Confidence decreases significantly 
              beyond 3 days. Extended forecasts show temperature ranges to reflect this uncertainty.
</p> </div> </div> </div> </section>  <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-3"> <div class="flex items-center justify-around max-w-2xl mx-auto"> <a href="/welcome" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> <span class="text-xs">Home</span> </a> <a href="/map" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </svg> <span class="text-xs">Map</span> </a> <a href="/saved" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> <span class="text-xs">Saved</span> </a> <a href="/settings" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span class="text-xs">Settings</span> </a> </div> </nav> </main> ` })}`;
}, "/Users/luisherdeth/Documents/ClimaWiki/src/pages/forecast.astro", void 0);

const $$file = "/Users/luisherdeth/Documents/ClimaWiki/src/pages/forecast.astro";
const $$url = "/forecast";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Forecast,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
