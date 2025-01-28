<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation">
            <div class="content">
                <p class="title-midle text-less">ACDC — 2024-2025</p>
                <p id="presentation-title" class="title">Assistants C <br /> Diese Caml</p>
                <p class="title-mini description text-less">
                    For a year. I worked in the ACDC team at Epita. I've had the chance to pass on my passion for IT by giving C#
                    lessons to first-year students.
                    Helping them with classes and practicals.
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="About my Job"
            title="Teaching & Helping." dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    — For one year, I had the chance to teach a class of about fifty students. <br />
                    I learned a lot about good teaching methods, in particular how to make a student learn from mistakes
                    and progress. <br />

                    — My work was divided into 2, with face-to-face sessions to answer questions and unblock the
                    students
                    on the practicalities of weeks in C#.

                    The other part was to help them remotely during the week when they got stuck or had questions.
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/TC/gitlab_cicd.png" imageAlt="Before and After Post processing"
            overview="Designer Job Overview" title="Pratical Designer" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    — Another big part of my job was to create the practical from start to finish that first-year students
                    from all campuses would have to complete. 
                    I was able to apply different methods to help them learn new concepts in the best possible way.<br/>
                    
                    — A subject is calibrated over 12 hours, so that a lamdba student can finish it.
                    The design period takes place in 3 stages, the design, 
                    the review by other members of the ACDC team and then the production week during which the students complete the subject.
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

useHead({
  title: 'ACDC',
  meta: [
    { name: 'description', content: 'ACDC Project Overview' }
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

const technoBlocks = [
    {
        image: "/images/ACDC/teaching_logo.png",
        title: "Teaching",
        description: "Learning the best way to transmit knowledge.",
    },
    {
        image: "/images/lang/CSharp_Logo.png",
        title: "C#",
        description: "Teaching and helping with C# practicals for first-year students.",
    },
    {
        image: "/images/lang/rust_logo.png",
        title: "Rust",
        description: "Conception of a practical to teach rust.",
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
        url('/images/ACDC/logo_tp.png') center/cover no-repeat;
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