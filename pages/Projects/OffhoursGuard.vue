<template>
    <article class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/CNP/homelab.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t('offhoursguard.header.overlay') }}</p>
                <h1 class="title presentation-title">{{ $t('offhoursguard.header.title') }}</h1>
                <p class="title-mini description text-less">
                    {{ $t('offhoursguard.header.description.1') }}
                    <br /><br />
                    {{ $t('offhoursguard.header.description.2') }}
                </p>

                <a href="https://github.com/TheGostsniperfr/offhours-guard" target="_blank" rel="noopener noreferrer">
                    <button class="redirectBtn">GitHub</button>
                </a>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/lang/kubernetes_logo.png" imageAlt="Opérateur Kubernetes Offhours-Guard"
            :overview="$t('offhoursguard.how.overview')" :title="$t('offhoursguard.how.title')" dir="left">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('offhoursguard.how.description.1') }}
                    <br /><br />
                    {{ $t('offhoursguard.how.description.2') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/gatus-icon.png" imageAlt="Icône Gatus, l'outil de health-check de CNP"
            :overview="$t('offhoursguard.monitoring.overview')" :title="$t('offhoursguard.monitoring.title')" dir="right" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('offhoursguard.monitoring.description.1') }}
                    <br /><br />
                    {{ $t('offhoursguard.monitoring.description.2') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/homelab.png" imageAlt="Le HomeLab CNP, où tourne Offhours-Guard"
            :overview="$t('offhoursguard.outcome.overview')" :title="$t('offhoursguard.outcome.title')" dir="left">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('offhoursguard.outcome.description.1') }}
                    <br /><br />
                    {{ $t('offhoursguard.outcome.description.2') }}
                </p>
                <ProjectLinkBtn to="/Projects/CNP" :title="$t('offhoursguard.outcome.link')" />
            </template>
        </PresentationSection>
    </article>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import BackBtn from '~/components/BackBtn.vue';
import PresentationSection from '~/components/PresentationSection.vue';
import TechnoSection from '~/components/TechnoSection.vue';
import ProjectLinkBtn from '~/components/ProjectLinkBtn.vue';

const { t } = useI18n();

useHead({
    title: () => t('projects.offhoursguard.title'),
    meta: [
        { name: 'description', content: () => t('offhoursguard.head.content') },
        { property: 'og:title', content: () => t('projects.offhoursguard.title') },
        { property: 'og:description', content: () => t('offhoursguard.head.content') },
        { property: 'og:image', content: '/images/lang/kubernetes_logo.png' },
    ],
    script: [
        {
            key: 'schema-org-creativework',
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: t('projects.offhoursguard.title'),
                description: t('offhoursguard.head.content'),
                url: 'https://about.arffornia.com/Projects/OffhoursGuard',
                codeRepository: 'https://github.com/TheGostsniperfr/offhours-guard',
                dateCreated: '2026',
                keywords: [ 'Go', 'Kubernetes', 'Operator', 'FinOps' ],
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
    { image: '/images/lang/go_logo.png', title: t('offhoursguard.tech.blocks.1.title'), description: t('offhoursguard.tech.blocks.1.description') },
    { image: '/images/lang/kubernetes_logo.png', title: t('offhoursguard.tech.blocks.2.title'), description: t('offhoursguard.tech.blocks.2.description') },
    { image: '/images/lang/docker_logo.png', title: t('offhoursguard.tech.blocks.3.title'), description: t('offhoursguard.tech.blocks.3.description') },
    { image: '/images/lang/github-logo.png', title: t('offhoursguard.tech.blocks.4.title'), description: t('offhoursguard.tech.blocks.4.description') },
]));
</script>
