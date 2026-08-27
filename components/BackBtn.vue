<template>
    <div class="back-btn-content">
        <MediumBtn :onClick="goBack" :title="$t('navbar.backBtn')"/>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MediumBtn from './MediumBtn.vue';

const goBack = (event) => {
    window.history.back();
};

</script>

<style scoped>
/* Matches NavBar's top formula and the lang-selector's left-mirrored inset, so this sits on
   the same line as the nav links regardless of viewport. Kept in sync with ProjectOverlay's
   .overlay-back, the other "Retour" button on the site. */
.back-btn-content {
    position: absolute;
    top: max(2.5vh, env(safe-area-inset-top, 0px));
    left: max(1rem, env(safe-area-inset-left, 0px));
    z-index: 5000;
}
</style>