// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // In Astro 5: use adapter + `export const prerender = false` in pages that need SSR
  adapter: netlify(),
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()]
});