<template>
  <div class="ud-content">
    <BackBtn />
    <div class="presentation">
      <div class="content">
        <p class="title-midle text-less">{{ $t("ocr.header.overlay") }}</p>
        <p id="presentation-title" class="title">{{ $t("ocr.header.overlay") }}</p>
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
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

const { t } = useI18n();


useHead({
  title: 'OCR Sudoku Forgers',
  meta: [
    { name: 'description', content: t('ocr.head.content') }
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
