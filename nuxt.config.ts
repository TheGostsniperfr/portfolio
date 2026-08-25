import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-13',
  modules: [ '@nuxtjs/i18n' ],
  css: [ '~/assets/css/base.css' ],

  experimental: {
    // Off for a fully static, client-rendered site: nothing here uses route rules or payload
    // extraction, and its dead `import("#app-manifest")` branch makes Vite's dep optimizer
    // log a resolve error on every re-optimisation.
    appManifest: false,
  },

  i18n: {
    // Opted out explicitly: the module warns that this optimisation causes issues and is
    // deprecated in v10. Setting it either way silences the warning.
    bundle: { optimizeTranslationDirective: false },
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
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