/**
 * TempDisplay - Reactive temperature display component
 * Automatically converts and updates when temperature unit setting changes
 */

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
 * Subscribes to temperatureUnit signal and updates automatically
 */
export default function TempDisplay({ temp, decimals = 0, className }: TempDisplayProps) {
  const unit = temperatureUnit.value;
  
  const displayTemp = unit === "fahrenheit" 
    ? celsiusToFahrenheit(temp)
    : temp;
  
  const formatted = `${displayTemp.toFixed(decimals)}°${unit === "fahrenheit" ? "F" : "C"}`;
  
  return <span class={className}>{formatted}</span>;
}
