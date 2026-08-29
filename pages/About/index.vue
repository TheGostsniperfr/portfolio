<template>
  <div class="ud-content">
    <div class="presentation" :style="{ '--hero': 'url(/images/other/me.png)' }">
      <div class="content">
        <p class="title-midle text-less">{{ $t("about.header.hello") }}</p>
        <h1 class="title presentation-title">Brian Perret</h1>
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

    <PresentationSection imageSrc="/images/other/teaching-cloud-archi.jpg" imageAlt="Cours d'architecture cloud sur tableau blanc"
      :overview="$t('about.teaching.overlay')" :title="$t('about.teaching.title')" dir="right">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t("about.teaching.description.1") }}
          <br /><br />
          {{ $t("about.teaching.description.2") }}
        </p>
        <ProjectLinkBtn to="/Projects/ACDC" :title="$t('about.teaching.link')" />
      </template>
    </PresentationSection>

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
import ProjectLinkBtn from '~/components/ProjectLinkBtn.vue';

const { t } = useI18n(); 

useHead({
  title: 'Brian Perret',
  meta: [
    { name: 'description', content: t('about.head.content') },
    { property: 'og:title', content: 'Brian Perret' },
    { property: 'og:description', content: t('about.head.content') },
    { property: 'og:image', content: '/images/other/me.png' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Brian Perret',
        jobTitle: 'Software Engineer / DevOps',
        email: 'mailto:brianperret.pro@gmail.com',
        url: 'https://about.arffornia.com/About',
        sameAs: [
          'https://www.linkedin.com/in/brian-perret',
          'https://github.com/TheGostsniperfr',
        ],
      }),
    },
  ],
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
    { threshold: 0.15 }
  );

  observer.observe(presentation);
});

const workBlocks = computed(() => ([
  {
    image: "/images/other/forge_logo.png",
    alt: "Forge Logo",
    title: t('about.workingXp.blocks.5.title'),
    date: t('about.workingXp.blocks.5.date'),
    description: t('about.workingXp.blocks.5.description'),
    link: "",
  },
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
]));

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

const languageBlocks = computed(() => ([
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
]));

const frameworkAndToolsBlocks = computed(() => ([
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
]));

</script>

<style scoped>
#epita-link {
  text-decoration: none;
  color: #25cee9;
}

/* auto-fit instead of a hard 2 columns: two 18em buttons needed 442px of width minimum. */
.links-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
  gap: 10px;
}
</style>
