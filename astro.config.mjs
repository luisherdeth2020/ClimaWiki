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
    // Inject environment variable from Cloudflare Pages build environment
    define: {
      'import.meta.env.PUBLIC_OPENWEATHER_API_KEY': JSON.stringify(
        process.env.PUBLIC_OPENWEATHER_API_KEY || ''
      )
    }
  },

  integrations: [preact()]
});