<template>
  <h1 class="sr-only">{{ t('projects.head.content') }}</h1>
  <ProjectCarousel />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectCarousel from '~/components/carousel/ProjectCarousel.vue'

const { t } = useI18n()

useHead({
  title: 'Projects',
  meta: [
    { name: 'description', content: t('projects.head.content') },
    { property: 'og:title', content: 'Brian Perret - Projects' },
    { property: 'og:description', content: t('projects.head.content') },
  ],
})
</script>
