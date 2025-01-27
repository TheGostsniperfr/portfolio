<template>
  <div class="navbar-container">
    <!-- Projects -->
    <NuxtLink
      to="/Projects"
      class="link-container"
      :class="{ active: activeLink === '/Projects' }"
    >
      Projects
    </NuxtLink>
    <div class="link-dot" :class="{ dim: activeLink !== '/About' && activeLink !== '/Projects' }">•</div>

    <!-- About -->
    <div class="ancre-wrapper">
      <NuxtLink
        to="/About"
        class="link-container"
        :class="{ active: activeLink === '/About' }"
      >
        About
      </NuxtLink>
    </div>
    <div class="link-dot" :class="{ dim: activeLink !== '/About' && activeLink !== '#Audiovisual' }">•</div>

    <!-- Audiovisual -->
    <NuxtLink
      to="#Audiovisual"
      class="link-container"
      :class="{ active: activeLink === '#Audiovisual' }"
    >
      Audiovisual
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const activeLink = ref('');
const route = useRoute();

// Met à jour `activeLink` avec le hash ou le path actuel
const updateActiveLink = () => {
  activeLink.value = route.hash || route.path;
};

onMounted(() => {
  updateActiveLink(); // Initialise la valeur au montage
  window.addEventListener('hashchange', updateActiveLink); // Écoute les changements d'ancre
});

onUnmounted(() => {
  window.removeEventListener('hashchange', updateActiveLink); // Nettoyage au démontage
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
