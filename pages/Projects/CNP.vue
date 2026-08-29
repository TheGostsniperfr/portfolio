<template>
    <article class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/CNP/homelab.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t('cnp.header.overlay') }}</p>
                <h1 class="title presentation-title">{{ $t('cnp.header.title') }}</h1>
                <p class="title-mini description text-less">
                    {{ $t('cnp.header.description.1') }}
                    <br /><br />
                    {{ $t('cnp.header.description.2') }}
                </p>

                <a href="https://github.com/3-Istor" target="_blank" rel="noopener noreferrer">
                    <button class="redirectBtn">GitHub</button>
                </a>
            </div>
        </div>

        <PresentationSection imageSrc="/images/CNP/tech-panorama.png" imageAlt="Cartographie des technologies de CNP"
            :overview="$t('cnp.context.overview')" :title="$t('cnp.context.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.context.description.1') }}
                    <br /><br />
                    {{ $t('cnp.context.description.2') }}
                    <br />
                    {{ $t('cnp.context.description.3') }}
                    <br />
                    {{ $t('cnp.context.description.4') }}
                    <br />
                    {{ $t('cnp.context.description.5') }}
                    <br /><br />
                    {{ $t('cnp.context.description.6') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/architecture-technique.png" imageAlt="Schéma d'architecture détaillé de CNP"
            :overview="$t('cnp.architecture.overview')" :title="$t('cnp.architecture.title')" dir="right" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.architecture.description.1') }}
                    <br /><br />
                    {{ $t('cnp.architecture.description.2') }}
                    <br />
                    {{ $t('cnp.architecture.description.3') }}
                    <br />
                    {{ $t('cnp.architecture.description.4') }}
                    <br />
                    {{ $t('cnp.architecture.description.5') }}
                    <br /><br />
                    {{ $t('cnp.architecture.description.6') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/zero-trust-network.png" imageAlt="Sécurité des flux réseau"
            :overview="$t('cnp.security.overview')" :title="$t('cnp.security.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.security.description.1') }}
                    <br /><br />
                    {{ $t('cnp.security.description.2') }}
                    <br />
                    {{ $t('cnp.security.description.3') }}
                    <br />
                    {{ $t('cnp.security.description.4') }}
                    <br />
                    {{ $t('cnp.security.description.5') }}
                    <br /><br />
                    {{ $t('cnp.security.description.6') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/isolation-logique.png" imageAlt="Isolation logique via Keycloak, Vault et Grafana"
            :overview="$t('cnp.isolation.overview')" :title="$t('cnp.isolation.title')" dir="right" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.isolation.description.1') }}
                    <br /><br />
                    {{ $t('cnp.isolation.description.2') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/services-catalog.png" imageAlt="Catalogue des services disponibles pour un développeur"
            :overview="$t('cnp.selfservice.overview')" :title="$t('cnp.selfservice.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.selfservice.description.1') }}
                    <br /><br />
                    {{ $t('cnp.selfservice.description.2') }}
                    <br />
                    {{ $t('cnp.selfservice.description.3') }}
                    <br />
                    {{ $t('cnp.selfservice.description.4') }}
                    <br /><br />
                    {{ $t('cnp.selfservice.description.5') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/homelab.png" imageAlt="Le rack réseau du HomeLab, en vrai"
            :overview="$t('cnp.homelab.overview')" :title="$t('cnp.homelab.title')" dir="right">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.homelab.description.1') }}
                    <br /><br />
                    {{ $t('cnp.homelab.description.2') }}
                    <br /><br />
                    {{ $t('cnp.homelab.description.3') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/OffhoursGuard/logo.png" imageAlt="Offhours-Guard"
            :overview="$t('cnp.offhoursguard.overview')" :title="$t('cnp.offhoursguard.title')" dir="left">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.offhoursguard.description.1') }}
                </p>
                <ProjectLinkBtn to="/Projects/OffhoursGuard" :title="$t('cnp.offhoursguard.link')" />
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/homelab.png" imageAlt="Le HomeLab où sont survenus les incidents"
            :overview="$t('cnp.results.overview')" :title="$t('cnp.results.title')" dir="right">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.results.description.1') }}
                    <br /><br />
                    {{ $t('cnp.results.description.2') }}
                    <br /><br />
                    {{ $t('cnp.results.description.3') }}
                </p>
            </template>
        </PresentationSection>

        <TechnoSection :blocks="resultsBlocks" :title="$t('cnp.results.tech.title')" />

        <PresentationSection imageSrc="/images/CNP/gitops-day2.png" imageAlt="Cycle de vie Day-2, réconciliation GitOps"
            :overview="$t('cnp.decisions.overview')" :title="$t('cnp.decisions.title')" dir="left" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.decisions.description.1') }}
                    <br />
                    {{ $t('cnp.decisions.description.2') }}
                    <br />
                    {{ $t('cnp.decisions.description.3') }}
                </p>
            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/CNP/provisioning-day0.png" imageAlt="Flux de provisioning Day-0 d'une application"
            :overview="$t('cnp.outcome.overview')" :title="$t('cnp.outcome.title')" dir="right" imageFit="contain">
            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('cnp.outcome.description.1') }}
                    <br />
                    {{ $t('cnp.outcome.description.2') }}
                    <br />
                    {{ $t('cnp.outcome.description.3') }}
                    <br /><br />
                    {{ $t('cnp.outcome.description.4') }}
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
import ProjectLinkBtn from '~/components/ProjectLinkBtn.vue';

const { t } = useI18n();

useHead({
    title: () => t('projects.cnp.title'),
    meta: [
        { name: 'description', content: () => t('cnp.head.content') },
        { property: 'og:title', content: () => t('projects.cnp.title') },
        { property: 'og:description', content: () => t('cnp.head.content') },
        { property: 'og:image', content: '/images/CNP/homelab.png' },
    ],
    script: [
        {
            key: 'schema-org-creativework',
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: t('projects.cnp.title'),
                description: t('cnp.head.content'),
                url: 'https://about.arffornia.com/Projects/CNP',
                codeRepository: 'https://github.com/3-Istor',
                dateCreated: '2026',
                keywords: [ 'Kubernetes', 'GitOps', 'Terraform', 'Vault', 'Keycloak', 'OpenStack', 'Platform Engineering' ],
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

const resultsBlocks = computed(() => ([
    { image: '/images/lang/grafana_logo.png', title: t('cnp.results.tech.blocks.1.title'), description: t('cnp.results.tech.blocks.1.description') },
    { image: '/images/lang/argocd_logo.png', title: t('cnp.results.tech.blocks.2.title'), description: t('cnp.results.tech.blocks.2.description') },
    { image: '/images/lang/github-logo.png', title: t('cnp.results.tech.blocks.3.title'), description: t('cnp.results.tech.blocks.3.description') },
    { image: '/images/lang/kubernetes_logo.png', title: t('cnp.results.tech.blocks.4.title'), description: t('cnp.results.tech.blocks.4.description') },
    { image: '/images/lang/docker_logo.png', title: t('cnp.results.tech.blocks.5.title'), description: t('cnp.results.tech.blocks.5.description') },
    { image: '/images/lang/linux_logo.png', title: t('cnp.results.tech.blocks.6.title'), description: t('cnp.results.tech.blocks.6.description') },
]));
</script>
