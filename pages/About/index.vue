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

        <div class="links-container">
          <a class="link" href="https://www.linkedin.com/in/brian-perret" target="_blank" rel="noopener noreferrer">
            <button class="redirectBtn">LinkedIn</button>
          </a>

          <a class="link" href="mailto:brianperret.pro@gmail.com" target="_blank" rel="noopener noreferrer">
            <button class="redirectBtn">Email</button>
          </a>

          <a class="link" href="https://github.com/TheGostsniperfr" target="_blank" rel="noopener noreferrer">
            <button class="redirectBtn">Github</button>
          </a>

          <a class="link" href="#" target="_blank" rel="noopener noreferrer">
            <button class="redirectBtn">CV</button>
          </a>
        </div>
      </div>
    </div>

    <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="Presentation"
      title="What Drives Me." dir="left">

      <template #description>
        <p class="title-mini description text-less">
          Passionate about creating new projects and tackling challenges
          I thrive on designing scalable, modular systems from the ground up, focusing on infrastructure,
          and full-stack development. By using new technologies, I enhance my projects through continuous learning
          and personal growth.
          I always give my best to achieve the highest quality results and deliver
          innovative solutions.
        </p>

      </template>
    </PresentationSection>

    <!-- Edit the presentation section for a timeline section by replacing the image by a timeline -->
    <TimelineSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" overview="Working Experience"
      title="Working Experience" dir="right" :blocks="workBlocks">

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
    </TimelineSection>
    
    <GridSection title="Projects & Works That Represents Me." description="" :blocks="MapGridBlocks" />

    <!-- Create a Techno Section with square shape -->
    <IconSection :blocks="languageBlocks" title="Languages that I use:" overview="Languages" />
    <IconSection :blocks="frameworkAndToolsBlocks" title="Frameworks & Tools that I use:" overview="Frameworks" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PresentationSection from '~/components/PresentationSection.vue';
import GridSection from '~/components/GridSection.vue';
import IconSection from '~/components/IconSection.vue';
import TimelineSection from '~/components/TimelineSection.vue';

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

const workBlocks = [
  {
    image: "/images/TC/logo_back.png",
    alt: "Toolchain Logo",
    title: "Toolchain",
    date: "2024 — Today",
    description: "Work as DevOps at Epita",
    link: "/Projects/Toolchain",
  },
  {
    image: "/images/ACDC/logo_tp.png",
    alt: "ACDC Logo",
    title: "ACDC",
    date: "2024 — Today",
    description: "Work as IT teacher for 1 & 2 years student at Epita",
    link: "/Projects/ACDC"
  },
  {
    image: "/images/ACDC/logo_tp.png",
    alt: "",
    title: "Cameraman — Video Editor",
    date: "2022",
    description: "Making Docomentary, Afterworks, Pubs.",
    link: "",
  }
];

const MapGridBlocks = [
  {
    image: "/images/TC/logo_back.png",
    title: "",
    description: "Toolchain",
    link: "/Projects/Toolchain"
  },
  {
    image: "/images/Arffornia/launcher_homepage.png",
    title: "",
    description: "Arffornia",
    link: "/Projects/ArfforniaProject"
  },
  {
    image: "/images/UpsideDown/UpsideDownBG.png",
    title: "",
    description: "Upside Down",
    link: "/Projects/UpsideDown"
  },
]

const languageBlocks = [
  {
    image: "/images/lang/java_logo.png",
    title: "Java",
    description: "",
  },
  {
    image: "/images/lang/C_Logo.png",
    title: "C",
    description: "",
  },
  {
    image: "/images/lang/php_logo.png",
    title: "Php",
    description: "",
  },
  {
    image: "/images/lang/typescript_logo.png",
    title: "TypeScript",
    description: "",
  },
  {
    image: "/images/lang/CSharp_Logo.png",
    title: "C#",
    description: "",
  },
  {
    image: "/images/lang/mysql_logo.png",
    title: "SQL",
    description: "",
  },
  {
    image: "/images/lang/python_logo.png",
    title: "Python",
    description: "",
  }
];

const frameworkAndToolsBlocks = [
  {
    image: "/images/lang/kubernetes_logo.png",
    title: "Kubernetes",
    description: "",
  },
  {
    image: "/images/lang/docker_logo.png",
    title: "Docker",
    description: "",
  },
  {
    image: "/images/lang/laravel_logo.svg",
    title: "Laravel",
    description: "",
  },
  {
    image: "/images/lang/electron_logo.svg",
    title: "Electron",
    description: "",
  },
  {
    image: "/images/lang/proxmox_logo.png",
    title: "Proxmox",
    description: "",
  },
  {
    image: "/images/lang/linux_logo.png",
    title: "Linux",
    description: "",
  },
  {
    image: "/images/lang/argocd_logo.png",
    title: "ArgoCD",
    description: "",
  },
  {
    image: "/images/lang/github-logo.png",
    title: "Git, Gitlab, Github CI/CD",
    description: "",
  },
];

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

.links-container {
  display: grid;
  grid-template-columns: repeat(2, 0fr);
  gap: 10px;
}

.link:nth-child(3),
.link:nth-child(4) {
  transform: translateY(-10px);
}
</style>
