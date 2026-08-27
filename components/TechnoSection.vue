<template>
    <div class="techno-section">
        <div class="info">
            <p class="title-midle">{{ title }}</p>
            <MediumBtn v-if="props.blocks.length > 3" :onClick="toggleViewAll" :title="$t('utils.btn')" weak-border />
        </div>
        <transition-group name="fade" mode="out-in" tag="div" class="content">
            <div v-for="(block, index) in displayedBlocks" :key="index" class="block">
                <div class="img-container">
                    <img :src="block.image" alt="Block image" class="block-image" />
                </div>
                <div class="block-text">
                    <p class="title-mini">{{ block.title }}</p>
                    <p class="text-less description">{{ block.description }}</p>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MediumBtn from './MediumBtn.vue';

const props = defineProps({
    blocks: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: 'Technologies'
    }
});

const showAll = ref(false);

const displayedBlocks = computed(() => (showAll.value ? props.blocks : props.blocks.slice(0, 3)));

function toggleViewAll() {
    showAll.value = !showAll.value;
}
</script>

<style scoped>
* {
    --techno-width: clamp(96px, 12vw, 175px);
}

.techno-section {
    display: flex;
    flex-direction: column;
}

.info {
    padding: 2% var(--page-gutter) 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
}

.title-midle {
    font-size: clamp(1.5rem, 1rem + 1.8vw, 2.5rem);
    font-weight: 650;
    margin: 0%;
}

.title-mini {
    line-height: 100%;
    font-size: clamp(1rem, 0.95rem + 0.3vw, 1.1rem);
    font-weight: 600;
    margin: 0%;
}

.text-less {
    color: #c2c2c2d3;
}

/* Fixed 3 columns from 1024px up, stepping down to 2 then 1 on smaller screens, so the default
   (unexpanded) view is always one full row of 3 on desktop. */
.content {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(16px, 2.5vw, 40px);
    margin: 20px var(--page-gutter);
}

@media (min-width: 640px) {
    .content {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .content {
        grid-template-columns: repeat(3, 1fr);
    }
}

.block {
    display: flex;
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    min-height: var(--techno-width);
    transition: transform 0.3s, opacity 0.3s;
}

.block:hover .block-image {
    transform: scale(1.1);
}

/* height: 100% (not var(--techno-width)) so the image always fills the card's actual height —
   .block only has a min-height, and a taller text neighbour in the same grid row stretches it. */
.block-image {
    height: 100%;
    width: var(--techno-width);
    object-fit: cover;
    transform: scale(1);
    transition: transform ease 0.5s;
}

/* flex: 0 0 auto keeps the width fixed; the height comes from .block's default cross-axis
   stretch, so this container (and the image filling it) always matches the card's real height.
   border-radius lives here (not on .block-image): overflow:hidden only clips to a rounded shape
   if the clipping box itself is rounded, otherwise the corner turns square once hover's scale(1.1)
   pushes the image past the radius. */
.img-container {
    overflow: hidden;
    flex: 0 0 auto;
    border-radius: 8px;
}

/* min-width: 0 lets the text shrink instead of pushing the card past its column. */
.block-text {
    flex: 1;
    min-width: 0;
    padding: clamp(12px, 2vw, 25px);
    align-content: center;
    margin: 0%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
