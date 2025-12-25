# Próximos Pasos - ClimaWiki

## ✅ API FUNCIONANDO - La app ya trae datos reales

**Estado actual**: La API key está **activa y funcionando correctamente**. La aplicación ya está trayendo datos reales de OpenWeatherMap.

```bash
npm run dev
# Abrí http://localhost:4321 para ver datos reales de San Francisco
```

---

## 🎨 Mejoras Visuales Inmediatas

### 1. Iconos de Clima Personalizados

Actualmente uso emojis (☀️, 🌧️, ☁️). Para un look más profesional:

**Opción A - Usar Lucide Icons**:
```bash
# Ya está instalado lucide-preact
```

Crear `src/components/WeatherIcon.tsx` (reemplazar el .astro):
```typescript
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-preact";

const iconMap = {
  "01d": Sun,
  "02d": Cloud,
  "10d": CloudRain,
  // etc...
};
```

**Opción B - Weather Icons de erikflowers**:
```bash
npm install weather-icons
```

### 2. Animaciones Sutiles

En `src/styles/global.css` agregar:
```css
@layer components {
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

Aplicar en cards: `<div class="glass fade-in">`

---

## 🚀 Funcionalidades Clave Pendientes

### 1. Auto-Refresh de Datos (Prioridad ALTA)

Crear `src/islands/WeatherRefresher.tsx`:
```typescript
import { useEffect } from "preact/hooks";

export default function WeatherRefresher({ interval = 600000 }) { // 10 min
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  return null;
}
```

Agregar en `BaseLayout.astro`:
```astro
<WeatherRefresher client:idle />
```

### 2. Geolocalización Automática en Home

En `src/pages/index.astro`, antes del try-catch:

```typescript
// Try to get user's location
let userLocation = defaultLocation;

if (Astro.request.headers.get("user-agent")?.includes("Mobile")) {
  // On client-side, detect location with JS
  // Create an island for this
}
```

### 3. PWA (Progressive Web App)

```bash
npx astro add @astrojs/pwa
```

Configurar `astro.config.mjs`:
```javascript
import pwa from "@astrojs/pwa";

export default defineConfig({
  integrations: [
    pwa({
      manifest: {
        name: "ClimaWiki",
        short_name: "ClimaWiki",
        description: "Weather Forecast You Can Trust",
        theme_color: "#1a202c",
        background_color: "#0f172a",
        display: "standalone",
        icons: [
          // Agregar iconos en public/
        ]
      }
    })
  ]
});
```

### 4. Drag-to-Reorder en Location List

Instalar `dnd-kit`:
```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

Actualizar `src/islands/LocationList.tsx` para soportar drag & drop.

---

## 🎯 Optimizaciones de Performance

### 1. Implementar ISR (Incremental Static Regeneration)

En `astro.config.mjs`:
```javascript
export default defineConfig({
  output: "hybrid",
  adapter: /* tu adapter (node, vercel, netlify) */
});
```

En páginas dinámicas:
```astro
---
export const prerender = false;
---
```

### 2. Cache de API Calls

Crear `src/services/cache.service.ts`:
```typescript
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 600000; // 10 min

export function getCached(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

export function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}
```

---

## 🧪 Testing

### 1. Unit Tests con Vitest

```bash
npm install -D vitest @vitest/ui
```

Crear `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
```

Crear tests:
```typescript
// src/utils/format.test.ts
import { describe, it, expect } from "vitest";
import { formatTemp, getWindDirection } from "./format";

describe("formatTemp", () => {
  it("should format temperature with degree symbol", () => {
    expect(formatTemp(25)).toBe("25°");
  });
});
```

### 2. E2E Tests con Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

---

## 📊 Analytics & Monitoring

### 1. Error Tracking con Sentry

```bash
npm install @sentry/astro
```

### 2. Web Vitals

```bash
npm install web-vitals
```

---

## 🌍 Deployment

### Opción A - Vercel (Recomendado para Astro)

```bash
npm install -D @astrojs/vercel
```

```javascript
// astro.config.mjs
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
});
```

### Opción B - Netlify

```bash
npm install -D @astrojs/netlify
```

### Opción C - Static Hosting (Cloudflare Pages, GitHub Pages)

```bash
npm run build
# Deploy la carpeta dist/
```

---

## 🔒 Seguridad

### 1. Variables de Entorno

Mover API key a `.env`:
```
OPENWEATHER_API_KEY=tu_api_key
```

En `weather.service.ts`:
```typescript
const API_KEY = import.meta.env.OPENWEATHER_API_KEY;
```

### 2. Rate Limiting

Implementar límite de requests por usuario (especialmente en /saved al buscar ciudades).

---

## 📱 Mejoras de UX

### 1. Skeleton Screens

Mostrar placeholders mientras carga la data.

### 2. Pull-to-Refresh

En mobile, gesto de pull down para refrescar.

### 3. Offline Mode

Usar Service Worker para cachear última data y mostrarla offline.

---

## 🎓 Aprendizajes Clave

### Lo que está BIEN hecho:

1. ✅ **Arquitectura modular**: Cada responsabilidad en su carpeta
2. ✅ **Type safety**: TypeScript estricto catch errores antes de runtime
3. ✅ **Islands Architecture**: Solo hidrata lo necesario (performance!)
4. ✅ **Mobile-first**: El diseño se adapta, no se rompe
5. ✅ **Separation of concerns**: Lógica != Presentación
6. ✅ **Error handling**: Try-catch en todas las API calls
7. ✅ **Comments**: Cada archivo documenta su propósito

### Por qué NO usamos:

- ❌ **Redux**: Overkill para este scope. Nanostores es suficiente.
- ❌ **React completo**: Preact pesa 3kb vs 45kb de React.
- ❌ **CSS-in-JS runtime**: Tailwind genera CSS estático (más rápido).
- ❌ **SPA puro**: SSG + Islands = mejor SEO y performance.

---

## ✋ ERRORES COMUNES A EVITAR

### 1. NO hagas esto:
```typescript
// ❌ MAL - Hardcodear datos en componentes
const temp = 25;
```

```typescript
// ✅ BIEN - Usar props
interface Props {
  temp: number;
}
const { temp } = Astro.props;
```

### 2. NO hagas esto:
```typescript
// ❌ MAL - Fetch sin error handling
const data = await fetch(url).then(r => r.json());
```

```typescript
// ✅ BIEN
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
} catch (error) {
  console.error("Failed:", error);
  // Handle error
}
```

### 3. NO hagas esto:
```astro
<!-- ❌ MAL - client:load en todo -->
<Component client:load />
<Component client:load />
<Component client:load />
```

```astro
<!-- ✅ BIEN - Ser selectivo -->
<StaticComponent />  <!-- Sin JS -->
<InteractiveComponent client:visible />  <!-- Solo cuando se ve -->
<CriticalComponent client:load />  <!-- Solo si es crítico -->
```

---

## 🎯 Prioridades

### Esta Semana
1. ✅ Arreglar API key
2. ✅ Cambiar de mock data a API real
3. 🔲 Probar en mobile real
4. 🔲 Implementar auto-refresh

### Próxima Semana
5. 🔲 PWA manifest
6. 🔲 Animaciones sutiles
7. 🔲 Drag-to-reorder locations

### Mes Próximo
8. 🔲 Tests unitarios
9. 🔲 Deploy a producción
10. 🔲 Analytics

---

**Cualquier duda, revisá el código. Todo está documentado.**
