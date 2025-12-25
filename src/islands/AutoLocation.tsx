/**
 * AutoLocation Island
 * 
 * Automatically detects user's location and redirects to weather page
 */

import { h } from "preact";
import { useState } from "preact/hooks";
import { reverseGeocode } from "../services/weather.service";

export default function AutoLocation() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async () => {
    setIsDetecting(true);
    setError(null);

    try {
      // Request geolocation
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

      // Get location name
      const location = await reverseGeocode(latitude, longitude);

      if (location) {
        // Redirect to weather page with detected location
        window.location.href = `/weather?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(location.name)}&auto=true`;
      } else {
        throw new Error("Could not identify location");
      }
    } catch (err: any) {
      console.error("Geolocation error:", err);
      
      let errorMessage = "Failed to detect location";
      if (err.code === 1) {
        errorMessage = "Location permission denied";
      } else if (err.code === 2) {
        errorMessage = "Location unavailable";
      } else if (err.code === 3) {
        errorMessage = "Location request timed out";
      }
      
      setError(errorMessage);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <button
      onClick={detectLocation}
      disabled={isDetecting}
      class="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group"
      aria-label="Use my location"
      title="Use my location"
    >
      {isDetecting ? (
        <div class="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Error tooltip */}
      {error && (
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-red-900/90 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-50 shadow-xl">
          {error}
        </div>
      )}
    </button>
  );
}
