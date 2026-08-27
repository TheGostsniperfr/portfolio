<template>
    <div class="presentation-section">
        <div class="overview">
            <!-- Left img -->
            <template v-if="dir === 'left'">
                <img class="overview-image" :class="{ 'is-diagram': imageFit === 'contain' }" :src="imageSrc" :alt="imageAlt" />
                <div class="section-ti-sep">
                    <p class="title-mini text-less">{{ overview }}</p>
                    <p class="title presentation-title">{{ title }}</p>
                    <slot name="description"></slot>
                </div>
            </template>

            <!-- Right image -->
            <template v-else>
                <div class="section-ti-sep">
                    <p class="title-mini text-less">{{ overview }}</p>
                    <p class="title presentation-title">{{ title }}</p>
                    <slot name="description"></slot>
                </div>
                <img class="overview-image" :class="{ 'is-diagram': imageFit === 'contain' }" :src="imageSrc" :alt="imageAlt" />
            </template>
        </div>
    </div>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dir: {
    type: String,
    default: 'left',
    validator: value => ['left', 'right'].includes(value),
  },
  /** 'cover' crops to fill (photos); 'contain' shows the whole image on a card backdrop —
      diagrams carry text and arrows to the edge, so cropping them loses information. */
  imageFit: {
    type: String,
    default: 'cover',
    validator: value => ['cover', 'contain'].includes(value),
  },
});

</script>



<style scoped>
/* Original was a 40%/55% split with a 5% gap and 5% padding either side — 110% of the row, so
   this overflowed even on a desktop. Keeping the image capped at 40% (flex-grow: 0) and letting
   the text take the rest reproduces the same ratio without the overflow. */
.overview {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--page-gutter);
    gap: clamp(1.5rem, 4vw, 3rem);
}

.overview-image {
    flex: 0 1 40%;
    min-width: 18rem;
    max-width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.overview-image.is-diagram {
    object-fit: contain;
    background: #1e1e1e;
    border-radius: 6px;
    padding: 0.75rem;
    box-sizing: border-box;
}

.section-ti-sep {
    flex: 1 1 0;
    min-width: 18rem;
    padding-top: 0%;
}

/* Below this the two columns are narrower than their content is readable at. */
@media (max-width: 720px) {
    .overview {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>