<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation">
            <div class="content">
                <p class="title-midle text-less">Toolchain — 2024-2025</p>
                <p id="presentation-title" class="title">A Year of Challenges and Achievements</p>
                <p class="title-mini description text-less">
                    For a year. I worked in the Toolchain team. I had to manage all the infrastructure, deployment,
                    maintenance and ensure that everything ran smoothly for the management of practicals and exams IT
                    work for
                    first and second year students.
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/OCR/hard_grid.jpg" imageAlt="Image of a Sudoku Grid" overview="Overview"
            title="Development & Maintenance." dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    — I was responsible for developing and maintaining the auto-correction tools that had been created
                    over the past year, as well as implementing new features for subject designers.<br/>
                    
                    — Another key part
                    of my role was ensuring that practical exercises functioned correctly during both
                    production and exams. For instance, I had to prepare for scenarios like a simultaneous internet
                    outage across all campuses during an exam..
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/OCR/computer_vision.png" imageAlt="Before and After Post processing"
            overview="Feedback" title="A Great and rewarding experience." dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    — This work allowed me to gain solid knowledge of various tools, such as Docker and GitLab CI/CD,
                    which I use daily on large-scale production projects.<br/>

                    — I also learned how to collaborate effectively within large teams, manage the challenges posed by
                    individual members, and maintain clear communication to address unexpected issues.<br/>

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
        image: "/images/lang/docker_logo.png",
        title: "Docker",
        description: "I've extensively used Docker to maintain and develop tools and infra that rely on Docker images to run.",
    },
    {
        image: "/images/lang/gitlab_logo.png",
        title: "Gitlab CI/CD",
        description: "Automated deployments and test pipelines were built using Gitlab CI/CD and formed the basis of our working method.",
    },
    {
        image: "/images/lang/go_logo.png",
        title: "Go",
        description: "Efficient tools were created in Go to optimize performance and reliability for various backend services.",
    },
    {
        image: "/images/lang/python_logo.png",
        title: "Python",
        description: "I had to use Python to develop and maintain various internal tools.",
    },
    {
        image: "/images/lang/CSharp_Logo.png",
        title: "C#",
        description: "C# was one of the languages for which we needed to provide an auto-correction tool for practical.",
    },
    {
        image: "/images/lang/C_Logo.png",
        title: "C",
        description: "C was one of the languages for which we needed to provide an auto-correction tool for practical.",
    },
    {
        image: "/images/lang/rust_logo.png",
        title: "Rust",
        description: "Rust was one of the languages for which we needed to provide an auto-correction tool for practical.",
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
        url('/images/TC/logo_back.png') center/cover no-repeat;
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
    max-width: 31%;
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