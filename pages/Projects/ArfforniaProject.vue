<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation">
            <div class="content">
                <p class="title-midle text-less">{{ $t("arffornia.header.overlay") }}</p>
                <p id="presentation-title" class="title">{{ $t("arffornia.header.title") }}</p>
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
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

const { t } = useI18n();

useHead({
    title: 'Arffornia Project',
    meta: [
        { name: 'description', content: t('arffornia.head.content') }
    ]
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
        { threshold: 0.5 }
    );

    observer.observe(presentation);
});

const technoBlocksWebsite = [
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
];

const technoBlocksLauncher = [
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
];

const technoBlocksInfra = [
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
];

const technoBlocksDevOps = [
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
];

const technoBlocksAll = [
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
];

</script>

<style scoped>
.redirectBtn {
    margin-top: 1.5em;
    width: 18em;
    height: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
}

.redirectBtn:hover {
    background-color: #25cee9;
    box-shadow: 0px 15px 20px rgba(46, 192, 229, 0.25);
    color: #fff;
    transform: translateY(-6px);
}

.ud-logo {
    max-height: 200px;
    transform: translate(-100px, 30px);
}

.trailer {
    border-radius: 10px;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    width: 125vh;
    height: 33vw;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 54px 55px, rgba(0, 0, 0, 0.25) 0px -12px 30px, rgba(0, 0, 0, 0.25) 0px 4px 6px, rgba(0, 0, 0, 0.34) 0px 12px 13px, rgba(0, 0, 0, 0.18) 0px -3px 5px;
}

.ud-content {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    color: #fff;
    font-family: WF Visual Sans, Arial, sans-serif;
    letter-spacing: .01em;
    line-height: 1.04;
}

.presentation {
    position: relative;
    width: 100vw;
    display: flex;
    color: white;
    overflow: hidden;
}

.presentation::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0) 100%),
        url('/images/Arffornia/lobby_arfforniaV4.png') center/cover no-repeat;
    z-index: 1;
    transform: scale(1.2);
    transition: transform 3.5s cubic-bezier(0.04, 0.68, 0.15, 1);
    filter: blur(3px);
}

.presentation.visible::before {
    transform: scale(1);
}

.presentation .content {
    position: relative;
    z-index: 10;
    padding-top: 6%;
    padding-left: 10%;
    max-width: 32%;
    padding-bottom: 15%;
    width: 100%;
}

.title {
    font-size: 3.7rem;
    font-weight: 600;
    margin: 0%;
}

.title-midle {
    font-size: 3rem;
    font-weight: 550;
    margin: 0%;
}

.title-mini {
    line-height: 150%;
    font-size: 1.3em;
    font-weight: 500;
    margin: 0%;
}

.text-less {
    color: #c2c2c2d3;
}

#presentation-title {
    padding-bottom: 50px;
}
</style>