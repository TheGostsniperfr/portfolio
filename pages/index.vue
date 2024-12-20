<!-- pages/index.vue -->
<template>
  <div class="index-content">
    <LoadingBar :progress="progress" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import LoadingBar from '~/components/LoadingBar.vue';
import { useImagePreloader } from '~/composables/useImagePreloader.js';
import { useRouter } from 'vue-router';

const imageList = [
  '/images/other/test_image_16_9.jpg',
  '/images/Arffornia/launcher_homepage.png',
  '/images/Arffornia/launcher_homepageV4.png',
  '/images/Arffornia/website_homepage.png',
  '/images/Arffornia/map/v.2 (1).png',
  '/images/Arffornia/map/v.2 (2).png',
  '/images/Arffornia/map/v.4 (1).png',
  '/images/Arffornia/map/v.4 (2).png',
  '/images/OCR/logo.png',
  '/images/OCR/ArtificialNeuronModel_francais.png',
  '/images/OCR/hard_grid.jpg',
  '/images/OCR/image_04.jpg',
  '/images/OCR/MorphologyWithErode.jpg',
  '/images/UpsideDown/UpsideDownBG.png',
  '/images/UpsideDown/drone.png',
  '/images/UpsideDown/generator.png',
  '/images/UpsideDown/Logo_S2game.png',
  '/images/UpsideDown/plasmaOrb.png'
];

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
  height: 100vh;
  color: #fff;
}
</style>
