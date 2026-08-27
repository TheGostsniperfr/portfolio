<template>
  <div
    ref="root"
    class="overlay"
    :class="{ 'is-interactive': interactive, 'is-ui-visible': showUi }"
    role="dialog"
    aria-modal="true"
    :aria-label="title"
    tabindex="-1"
  >
    <div ref="scrim" class="overlay-backdrop" @click="emit('close')" />

    <div ref="frame" class="overlay-frame">
      <ResponsiveImage
        :src="project.cover"
        :alt="title"
        loading="eager"
        fetchpriority="high"
        sizes="100vw"
      />
    </div>

    <div class="overlay-scrim" />

    <div class="overlay-ui" :style="{ '--accent': project.accent }">
      <div class="overlay-back">
        <MediumBtn :onClick="() => emit('close')" :title="$t('navbar.backBtn')" />
      </div>

      <div class="overlay-center">
        <p class="overlay-meta">
          <span class="overlay-year">{{ project.year }}</span>
          <span v-for="tag in project.tags" :key="tag" class="overlay-tag">{{ tag }}</span>
        </p>
        <NuxtLink class="overlay-title" :to="`/Projects/${project.slug}`" prefetch>
          {{ title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import MediumBtn from '~/components/MediumBtn.vue'
import ResponsiveImage from '~/components/ResponsiveImage.vue'
import type { Project } from '~/data/projects'

withDefaults(defineProps<{
  project: Project
  title: string
  /** Fades the title and scrim in partway through the opening animation. */
  showUi?: boolean
  /** Held false until the opening animation ends, so the click that opened the overlay
      cannot fall through onto the title link that lands under the cursor. */
  interactive?: boolean
}>(), { showUi: false, interactive: false })

const emit = defineEmits<{ close: [] }>()

const root = ref<HTMLElement | null>(null)
const frame = ref<HTMLElement | null>(null)
const scrim = ref<HTMLElement | null>(null)

const imageEl = computed(() => frame.value?.querySelector('img') ?? null)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
  }
}

onMounted(() => {
  // Focus the dialog itself, never the title link: leaving focus on the link made Enter and
  // the arrow keys light up its border and then navigate to the project unprompted.
  root.value?.focus({ preventScroll: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

defineExpose({ frame, imageEl, scrim })
</script>

<style scoped>
/* Above NavBar's z-index: 5000 — the overlay owns the screen while it is open. */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 6000;
  outline: none;
}

/* Starts transparent and zero-sized: useCardExpand sizes both on its first frame, before
   the browser paints, so nothing flashes at full screen on mount. */
.overlay-backdrop {
  position: absolute;
  inset: 0;
  background: #141414;
  opacity: 0;
  pointer-events: none;
}

.overlay.is-interactive .overlay-backdrop {
  pointer-events: auto;
}

/* Sized in px by useCardExpand so `object-fit: cover` reframes on every frame,
   exactly like the original growing card. */
.overlay-frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}

.overlay-frame :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-scrim {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 45% at center, #000000d9 0%, #00000073 55%, #00000026 100%),
    linear-gradient(to bottom, #000000a6 0%, #00000040 30%, #00000040 70%, #000000a6 100%);
  pointer-events: none;
}

.overlay-ui {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.overlay.is-interactive .overlay-ui > * {
  pointer-events: auto;
}

/* Kept in sync with BackBtn's .back-btn-content — same "Retour" button, same position formula. */
.overlay-back {
  position: absolute;
  top: max(2.5vh, env(safe-area-inset-top, 0px));
  left: max(1rem, env(safe-area-inset-left, 0px));
}

.overlay-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.6rem, 2vh, 1.4rem);
  padding: 1rem;
  text-align: center;
}

.overlay-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em 1em;
  margin: 0;
  font-size: clamp(0.7rem, 1.6vw, 0.85rem);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffffffcc;
  text-shadow: 0 1px 8px #000000cc;
}

.overlay-year {
  color: var(--accent);
}

.overlay-title {
  --border-color: #fff;
  --border-thickness: 5px;
  --hover-gap: 10px;
  --gradient-color-stop: #0000 25%, var(--border-color) 0;

  font-size: clamp(2rem, 8vw, 5rem);
  font-weight: 500;
  line-height: 1.1;
  text-decoration: none;
  color: #fff;
  text-shadow: 0 2px 24px #000000e6, 0 0 60px #000000b3;
  padding: calc(var(--hover-gap) + var(--border-thickness));
  border-radius: 3px;
  cursor: pointer;
  background:
    conic-gradient(from 180deg at top var(--border-thickness) right var(--border-thickness), var(--gradient-color-stop)) var(--gradient-animation, 200%) 0 / 200% var(--gradient-animation, var(--border-thickness)) no-repeat,
    conic-gradient(at bottom var(--border-thickness) left var(--border-thickness), var(--gradient-color-stop)) 0 var(--gradient-animation, 200%) / var(--gradient-animation, var(--border-thickness)) 200% no-repeat;
  transition: 0.3s, background-position 0.3s 0.3s;
}

.overlay-title:hover,
.overlay-title:focus-visible {
  --gradient-animation: 100%;
  transition: 0.3s, background-size 0.3s 0.3s;
  outline: none;
}

/* Revealed partway through the growth rather than at its end, so the title is readable well
   before the card has finished expanding. */
.overlay-ui,
.overlay-scrim {
  opacity: 0;
  transition: opacity 0.28s ease;
}

.overlay.is-ui-visible .overlay-ui,
.overlay.is-ui-visible .overlay-scrim {
  opacity: 1;
}
</style>
