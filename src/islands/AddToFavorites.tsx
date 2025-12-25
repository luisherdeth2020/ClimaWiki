/**
 * Add to Favorites Button
 * Allows users to save a location to their favorites
 */

import { useState, useEffect } from 'preact/hooks';
import { addFavorite, removeFavorite, isFavorite } from '../services/favorites.service';

interface Props {
  name: string;
  lat: number;
  lon: number;
  country?: string;
}

export default function AddToFavorites({ name, lat, lon, country }: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already in favorites
    setSaved(isFavorite(lat, lon));
  }, [lat, lon]);

  async function handleToggle() {
    setLoading(true);

    try {
      if (saved) {
        // Remove from favorites
        // We need to find the favorite by coordinates since we don't have the ID here
        const favorites = (await import('../services/favorites.service')).getFavorites();
        const favorite = favorites.find(
          f => Math.abs(f.lat - lat) < 0.01 && Math.abs(f.lon - lon) < 0.01
        );
        
        if (favorite) {
          removeFavorite(favorite.id);
          setSaved(false);
        }
      } else {
        // Add to favorites
        addFavorite({ name, lat, lon, country });
        setSaved(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert(error instanceof Error ? error.message : 'Failed to update favorites');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      class={`
        flex items-center gap-2 px-4 py-2 rounded-full 
        transition-all duration-200 font-medium
        ${saved 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'glass hover:bg-white/10'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg 
        class={`w-5 h-5 transition-all ${saved ? 'fill-current' : 'fill-none'}`} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span class="text-sm">
        {loading ? 'Saving...' : saved ? 'Saved' : 'Save Location'}
      </span>
    </button>
  );
}
