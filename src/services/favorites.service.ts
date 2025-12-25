/**
 * Favorites Service
 * Manages saved locations in localStorage
 */

export interface FavoriteLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country?: string;
  addedAt: number;
}

const STORAGE_KEY = 'climawiki_favorites';

/**
 * Get all favorite locations
 */
export function getFavorites(): FavoriteLocation[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const favorites = JSON.parse(data);
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

/**
 * Add a location to favorites
 */
export function addFavorite(location: Omit<FavoriteLocation, 'id' | 'addedAt'>): FavoriteLocation {
  const favorites = getFavorites();
  
  // Check if already exists (by coordinates)
  const exists = favorites.find(
    f => Math.abs(f.lat - location.lat) < 0.01 && Math.abs(f.lon - location.lon) < 0.01
  );
  
  if (exists) {
    throw new Error('Location already in favorites');
  }
  
  const newFavorite: FavoriteLocation = {
    ...location,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    addedAt: Date.now(),
  };
  
  const updated = [newFavorite, ...favorites];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  return newFavorite;
}

/**
 * Remove a favorite by ID
 */
export function removeFavorite(id: string): void {
  const favorites = getFavorites();
  const updated = favorites.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Check if a location is in favorites
 */
export function isFavorite(lat: number, lon: number): boolean {
  const favorites = getFavorites();
  return favorites.some(
    f => Math.abs(f.lat - lat) < 0.01 && Math.abs(f.lon - lon) < 0.01
  );
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  localStorage.removeItem(STORAGE_KEY);
}
