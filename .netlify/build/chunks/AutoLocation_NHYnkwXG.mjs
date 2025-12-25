import 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { g as geocodeCity, r as reverseGeocode } from './weather.service_COgYmghG.mjs';
import { jsxs, jsx } from 'preact/jsx-runtime';

function LocationSearch({
  onLocationSelect
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimer = useRef(null);
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceTimer.current = window.setTimeout(async () => {
      try {
        const searchResults = await geocodeCity(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);
  const handleInputChange = (value) => {
    setQuery(value);
  };
  return jsxs("div", {
    class: "relative",
    children: [jsxs("div", {
      class: "relative",
      children: [jsx("input", {
        type: "text",
        value: query,
        onInput: (e) => handleInputChange(e.target.value),
        onFocus: () => setIsOpen(results.length > 0),
        placeholder: "Search city or address...",
        class: "w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
      }), jsx("svg", {
        class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        children: jsx("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        })
      }), isSearching && jsx("div", {
        class: "absolute right-4 top-1/2 -translate-y-1/2",
        children: jsx("div", {
          class: "w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"
        })
      })]
    }), isOpen && results.length > 0 && jsx("div", {
      class: "absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-96 overflow-y-auto",
      children: results.map((result, index) => {
        const url = `/weather?lat=${result.lat}&lon=${result.lon}&name=${encodeURIComponent(result.name)}`;
        return jsxs("a", {
          href: url,
          class: "w-full px-5 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group block",
          children: [jsxs("div", {
            class: "flex-1",
            children: [jsx("p", {
              class: "font-semibold text-white group-hover:text-blue-300 transition-colors",
              children: result.name
            }), jsxs("p", {
              class: "text-sm text-gray-400",
              children: [result.state ? `${result.state}, ` : "", result.country]
            })]
          }), jsx("svg", {
            class: "w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: jsx("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M9 5l7 7-7 7"
            })
          })]
        }, index);
      })
    }), isOpen && !isSearching && query.length >= 2 && results.length === 0 && jsxs("div", {
      class: "absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-2xl p-5 text-center text-gray-400",
      children: [jsxs("p", {
        children: ['No locations found for "', query, '"']
      }), jsx("p", {
        class: "text-sm mt-1",
        children: "Try a different city or address"
      })]
    })]
  });
}

function AutoLocation() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState(null);
  const detectLocation = async () => {
    setIsDetecting(true);
    setError(null);
    try {
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported"));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 1e4,
          maximumAge: 0
        });
      });
      const {
        latitude,
        longitude
      } = position.coords;
      const location = await reverseGeocode(latitude, longitude);
      if (location) {
        window.location.href = `/weather?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(location.name)}&auto=true`;
      } else {
        throw new Error("Could not identify location");
      }
    } catch (err) {
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
  return jsxs("button", {
    onClick: detectLocation,
    disabled: isDetecting,
    class: "p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group",
    "aria-label": "Use my location",
    title: "Use my location",
    children: [isDetecting ? jsx("div", {
      class: "w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"
    }) : jsxs("svg", {
      class: "w-6 h-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      children: [jsx("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      }), jsx("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      })]
    }), error && jsx("div", {
      class: "absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-red-900/90 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-50 shadow-xl",
      children: error
    })]
  });
}

export { AutoLocation as A, LocationSearch as L };
