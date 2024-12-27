<template>
    <a class="medium-btn" @click="handleClick">
        {{ title }}
    </a>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },

    onClick: {
        type: Function,
        required: true,
    },
});

const handleClick = (event) => {
    props.onClick(event);
};
</script>

<style scoped>
.medium-btn {
    --border-color: #fff;
    --border-thickness: 3px;
    --hover-gap: 5px;

    padding: calc(var(--hover-gap) + var(--border-thickness));
    border-radius: 3px;
    font-size: 125%;
    font-weight: 500;
    text-decoration: none;
    color: #fff;
    background: #000;
    cursor: pointer;

    --gradient-color-stop: #0000 25%, var(--border-color) 0;
    background:
        conic-gradient(from 180deg at top var(--border-thickness) right var(--border-thickness), var(--gradient-color-stop)) var(--gradient-animation, 200%) 0 / 200% var(--gradient-animation, var(--border-thickness)) no-repeat,
        conic-gradient(at bottom var(--border-thickness) left var(--border-thickness), var(--gradient-color-stop)) 0 var(--gradient-animation, 200%) / var(--gradient-animation, var(--border-thickness)) 200% no-repeat;
    transition: 0.3s, background-position 0.3s 0.3s;
}

.medium-btn:hover {
    --gradient-animation: 100%;
    transition: 0.3s, background-size 0.3s 0.3s;
}
</style>
