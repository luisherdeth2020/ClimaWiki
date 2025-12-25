# ClimaWiki

A modern weather application built with Astro 5, Preact, and Tailwind CSS.

## Features

- 🌡️ Real-time weather data from OpenWeatherMap
- 📍 GPS location detection
- 🔍 Smart city/address search with Nominatim geocoding
- 📊 Hourly forecast (24 hours)
- 📅 7-day forecast with confidence indicators
- 💨 Wind speed and precipitation data
- 🎨 Beautiful dark UI with glassmorphism
- 📱 Fully responsive mobile-first design

## Tech Stack

- **Framework:** Astro 5 (SSR mode)
- **UI Library:** Preact
- **Styling:** Tailwind CSS 4
- **State Management:** Nanostores
- **Icons:** Lucide Preact
- **Deployment:** Netlify

## API Keys

This project uses:
- OpenWeatherMap API for weather data
- Nominatim (OpenStreetMap) for geocoding

### Setup

1. Copy the example env file:
```bash
cp .env.example .env.local
```

2. Add your OpenWeatherMap API key to `.env.local`:
```
PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Get a free API key at: https://openweathermap.org/api

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Netlify

This project is configured for Netlify deployment with SSR support.

Simply drag and drop the project folder to Netlify or use the CLI:

```bash
netlify deploy --prod
```

## Architecture

- **Pages:** SSR-rendered Astro pages
- **Islands:** Interactive Preact components (client-side)
- **Services:** API integration layer
- **Types:** Full TypeScript coverage

## Design Principles

- **Fiabilidad:** Reliable data with confidence indicators
- **Claridad:** Clear visual hierarchy and icons
- **Comprensión:** User-friendly interface
- **Transparencia:** Honest forecast accuracy

---

Built with ❤️ using Astro
