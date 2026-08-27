<template>
    <div class="project-link-btn">
        <MediumBtn :onClick="go" :title="title" weak-border />
    </div>
</template>

<script setup>
import MediumBtn from './MediumBtn.vue';

const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const go = () => navigateTo(props.to);
</script>

<style scoped>
/* Sits right after a description paragraph — needs its own breathing room, same cadence as
   the rest of the fluid type scale. */
.project-link-btn {
    margin-top: clamp(1rem, 2.5vw, 1.5rem);
}
</style>
