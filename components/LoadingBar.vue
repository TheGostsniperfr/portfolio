<template>
    <div v-if="loading" class="loading-container">
      <p class="progress">{{ progress }}%</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true,
        progress: 0
      };
    },
    methods: {
      updateProgress(loaded, total) {
        this.progress = Math.floor((loaded / total) * 100);
        if (this.progress >= 100) {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .progress {
    color: #fff;
  }
  </style>
  