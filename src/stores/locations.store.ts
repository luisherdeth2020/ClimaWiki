/**
 * Locations Store
 * 
 * Manages saved locations using Nanostores and localStorage persistence.
 * This store handles:
 * - Current location (GPS-based)
 * - Saved favorite locations
 * - Location reordering
 * - Custom location names
 */

import { atom, map } from "nanostores";
import type { Location } from "../types/weather";

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEY_LOCATIONS = "climawiki_locations";
const STORAGE_KEY_CURRENT = "climawiki_current_location";

// ============================================
// ATOMS & MAPS
// ============================================

/**
 * Current location (GPS-based or manually set)
 */
export const $currentLocation = atom<Location | null>(null);

/**
 * List of saved favorite locations
 */
export const $savedLocations = atom<Location[]>([]);

/**
 * Loading state for location operations
 */
export const $locationsLoading = atom<boolean>(false);

/**
 * Error state
 */
export const $locationsError = atom<string | null>(null);

// ============================================
// PERSISTENCE HELPERS
// ============================================

/**
 * Load saved locations from localStorage
 */
function loadSavedLocations(): Location[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY_LOCATIONS);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load saved locations:", error);
    return [];
  }
}

/**
 * Save locations to localStorage
 */
function saveLocationsToStorage(locations: Location[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(locations));
  } catch (error) {
    console.error("Failed to save locations:", error);
  }
}

/**
 * Load current location from localStorage
 */
function loadCurrentLocation(): Location | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (!stored) return null;

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load current location:", error);
    return null;
  }
}

/**
 * Save current location to localStorage
 */
function saveCurrentLocationToStorage(location: Location | null): void {
  if (typeof window === "undefined") return;

  try {
    if (location) {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(location));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    }
  } catch (error) {
    console.error("Failed to save current location:", error);
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize store from localStorage
 * Call this on app mount
 */
export function initializeLocationsStore(): void {
  if (typeof window === "undefined") return;

  const savedLocations = loadSavedLocations();
  const currentLocation = loadCurrentLocation();

  $savedLocations.set(savedLocations);
  $currentLocation.set(currentLocation);
}

// ============================================
// ACTIONS
// ============================================

/**
 * Set current location (typically from GPS)
 */
export function setCurrentLocation(location: Location): void {
  const locationWithFlag = { ...location, isCurrentLocation: true };
  $currentLocation.set(locationWithFlag);
  saveCurrentLocationToStorage(locationWithFlag);
}

/**
 * Add a location to favorites
 */
export function addSavedLocation(location: Location): void {
  const current = $savedLocations.get();

  // Check if location already exists
  const exists = current.some((loc) => loc.id === location.id);
  if (exists) {
    $locationsError.set("Location already saved");
    return;
  }

  const updated = [...current, location];
  $savedLocations.set(updated);
  saveLocationsToStorage(updated);
  $locationsError.set(null);
}

/**
 * Remove a location from favorites
 */
export function removeSavedLocation(locationId: string): void {
  const current = $savedLocations.get();
  const updated = current.filter((loc) => loc.id !== locationId);

  $savedLocations.set(updated);
  saveLocationsToStorage(updated);
}

/**
 * Update custom name for a location
 */
export function updateLocationName(locationId: string, customName: string): void {
  const current = $savedLocations.get();
  const updated = current.map((loc) =>
    loc.id === locationId ? { ...loc, customName } : loc
  );

  $savedLocations.set(updated);
  saveLocationsToStorage(updated);
}

/**
 * Reorder saved locations (for drag-to-reorder)
 */
export function reorderLocations(newOrder: Location[]): void {
  $savedLocations.set(newOrder);
  saveLocationsToStorage(newOrder);
}

/**
 * Clear all saved locations
 */
export function clearAllLocations(): void {
  $savedLocations.set([]);
  saveLocationsToStorage([]);
}

/**
 * Get a location by ID
 */
export function getLocationById(locationId: string): Location | undefined {
  const current = $currentLocation.get();
  if (current?.id === locationId) return current;

  const saved = $savedLocations.get();
  return saved.find((loc) => loc.id === locationId);
}

// ============================================
// GEOLOCATION HELPERS
// ============================================

/**
 * Request user's current position using browser Geolocation API
 */
export async function requestCurrentPosition(): Promise<GeolocationPosition> {
  $locationsLoading.set(true);
  $locationsError.set(null);

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const error = "Geolocation is not supported by this browser";
      $locationsError.set(error);
      $locationsLoading.set(false);
      reject(new Error(error));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        $locationsLoading.set(false);
        resolve(position);
      },
      (error) => {
        let errorMessage = "Failed to get location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        $locationsError.set(errorMessage);
        $locationsLoading.set(false);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}
