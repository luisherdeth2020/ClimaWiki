// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // Pure static site - no SSR needed
  output: 'static',
  
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Inject environment variables at build time for Cloudflare Pages
      'import.meta.env.PUBLIC_OPENWEATHER_API_KEY': JSON.stringify(process.env.PUBLIC_OPENWEATHER_API_KEY || '')
    }
  },

  integrations: [preact()]
});