<template>
  <div class="ud-content">
    <BackBtn />
    <div class="presentation" :style="{ '--hero': 'url(/images/OCR/ArtificialNeuronModel_francais.png)' }">
      <div class="content">
        <p class="title-midle text-less">{{ $t("ocr.header.overlay") }}</p>
        <p class="title presentation-title">{{ $t("ocr.header.overlay") }}</p>
        <p class="title-mini description text-less">
          <i18n-t keypath="ocr.header.description.body.1">
            <template #nn>
                <b>{{ $t("ocr.header.description.body.nn") }}</b>
            </template>
            <template #cv>
              <b>{{ $t("ocr.header.description.body.cv") }}</b>
          </template>
          <template #cnn>
            <b>{{ $t("ocr.header.description.body.cnn") }}</b>
        </template>
        </i18n-t>
        </p>

        <a href="https://github.com/TheGostsniperfr/OCR-Sudoku-Solver" target="_blank" rel="noopener noreferrer">
          <button class="redirectBtn">Github</button>
        </a>
      </div>
    </div>

    <TechnoSection :blocks="technoBlocks" />

    <PresentationSection imageSrc="/images/OCR/hard_grid.jpg" imageAlt="Image of a Sudoku Grid" :overview="$t('ocr.overview.overlay')" :title="$t('ocr.overview.title')" dir="left">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t("ocr.overview.description.1") }}
          <br /><br />
          {{ $t("ocr.overview.description.2") }}
        </p>

      </template>
    </PresentationSection>

    <PresentationSection imageSrc="/images/OCR/computer_vision.png" imageAlt="Before and After Post processing"
    :overview="$t('ocr.process.overlay')" :title="$t('ocr.process.title')" dir="right">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t("ocr.process.description.1") }}
        </p>

      </template>
    </PresentationSection>

    <PresentationSection imageSrc="/images/OCR/trainning.png" imageAlt="Image of the Neural Network Training"
    :overview="$t('ocr.nn.overlay')" :title="$t('ocr.nn.title')" dir="left">

      <template #description>
        <p class="title-mini description text-less">
          {{ $t("ocr.nn.description.1") }}
        </p>

      </template>
    </PresentationSection>

  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

const { t } = useI18n();


useHead({
  title: () => t('projects.ocr.title'),
  meta: [
    { name: 'description', content: () => t('ocr.head.content') }
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
    { threshold: 0.15 }
  );

  observer.observe(presentation);
});

const technoBlocks = computed(() => ([
  {
    image: "/images/OCR/neural-network.png",
    title: t('ocr.tech.blocks.nn.title'),
    description: t('ocr.tech.blocks.nn.description'),
  },
  {
    image: "/images/lang/C_Logo.png",
    title: t('ocr.tech.blocks.c.title'),
    description: t('ocr.tech.blocks.c.description'),
  },
  {
    image: "/images/lang/github-logo.png",
    title: t('ocr.tech.blocks.github.title'),
    description: t('ocr.tech.blocks.github.description'),
  }
]));

</script>

