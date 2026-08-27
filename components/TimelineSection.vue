<template>
  <div class="timeline-section">
    <div class="overview" :class="imagePositionClass">
      <!-- Left img -->
      <template v-if="dir === 'left'">
        <div class="timeline">

          <div v-for="(block, index) in blocks" :key="index" class="timeline-items">
            <NuxtLink v-if="block.link !== ''" :to="block.link" class="timeline-item">
              <div class="link-container">
                <img src="/images/other/external-link-blue.png" alt="" class="link-img">
              </div>
              <img :src="block.image" :alt="block.alt" class="ti-image">
              <div class="ti-text">
                <div class="ti-text-up">
                  <p class="timeline-item-date text-less">{{ block.date }}</p>
                  <p class="timeline-item-title title-midle">{{ block.title }}</p>
                </div>
                <p class="timeline-item-description text-less">{{ block.description }}</p>
              </div>
            </NuxtLink>

            <div v-else class="timeline-item">
              <img :src="block.image" :alt="block.alt" class="ti-image">
              <div class="ti-text">
                <div class="ti-text-up">
                  <p class="timeline-item-date text-less">{{ block.date }}</p>
                  <p class="timeline-item-title title-midle">{{ block.title }}</p>
                </div>
                <p class="timeline-item-description text-less">{{ block.description }}</p>
              </div>
            </div>
          </div>

        </div>

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
        <div class="timeline">

          <div v-for="(block, index) in blocks" :key="index" class="timeline-items">
            <NuxtLink v-if="block.link !== ''" :to="block.link" class="timeline-item">
              <div class="link-container">
                <img src="/images/other/external-link-blue.png" alt="" class="link-img">
              </div>
              <img :src="block.image" :alt="block.alt" class="ti-image">
              <div class="ti-text">
                <div class="ti-text-up">
                  <p class="timeline-item-date text-less">{{ block.date }}</p>
                  <p class="timeline-item-title title-midle ">{{ block.title }}</p>
                </div>
                <p class="timeline-item-description text-less">{{ block.description }}</p>
              </div>
            </NuxtLink>

            <div v-else class="timeline-item">
              <img :src="block.image" :alt="block.alt" class="ti-image">
              <div class="ti-text">
                <div class="ti-text-up">
                  <p class="timeline-item-date text-less">{{ block.date }}</p>
                  <p class="timeline-item-title title-midle ">{{ block.title }}</p>
                </div>
                <p class="timeline-item-description text-less">{{ block.description }}</p>
              </div>
            </div>
          </div>

        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blocks: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dir: {
    type: String,
    default: 'left',
    validator: value => [ 'left', 'right' ].includes(value),
  },
});

</script>

<style scoped>
* {
  --img-width: clamp(72px, 10vw, 125px);
}

.ti-image {
  flex: 0 0 auto;
  width: var(--img-width);
  height: var(--img-width);
  border-radius: 50px;
  object-fit: cover;
  overflow: hidden;
}

.ti-text-up {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  position: relative;
  align-items: center;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.25s ease;
  background-color: #1e1e1e;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  text-decoration: none;
  color: inherit;
  cursor: default; 
}

a.timeline-item {
  cursor: pointer;
}

.link-container {
  position: absolute;
  top: 15px;
  right: 15px;
}

.link-img {
  width: 25px;
  width: 25px;
}

/* Capped at 40% (flex-grow: 0) to reproduce the original 40/45 split instead of growing equally
   with .section-ti-sep. */
.timeline {
  flex: 0 1 40%;
  min-width: 18rem;
}

.timeline-item:hover {
  transform: scale(1.05);
}

.ti-text {
  min-width: 0;
  padding-top: 20px;
}

.timeline-item-date,
.timeline-item-title {
  margin: 0%;
}

.overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: var(--page-gutter);
  gap: clamp(1.5rem, 4vw, 3rem);
}

.section-ti-sep {
  flex: 1 1 0;
  min-width: 18rem;
  padding-top: 0%;
}

.title-midle {
  font-size: clamp(1.15rem, 1rem + 0.6vw, 1.5rem);
  font-weight: 600;
  margin: 0%;
}

.timeline-item-description {
  font-size: clamp(1rem, 0.95rem + 0.3vw, 1.3em);
}

@media (max-width: 720px) {
  .overview {
    flex-direction: column;
    align-items: stretch;
  }

  /* The absolute link icon sat on top of the title once the card got narrow. */
  .link-container {
    top: 8px;
    right: 8px;
  }
}

@media (hover: none) {
  .timeline-item:hover {
    transform: none;
  }
}
</style>