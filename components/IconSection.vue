<template>
    <div class="icon-section">
        <div class="info">
            <div class="title-container">
                <p class="title-mini text-less">{{ overview }}</p>
                <p class="title-midle">{{ title }}</p>
            </div>
            <MediumBtn v-if="props.blocks.length > 7" :onclick="toggleViewAll" :title="$t('utils.btn')" weak-border="true" />
        </div>
        <transition-group name="fade" mode="out-in" tag="div" class="content">
            <div v-for="(block, index) in displayedBlocks" :key="index" class="block">
                <div class="img-container">
                    <img :src="block.image" alt="Block image" class="block-image" />
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
    overview: {
        type: String,
        required: false,
        default: 'Overview'
    },
    title: {
        type: String,
        required: false,
        default: 'Technologies'
    }
});

const showAll = ref(false);

const displayedBlocks = computed(() => (showAll.value ? props.blocks : props.blocks.slice(0, 7)));

function toggleViewAll() {
    showAll.value = !showAll.value;
}
</script>

<style scoped>
* {
    --techno-width: 175px;
}

.icon-section {
    display: flex;
    flex-direction: column;
    padding: 2.5% 0%;
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

.content {
    display: grid;
    grid-template-columns: repeat(7, 0fr);
    justify-content: space-between;
    margin: 20px 5%;
    gap: 40px;
}

.block {
    display: flex;
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: var(--techno-width);
    width: var(--techno-width);
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

.title-container {
    display: grid;
}

.text-less {
    color: #c2c2c2d3;
}
</style>
