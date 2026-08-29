import { defineNuxtConfig } from 'nuxt/config'
import { projects } from './data/projects'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-13',
  modules: [ '@nuxtjs/i18n', '@nuxtjs/sitemap' ],
  css: [ '~/assets/css/base.css' ],
  site: {
    url: 'https://about.arffornia.com',
  },

  experimental: {
    // Off for a fully static, client-rendered site: nothing here uses route rules or payload
    // extraction, and its dead `import("#app-manifest")` branch makes Vite's dep optimizer
    // log a resolve error on every re-optimisation.
    appManifest: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { property: 'og:site_name', content: 'Brian Perret - Portfolio' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },

  nitro: {
    prerender: {
      // "/" only preloads images then does a client-only router.push('/Projects') in
      // onMounted, so it has no links for the crawler to follow: every route must be listed
      // explicitly or non-JS crawlers only ever see the homepage.
      routes: [ '/', '/About', '/Projects', ...projects.map((p) => `/Projects/${ p.slug }`) ],
      crawlLinks: true,
    },
  },

  i18n: {
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