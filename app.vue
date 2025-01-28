<!-- app.vue -->
<template>
  <div>
    <Transition name="fade" >
      <NavBar v-if='route.path !== "/"' />
    </Transition>
    <transition name="slide-up" mode="out-in">
      <NuxtPage />
    </transition>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
const route = useRoute();
</script>

<style>
body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  background-color: #141414;
  color: #fff;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slide-up-leave-active {
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

.slide-up-enter-active {
  transition: transform 0.4s ease, opacity 1.5s ease-in-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
