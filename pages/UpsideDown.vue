<template>
  <div class="ud-content">
    <BackBtn />
    <div class="presentation">
      <div class="content">
        <img class="ud-logo" src="/images/UpsideDown/Logo_S2game.png" alt="">
        <p id="presentation-title" class="title">Take control of the gravity.</p>
        <p class="title-mini description text-less">Defy the laws of physics and bend reality to your will. Navigate
          through intricate puzzle mazes, manipulate gravity, and uncover the secrets that will lead to your escape.</p>
      </div>
    </div>

    <iframe class="trailer"
      src="https://www.youtube.com/embed/sOrQVRMt-bY?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&loop=1"
      title="Upside Down - Trailer" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>

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

    <PresentationSection imageSrc="/images/UpsideDown/drone.png" imageAlt="Image of a drone" overview="HDRP Technology"
      title="Beautiful graphic details" dir="right">

      <template #description>
        <p class="title-mini description text-less">
          Leveraging the latest rendering technologies and RTX support, the game offers stunning details, realistic
          lighting, and dynamic effects. Immerse yourself in a visually rich experience that pushes the boundaries of
          what’s possible.
        </p>

      </template>
    </PresentationSection>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PresentationSection from '~/components/PresentationSection.vue';

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
</script>

<style scoped>
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
