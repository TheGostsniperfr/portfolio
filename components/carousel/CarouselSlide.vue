<template>
  <div
    :id="`carousel-slide-${index}`"
    class="slide"
    :class="{ 'is-lifted': isLifted }"
    role="option"
    :aria-selected="isActive"
    :aria-label="title"
    :style="{ '--i': index, '--accent': project.accent }"
    @click="onClick"
  >
    <div ref="frame" class="slide-frame">
      <div ref="media" class="slide-media">
        <ResponsiveImage
          :src="project.cover"
          :alt="title"
          :loading="index < 3 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          sizes="(orientation: portrait) 100vw, 40vw"
        />
      </div>
      <div class="slide-caption">
        <span class="slide-year">{{ project.year }}</span>
        <span class="slide-name">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ResponsiveImage from '~/components/ResponsiveImage.vue'
import type { Project } from '~/data/projects'

const props = defineProps<{
  project: Project
  index: number
  isActive: boolean
  title: string
  /** True while the overlay is showing this card, so only one copy is ever visible. */
  isLifted?: boolean
}>()

const emit = defineEmits<{
  open: [ payload: { index: number, frame: HTMLElement, media: HTMLElement } ]
}>()

const frame = ref<HTMLElement | null>(null)
const media = ref<HTMLElement | null>(null)

function onClick() {
  if (!frame.value || !media.value) return
  emit('open', { index: props.index, frame: frame.value, media: media.value })
}
</script>

<style scoped>
.slide {
  /* How many cards each side keep drifting. Beyond this the parallax saturates, which only
     happens off-screen on ordinary widths. */
  --parallax-range: 3;
  --parallax-zoom: 1.5;
  /* Largest translation that still keeps the zoomed image's edge outside the frame:
     visual travel = zoom x this = (zoom - 1) / 2, exactly the overflow on one side.
     The 0.96 leaves a hair of margin against subpixel bleed. */
  --parallax-travel: calc((var(--parallax-zoom) - 1) / (2 * var(--parallax-zoom)) * 96%);

  --offset: calc(var(--i) - var(--pos, 0));
  --dist: max(var(--offset), -1 * var(--offset));
  --near: clamp(0, var(--dist), 1);
  --shift: clamp(calc(-1 * var(--parallax-range)), var(--offset), var(--parallax-range));

  flex: 0 0 auto;
  width: var(--slide-w);
  height: var(--slide-h);
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  transform: scale(calc(1 - var(--near) * 0.12));
}

.slide-frame {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  background: #0d0d0d;
}

/* visibility, not display: the overlay still measures this card every frame while it grows. */
.slide.is-lifted .slide-frame {
  visibility: hidden;
}

.slide-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #0a0a0a;
  opacity: calc(var(--near) * 0.55);
  pointer-events: none;
}

.slide-media {
  width: 100%;
  height: 100%;
}

.slide-media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Drift is proportional to the distance from centre, so every visible card moves and the
     centred one sits exactly on the middle of its image. */
  transform:
    scale(var(--parallax-zoom))
    translate3d(calc(var(--shift) / var(--parallax-range) * var(--parallax-travel)), 0, 0);
}

.slide-caption {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  align-items: baseline;
  gap: 0.6em;
  padding: 1.6em 1em 0.9em;
  background: linear-gradient(to top, #000000cc, transparent);
  opacity: calc(1 - var(--near));
  pointer-events: none;
}

.slide-year {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.08em;
}

.slide-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Portrait: one full-height card per project, driven by native scroll-snap. */
.carousel.is-portrait .slide {
  width: 100%;
  height: 100dvh;
  scroll-snap-align: center;
  transform: none;
}

.carousel.is-portrait .slide-frame {
  border-radius: 0;
}

.carousel.is-portrait .slide-frame::after {
  opacity: 0;
}

.carousel.is-portrait .slide-caption {
  opacity: 1;
  padding: 3em 1.5em 5em;
}

.carousel.is-portrait .slide-name {
  font-size: 1.5rem;
}

.carousel.is-portrait .slide-media :deep(img) {
  transform: scale(1.25);
}

@supports (animation-timeline: view()) {
  .carousel.is-portrait .slide-media :deep(img) {
    animation: slide-parallax linear both;
    animation-timeline: view();
  }
}

@keyframes slide-parallax {
  from { transform: scale(1.25) translate3d(0, -7%, 0); }
  to { transform: scale(1.25) translate3d(0, 7%, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .carousel.is-portrait .slide-media :deep(img) {
    animation: none;
  }
}
</style>
