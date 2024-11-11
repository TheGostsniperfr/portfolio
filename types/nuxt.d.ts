// types/nuxt.d.ts
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $loadImages(images: string[], updateProgress: (loaded: number, total: number) => void): Promise<void>;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $loadImages(images: string[], updateProgress: (loaded: number, total: number) => void): Promise<void>;
  }
}
