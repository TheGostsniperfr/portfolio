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

  <!-- Language Selector -->
  <div class="lang-selector">
    <button @click="setLocale('fr')" :class="{ active: locale === 'fr' }" title="Switch to French">
      <img src="/images/other/lang/fr.png" alt="French" />
    </button>
    <button @click="setLocale('en')" :class="{ active: locale === 'en' }" title="Switch to English">
      <img src="/images/other/lang/en.png" alt="English" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale, setLocale } = useI18n();

const activeLink = ref('');
const route = useRoute();

const updateActiveLink = () => {
  activeLink.value = route.hash || route.path;
};

watch(route, () => {
  updateActiveLink();
});

updateActiveLink();
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

.lang-selector {
  position: absolute;
  top: 0%;
  right: 2.5%;
  z-index: 1000;
}

.lang-selector button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s ease;

}

.lang-selector img {
  width: 28px;
  height: 28px;
  opacity: 0.7;
  transition: opacity 0.25s ease;

}

.lang-selector img:hover {
  opacity: 1;
}

</style>
