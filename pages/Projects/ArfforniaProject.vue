<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation">
            <div class="content">
                <p class="title-midle text-less">Arffornia — 2016-Today</p>
                <p id="presentation-title" class="title">A Decade of Learning and Innovation</p>
                <p class="title-mini description text-less">
                    Arffornia is more than a Minecraft server.<br />
                    It's a whole ecosystem combining a <b>Laravel</b> website with
                    <b>MySQL</b>, an <b>Electron</b> game launcher, interconnected server instances with a Velocity
                    proxy, and
                    a
                    scalable <b>Kubernetes</b> (k8s) infrastructure for high availability. Built on
                    <b>Proxmox</b>-managed
                    virtualization, this 9+ year project has been my playground for learning, innovation, and technical
                    refinement.<br />
                    And much more.
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocksAll" title="Global Technologies" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="Overview"
            title="Arffornia Project" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    Arffornia is a Minecraft modded server where players can create technological, magical, and diverse
                    cities, embark on adventures with friends, and share unforgettable moments with the
                    community.<br /><br />

                    The 5th season, set to release in a few months, is currently in development and will feature major
                    updates, including a new launcher, an improved website, and the introduction of a progression stage
                    system across various mods.
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/Arffornia/launcher_homepage.png" imageAlt="Devops schema" overview="Electron App"
            title="Arffornia Launcher" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    The game launcher allows users with just two clicks to login (using Microsoft Account), download
                    and install the game along
                    with all its mods, configure settings, Java version and start playing all in a highly intuitive and
                    user-friendly
                    way on Windows, Mac and Linux. <br /><br />

                    Initially developed using JavaFX, I switched to Electron to speed up development and leverage
                    enhanced front-end capabilities using Vue.js. This transition allowed me to create a more modern and
                    visually appealing application, simplifying tasks that would have been complex and time-consuming to
                    achieve with JavaFX.
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksLauncher" title="Launcher Technologies" />

        <PresentationSection imageSrc="/images/Arffornia/website_homepage.png" imageAlt="Devops schema" overview="Laravel Website"
            title="Arffornia Website" dir="left">
            
            <template #description>
                <p class="title-mini description text-less">
                    To ensure direct visibility on the internet and to centralize my services—such as Account
                    Management, Downloads, API, and more—I developed a website using Laravel. Two years ago, I migrated
                    to Laravel to enhance security, expand functionality, and stay up to date with modern web
                    technologies.
                </p>
                
            </template>
        </PresentationSection>
    
        <TechnoSection :blocks="technoBlocksWebsite" title="Website Technologies" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="Infrastructure"
            title="Arffornia Infrastructure" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    The high resource demands of multiple Minecraft server instances and additional services required a
                    highly efficient and robust infrastructure to ensure smooth gameplay.

                    The infrastructure is built around several interconnected physical machines, virtualized with
                    Proxmox, and hosting a Kubernetes (k8s) cluster that runs and monitors all services.<br/>

                    Above that, I use a Pterodactyl service to manage all Minecraft server instances, with a Velocity
                    Proxy interconnecting them. To enable communication across all services, the
                    Laravel website, featuring a custom API connected to a MySQL
                    database. 
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksDevOps" title="Infrastructure Technologies"/>

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="DevOps"
            title="Philosophy of Process Automation." dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    Arffornia ecosystem is built with a modular design, allowing new features and
                    functionalities to be seamlessly integrated through a <b>philosophy of process automation</b>.

                    To achieve this, I leverage ArgoCD and a GitHub CI/CD pipeline to fully automate deployments. All
                    configurations are managed within a Git repository, ensuring that every change is tested in a
                    dedicated staging environment before being deployed to production.

                    The infrastructure is designed to scale effortlessly based on current server load, dynamically
                    allocating resources during peak usage.

                    In the event of an issue, such as a server instance crash, the corresponding Kubernetes pod
                    automatically initiates a restart, and I am immediately notified to ensure swift resolution.
                </p>

            </template>
        </PresentationSection>

        <TechnoSection :blocks="technoBlocksInfra" title="DevOps Technologies"/>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

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
        description: "Backend PHP framework, that I used to create my website and web API using MVC architectural pattern.",
    },
    {
        image: "/images/lang/php_logo.png",
        title: "PHP",
        description: "I used PHP extensively for the web API and the Laravel website.",
    },
    {
        image: "/images/lang/mysql_logo.png",
        title: "MySQL",
        description: "I used MySQL to manage all my databases.",
    },
    {
        image: "/images/lang/typescript_logo.png",
        title: "Typescript",
        description: "I extensively used TypeScript for developing the game launcher built on Electron.",
    }
];

const technoBlocksLauncher = [
    {
        image: "/images/lang/electron_logo.svg",
        title: "Electron",
        description: "Cross-Platform Desktop Apps Framework, that I used to create my game launcher on: Windows, Mac and Linux.",
    },
    {
        image: "/images/lang/typescript_logo.png",
        title: "Typescript",
        description: "I extensively used TypeScript for developing the game launcher built on Electron.",
    },
    {
        image: "/images/lang/java_logo.png",
        title: "Java / JavaFX",
        description: "I develop the previous game launcher with Java & JavaFX.",
    }
];

const technoBlocksInfra = [
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: "I designed my infrastructure around Kubernetes for scalability and reliability, enabling seamless interconnection of independent modules.",
    },
    {
        image: "/images/lang/proxmox_logo.png",
        title: "Proxmox",
        description: "Manage all my VMs and interconnect them with several physical servers.",
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: "Automated deployments and test pipelines were built using Github CI/CD, connected to my k8s using ArgoCD.",
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: "I've extensively used Docker to create independent modules for my k8s.",
    },
    {
        image: "/images/lang/argocd_logo.png",
        title: "ArgoCD",
        description: "I built my K8s infra around an ArgoCD controller to achieve deeper integration with the CI/CD pipeline.",
    },
    {
        image: "/images/lang/grafana_logo.png",
        title: "Grafana",
        description: "Have an overview of all my services and create new data by combining other statistics, so that I can anticipate and guide my next choices. ",
    }
];

const technoBlocksDevOps = [
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: "I designed my infrastructure around Kubernetes for scalability and reliability, enabling seamless interconnection of independent modules.",
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: "I've extensively used Docker to create independent modules for my k8s.",
    },
    {
        image: "/images/lang/argocd_logo.png",
        title: "ArgoCD",
        description: "I built my K8s infra around an ArgoCD controller to achieve deeper integration with the CI/CD pipeline.",
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: "Automated deployments and test pipelines were built using Github CI/CD, connected to my k8s using ArgoCD.",
    }
];

const technoBlocksAll = [
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: "I designed my infrastructure around Kubernetes for scalability and reliability, enabling seamless interconnection of independent modules.",
    },
    {
        image: "/images/lang/electron_logo.svg",
        title: "Electron",
        description: "Cross-Platform Desktop Apps Framework, that I used to create my game launcher on: Windows, Mac and Linux.",
    },
    {
        image: "/images/lang/laravel_logo.svg",
        title: "Laravel",
        description: "Backend PHP framework, that I used to create my website and web API using MVC architectural pattern.",
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: "I've extensively used Docker to create independent modules for my k8s.",
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: "Automated deployments and test pipelines were built using Github CI/CD, connected to my k8s using ArgoCD.",
    },
    
    
    {
        image: "/images/lang/java_logo.png",
        title: "Java / JavaFX",
        description: "I develop Forge mods and Spigot/NMS plugins to directly integrate the environment into the game.",
    },
    {
        image: "/images/lang/php_logo.png",
        title: "PHP",
        description: "I used PHP extensively for the web API and the Laravel website.",
    },
    {
        image: "/images/lang/mysql_logo.png",
        title: "MySQL",
        description: "I used MySQL to manage all my databases.",
    },
    {
        image: "/images/lang/typescript_logo.png",
        title: "Typescript",
        description: "I extensively used TypeScript for developing the game launcher built on Electron.",
    },
    {
        image: "/images/lang/proxmox_logo.png",
        title: "Proxmox",
        description: "Manage all my VMs and interconnect them with several physical servers.",
    },
    {
        image: "/images/lang/argocd_logo.png",
        title: "ArgoCD",
        description: "I built my K8s infra around an ArgoCD controller to achieve deeper integration with the CI/CD pipeline.",
    },
    {
        image: "/images/lang/grafana_logo.png",
        title: "Grafana",
        description: "Have an overview of all my services and create new data by combining other statistics, so that I can anticipate and guide my next choices. ",
    }
];

function onRedirectBtn() {
    const url = "https://github.com/TheGostsniperfr/OCR-Sudoku-Solver";
    window.open(url, '_blank', 'noopener,noreferrer');
}
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