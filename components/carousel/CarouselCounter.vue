<template>
  <div class="counter" aria-hidden="true">
    <div class="counter-window">
      <div class="counter-strip" :style="{ transform: `translateY(calc(${-index} * var(--line)))` }">
        <span v-for="n in count" :key="n">{{ n }}</span>
      </div>
    </div>
    <span class="counter-dash">—</span>
    <span>{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  index: number
  count: number
}>()
</script>

<style scoped>
.counter {
  --line: 1.5em;

  display: flex;
  align-items: flex-start;
  gap: 0.35em;
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  font-weight: 450;
  font-variant-numeric: tabular-nums;
}

.counter-window {
  height: var(--line);
  overflow: hidden;
}

.counter-strip {
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.counter-strip span {
  height: var(--line);
  line-height: var(--line);
}

.counter-dash,
.counter > span:last-child {
  line-height: var(--line);
}

@media (prefers-reduced-motion: reduce) {
  .counter-strip {
    transition: none;
  }
}
</style>
