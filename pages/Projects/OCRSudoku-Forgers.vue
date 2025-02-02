<template>
  <div class="ud-content">
    <BackBtn />
    <div class="presentation">
      <div class="content">
        <p class="title-midle text-less">OCR Sudoku Forgers</p>
        <p id="presentation-title" class="title">Scan, Solve, Succeed.</p>
        <p class="title-mini description text-less">
          This school project served as an introduction to <b>Neural Networks</b> and <b>Computer Vision</b>. Over the
          course of 3
          months, we worked in teams of 4 to build the project from scratch, without any libraries.
          A key aspect of the project was independently researching the new knowledge necessary to
          successfully implement concepts like <b>CNNs</b> (Convolutional Neural Networks) and <b>Computer Vision</b>.
        </p>

        <a href="https://github.com/TheGostsniperfr/OCR-Sudoku-Solver" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">Github</button>
        </a>
      </div>
    </div>

    <TechnoSection :blocks="technoBlocks" />

    <PresentationSection imageSrc="/images/OCR/hard_grid.jpg" imageAlt="Image of a Sudoku Grid" overview="Overview"
      title="The beginning of a story." dir="left">

      <template #description>
        <p class="title-mini description text-less">
          Our application is capable of solving any type of sudoku grid, even when viewed from unusual perspectives or
          angles. <br /><br />

          On the left is one of the images used by our professor to evaluate the project.
        </p>

      </template>
    </PresentationSection>

    <PresentationSection imageSrc="/images/OCR/computer_vision.png" imageAlt="Before and After Post processing"
      overview="Post Processing" title="Highly effective treatment" dir="right">

      <template #description>
        <p class="title-mini description text-less">
          We have made a point of using highly efficient post-processing, both in terms of final rendering and
          processing speed.
          Whether the image is very blurry, with distorted perspectives or a crumpled newspaper page. That's not a
          problem!
        </p>

      </template>
    </PresentationSection>

    <PresentationSection imageSrc="/images/OCR/trainning.png" imageAlt="Image of the Neural Network Training"
      overview="Neural Network" title="Neural Network from scratch" dir="left">

      <template #description>
        <p class="title-mini description text-less">
          The second major part of this project was to design a neural network from scratch, with no specific library
          and no prior knowledge.
          After a long phase of reflection, calculation and design.
          We arrived at a very interesting and robust result.
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
  title: 'OCR Sudoku Forgers',
  meta: [
    { name: 'description', content: 'OCR Sudoku Forgers Project Overview' }
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
    image: "/images/OCR/neural-network.png",
    title: "Neural Network Inside",
    description: "We have built and trained a neural network specifically for this app.",
  },
  {
    image: "/images/lang/C_Logo.png",
    title: "Entirely in C, for the best performance",
    description: "This project was developed in pure C, without using any specific libraries.",
  },
  {
    image: "/images/lang/github-logo.png",
    title: "Teamwork using Github",
    description: "We used github to manage our entire project, team and website.",
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
    url('/images/OCR/ArtificialNeuronModel_francais.png') center/cover no-repeat;
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
