<template>
    <div class="back-btn-content">
        <MediumBtn :onClick="goBack" title="Back"/>
    </div>
</template>

<script setup>
import MediumBtn from './MediumBtn.vue';

const goBack = (event) => {
    window.history.back();
};

</script>

<style scoped>
.back-btn-content {
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    z-index: 50;
}
</style>