<template>
  <div class="ud-content">
    <div class="presentation">
      <div class="content">
        <p class="title-midle text-less">Hi! I'm</p>
        <p id="presentation-title" class="title">Brian Perret</p>
        <p class="title-mini description text-less">
          I'm a 3rd-year student at <b><a id="epita-link" href="https://www.epita.fr">Epita</a></b>,
          specializing in <b>DevOps</b> and <b>Infrastructure Engineering</b>, with <b>9+ years</b> of experience as a
          developer and a passion for building modular and scalable systems.<br /><br />

          <i>“My Work is my Passion.”</i>
        </p>

        <a href="https://www.linkedin.com/in/brian-perret" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">LinkedIn</button>
        </a>

        <a href="mailto:brianperret.pro@gmail.com" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">Email</button>
        </a>

        <a href="https://github.com/TheGostsniperfr" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">Github</button>
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">CV</button>
        </a>
      </div>
    </div>

    <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="Presentation"
      title="Development & Maintenance." dir="left">

      <template #description>
        <p class="title-mini description text-less">
          — I was responsible for developing and maintaining the auto-correction tools that had been created
          over the past year, as well as implementing new features for subject designers.<br />

          — Another key part
          of my role was ensuring that practical exercises functioned correctly during both
          production and exams. For instance, I had to prepare for scenarios such as a simultaneous internet blackout on
          all campuses during an exam..
        </p>

      </template>
    </PresentationSection>

    <GridSection title="Projects & Works That Represents Me." description="" :blocks="MapGridBlocks" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PresentationSection from '~/components/PresentationSection.vue';
import TechnoSection from '~/components/TechnoSection.vue';
import GridSection from '~/components/GridSection.vue';

useHead({
  title: 'Brian Perret',
  meta: [
    { name: 'description', content: 'About Me' }
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

const MapGridBlocks = [
  {
    image: "/images/TC/logo_back.png",
    title: "",
    description: "Toolchain",
  },
  {
    image: "/images/Arffornia/launcher_homepage.png",
    title: "",
    description: "Arffornia",
  },
  {
    image: "/images/UpsideDown/UpsideDownBG.png",
    title: "",
    description: "Upside Down",
  },
]

</script>

<style scoped>
#epita-link {
  text-decoration: none;
  color: #25cee9;
}

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
    url('/images/TC/devops.png') center/cover no-repeat;
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
  padding-bottom: 5%;
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
