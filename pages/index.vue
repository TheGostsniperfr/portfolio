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

useHead({
  title: 'Brian Perret',
  meta: [
    { name: 'description', content: 'Loading Brian\'s Portfolio' }
  ]
});

const imageList = [
  '/images/lang/C_Logo.png',
  '/images/lang/CSharp_Logo.png',
  '/images/lang/github-logo.png',
  '/images/lang/docker_logo.png',
  '/images/lang/gitlab_logo.png',
  '/images/lang/go_logo.png',
  '/images/lang/python_logo.png',
  '/images/lang/rust_logo.png',
  '/images/lang/argocd_logo.png',
  '/images/lang/electron_logo.svg',
  '/images/lang/grafana_logo.png',
  '/images/lang/java_logo.png',
  '/images/lang/kubernetes_logo.png',
  '/images/lang/laravel_logo.svg',
  '/images/lang/mysql_logo.png',
  '/images/lang/php_logo.png',
  '/images/lang/proxmox_logo.png',
  '/images/lang/typescript_logo.png',
  '/images/lang/vuejs_logo.png',
  '/images/lang/nuxt_logo.svg',
  '/images/lang/linux_logo.png',
  '/images/other/test_image_16_9.jpg',
  '/images/Arffornia/launcher_homepage.png',
  '/images/Arffornia/launcher_homepageV4.png',
  '/images/Arffornia/website_homepage.png',
  '/images/Arffornia/map/v.2 (1).png',
  '/images/Arffornia/map/v.2 (2).png',
  '/images/Arffornia/map/v.4 (1).png',
  '/images/Arffornia/map/v.4 (2).png',
  '/images/Arffornia/lobby_arfforniaV4.png',
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
  '/images/TC/devops.png',
  '/images/TC/logo_back.png',
  '/images/TC/gitlab_cicd.png',
  '/images/ACDC/teaching_logo.png',
  '/images/ACDC/logo_tp.png',
  '/images/other/me.png',
  '/images/other/dynmap.png',
  '/images/ACDC/teaching.jpg',
  '/images/other/camera-operator.png'
];

const { progress, loadImages } = useImagePreloader(imageList);

const router = useRouter()

onMounted(async () => {
  await loadImages();
  router.push('/About');
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
