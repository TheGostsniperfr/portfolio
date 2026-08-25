<template>
  <picture>
    <source v-for="format in sources" :key="format.type" :type="format.type" :srcset="format.srcset" :sizes="sizes">
    <img
      :src="src"
      :alt="alt"
      :width="entry?.width"
      :height="entry?.height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
      draggable="false"
    >
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import manifest from '~/data/image-manifest.json'

interface ManifestEntry {
  width: number
  height: number
  widths: number[]
  base: string
}

const props = withDefaults(defineProps<{
  src: string
  alt: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
}>(), {
  sizes: '100vw',
  loading: 'lazy',
  fetchpriority: 'auto',
})

const entry = computed<ManifestEntry | undefined>(
  () => (manifest as Record<string, ManifestEntry>)[ props.src ],
)

// Spaces and commas are srcset separators, so filenames like "v.4 (1).png" must be escaped.
const encodePath = (path: string) => encodeURI(path).replace(/,/g, '%2C')

const sources = computed(() => {
  if (!entry.value) return []
  const { base, widths } = entry.value
  return [ 'avif', 'webp' ].map((ext) => ({
    type: `image/${ext}`,
    srcset: widths.map((w) => `${encodePath(`${base}-${w}.${ext}`)} ${w}w`).join(', '),
  }))
})
</script>

<style scoped>
picture {
  display: contents;
}
</style>
