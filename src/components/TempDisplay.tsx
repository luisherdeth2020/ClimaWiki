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
 * Accesses signal.value in JSX - no computed() or useComputed() needed
 */
export default function TempDisplay({
  temp,
  decimals = 0,
  className,
}: TempDisplayProps) {
  // Access signal.value directly in JSX
  // Preact tracks this and re-renders when temperatureUnit changes
  return (
    <span class={className}>
      {temperatureUnit.value === "fahrenheit"
        ? `${celsiusToFahrenheit(temp).toFixed(decimals)}°F`
        : `${temp.toFixed(decimals)}°C`}
    </span>
  );
}
