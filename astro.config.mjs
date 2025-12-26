// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // Pure static site - no SSR needed
  output: 'static',
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()]
});