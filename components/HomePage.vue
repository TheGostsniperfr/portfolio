<template>
  <div class="home-content">
    <svg id="middle-cross" viewBox="0 0 22 22">
      <polygon class="line" points="22 11.751 0 11.751 0 10.249 22 10.249 22 11"></polygon>
      <polygon class="line" points="11.751 0 11.751 22 10.249 22 10.249 0 11 0"></polygon>
    </svg>
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
import { ref, onMounted } from 'vue';

let carousel;
let currentPercentage = 0.0;
let targetPercentage = 0.0;
let animationFrame;
const fullscreenImage = ref(null);
let middleCross;

onMounted(() => {
  carousel = document.getElementById("carousel");
  middleCross = document.getElementById("middle-cross");

  if (carousel) {
    const animate = () => {
      currentPercentage += (targetPercentage - currentPercentage) * 0.08;

      if (Math.abs(targetPercentage - currentPercentage) < 0.001) {
        currentPercentage = targetPercentage;
      }

      carousel.style.transform = `translate3d(${currentPercentage}%, -50%, 0)`;

      for (const image of carousel.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + currentPercentage}% center`;
      }

      if (Math.abs(targetPercentage - currentPercentage) > 0.001) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const handleOnDown = (e) => (carousel.dataset.mouseDownAt = e.clientX);
    const handleOnUp = () => {
      carousel.dataset.mouseDownAt = "0";
      carousel.dataset.prevPercentage = targetPercentage;
    };

    const handleOnMove = (e) => {
      if (carousel.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -80;
      targetPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;

      targetPercentage = Math.max(Math.min(targetPercentage, 0), -100);

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handleOnScroll = (e) => {
      e.preventDefault();

      const scrollDelta = e.deltaY;
      const percentageChange = (scrollDelta / window.innerHeight) * -30;

      targetPercentage += percentageChange;
      targetPercentage = Math.max(Math.min(targetPercentage, 0), -100);
      carousel.dataset.prevPercentage = targetPercentage;

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handleImageClick = (event) => {
      const clickedImage = event.target;
      if (fullscreenImage.value) {
        fullscreenImage.value.classList.remove('fullscreen');
        middleCross.classList.remove('fullscreen');
        fullscreenImage.value = null;
      } else {
        clickedImage.classList.add('fullscreen');
        middleCross.classList.add('fullscreen');
        fullscreenImage.value = clickedImage;

        const index = Array.from(carousel.getElementsByClassName("image")).indexOf(clickedImage);

        const value = -(29.3 + 10.35 * (index));
        console.log("value is: " + value);
        targetPercentage = value;
        currentPercentage = value;

        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate);
        }
      }
    };

    for (const image of carousel.getElementsByClassName("image")) {
      image.addEventListener("click", handleImageClick);
    }

    window.onmousedown = (e) => handleOnDown(e);
    window.ontouchstart = (e) => handleOnDown(e.touches[0]);
    window.onmouseup = () => handleOnUp();
    window.ontouchend = () => handleOnUp();
    window.onmousemove = (e) => handleOnMove(e);
    window.ontouchmove = (e) => handleOnMove(e.touches[0]);

    window.addEventListener("wheel", handleOnScroll);
  }
});
</script>


<style scoped>
.home-content {
  height: 100vh;
  width: 100vw;
  background-color: #000;
  margin: 0;
}

#carousel {
  display: flex;
  gap: 4vmin;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%);
  align-items: center;
}

#carousel>.image {
  width: 33vmin;
  height: 46vmin;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease, width 0.5s ease, height 0.5s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#carousel>.image.fullscreen {
  transform: scale(1);
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 1000;
}

#middle-cross {
  width: 23px;
  height: 23px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%);
  fill: #fff;
  z-index: 9999;
  transition: transform 0.5s ease;
}

#middle-cross.fullscreen {
  transform: translate(0%, -50%) scale(0);
}

#middle-cross,
.line {
  stroke: #fff;
  stroke-width: 0.1;
  fill: #fff;
}
</style>