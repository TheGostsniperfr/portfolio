<template>
    <article class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/DockAir/logo-wordmark.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t('dockair.header.overlay') }}</p>
                <h1 class="title presentation-title">{{ $t('dockair.header.title') }}</h1>
                <p class="title-mini description text-less">
                    {{ $t('dockair.header.description.1') }}
                    <br /><br />
                    {{ $t('dockair.header.description.2') }}
                </p>
            </div>
        </div>

        <PresentationSection imageSrc="/images/DockAir/tech-cartography.png" imageAlt="Cartographie des technologies de la plateforme DockAir"
            :overview="$t('dockair.context.overview')" :title="$t('dockair.context.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('dockair.context.description.1') }}
                    <br /><br />
                    {{ $t('dockair.context.description.2') }}
                    <br /><br />
                    {{ $t('dockair.context.description.3') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/DockAir/architecture-globale.png" imageAlt="Schéma d'architecture technique globale de DockAir"
            :overview="$t('dockair.architecture.overview')" :title="$t('dockair.architecture.title')" dir="right" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('dockair.architecture.description.1') }}
                    <br /><br />
                    {{ $t('dockair.architecture.description.2') }}
                    <br /><br />
                    {{ $t('dockair.architecture.description.3') }}
                </p>
            </template>
        </PresentationSection>

        <TechnoSection :blocks="catalogBlocks" :title="$t('dockair.catalog.title')" />

        <PresentationSection imageSrc="/images/DockAir/architecture-globale.png" imageAlt="Schéma d'architecture technique globale de DockAir"
            :overview="$t('dockair.decisions.overview')" :title="$t('dockair.decisions.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('dockair.decisions.description.1') }}
                    <br />
                    {{ $t('dockair.decisions.description.2') }}
                    <br />
                    {{ $t('dockair.decisions.description.3') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/DockAir/linear-kanban.png" imageAlt="Kanban Linear de l'équipe SOCLE"
            :overview="$t('dockair.org.overview')" :title="$t('dockair.org.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('dockair.org.description.1') }}
                    <br /><br />
                    {{ $t('dockair.org.description.2') }}
                    <br /><br />
                    {{ $t('dockair.org.description.3') }}
                </p>
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

const { t } = useI18n();

useHead({
    title: () => t('projects.dockair.title'),
    meta: [
        { name: 'description', content: () => t('dockair.head.content') },
        { property: 'og:title', content: () => t('projects.dockair.title') },
        { property: 'og:description', content: () => t('dockair.head.content') },
        { property: 'og:image', content: '/images/DockAir/logo.png' },
    ],
    script: [
        {
            key: 'schema-org-creativework',
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: t('projects.dockair.title'),
                description: t('dockair.head.content'),
                url: 'https://about.arffornia.com/Projects/DockAir',
                dateCreated: '2026',
                keywords: [ 'Kubernetes', 'Talos Linux', 'Cilium', 'ArgoCD', 'Vault', 'RabbitMQ', 'Platform Engineering', 'SOA' ],
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

const catalogBlocks = computed(() => ([
    { image: '/images/lang/kubernetes_logo.png', title: t('dockair.catalog.blocks.1.title'), description: t('dockair.catalog.blocks.1.description') },
    { image: '/images/lang/argocd_logo.png', title: t('dockair.catalog.blocks.2.title'), description: t('dockair.catalog.blocks.2.description') },
    { image: '/images/lang/gitlab_logo.png', title: t('dockair.catalog.blocks.3.title'), description: t('dockair.catalog.blocks.3.description') },
    { image: '/images/lang/docker_logo.png', title: t('dockair.catalog.blocks.4.title'), description: t('dockair.catalog.blocks.4.description') },
    { image: '/images/lang/grafana_logo.png', title: t('dockair.catalog.blocks.5.title'), description: t('dockair.catalog.blocks.5.description') },
    { image: '/images/lang/python_logo.png', title: t('dockair.catalog.blocks.6.title'), description: t('dockair.catalog.blocks.6.description') },
]));
</script>
