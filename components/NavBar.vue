<template>
  <div class="navbar-container">
    <!-- About -->
    <div class="ancre-wrapper">
      <NuxtLink
        to="/About"
        class="link-container"
        :class="{ active: activeLink === '/About' }"
      >
      {{ $t("navbar.links.about") }}
      </NuxtLink>
    </div>
    <div class="link-dot" :class="{ dim: activeLink === '/Projects' }">•</div>

    <!-- Projects -->
    <NuxtLink
      to="/Projects"
      class="link-container"
      :class="{ active: activeLink === '/Projects' }"
    >
    {{ $t("navbar.links.projects") }}
    </NuxtLink>

    <!-- The Audiovisual entry pointed at #Audiovisual, an anchor that exists nowhere. Its
         translation keys are kept so the link is a two-line restore once the page exists. -->
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

// Match on the section, not the exact path, so /Projects/UpsideDown still highlights Projects.
const updateActiveLink = () => {
  if (route.hash) {
    activeLink.value = route.hash;
    return;
  }
  const section = [ '/Projects', '/About' ].find(
    (base) => route.path === base || route.path.startsWith(`${base}/`)
  );
  activeLink.value = section || route.path;
};

watch(route, () => {
  updateActiveLink();
});

updateActiveLink();
</script>

<style scoped>
/* gap: 15% resolved against a shrink-to-fit box, so the spacing was undefined in practice. */
.navbar-container {
  position: absolute;
  top: max(2.5vh, env(safe-area-inset-top, 0px));
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 3vw, 3.5rem);
  z-index: 5000;
}

.link-container {
  color: #fff;
  font-size: clamp(0.85rem, 0.75rem + 0.4vw, 1.1rem);
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.6s ease;
  white-space: nowrap;
  padding: 0.5rem 0.25rem;
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
  top: max(1.5vh, env(safe-area-inset-top, 0px));
  right: max(1rem, env(safe-area-inset-right, 0px));
  display: flex;
  z-index: 5001;
}

/* 44px minimum so the flags are actually tappable on a phone. */
.lang-selector button {
  display: grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s ease;
}

.lang-selector img {
  width: clamp(22px, 5vw, 28px);
  height: clamp(22px, 5vw, 28px);
  opacity: 0.7;
  transition: opacity 0.25s ease;
}

.lang-selector img:hover,
.lang-selector button:focus-visible img {
  opacity: 1;
}

/* Three links, two flags and (on project pages) a Back button cannot share one strip on a
   phone. Below this the links move to their own row underneath, which needs no truncation. */
@media (max-width: 680px) {
  .navbar-container {
    /* Clears the 44px Back button that sits at the top-left of every project page. */
    top: 5rem;
    gap: 1.1rem;
  }

  .link-dot {
    display: none;
  }

  .link-container {
    font-size: 0.85rem;
  }
}

</style>
