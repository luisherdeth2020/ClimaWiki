// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // Hybrid rendering: static by default, SSR for specific pages
  output: 'server', // This enables SSR
  adapter: netlify({
    imageCDN: false,
  }),
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()]
});