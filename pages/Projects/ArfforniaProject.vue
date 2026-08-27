<template>
    <article class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/Arffornia/lobby_arfforniaV4.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t("arffornia.header.overlay") }}</p>
                <h1 class="title presentation-title">{{ $t("arffornia.header.title") }}</h1>
                <p class="title-mini description text-less">
                    {{ $t("arffornia.header.description.body.1") }}
                    <br />
                    <i18n-t keypath="arffornia.header.description.body.2">
                        <template #Laravel>
                            <b>{{ $t("arffornia.header.description.body.laravel") }}</b>
                        </template>
                        <template #MySQL>
                            <b>{{ $t("arffornia.header.description.body.mysql") }}</b>
                        </template>
                        <template #Electron>
                            <b>{{ $t("arffornia.header.description.body.electron") }}</b>
                        </template>
                        <template #Kubernetes>
                            <b>{{ $t("arffornia.header.description.body.Kubernetes") }}</b>
                        </template>
                        <template #Proxmox>
                            <b>{{ $t("arffornia.header.description.body.Proxmox") }}</b>
                        </template>
                    </i18n-t>

                    <br />
                    {{ $t("arffornia.header.description.body.3") }}
                    <br />
                    {{ $t("arffornia.header.description.body.4") }}
                </p>

                <a href="https://github.com/Arffornia" target="_blank" rel="noopener noreferrer">
                    <button class="redirectBtn">Github</button>
                </a>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocksAll" :title="$t('arffornia.globalTech.title')" />

        <PresentationSection imageSrc="/images/other/dynmap.png" imageAlt="Devops schema"
            :overview="$t('arffornia.overview.overlay')" :title="$t('arffornia.overview.title')" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('arffornia.overview.description.1') }}
                    <br /><br />
                    {{ $t('arffornia.overview.description.2') }}
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/Arffornia/launcher_homepage.png" imageAlt="Devops schema"
            :overview="$t('arffornia.electron.overlay')" :title="$t('arffornia.electron.title')" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('arffornia.electron.description.1') }}
                    <br /><br />
                    {{ $t('arffornia.electron.description.2') }}
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksLauncher" :title="$t('arffornia.launcherTech.title')" />

        <PresentationSection imageSrc="/images/Arffornia/website_homepage.png" imageAlt="Devops schema"
            :overview="$t('arffornia.website.overlay')" :title="$t('arffornia.website.title')" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('arffornia.website.description.1') }}
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksWebsite" :title="$t('arffornia.websiteTech.title')" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema"
            :overview="$t('arffornia.infra.overlay')" :title="$t('arffornia.infra.title')" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t('arffornia.infra.description.1') }}
                    <br /><br />
                    {{ $t('arffornia.infra.description.2') }}
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksDevOps" :title="$t('arffornia.infraTech.title')" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema"
            :overview="$t('arffornia.devops.overlay')" :title="$t('arffornia.devops.title')" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    <i18n-t keypath="arffornia.devops.description.1">
                        <template #philosophy>
                            <b>{{ $t("arffornia.devops.description.philosophy") }}</b>
                        </template>
                    </i18n-t>
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksInfra" :title="$t('arffornia.devopsTech.title')" />
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
    title: () => t('projects.arffornia.title'),
    meta: [
        { name: 'description', content: () => t('arffornia.head.content') },
        { property: 'og:title', content: () => t('projects.arffornia.title') },
        { property: 'og:description', content: () => t('arffornia.head.content') },
        { property: 'og:image', content: '/images/Arffornia/launcher_homepage.png' },
    ],
    script: [
        {
            key: 'schema-org-creativework',
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: t('projects.arffornia.title'),
                description: t('arffornia.head.content'),
                url: 'https://about.arffornia.com/Projects/ArfforniaProject',
                codeRepository: 'https://github.com/Arffornia',
                dateCreated: '2024',
                keywords: [ 'Kubernetes', 'Laravel', 'Electron' ],
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

const technoBlocksWebsite = computed(() => ([
    {
        image: "/images/lang/laravel_logo.svg",
        title: "Laravel",
        description: t('arffornia.globalTech.blocks.laravel'),
    },
    {
        image: "/images/lang/php_logo.png",
        title: "PHP",
        description: t('arffornia.globalTech.blocks.php'),
    },
    {
        image: "/images/lang/mysql_logo.png",
        title: "MySQL",
        description: t('arffornia.globalTech.blocks.mysql'),
    },
    {
        image: "/images/lang/typescript_logo.png",
        title: "Typescript",
        description: t('arffornia.globalTech.blocks.typescript'),
    }
]));

const technoBlocksLauncher = computed(() => ([
    {
        image: "/images/lang/electron_logo.svg",
        title: "Electron",
        description: t('arffornia.globalTech.blocks.electron'),
    },
    {
        image: "/images/lang/typescript_logo.png",
        title: "Typescript",
        description: t('arffornia.globalTech.blocks.typescript'),
    },
    {
        image: "/images/lang/java_logo.png",
        title: "Java / JavaFX",
        description: t('arffornia.launcherTech.blocks.java'),
    }
]));

const technoBlocksInfra = computed(() => ([
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: t('arffornia.globalTech.blocks.kubernetes'),
    },
    {
        image: "/images/lang/proxmox_logo.png",
        title: "Proxmox",
        description: t('arffornia.globalTech.blocks.proxmox'),
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: t('arffornia.globalTech.blocks.github'),
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: t('arffornia.globalTech.blocks.docker'),
    },
    {
        image: "/images/lang/argocd_logo.png",
        title: "ArgoCD",
        description: t('arffornia.globalTech.blocks.argocd'),
    },
    {
        image: "/images/lang/grafana_logo.png",
        title: "Grafana",
        description: t('arffornia.globalTech.blocks.grafana'),
    }
]));

const technoBlocksDevOps = computed(() => ([
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: t('arffornia.globalTech.blocks.kubernetes'),
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: t('arffornia.globalTech.blocks.docker'),
    },
    {
        image: "/images/lang/argocd_logo.png",
        title: "ArgoCD",
        description: t('arffornia.globalTech.blocks.argocd'),
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: t('arffornia.globalTech.blocks.github'),
    }
]));

const technoBlocksAll = computed(() => ([
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: t('arffornia.globalTech.blocks.kubernetes'),
    },
    {
        image: "/images/lang/electron_logo.svg",
        title: "Electron",
        description: t('arffornia.globalTech.blocks.electron'),
    },
    {
        image: "/images/lang/laravel_logo.svg",
        title: "Laravel",
        description: t('arffornia.globalTech.blocks.laravel'),
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: t('arffornia.globalTech.blocks.docker'),
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: t('arffornia.globalTech.blocks.github'),
    },
    {
        image: "/images/lang/java_logo.png",
        title: "Java / JavaFX",
        description: t('arffornia.globalTech.blocks.java'),
    },
    {
        image: "/images/lang/php_logo.png",
        title: "PHP",
        description: t('arffornia.globalTech.blocks.php'),
    },
    {
        image: "/images/lang/mysql_logo.png",
        title: "MySQL",
        description: t('arffornia.globalTech.blocks.mysql'),
    },
    {
        image: "/images/lang/typescript_logo.png",
        title: "Typescript",
        description: t('arffornia.globalTech.blocks.typescript'),
    },
    {
        image: "/images/lang/proxmox_logo.png",
        title: "Proxmox",
        description: t('arffornia.globalTech.blocks.proxmox'),
    },
    {
        image: "/images/lang/argocd_logo.png",
        title: "ArgoCD",
        description: t('arffornia.globalTech.blocks.argocd'),
    },
    {
        image: "/images/lang/grafana_logo.png",
        title: "Grafana",
        description: t('arffornia.globalTech.blocks.grafana'),
    }
]));

</script>

<style scoped>
</style>