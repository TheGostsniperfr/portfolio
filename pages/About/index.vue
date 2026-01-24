<template>
  <div class="ud-content">
    <div class="presentation">
      <div class="content">
        <p class="title-midle text-less">{{ $t("about.header.hello") }}</p>
        <p id="presentation-title" class="title">Brian Perret</p>
        <p class="title-mini description text-less">
          <i18n-t keypath="about.header.presentation.1">
            <template #school>
              <b><a id="epita-link" href="https://www.epita.fr">{{ $t("about.header.presentation.school") }}</a></b>
            </template>
            <template #devops>
              <b>{{ $t("about.header.presentation.devops") }}</b>
            </template>
            <template #ie>
              <b>{{ $t("about.header.presentation.ie") }}</b>
            </template>
            <template #xp>
              <b>{{ $t("about.header.presentation.xp") }}</b>
            </template>
          </i18n-t>

          <br /> <br />

          <i>{{ $t("about.header.quote") }}</i>
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

          <a class="link" href="/documents/cv_Brian_Perret_2025_fr_en.pdf" target="_blank" rel="noopener noreferrer">
            <button class="redirectBtn">CV</button>
          </a>
        </div>
      </div>
    </div>

    <PresentationSection imageSrc="/images/other/me2.jpg" imageAlt="Devops schema"
      :overview="$t('about.presentation.overlay')" :title="$t('about.presentation.title')" dir="left">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t("about.presentation.body") }}
        </p>

      </template>
    </PresentationSection>

    <TimelineSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" :overview="$t('about.workingXp.overlay')"
      :title="$t('about.workingXp.title')" dir="right" :blocks="workBlocks">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t('about.workingXp.body1') }}

          <br />

          {{ $t('about.workingXp.body2') }}
        </p>

      </template>
    </TimelineSection>

    <GridSection :title="$t('about.projects.title')" description="" :blocks="MapGridBlocks" />

    <IconSection :blocks="languageBlocks" :title="$t('about.language.title')"
      :overview="$t('about.language.overview')" />
    <IconSection :blocks="frameworkAndToolsBlocks" :title="$t('about.tools.title')"
      :overview="$t('about.tools.overview')" />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import PresentationSection from '~/components/PresentationSection.vue';
import GridSection from '~/components/GridSection.vue';
import IconSection from '~/components/IconSection.vue';
import TimelineSection from '~/components/TimelineSection.vue';

const { t } = useI18n(); 

useHead({
  title: 'Brian Perret',
  meta: [
    { name: 'description', content: t('about.head.content') }
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
    image: "/images/Rakuten/Rakuten_logo.svg",
    alt: "Rakuten Logo",
    title: t('about.workingXp.blocks.4.title'),
    date: t('about.workingXp.blocks.4.date'),
    description: t('about.workingXp.blocks.4.description'),
    link: "",
  },
  {
    image: "/images/TC/logo_back.png",
    alt: "Toolchain Logo",
    title: t('about.workingXp.blocks.1.title'),
    date: t('about.workingXp.blocks.1.date'),
    description: t('about.workingXp.blocks.1.description'),
    link: "/Projects/Toolchain",
  },
  {
    image: "/images/ACDC/logo_tp.png",
    alt: "ACDC Logo",
    title: t('about.workingXp.blocks.2.title'),
    date: t('about.workingXp.blocks.2.date'),
    description: t('about.workingXp.blocks.2.description'),
    link: "/Projects/ACDC"
  },
  {
    image: "/images/other/camera-operator.png",
    alt: "",
    title: t('about.workingXp.blocks.3.title'),
    date: t('about.workingXp.blocks.3.date'),
    description: t('about.workingXp.blocks.3.description'),
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
    title: t("about.language.java"),
    description: "",
  },
  {
    image: "/images/lang/C_Logo.png",
    title: t("about.language.c"),
    description: "",
  },
  {
    image: "/images/lang/php_logo.png",
    title: t("about.language.php"),
    description: "",
  },
  {
    image: "/images/lang/typescript_logo.png",
    title: t("about.language.typescript"),
    description: "",
  },
  {
    image: "/images/lang/CSharp_Logo.png",
    title: t("about.language.csharp"),
    description: "",
  },
  {
    image: "/images/lang/mysql_logo.png",
    title: t("about.language.sql"),
    description: "",
  },
  {
    image: "/images/lang/python_logo.png",
    title: t("about.language.python"),
    description: "",
  }
];

const frameworkAndToolsBlocks = [
  {
    image: "/images/lang/kubernetes_logo.png",
    title: t("about.tools.kubernetes"),
    description: "",
  },
  {
    image: "/images/lang/docker_logo.png",
    title: t("about.tools.docker"),
    description: "",
  },
  {
    image: "/images/lang/laravel_logo.svg",
    title: t("about.tools.laravel"),
    description: "",
  },
  {
    image: "/images/lang/electron_logo.svg",
    title: t("about.tools.electron"),
    description: "",
  },
  {
    image: "/images/lang/proxmox_logo.png",
    title: t("about.tools.proxmox"),
    description: "",
  },
  {
    image: "/images/lang/linux_logo.png",
    title: t("about.tools.linux"),
    description: "",
  },
  {
    image: "/images/lang/argocd_logo.png",
    title: t("about.tools.argocd"),
    description: "",
  },
  {
    image: "/images/lang/github-logo.png",
    title: t("about.tools.github"),
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
    url('/images/other/me.png') center/cover no-repeat;
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
