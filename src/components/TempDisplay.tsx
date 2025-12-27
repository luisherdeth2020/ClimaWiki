/**
 * TempDisplay - Reactive temperature display component
 * Automatically converts and updates when temperature unit setting changes
 * 
 * IMPORTANT: Accesses temperatureUnit.value directly in JSX for reactivity.
 * Preact automatically tracks signal dependencies in the render function.
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
 * Uses useSignal to force re-render on signal changes
 */
export default function TempDisplay({
  temp,
  decimals = 0,
  className,
}: TempDisplayProps) {
  // Force component to subscribe to temperatureUnit changes
  // We need to use the signal's value in the component body
  // to ensure Preact tracks it properly
  const unit = temperatureUnit.value;
  
  const displayTemp = unit === "fahrenheit" 
    ? celsiusToFahrenheit(temp) 
    : temp;
  
  const formatted = `${displayTemp.toFixed(decimals)}°${unit === "fahrenheit" ? "F" : "C"}`;
  
  return <span class={className}>{formatted}</span>;
}
