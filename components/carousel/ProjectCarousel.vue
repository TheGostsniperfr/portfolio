<template>
  <div class="carousel-root">
    <div
      ref="viewport"
      class="carousel"
      :class="{ 'is-portrait': isPortrait, 'is-dragging': isDragging }"
      role="listbox"
      :aria-label="$t('projects.ariaLabel')"
      :aria-activedescendant="`carousel-slide-${activeIndex}`"
      tabindex="0"
    >
      <div ref="track" class="track">
        <CarouselSlide
          v-for="(project, i) in projects"
          :key="project.slug"
          :project="project"
          :index="i"
          :title="titles[i]"
          :is-active="i === activeIndex"
          :is-lifted="i === openIndex"
          @open="onSlideOpen"
        />
      </div>

      <svg class="crosshair" viewBox="0 0 22 22" aria-hidden="true">
        <polygon points="22 11.751 0 11.751 0 10.249 22 10.249 22 11" />
        <polygon points="11.751 0 11.751 22 10.249 22 10.249 0 11 0" />
      </svg>

      <div v-if="isPortrait" class="portrait-scrim" aria-hidden="true" />

      <div class="hud">
        <Transition name="hud-title" mode="out-in">
          <p :key="activeIndex" class="hud-title" :style="{ '--accent': activeProject.accent }">
            <span class="hud-name">{{ titles[activeIndex] }}</span>
            <span class="hud-tags">{{ activeProject.tags.join(' · ') }}</span>
          </p>
        </Transition>
        <CarouselCounter :index="activeIndex" :count="projects.length" />
      </div>
    </div>

    <!-- Teleported out: .carousel-root is position:fixed, whose stacking context would
         otherwise trap the overlay below NavBar's z-index: 5000. -->
    <!-- No enter/leave transition: useCardExpand owns both directions. A fade would make the
         growing card translucent on open and leave the full-screen cover lingering on close. -->
    <Teleport to="body">
      <ProjectOverlay
        v-if="openIndex !== null"
        ref="overlay"
        :project="projects[openIndex]"
        :title="titles[openIndex]"
        :show-ui="overlayShowUi"
        :interactive="overlayReady"
        @close="close"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CarouselSlide from './CarouselSlide.vue'
import CarouselCounter from './CarouselCounter.vue'
import ProjectOverlay from './ProjectOverlay.vue'
import { projects } from '~/data/projects'

const { t, te } = useI18n()
const router = useRouter()

const viewport = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const overlay = ref<InstanceType<typeof ProjectOverlay> | null>(null)

const isPortrait = useMediaQuery('(orientation: portrait), (max-width: 820px)')
const engineEnabled = computed(() => !isPortrait.value)

const { index, isDragging, goTo, jumpTo, consumeClickSuppression } = useProjectCarousel({
  count: computed(() => projects.length),
  viewport,
  track,
  enabled: engineEnabled,
  // Landscape opens on the middle card; portrait is a vertical list, so it starts at the top.
  initialIndex: isPortrait.value ? 0 : Math.floor((projects.length - 1) / 2),
})

const expand = useCardExpand()

const openIndex = ref<number | null>(null)
// Split on purpose: the title fades in partway through the growth, while pointer input stays
// blocked until the very end so the click that opened the overlay cannot fall through.
const overlayShowUi = ref(false)
const overlayReady = ref(false)
let sourceFrame: HTMLElement | null = null
let sourceImg: HTMLElement | null = null
let isAnimating = false

// Computed so switching locale actually re-translates, unlike a t() call made once at setup.
const titles = computed(() => projects.map((p) => (te(p.titleKey) ? t(p.titleKey) : p.fallbackTitle)))
const activeIndex = computed(() => Math.min(Math.max(index.value, 0), projects.length - 1))
const activeProject = computed(() => projects[ activeIndex.value ])

function onSlideOpen({ index: slideIndex, frame, media }: { index: number, frame: HTMLElement, media: HTMLElement }) {
  if (isAnimating || consumeClickSuppression()) return

  if (isPortrait.value) {
    router.push(`/Projects/${projects[ slideIndex ].slug}`)
    return
  }

  // Recentres and zooms at the same time, so an off-centre card still opens in one gesture.
  goTo(slideIndex)
  sourceFrame = frame
  void open(slideIndex, frame, media)
}

async function open(slideIndex: number, frame: HTMLElement, media: HTMLElement) {
  const sourceImage = media.querySelector<HTMLElement>('img')
  if (!sourceImage) return

  isAnimating = true
  overlayReady.value = false
  overlayShowUi.value = false
  sourceImg = sourceImage
  openIndex.value = slideIndex
  await nextTick()

  const handles = overlay.value
  if (handles?.frame && handles.imageEl && handles.scrim) {
    await expand.play({
      frame: handles.frame,
      image: handles.imageEl,
      scrim: handles.scrim,
      sourceFrame: frame,
      sourceImage,
      onProgress: (eased) => {
        if (eased > 0.3) overlayShowUi.value = true
      },
    })
  }
  isAnimating = false
  overlayShowUi.value = true
  overlayReady.value = true
}

async function close() {
  if (openIndex.value === null || isAnimating) return

  overlayReady.value = false
  overlayShowUi.value = false
  const handles = overlay.value

  if (handles?.frame && handles.imageEl && handles.scrim && sourceFrame && sourceImg) {
    isAnimating = true
    await expand.play({
      frame: handles.frame,
      image: handles.imageEl,
      scrim: handles.scrim,
      sourceFrame,
      sourceImage: sourceImg,
      reverse: true,
    })
    isAnimating = false
  }

  openIndex.value = null
  sourceFrame = null
  sourceImg = null
  viewport.value?.focus({ preventScroll: true })
}

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
}

function onKeydown(event: KeyboardEvent) {
  if (openIndex.value !== null || isPortrait.value) return
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
  if (isTyping(event.target)) return

  const actions: Record<string, () => void> = {
    ArrowLeft: () => goTo(activeIndex.value - 1),
    ArrowRight: () => goTo(activeIndex.value + 1),
    Home: () => goTo(0),
    End: () => goTo(projects.length - 1),
  }

  const action = actions[ event.key ]
  if (action) {
    event.preventDefault()
    action()
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    const focused = document.activeElement
    if (focused && focused !== document.body && focused !== viewport.value) return

    const slide = track.value?.children[ activeIndex.value ]
    const frame = slide?.querySelector<HTMLElement>('.slide-frame')
    const media = slide?.querySelector<HTMLElement>('.slide-media')
    if (frame && media) {
      event.preventDefault()
      sourceFrame = frame
      void open(activeIndex.value, frame, media)
    }
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

// Portrait has no engine loop: the native scroller is the source of truth for the active index.
let scrollObserver: IntersectionObserver | null = null

function teardownScrollObserver() {
  scrollObserver?.disconnect()
  scrollObserver = null
}

watch([ isPortrait, track ], async ([ portrait, trackElement ]) => {
  teardownScrollObserver()
  if (!portrait || !trackElement || !viewport.value) return

  const root = viewport.value
  scrollObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const slideIndex = Array.prototype.indexOf.call(trackElement.children, entry.target)
      if (slideIndex >= 0) index.value = slideIndex
    }
  }, { root, threshold: 0.6 })

  for (const child of trackElement.children) scrollObserver.observe(child)

  await nextTick()
  root.scrollTo({ top: activeIndex.value * root.clientHeight, behavior: 'instant' as ScrollBehavior })
}, { immediate: true })

watch(isPortrait, (portrait) => {
  if (!portrait) jumpTo(index.value)
})

onBeforeUnmount(teardownScrollObserver)
</script>

<style scoped>
.carousel-root {
  position: fixed;
  inset: 0;
  background: #141414;
}

.carousel {
  --slide-w: clamp(190px, 24vw, 330px);
  --slide-h: calc(var(--slide-w) * 1.4);
  --gap: clamp(12px, 2.5vw, 34px);

  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
  outline: none;
}

.carousel:focus-visible {
  box-shadow: inset 0 0 0 2px #ffffff40;
}

.carousel.is-dragging {
  cursor: grabbing;
}

.track {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  gap: var(--gap);
  transform: translate3d(calc(-1 * (var(--pos, 0) * var(--step, 0px) + var(--half, 0px))), -50%, 0);
  will-change: transform;
}

.crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 23px;
  height: 23px;
  transform: translate(-50%, -50%);
  fill: #fff;
  pointer-events: none;
}

/* Keeps the global NavBar readable over bright covers in portrait. */
.portrait-scrim {
  position: fixed;
  inset: 0 0 auto 0;
  height: 22vh;
  background: linear-gradient(to bottom, #0a0a0acc, transparent);
  pointer-events: none;
}

.hud {
  position: absolute;
  inset: auto 0 max(4vh, env(safe-area-inset-bottom, 0px)) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  padding: 0 1rem;
  pointer-events: none;
}

.hud-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35em;
  margin: 0;
  text-align: center;
}

.hud-name {
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  font-weight: 500;
}

.hud-tags {
  font-size: clamp(0.65rem, 1.4vw, 0.78rem);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.hud-title-enter-active,
.hud-title-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.hud-title-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.hud-title-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Portrait: the viewport becomes the scroller and the engine is switched off entirely. */
.carousel.is-portrait {
  overflow-y: auto;
  overflow-x: hidden;
  touch-action: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

.carousel.is-portrait::-webkit-scrollbar {
  display: none;
}

.carousel.is-portrait .track {
  position: static;
  flex-direction: column;
  gap: 0;
  transform: none;
  will-change: auto;
}

.carousel.is-portrait .crosshair {
  display: none;
}

.carousel.is-portrait .hud {
  position: fixed;
  inset: auto 0 max(2.5vh, env(safe-area-inset-bottom, 0px)) 0;
  text-shadow: 0 1px 10px #000000e6;
}

.carousel.is-portrait .hud-title {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .hud-title-enter-active,
  .hud-title-leave-active {
    transition: none;
  }
}
</style>
