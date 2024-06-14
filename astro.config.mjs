import { defineConfig, passthroughImageService } from 'astro/config'
import { loadEnv } from 'vite'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import cloudflare from '@astrojs/cloudflare'
import icon from 'astro-icon'
const { CF_PAGES_URL, CF_PAGES, CF_PAGES_BRANCH, SITE_URL } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ''
)
const getSite = () => {
  if (SITE_URL) return SITE_URL
  if (CF_PAGES && CF_PAGES_BRANCH !== 'main') return CF_PAGES_URL
  return 'http://localhost:4321'
}
const siteUrl = getSite()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  image: {
    service: passthroughImageService()
  },
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true
    }),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    icon({
      include: {
        mdi: ['linkedin', 'instagram'],
        logos: ['linkedin-icon', 'instagram-icon'],
        'heroicons-outline': ['chat-alt-2'],
        heroicons: ['arrow-down']
      },
      iconDir: 'src/assets/icons',
      svgoOptions: {
        plugins: [
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ 'shape-rendering': 'auto' }]
            }
          }
        ]
      }
    })
  ],
  trailingSlash: 'ignore',
  site: siteUrl
})
