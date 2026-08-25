<template>
    <div class="presentation-section">
        <div class="overview">
            <!-- Left img -->
            <template v-if="dir === 'left'">
                <img class="overview-image" :src="imageSrc" :alt="imageAlt" />
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
                <img class="overview-image" :src="imageSrc" :alt="imageAlt" />
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
});

</script>



<style scoped>
/* The columns were 40% + 55% with a 5% gap and 5% padding either side — 110% of the row, so
   this section overflowed even on a desktop. Flex basis with wrap replaces the fixed widths. */
.overview {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--page-gutter);
    gap: clamp(1.5rem, 4vw, 3rem);
}

.overview-image {
    flex: 1 1 20rem;
    min-width: 0;
    max-width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.section-ti-sep {
    flex: 1 1 22rem;
    min-width: 0;
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