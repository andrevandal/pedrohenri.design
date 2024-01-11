// https://nuxt.com/docs/api/configuration/nuxt-config

const { IMAGEKIT_BASE_URL, NUXT_PUBLIC_SITE_URL } = process.env

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
    'nuxt-gtag',
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
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
    },
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
      siteURL: NUXT_PUBLIC_SITE_URL,
    },
  },

  linkChecker: {
    enabled: false,
  },

  gtag: {
    loadingStrategy: 'async',
  },
})
