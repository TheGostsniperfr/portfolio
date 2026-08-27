<template>
    <article class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/TC/logo_back.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t("tc.header.overlay") }}</p>
                <h1 class="title presentation-title">{{ $t("tc.header.title") }}</h1>
                <p class="title-mini description text-less">
                    {{ $t("tc.header.description.body.1") }}
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema"
            :overview="$t('tc.devops.overlay')" :title="$t('tc.devops.title')" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t("tc.devops.description.1") }}
                    <br />
                    {{ $t("tc.devops.description.2") }}
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/TC/gitlab_cicd.png" imageAlt="Before and After Post processing"
        :overview="$t('tc.feedback.overlay')" :title="$t('tc.feedback.title')" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t("tc.feedback.description.1") }}
                    <br />
                    {{ $t("tc.feedback.description.2") }}
                    <br />
                    {{ $t("tc.feedback.description.3") }}
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
    title: () => t('projects.tc.title'),
    meta: [
        { name: 'description', content: () => t('tc.head.content') },
        { property: 'og:title', content: () => t('projects.tc.title') },
        { property: 'og:description', content: () => t('tc.head.content') },
        { property: 'og:image', content: '/images/TC/logo_back.png' },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: t('projects.tc.title'),
                description: t('tc.head.content'),
                url: 'https://about.arffornia.com/Projects/Toolchain',
                dateCreated: '2024',
                keywords: [ 'Docker', 'GitLab CI', 'DevOps' ],
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
        image: "/images/lang/docker_logo.png",
        title: t('tc.tech.blocks.1.title'),
        description: t('tc.tech.blocks.1.description'),
    },
    {
        image: "/images/lang/gitlab_logo.png",
        title: t('tc.tech.blocks.2.title'),
        description: t('tc.tech.blocks.2.description'),
    },
    {
        image: "/images/lang/go_logo.png",
        title: t('tc.tech.blocks.3.title'),
        description: t('tc.tech.blocks.3.description'),
    },
    {
        image: "/images/lang/python_logo.png",
        title: t('tc.tech.blocks.4.title'),
        description: t('tc.tech.blocks.4.description'),
    },
    {
        image: "/images/lang/CSharp_Logo.png",
        title: t('tc.tech.blocks.5.title'),
        description: t('tc.tech.blocks.5.description'),
    },
    {
        image: "/images/lang/C_Logo.png",
        title: t('tc.tech.blocks.6.title'),
        description: t('tc.tech.blocks.6.description'),
    },
    {
        image: "/images/lang/rust_logo.png",
        title: t('tc.tech.blocks.7.title'),
        description: t('tc.tech.blocks.7.description'),
    }
]));

</script>

