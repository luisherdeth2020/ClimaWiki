/**
 * TempDisplay - Reactive temperature display component
 * Automatically converts and updates when temperature unit setting changes
 * 
 * Uses Nano Stores for reliable reactivity in Astro (works in both dev and production)
 */

import { useStore } from "@nanostores/preact";
import { temperatureUnit } from "../stores/settings.store";

interface TempDisplayProps {
  temp: number;
  decimals?: number;
  className?: string;
}

/**
 * Convert Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Reactive temperature display component
 * Uses useStore hook for automatic reactivity
 */
export default function TempDisplay({
  temp,
  decimals = 0,
  className,
}: TempDisplayProps) {
  // useStore subscribes to the atom and re-renders on changes
  const unit = useStore(temperatureUnit);
  
  const displayTemp = unit === "fahrenheit" 
    ? celsiusToFahrenheit(temp) 
    : temp;
  
  const symbol = unit === "fahrenheit" ? "F" : "C";
  
  return (
    <span class={className}>
      {displayTemp.toFixed(decimals)}°{symbol}
    </span>
  );
}
