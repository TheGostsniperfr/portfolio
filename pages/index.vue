<!-- pages/index.vue -->
<template>
  <div class="index-content">
    <div v-if="loading">
      <LoadingBar :progress="progress" />
    </div>
    <div v-else>
      <HomePage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LoadingBar from '~/components/LoadingBar.vue';
import HomePage from '~/components/HomePage.vue';
import { useImagePreloader } from '~/composables/useImagePreloader';

const imageList = [
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

const loading = ref(true);
const { progress, loadImages } = useImagePreloader(imageList);

onMounted(async () => {
  await loadImages();
  loading.value = false;
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
