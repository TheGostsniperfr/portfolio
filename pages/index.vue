<template>
  <div class="index-content">
    <div v-if="!loading">
      <HomePage />
    </div>
    <div v-else>
      <LoadingBar ref="loadingBar" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoadingBar from '@/components/LoadingBar.vue';
import HomePage from '@/components/HomePage.vue';

export default Vue.extend({
  components: {
    LoadingBar,
    HomePage
  },
  data() {
    return {
      loading: true
    };
  },
  async mounted() {
    const images: string[] = [
      
      // Arffornia
      '/img/Arffornia/launcher_homepage.png',
      '/img/Arffornia/launcher_homepageV4.png',
      '/img/Arffornia/website_homepage.png',
      '/img/Arffornia/map/v.2 (1).png',
      '/img/Arffornia/map/v.2 (2).png',
      '/img/Arffornia/map/v.4 (1).png',
      '/img/Arffornia/map/v.4 (2).png',

      // OCR
      '/img/OCR/logo.png',
      '/img/OCR/ArtificialNeuronModel_francais.png',
      '/img/OCR/hard_grid.jpg',
      '/img/OCR/image_04.jpg',
      '/img/OCR/MorphologyWithErode.jpg',

      // Upside Down
      '/img/UpsideDown/UpsideDownBG.png',
      '/img/UpsideDown/drone.png',
      '/img/UpsideDown/generator.png',
      '/img/UpsideDown/Logo_S2game.png',
      '/img/UpsideDown/plasmaOrb.png'
    ];

    await this.$loadImages(images, (loaded: number, total: number) => {
      // @ts-ignore
      this.$refs.loadingBar.updateProgress(loaded, total);
    });

    this.loading = false;
  }
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
