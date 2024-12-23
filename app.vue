<!-- app.vue -->
<template>
  <div>
    <transition name="slide-up" mode="out-in">
      <NuxtPage />
    </transition>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  background-color: #141414;
  color: #fff;
  overflow: hidden;
}

/* Transition de bas vers le haut avec chevauchement */
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

.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
