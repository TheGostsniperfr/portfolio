<!-- components/NavBar.vue -->
<template>
  <div class="navbar-container">
    <!-- Projects -->
    <a href="#Projects" class="link-container" :class="{ active: activeLink === '#Projects' }">Projects</a>
    <div class="link-dot" :class="{ dim: activeLink !== '#About' && activeLink !== '#Projects' }">•</div>

    <!-- About -->
    <div class="ancre-wrapper">
      <a href="#About" class="link-container" :class="{ active: activeLink === '#About' }">About</a>
    </div>
    <div class="link-dot" :class="{ dim: activeLink !== '#About' && activeLink !== '#Audiovisual' }">•</div>

    <!-- Audiovisual -->
    <a href="#Audiovisual" class="link-container" :class="{ active: activeLink === '#Audiovisual' }">Audiovisual</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeLink = ref('');

const updateActiveLink = () => {
  activeLink.value = window.location.hash || '#About';
};

onMounted(() => {
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', updateActiveLink);
});
</script>

<style scoped>
.navbar-container {
  position: absolute;
  top: 2.5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15%;
  z-index: 5000;
}

.link-container {
  color: #fff;
  font-size: 1.1em;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.6s ease;
}

.link-container:not(.active) {
  opacity: 0.5;
}

.link-container:hover {
  opacity: 1;
}

.link-dot {
  font-size: 1em;
  font-weight: 650;
  color: #fff;
  transition: opacity 0.3s ease;
}

.link-dot.dim {
  opacity: 0.3;
}
</style>
