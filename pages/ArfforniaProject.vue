<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation">
            <div class="content">
                <p class="title-midle text-less">Arffornia — 2017-Today</p>
                <p id="presentation-title" class="title">A Decade of Learning and Innovation</p>
                <p class="title-mini description text-less">
                    Arffornia is more than a Minecraft server.<br/>
                    It's a whole ecosystem combining a <b>Laravel</b> website with
                    MySQL, an <b>Electron</b> game launcher, interconnected server instances with a Velocity proxy, and a
                    scalable <b>Kubernetes</b> (k8s) infrastructure for high availability. Built on <b>Proxmox</b>-managed
                    virtualization, this 9+ year project has been my playground for learning, innovation, and technical
                    refinement.<br/>
                    And much more.
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="Overview"
            title="Development & Maintenance." dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    — I was responsible for developing and maintaining the auto-correction tools that had been created
                    over the past year, as well as implementing new features for subject designers.<br />

                    — Another key part
                    of my role was ensuring that practical exercises functioned correctly during both
                    production and exams. For instance, I had to prepare for scenarios such as a simultaneous internet
                    blackout on all campuses during an exam..
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/TC/gitlab_cicd.png" imageAlt="Before and After Post processing"
            overview="Feedback" title="A Great and rewarding experience." dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    — This work allowed me to gain solid knowledge of various tools, such as Docker and GitLab CI/CD,
                    which I use daily on large-scale production projects.<br />

                    — I also learned how to collaborate effectively within large teams, manage the challenges posed by
                    individual members, and maintain clear communication to address unexpected issues.<br />

                    — Finally, it taught me how to handle emergencies, such as during exams or particularly busy periods
                    with overlapping courses and projects.
                </p>

            </template>
        </PresentationSection>
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

const technoBlocks = [
    {
        image: "/images/lang/kubernetes_logo.png",
        title: "Kubernetes",
        description: "I designed my infrastructure around Kubernetes for scalability and reliability, enabling seamless interconnection of independent modules.",
    },
    {
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: "I've extensively used Docker to maintain and develop tools and infra that rely on Docker images to run.",
    },
    {
        image: "/images/lang/github-logo.png",
        title: "Github CI/CD",
        description: "Automated deployments and test pipelines were built using Github CI/CD, connected to my k8s using ArgoCD.",
    },
    {
        image: "/images/lang/laravel_logo.svg",
        title: "Laravel",
        description: "Backend PHP framework, that I used to create my website and web API using MVC architectural pattern.",
    },
    {
        image: "/images/lang/electron_logo.svg",
        title: "Electron",
        description: "Cross-Platform Desktop Apps Framework, that I used to create my game launcher on: Windows, Mac and Linux.",
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