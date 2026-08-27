<template>
  <article class="ud-content">
    <BackBtn />
    <div class="presentation" :style="{ '--hero': 'url(/images/UpsideDown/UpsideDownBG.png)' }">
      <div class="content">
        <img class="ud-logo" src="/images/UpsideDown/Logo_S2game.png" alt="">
        <h1 class="title presentation-title">{{ $t("ud.header.overlay") }}</h1>
        <p class="title-mini description text-less">

          {{ $t("ud.header.description.body.1") }}
          <br /><br />
          {{ $t("ud.header.description.body.2") }}

        </p>

        <a href="https://github.com/TheGostsniperfr/UpsideDown" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">Github</button>
        </a>
      </div>

      <!-- Inside the hero so it can be positioned against it; it used to be a sibling anchored
           to the initial containing block, which is why its placement was so brittle. -->
      <iframe class="trailer"
        src="https://www.youtube.com/embed/sOrQVRMt-bY?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&loop=1"
        title="Upside Down - Trailer" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
      </iframe>
    </div>

    <TechnoSection :blocks="technoBlocks" />

    <PresentationSection imageSrc="/images/UpsideDown/drone.png" imageAlt="Image of a drone"
      :overview="$t('ud.overview.overlay')" :title="$t('ud.overview.title')" dir="left">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t('ud.overview.description.1') }}
        </p>

      </template>
    </PresentationSection>

    <GridSection :title="$t('ud.maps.title')" :description="$t('ud.maps.description')" :blocks="MapGridBlocks" />

    <PresentationSection imageSrc="/images/UpsideDown/drone.png" imageAlt="Image of a drone"
      :overview="$t('ud.inside.overview')" :title="$t('ud.inside.title')" dir="right">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t('ud.inside.description.1') }}
          <br />
          {{ $t('ud.inside.description.2') }}
        </p>

      </template>
    </PresentationSection>

    <PresentationSection imageSrc="/images/UpsideDown/agile_team.png" imageAlt="Image of a drone"
      :overview="$t('ud.agile.overlay')" :title="$t('ud.agile.title')" dir="left">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t('ud.agile.description.1') }}
          <br />
          {{ $t('ud.agile.description.2') }}
        </p>

      </template>
    </PresentationSection>
  </article>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';
import GridSection from '~/components/GridSection.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useHead({
  title: () => t('projects.ud.title'),
  meta: [
    { name: 'description', content: () => t('ud.head.content') },
    { property: 'og:title', content: () => t('projects.ud.title') },
    { property: 'og:description', content: () => t('ud.head.content') },
    { property: 'og:image', content: '/images/UpsideDown/UpsideDownBG.png' },
  ],
  script: [
    {
      key: 'schema-org-creativework',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: t('projects.ud.title'),
        description: t('ud.head.content'),
        url: 'https://about.arffornia.com/Projects/UpsideDown',
        codeRepository: 'https://github.com/TheGostsniperfr/UpsideDown',
        dateCreated: '2023',
        keywords: [ 'Unity', 'C#', 'Game Design' ],
        author: { '@type': 'Person', name: 'Brian Perret' },
      }),
    },
  ],
});

onMounted(() => {
  const presentation = document.querySelector('.presentation');
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          presentation.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(presentation);
});

const technoBlocks = computed(() => ([
  {
    image: "/images/UpsideDown/logo_unity.png",
    title: t('ud.tech.blocks.1.title'),
    description: t('ud.tech.blocks.1.description'),
  },
  {
    image: "/images/UpsideDown/rtx_logo.jpg",
    title: t('ud.tech.blocks.2.title'),
    description: t('ud.tech.blocks.2.description'),
  },
  {
    image: "/images/lang/github-logo.png",
    title: t('ud.tech.blocks.3.title'),
    description: t('ud.tech.blocks.3.description'),
  },
  {
    image: "/images/UpsideDown/plasmaOrb.png",
    title: t('ud.tech.blocks.4.title'),
    description: t('ud.tech.blocks.4.description'),
  },
  {
    image: "/images/lang/CSharp_Logo.png",
    title: t('ud.tech.blocks.5.title'),
    description: t('ud.tech.blocks.5.description'),
  },
  {
    image: "/images/UpsideDown/blender_logo.png",
    title: t('ud.tech.blocks.6.title'),
    description: t('ud.tech.blocks.6.description'),
  }
]));

const MapGridBlocks = computed(() => ([
  {
    image: "/images/UpsideDown/map1_2.png",
    title: t('ud.maps.map.1.title'),
    description: t('ud.maps.map.1.description'),
  },
  {
    image: "/images/UpsideDown/UpsideDownBG.png",
    title: t('ud.maps.map.2.title'),
    description: t('ud.maps.map.2.description'),
  },
  {
    image: "/images/UpsideDown/map3_2.png",
    title: t('ud.maps.map.3.title'),
    description: t('ud.maps.map.3.description'),
  },
  {
    image: "/images/UpsideDown/map4_2.png",
    title: t('ud.maps.map.4.title'),
    description: t('ud.maps.map.4.description'),
  },
  {
    image: "/images/UpsideDown/map5.png",
    title: t('ud.maps.map.5.title'),
    description: t('ud.maps.map.5.description'),
  },
  {
    image: "/images/UpsideDown/map6.png",
    title: t('ud.maps.map.6.title'),
    description: t('ud.maps.map.6.description'),
  },
]));

</script>

