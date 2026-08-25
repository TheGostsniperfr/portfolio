<template>
    <article class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/ACDC/logo_tp.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t("acdc.header.overlay") }}</p>
                <h1 class="title presentation-title">
                    {{ $t("acdc.header.title.1") }}
                    <br />
                    {{ $t("acdc.header.title.2") }}
                </h1>
                <p class="title-mini description text-less">
                    {{ $t("acdc.header.description.body.1") }}
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/ACDC/teaching.jpg" imageAlt="Devops schema" 
        :overview="$t('acdc.about.overlay')" :title="$t('acdc.about.title')" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t("acdc.about.description.1") }} 
                    <br />
                    {{ $t("acdc.about.description.2") }} 
                    <br />
                    {{ $t("acdc.about.description.3") }} 
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/TC/gitlab_cicd.png" imageAlt="Before and After Post processing"
        :overview="$t('acdc.designer.overlay')" :title="$t('acdc.designer.title')" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t("acdc.designer.description.1") }} 
                    <br />
                    {{ $t("acdc.designer.description.2") }} 
                </p>

            </template>
        </PresentationSection>
    </article>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

const { t } = useI18n();

useHead({
  title: () => t('projects.acdc.title'),
  meta: [
    { name: 'description', content: () => t('acdc.head.content') },
    { property: 'og:title', content: () => t('projects.acdc.title') },
    { property: 'og:description', content: () => t('acdc.head.content') },
    { property: 'og:image', content: '/images/ACDC/logo_tp.png' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: t('projects.acdc.title'),
        description: t('acdc.head.content'),
        url: 'https://about.arffornia.com/Projects/ACDC',
        dateCreated: '2024',
        keywords: [ 'Teaching', 'Design', 'Community' ],
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
        image: "/images/ACDC/teaching_logo.png",
        title: t('acdc.tech.blocks.1.title'),
        description: t('acdc.tech.blocks.1.description'),
    },
    {
        image: "/images/lang/CSharp_Logo.png",
        title: t('acdc.tech.blocks.2.title'),
        description: t('acdc.tech.blocks.2.description'),
    },
    {
        image: "/images/lang/rust_logo.png",
        title: t('acdc.tech.blocks.3.title'),
        description: t('acdc.tech.blocks.3.description'),
    }
]));

</script>

<style scoped>
</style>