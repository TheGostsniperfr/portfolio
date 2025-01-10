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
  '/images/lang/C_Logo.png',
  '/images/lang/CSharp_Logo.png',
  '/images/lang/github-logo.png',
  '/images/lang/docker_logo.png',
  '/images/lang/gitlab_logo.png',
  '/images/lang/go_logo.png',
  '/images/lang/python_logo.png',
  '/images/lang/rust_logo.png',
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
  '/images/OCR/neural-network.png',
  '/images/OCR/MorphologyWithErode.jpg',
  '/images/OCR/computer_vision.png',
  '/images/OCR/computer_vision.png',
  '/images/UpsideDown/UpsideDownBG.png',
  '/images/UpsideDown/drone.png',
  '/images/UpsideDown/generator.png',
  '/images/UpsideDown/Logo_S2game.png',
  '/images/UpsideDown/plasmaOrb.png',
  '/images/UpsideDown/map1_2.png',
  '/images/UpsideDown/map3_2.png',
  '/images/UpsideDown/map4_2.png',
  '/images/UpsideDown/map5.png',
  '/images/UpsideDown/map6.png',
  '/images/UpsideDown/agile_team.png',
  '/images/other/dline_1.png',
  '/images/other/dline_2.png',
  '/images/other/dline_3.png',

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
