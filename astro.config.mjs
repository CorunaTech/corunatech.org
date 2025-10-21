import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://corunatech.org',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap()]
})
