// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bitsof.vercel.app',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
    }),
  ],
  vite: {
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
