import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-13',
  modules: [ '@nuxtjs/i18n' ],

  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'en.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'fr',
    langDir: '../locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'fr'
    },
  }
})