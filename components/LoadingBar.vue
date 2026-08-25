<!-- components/LoadingBar.vue -->
<template>
    <div class="loading-container">
      <p class="progress">{{ progress }}%</p>
    </div>
  </template>
  
  <script setup lang="ts">
  
  defineProps({
    progress: {
      type: Number,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .loading-container {
    background-color: #141414;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100dvh;
  }
  
  .progress {
    color: #fff;
    font-size: 2rem;
  }
  </style>
  