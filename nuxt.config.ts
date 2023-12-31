// https://nuxt.com/docs/api/configuration/nuxt-config

const { GA_MEASUREMENT_ID, IMAGEKIT_BASE_URL, NUXT_PUBLIC_SITE_URL } =
  process.env

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtseo/module',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    'nuxt-icons',
    '@nuxt/image',
    '@nuxtjs/fontaine',
  ],

  site: {
    url: NUXT_PUBLIC_SITE_URL,
    name: 'Pedro Henri Design',
    description:
      'O poder do design que se destaca em um mundo de ruídos. Crio identidades visuais, sites e experiências de UI/UX para marcas que visam o crescimento e inovação.',
    defaultLocale: 'pt-br',
    trailingSlash: true,
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      lang: 'pt-br',
      templateParams: {
        separator: '|',
        siteName: 'Pedro Henri Design',
      },
      titleTemplate: '%s %separator %siteName',
      htmlAttrs: {
        lang: 'pt-br',
        class: 'scroll-smooth scroll-pt-4',
      },
    },
  },

  image: {
    imagekit: {
      baseURL: IMAGEKIT_BASE_URL,
    },
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nested',
      tailwindcss: {},
      autoprefixer: {},
      'postcss-preset-env': {
        features: { 'nesting-rules': false },
      },
    },
  },

  runtimeConfig: {
    public: {
      gaMeasurementID: GA_MEASUREMENT_ID,
      siteURL: NUXT_PUBLIC_SITE_URL,
    },
  },
  linkChecker: {
    enabled: false,
  },
  fontMetrics: {
    fonts: ['Inter'],
  },
})
