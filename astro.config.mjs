// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://inzend.com',
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // <— alias funcional para Vite
      },
    },
    build: { cssMinify: true },
  },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
