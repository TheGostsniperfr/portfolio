<template>
  <div class="ud-content">
    <BackBtn />
    <div class="presentation">
      <div class="content">
        <img class="ud-logo" src="/images/UpsideDown/Logo_S2game.png" alt="">
        <p id="presentation-title" class="title">Take control of the gravity.</p>
        <p class="title-mini description text-less">Defy the laws of physics and bend reality to your will. Navigate
          through intricate puzzle mazes, manipulate gravity, and uncover the secrets that will lead to your escape.
        </p>

        <button class="redirectBtn" @click="onRedirectBtn()">
          Github
        </button>
      </div>
    </div>

    <iframe class="trailer"
      src="https://www.youtube.com/embed/sOrQVRMt-bY?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&loop=1"
      title="Upside Down - Trailer" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>

    <TechnoSection :blocks="technoBlocks" />

    <PresentationSection imageSrc="/images/UpsideDown/drone.png" imageAlt="Image of a drone" overview="Overview"
      title="The beginning of a story." dir="left">

      <template #description>
        <p class="title-mini description text-less">
          Upside Down immerses you in a state-of-the-art laboratory, testing
          the very first prototype of the “GraviSphere”. A new scientific
          breakthrough that lets you manipulate the surrounding gravity. You're in
          charge of testing its potential via various tests to certify the user's
          integrity.
        </p>

      </template>
    </PresentationSection>

    <GridSection title="15 Hours of Unforgettable Gameplay." description="Step into six unique test chambers designed to push the limits of your skills with the GraviSphere under real-world conditions. Each chamber is carefully crafted to challenge different aspects of gravity manipulation, from precision control to rapid reflexes.
  Stay alert — the test environments can be unforgiving, and mistakes can be costly." :blocks="MapGridBlocks" />

    <PresentationSection imageSrc="/images/UpsideDown/drone.png" imageAlt="Image of a drone" overview="Inside Overview — 2022-2023"
      title="5 Months to Build a Game" dir="right">

      <template #description>
        <p class="title-mini description text-less">
          The game project was the first major project of my first year at my IT School. <br/>
          As team leader and lead developer, I had to develop the features that game designers needed, while managing
          the project and the cohesion of the group over time to achieve a very good result.
        </p>

      </template>
    </PresentationSection>

    <PresentationSection imageSrc="/images/UpsideDown/agile_team.png" imageAlt="Image of a drone"
      overview="Working Method" title="Agile Teamwork." dir="left">

      <template #description>
        <p class="title-mini description text-less">
          This project was carried out by a team of 4 people as part of a 5-month school project. <br />

          We took the opportunity to put in place a whole series of teamwork methods and tools to learn what works and
          what
          doesn't, in order to work efficiently while keeping the team together.
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
import GridSection from '~/components/GridSection.vue';

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
    image: "/images/UpsideDown/logo_unity.png",
    title: "Build with Unity",
    description: "We built the game using Unity Engine and its latest technologies.",
  },
  {
    image: "/images/UpsideDown/rtx_logo.jpg",
    title: "RTX compatibility",
    description: "Experience the best possible visual experience you can have with RTX On.",
  },
  {
    image: "/images/lang/github-logo.png",
    title: "Teamwork using Github",
    description: "We used github to manage our entire project, team management and website.",
  },
  {
    image: "/images/UpsideDown/plasmaOrb.png",
    title: "HDRP Technologie",
    description: "HDRP offers breathtaking graphics, lighting and unparalleled visual fidelity that elevates every scene.",
  },
  {
    image: "/images/lang/CSharp_Logo.png",
    title: "Developed entirely in C#",
    description: "Using C# to control, link and animate everything you can see in the game.",
  },
  {
    image: "/images/UpsideDown/blender_logo.png",
    title: "3D modelling using Blender",
    description: "Many 3D models have been designed with Blender especially for this game. To create a real identity.",
  }
];

const MapGridBlocks = [
  {
    image: "/images/UpsideDown/map1_2.png",
    title: "Room 1:",
    description: "Learn or fall.",
  },
  {
    image: "/images/UpsideDown/UpsideDownBG.png",
    title: "Room 2:",
    description: "Keep in mind.",
  },
  {
    image: "/images/UpsideDown/map3_2.png",
    title: "Room 3:",
    description: "A real test.",
  },
  {
    image: "/images/UpsideDown/map4_2.png",
    title: "Room 4:",
    description: "Precision is key.",
  },
  {
    image: "/images/UpsideDown/map5.png",
    title: "Room 5:",
    description: "A new partner.",
  },
  {
    image: "/images/UpsideDown/map6.png",
    title: "Room 6:",
    description: "The End.",
  },
];

function onRedirectBtn() {
  const url = "https://github.com/TheGostsniperfr/UpsideDown";
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
    url('/images/UpsideDown/UpsideDownBG.png') center/cover no-repeat;
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
