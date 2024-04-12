import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

const siteUrl = import.meta.env.SITE_URL || 'https://localhost:4321'

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), tailwind()],
  trailingSlash: 'never',
  site: siteUrl,
})
