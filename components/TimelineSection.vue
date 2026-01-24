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
          <p id="presentation-title" class="title">{{ title }}</p>
          <slot name="description"></slot>
        </div>
      </template>

      <!-- Right image -->
      <template v-else>
        <div class="section-ti-sep">
          <p class="title-mini text-less">{{ overview }}</p>
          <p id="presentation-title" class="title">{{ title }}</p>
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
  --img-width: 125px;
}

.title {
  font-size: 3.7rem;
  font-weight: 600;
  margin: 0%;
}

.ti-image {
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

.timeline {
  width: 40%;
}

.timeline-item:hover {
  transform: scale(1.05);
}

.ti-text {
  padding-top: 20px;
}

.timeline-item-date,
.timeline-item-title {
  margin: 0%;
}

.timeline-item-description {
  font-size: 1.3em;
}

.overview {
  display: flex;
  align-items: center;
  padding: 5%;
  gap: 5%;
}

.description {
  padding-top: 50px;
}

.overview-image {
  width: 40%;
  aspect-ratio: 16/9;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.section-ti-sep {
  width: 45%;
  padding-top: 0%;
}

#presentation-title {
  padding-bottom: 50px;
}

.text-less {
  color: #c2c2c2d3;
}

.title-midle {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0%;
}
</style>