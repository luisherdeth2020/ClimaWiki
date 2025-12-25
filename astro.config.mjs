// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable SSR
  adapter: netlify({
    edgeMiddleware: true
  }),
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()]
});