<template>
    <div class="presentation-section">
        <div class="overview" :class="imagePositionClass">
            <!-- Left img -->
            <template v-if="dir === 'left'">
                <img class="overview-image" :src="imageSrc" :alt="imageAlt" />
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
  description: {
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
.title {
    font-size: 3.7rem;
    font-weight: 600;
    margin: 0%;
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
    width: 55%;
    padding-top: 0%;
}

#presentation-title {
    padding-bottom: 50px;
}
</style>