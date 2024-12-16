<!-- app.vue -->
<template>
  <div>
    <transition name="fade" mode="out-in">
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
