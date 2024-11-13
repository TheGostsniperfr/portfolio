import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/portfolio/' : ''
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
    }
  },

  ssr: false,
  compatibilityDate: '2024-11-13'
})