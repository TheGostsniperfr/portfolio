<template>
  <div class="home-content">
    <NavBar />
    <svg id="middle-cross" viewBox="0 0 22 22">
      <polygon class="line" points="22 11.751 0 11.751 0 10.249 22 10.249 22 11"></polygon>
      <polygon class="line" points="11.751 0 11.751 22 10.249 22 10.249 0 11 0"></polygon>
    </svg>
    <div id="carousel" data-mouse-down-at="0" data-prev-percentage="0">
      <div class="imageContainer"><img class="image" src="/images/Arffornia/launcher_homepage.png" draggable="false"
          data-title="Arffornia Project"></div>
      <div class="imageContainer"><img class="image" src="/images/OCR/logo.png" draggable="false"
          data-title="OCR Sudoku-Forgers"></div>
      <div class="imageContainer"><img class="image" src="/images/UpsideDown/UpsideDownBG.png" draggable="false"
          data-title="Upside Down"></div>
      <div class="imageContainer"><img class="image" src="/images/TC/logo_back.png" draggable="false"
          data-title="Toolchain"></div>
      <div class="imageContainer"><img class="image" src="/images/ACDC/logo_tp.png" draggable="false" data-title="ACDC">
      </div>
    </div>

    <a id="back-btn" href="#back" @click="goBack" v-show="fullscreenImage">
      Back
    </a>

    <a id="title-btn" :href="titleLink" v-show="fullscreenImage">
      {{ titleText }}
    </a>

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
import NavBar from './NavBar.vue';

let carousel;
let currentPercentage = 0.0;
let targetPercentage = 0.0;
let animationFrame;
const fullscreenImage = ref(null);
let middleCross;
let images;
let currentImgIndex = -1;

const minCarouselX = -8.4;
const maxCarouelX = -90.15;
const titleText = ref("Upside Down");
const titleLink = ref("#");

onMounted(() => {
  carousel = document.getElementById("carousel");
  images = carousel.getElementsByClassName("image");
  middleCross = document.getElementById("middle-cross");

  // init carousel start posision
  currentPercentage = minCarouselX;
  carousel.style.transform = `translate3d(${minCarouselX}%, 0, 0)`;
  Array.from(images).forEach((image, index) => {
    image.style.objectPosition = `${40 + currentPercentage + (index + 1) * 20}% center`;
  });

  if (carousel) {
    updateImgIndex(0);
    const animate = () => {
      currentPercentage += (targetPercentage - currentPercentage) * 0.15;

      if (Math.abs(targetPercentage - currentPercentage) < 0.001) {
        currentPercentage = targetPercentage;
      }

      carousel.style.transform = `translate3d(${currentPercentage}%, 0, 0)`;

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

      const percentage = (mouseDelta / maxDelta) * -80 * 0.7;
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

      const scrollDelta = e.deltaY * 0.7;
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

        // Reset the imageContainer when fullscreen is closed
        clickedImage.closest('.imageContainer').classList.remove('fullscreen');
      } else {
        clickedImage.classList.add('fullscreen');
        middleCross.classList.add('fullscreen');
        fullscreenImage.value = clickedImage;

        const index = Array.from(carousel.getElementsByClassName("image")).indexOf(clickedImage);

        updateImgIndex(index);

        // const newPercentage = -(-minCarouselX + (20.44 * index));
        const newPercentage = -(29.3 + 10.35 * (index));

        carousel.style.transform = `translate3d(${newPercentage}%, 0, 0)`;

        Array.from(images).forEach((image, index) => {
          image.style.objectPosition = `${40 + newPercentage + (index + 1) * 20}% center`;
        });

        targetPercentage = newPercentage;
        carousel.dataset.prevPercentage = newPercentage;

        // Add fullscreen class to the image container as well
        clickedImage.closest('.imageContainer').classList.add('fullscreen');

        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate);
        }
      }
    };

    function onPercentageChange() {
      if (-targetPercentage < 18.34) {
        updateImgIndex(0);
      } else {
        updateImgIndex(Math.floor((-targetPercentage - 18.34) / 20.5) + 1);
      }
    }

    function updateImgIndex(newIndex) {
      if (currentImgIndex === newIndex) return;

      const numberContainer = document.getElementById("number");

      numberContainer.style.transform = `translateY(${(newIndex - 2) * -1.5}em)`;

      currentImgIndex = newIndex;

      titleText.value = images[ newIndex ].dataset.title;
      titleLink.value = `#${titleText.value.replace(/ /g, "-")}`;
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

const goBack = (event) => {
  // TODO
};

</script>


<style scoped>
.home-content {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #141414;
  margin: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#carousel {
  display: flex;
  gap: 4vmin;
  position: absolute;
  left: 50%;
  align-items: center;
}

#carousel>.imageContainer {
  width: 33vmin;
  height: 46vmin;
  transition: transform 0.7s ease, width 0.7s ease, height 0.7s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  transform: scale(2);
}

.image.fullscreen {
  transform: scale(1);
}

#carousel>.imageContainer.fullscreen {
  width: 100vw;
  height: 100vh;
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
  overflow: hidden;
}

#number {
  transition: transform 0.5s ease;
}

#title-btn {
  --border-color: #fff;
  --border-thickness: 5px;
  --hover-gap: 10px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 500%;
  font-weight: 500;
  text-decoration: none;
  color: #fff;
  padding: calc(var(--hover-gap) + var(--border-thickness));
  border-radius: 3px;
  background: #000;
  cursor: pointer;

  --gradient-color-stop: #0000 25%, var(--border-color) 0;
  background:
    conic-gradient(from 180deg at top var(--border-thickness) right var(--border-thickness), var(--gradient-color-stop)) var(--gradient-animation, 200%) 0 / 200% var(--gradient-animation, var(--border-thickness)) no-repeat,
    conic-gradient(at bottom var(--border-thickness) left var(--border-thickness), var(--gradient-color-stop)) 0 var(--gradient-animation, 200%) / var(--gradient-animation, var(--border-thickness)) 200% no-repeat;
  transition: 0.3s, background-position 0.3s 0.3s;
  z-index: 1;
}

#title-btn:hover {
  --gradient-animation: 100%;
  transition: 0.3s, background-size 0.3s 0.3s;
}

#back-btn {
  --border-color: #fff;
  --border-thickness: 3px;
  --hover-gap: 5px;

  position: absolute;
  top: 2.5%;
  left: 2.5%;
  padding: calc(var(--hover-gap) + var(--border-thickness));
  border-radius: 3px;
  font-size: 125%;
  font-weight: 500;
  text-decoration: none;
  color: #fff;
  background: #000;
  cursor: pointer;

  --gradient-color-stop: #0000 25%, var(--border-color) 0;
  background:
    conic-gradient(from 180deg at top var(--border-thickness) right var(--border-thickness), var(--gradient-color-stop)) var(--gradient-animation, 200%) 0 / 200% var(--gradient-animation, var(--border-thickness)) no-repeat,
    conic-gradient(at bottom var(--border-thickness) left var(--border-thickness), var(--gradient-color-stop)) 0 var(--gradient-animation, 200%) / var(--gradient-animation, var(--border-thickness)) 200% no-repeat;
  transition: 0.3s, background-position 0.3s 0.3s;
  z-index: 1;
}

#back-btn:hover {
  --gradient-animation: 100%;
  transition: 0.3s, background-size 0.3s 0.3s;
}
</style>
