<!-- pages/index.vue -->
<template>
  <div class="index-content">
    <LoadingBar :progress="progress" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import LoadingBar from '~/components/LoadingBar.vue';
import { useImagePreloader, type PreloadTarget } from '~/composables/useImagePreloader';
import { useRouter } from 'vue-router';
import { projects } from '~/data/projects';
import manifest from '~/data/image-manifest.json';

useHead({
  title: 'Brian Perret',
  meta: [
    { name: 'description', content: 'Loading Brian\'s Portfolio' }
  ]
});

interface ManifestEntry { width: number; height: number; widths: number[]; base: string }

// Only the carousel covers: this page used to block on 63 full-size PNGs (~77 MB) before it
// would even redirect. Everything else is fetched by the page that actually needs it.
const CAROUSEL_SIZES = '(orientation: portrait) 100vw, 40vw';
const encodePath = (path: string) => encodeURI(path).replace(/,/g, '%2C');

const imageList: PreloadTarget[] = projects.map((project) => {
  const entry = (manifest as Record<string, ManifestEntry>)[ project.cover ];
  if (!entry) return { src: project.cover };
  return {
    src: project.cover,
    srcset: entry.widths.map((w) => `${encodePath(`${entry.base}-${w}.avif`)} ${w}w`).join(', '),
    sizes: CAROUSEL_SIZES,
  };
});

const { progress, loadImages } = useImagePreloader(imageList);

const router = useRouter()

onMounted(async () => {
  await loadImages();
  router.push('/Projects');
});
</script>

<style scoped>
.index-content {
  font-family: Montserrat, sans-serif;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #141414;
  min-height: 100dvh;
  color: #fff;
}
</style>
