// https://nuxt.com/docs/api/configuration/nuxt-config

const { GA_MEASUREMENT_ID } = process.env

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
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
    url: 'https://pedrohenri.design',
    name: 'PedroHenri Design',
    description: 'Welcome to my awesome site!',
    defaultLocale: 'pt-br',
    trailingSlash: true,
  },

  robots: {
    disallow: '*',
    allow: '',
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
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
    },
  },
  runtimeConfig: {
    public: {
      gaMeasurementID: GA_MEASUREMENT_ID,
    },
  },
  linkChecker: {
    enabled: false,
  },
  fontMetrics: {
    fonts: ['Inter'],
  },
})
