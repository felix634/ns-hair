// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nagysandorhair.hu',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});