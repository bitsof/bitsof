// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Add support for importing images
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp'],
  },
  // Image optimization
  image: {
    domains: ['example.com'],
    // Optimize for better performance
    service: {
      // Optimize images uploaded to the project
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});