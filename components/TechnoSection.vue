<template>
    <div class="techno-section">
        <div class="info">
            <p class="title-midle">Technologies</p>
            <MediumBtn v-if="props.blocks.length > 3" :onclick="toggleViewAll" title="View All" weak-border="true" />
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
    --techno-width: 175px;
}

.techno-section {
    display: flex;
    flex-direction: column;
}

.info {
    padding: 2% 5% 0% 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
}

.title-midle {
    font-size: 2.5rem;
    font-weight: 650;
    margin: 0%;
}

.title-mini {
    line-height: 100%;
    font-size: 1.1em;
    font-weight: 600;
    margin: 0%;
}

.text-less {
    color: #c2c2c2d3;
}

.content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    gap: 40px;
    margin: 20px 5%;
}

.block {
    display: flex;
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: var(--techno-width);
    transition: transform 0.3s, opacity 0.3s;
}

.block:hover .block-image {
    transform: scale(1.1);
}

.block-image {
    height: var(--techno-width);
    width: var(--techno-width);
    object-fit: cover;
    border-radius: 8px;
    transform: scale(1);
    transition: transform ease 0.5s;
}

.img-container {
    overflow: hidden;
}

.block-text {
    flex: 1;
    padding: 25px;
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
