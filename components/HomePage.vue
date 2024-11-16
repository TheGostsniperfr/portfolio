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

    <div id="page-number">
      <div id="number">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
      <p>—</p>
      <p>5</p>
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
let images;
let currentImgIndex = -1;

const minCarouselX = -9;
const maxCarouelX = -90.2;

onMounted(() => {
  carousel = document.getElementById("carousel");
  images = carousel.getElementsByClassName("image");
  middleCross = document.getElementById("middle-cross");
  
  // init carousel start posision
  currentPercentage = minCarouselX;
  carousel.style.transform = `translate3d(${minCarouselX}%, -50%, 0)`;

  if (carousel) {
    updateImgIndex(0);
    const animate = () => {
      currentPercentage += (targetPercentage - currentPercentage) * 0.1;

      if (Math.abs(targetPercentage - currentPercentage) < 0.001) {
        currentPercentage = targetPercentage;
      }

      carousel.style.transform = `translate3d(${currentPercentage}%, -50%, 0)`;

      Array.from(images).forEach((image, index) => {
        image.style.objectPosition = `${40 + currentPercentage + (index + 1) * 20}% center`;
      });

      if (Math.abs(targetPercentage - currentPercentage) > 0.001) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const handleOnDown = (e) => {
      if (fullscreenImage.value) return;
      carousel.dataset.mouseDownAt = e.clientX;
    };

    const handleOnUp = () => {
      if (fullscreenImage.value) return;
      carousel.dataset.mouseDownAt = "0";
      carousel.dataset.prevPercentage = targetPercentage;
    };

    const handleOnMove = (e) => {
      if (fullscreenImage.value || carousel.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -80;
      targetPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;

      targetPercentage = Math.max(Math.min(targetPercentage, minCarouselX), maxCarouelX);

      onPercentageChange();

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handleOnScroll = (e) => {
      if (fullscreenImage.value) return;
      e.preventDefault();

      const scrollDelta = e.deltaY;
      const percentageChange = (scrollDelta / window.innerHeight) * -30;

      targetPercentage += percentageChange;
      targetPercentage = Math.max(Math.min(targetPercentage, minCarouselX), maxCarouelX);

      onPercentageChange();

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

        const index = Array.from(images).indexOf(clickedImage);
        const newPercentage = -(9 + (20.3 * index));

        carousel.style.transform = `translate3d(${newPercentage}%, -50%, 0)`;

        Array.from(images).forEach((image, index) => {
          image.style.objectPosition = `${40 + newPercentage + (index + 1) * 20}% center`;
        });

        currentPercentage = newPercentage;
        targetPercentage = newPercentage;
        carousel.dataset.prevPercentage = newPercentage;

        setTimeout(() => {
          carousel.style.transition = '';
        }, 500);
      } else {
        carousel.style.transition = 'transform 0.5s ease';

        clickedImage.classList.add('fullscreen');
        middleCross.classList.add('fullscreen');
        fullscreenImage.value = clickedImage;

        const index = Array.from(carousel.getElementsByClassName("image")).indexOf(clickedImage);

        updateImgIndex(index);

        const value = -(29.3 + 10.35 * (index));

        targetPercentage = value;
        currentPercentage = value;

        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate);
        }
      }
    };

    function onPercentageChange(newPercentage) {
      if (-targetPercentage < 18.34) {
        updateImgIndex(0);
      }
      else {
        updateImgIndex(Math.floor((-targetPercentage - 18.34) / 20.5) + 1);
      }
    }

    function updateImgIndex(newIndex) {
      if (currentImgIndex === newIndex) return;

      const numberContainer = document.getElementById("number");

      numberContainer.style.transform = `translateY(${(newIndex - 2) * -1.5}em)`;

      currentImgIndex = newIndex;
    }

    for (const image of carousel.getElementsByClassName("image")) {
      image.addEventListener("click", handleImageClick);
    }

    window.onmousedown = (e) => handleOnDown(e);
    window.ontouchstart = (e) => handleOnDown(e.touches[ 0 ]);
    window.onmouseup = () => handleOnUp();
    window.ontouchend = () => handleOnUp();
    window.onmousemove = (e) => handleOnMove(e);
    window.ontouchmove = (e) => handleOnMove(e.touches[ 0 ]);

    window.addEventListener("wheel", handleOnScroll);
  }
});
</script>


<style scoped>
.home-content {
  height: 100vh;
  width: 100vw;
  background-color: #141414;
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

#page-number {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  height: 1em;
  font-weight: 450;
  font-size: 1.1em;
  line-height: 0.5em;
  overflow: hidden
}

#number {
  transition: transform 0.5s ease;
}
</style>