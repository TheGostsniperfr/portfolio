<template>
  <div class="home-content">
    <div id="carousel" data-mouse-down-at="0" data-prev-percentage="0">
      <img class="image" src="/images/Arffornia/launcher_homepage.png" draggable="false">
      <img class="image" src="/images/OCR/logo.png" draggable="false">
      <img class="image" src="/images/UpsideDown/UpsideDownBG.png" draggable="false">
      <img class="image" src="/images/TC/logo_back.png" draggable="false">
      <img class="image" src="/images/ACDC/logo_tp.png" draggable="false">
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

let carousel;

onMounted(() => {
  carousel = document.getElementById("carousel");

  if (carousel) {
    const handleOnDown = (e) => (carousel.dataset.mouseDownAt = e.clientX);

    const handleOnUp = () => {
      carousel.dataset.mouseDownAt = "0";
      carousel.dataset.prevPercentage = carousel.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (carousel.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = parseFloat(carousel.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      carousel.dataset.percentage = nextPercentage;

      carousel.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of carousel.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.onmousedown = (e) => handleOnDown(e);
    window.ontouchstart = (e) => handleOnDown(e.touches[0]);
    window.onmouseup = (e) => handleOnUp(e);
    window.ontouchend = (e) => handleOnUp(e.touches[0]);
    window.onmousemove = (e) => handleOnMove(e);
    window.ontouchmove = (e) => handleOnMove(e.touches[0]);
  }
});
</script>


<style scoped>
.home-content {
  height: 100vh;
  width: 100vw;
  background-color: #000;
  margin: 0;
  overflow: hidden;
}

#carousel>.image {
  width: 40vmin;
  height: 56vmin;
  object-fit: cover;
  object-position: center;
}

#carousel {
  display: flex;
  gap: 4vmin;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%);
}
</style>