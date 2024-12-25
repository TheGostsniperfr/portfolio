<template>
  <div class="ud-content">
    <BackBtn />
    <div class="presentation">
      <div class="content">
        <p class="title text-less">Upside Down</p>
        <p class="title text-midle">Take control of the gravity.</p>
        <p class="description text-less">Defy the laws of physics and bend reality to your will. Navigate through
          intricate puzzle mazes, manipulate gravity, and uncover the secrets that will lead to your escape.</p>
      </div>
    </div>

    <iframe class="trailer"
      src="https://www.youtube.com/embed/sOrQVRMt-bY?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&loop=1"
      title="Upside Down - Trailer" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>

    <div class="text-section">
      <div class="text-title-container">
        <p class="text-title">Overview</p>
        <span class="text-fx"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

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

.text-section {
  color: #dc0000;
  text-align: center;
}

.text-title-container {
  display: inline-block;
  position: relative;
}

.text-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.text-fx {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  background: url("/images/other/dline_1.png") no-repeat center center;
  background-size: contain;
}

.text-fx::before,
.text-fx::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.text-fx::before {
  background-image: url("/images/other/dline_2.png");
  left: -120%;
}

.text-fx::after {
  background-image: url("/images/other/dline_3.png");
  right: -120%;
}

.text-fx::after,
.text-fx::before {
  width: 274px;
  height: 25px;
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

.content {

  position: relative;
  z-index: 10;
  padding-left: 10%;
  max-width: 31%;
  padding-top: 10%;
  padding-bottom: 15%;
  width: 100%;
}

.title {
  font-size: 3.7rem;
  font-weight: 600;
  margin: 0%;
}

.text-less {
  color: #c2c2c2d3;
}

.description {
  line-height: 150%;
  padding-top: 75px;
  font-size: 1.3em;
  font-weight: 500;
  margin: 0%;
}

.video {
  border-radius: 15px;
}
</style>
