/**
 * Map Page Island
 * Interactive weather map with Leaflet + Open-Meteo
 * Allows users to click on map or enter coordinates manually
 */

import { useEffect, useRef, useState } from "preact/hooks";
import { useTranslation } from "../i18n/translations";
import type L from "leaflet";

export default function MapPage() {
  const t = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");
  const [centeringMap, setCenteringMap] = useState(false);

  // Initialize Leaflet map
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !mapRef.current ||
      mapInstanceRef.current
    )
      return;

    const initMap = async () => {
      // Dynamic import para evitar SSR issues
      const L = (await import("leaflet")).default;

      // Fix Leaflet default icon issue with bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Create map centered on Europe
      if (!mapRef.current) return;
      const map = L.map(mapRef.current).setView([40.4168, -3.7038], 6);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Handle map clicks
      map.on("click", async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setSelectedCoords({ lat, lon: lng });
        setManualLat(lat.toFixed(6));
        setManualLon(lng.toFixed(6));

        // Remove previous marker
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Add new marker
        const marker = L.marker([lat, lng]).addTo(map);
        markerRef.current = marker;
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle manual coordinate input
  const handleManualSubmit = async (e: Event) => {
    e.preventDefault();
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLon);

    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      alert(t.map.invalidCoords);
      return;
    }

    // Navigate directly to weather page
    window.location.href = `/weather?lat=${lat}&lon=${lon}&name=Selected%20Location`;
  };

  // Center map on user's current location
  const handleMyLocation = async () => {
    setCenteringMap(true);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      // Update map view and add marker
      if (mapInstanceRef.current) {
        const L = (await import("leaflet")).default;
        mapInstanceRef.current.setView([latitude, longitude], 13);

        if (markerRef.current) {
          mapInstanceRef.current.removeLayer(markerRef.current);
        }

        const marker = L.marker([latitude, longitude]).addTo(
          mapInstanceRef.current
        );
        markerRef.current = marker;

        // Update state
        setSelectedCoords({ lat: latitude, lon: longitude });
        setManualLat(latitude.toFixed(6));
        setManualLon(longitude.toFixed(6));
      }
    } catch (error) {
      console.error("Failed to get location:", error);
      alert(t.autoLocation.failed);
    } finally {
      setCenteringMap(false);
    }
  };

  return (
    <main class="min-h-screen pb-20">
      {/* Header */}
      <header class="px-4 py-6">
        <div class="flex items-center justify-between">
          <a
            href="/welcome"
            class="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={t.common.back}
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>

          <h1 class="text-xl font-semibold">{t.map.title}</h1>

          <div class="w-10"></div>
        </div>
      </header>

      {/* Instructions & My Location Button */}
      <section class="px-4 mb-4">
        <div class="flex items-center justify-between gap-4">
          <p class="text-gray-400 text-sm flex-1">{t.map.clickToSelect}</p>
          <button
            onClick={handleMyLocation}
            disabled={centeringMap}
            class="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {centeringMap ? (
              <div class="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
            )}
            <span class="text-sm">
              {centeringMap ? t.map.centeringMap : t.map.myLocation}
            </span>
          </button>
        </div>
      </section>

      {/* Map Container */}
      <section class="px-4 mb-6">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        />
        <div
          ref={mapRef}
          class="w-full h-[58dvh] rounded-2xl overflow-hidden border border-white/10"
          style={{ zIndex: 1 }}
        ></div>
      </section>

      {/* Manual Coordinates Input */}
      <section class="px-4 mb-6">
        <h2 class="text-sm text-gray-400 mb-3">{t.map.manualCoords}</h2>
        <form onSubmit={handleManualSubmit} class="glass rounded-2xl p-4">
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label class="text-xs text-gray-400 mb-1 block">
                {t.map.latitude}
              </label>
              <input
                type="text"
                value={manualLat}
                onInput={(e) =>
                  setManualLat((e.target as HTMLInputElement).value)
                }
                placeholder="39.578410"
                class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">
                {t.map.longitude}
              </label>
              <input
                type="text"
                value={manualLon}
                onInput={(e) =>
                  setManualLon((e.target as HTMLInputElement).value)
                }
                placeholder="2.640337"
                class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {t.map.goToWeather}
          </button>
        </form>
      </section>

      {/* Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div class="flex items-center justify-around max-w-2xl mx-auto">
          <a
            href="/welcome"
            class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span class="text-xs">{t.nav.home}</span>
          </a>

          <a href="/map" class="flex flex-col items-center gap-1 text-blue-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span class="text-xs font-medium">{t.nav.map}</span>
          </a>

          <a
            href="/saved"
            class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span class="text-xs">{t.nav.saved}</span>
          </a>

          <a
            href="/settings"
            class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="text-xs">{t.nav.settings}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
