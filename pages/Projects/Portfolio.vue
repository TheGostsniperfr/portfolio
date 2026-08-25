<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation" :style="{ '--hero': 'url(/images/other/portfolio_home.png)' }">
            <div class="content">
                <p class="title-midle text-less">{{ $t("portfolio.header.overlay") }}</p>
                <p class="title presentation-title">{{ $t("portfolio.header.title") }}</p>
                <p class="title-mini description text-less">
                    {{ $t("portfolio.header.description") }}
                </p>

                <a href="https://github.com/TheGostsniperfr/portfolio" target="_blank" rel="noopener noreferrer">
                    <button class="redirectBtn">Github</button>
                </a>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

const { t } = useI18n();

useHead({
    title: () => t('projects.portfolio.title'),
    meta: [
        { name: 'description', content: () => t('portfolio.head.content') }
    ]
});

onMounted(() => {
    const presentation = document.querySelector('.presentation');
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    presentation.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    observer.observe(presentation);
});

const technoBlocks = computed(() => ([
    {
        image: "/images/lang/nuxt_logo.svg",
        title: t('portfolio.tech.blocks.1.title'),
        description: t('portfolio.tech.blocks.1.description'),
    },
    {
        image: "/images/lang/vuejs_logo.png",
        title: t('portfolio.tech.blocks.2.title'),
        description: t('portfolio.tech.blocks.2.description'),
    },
    {
        image: "/images/lang/github-logo.png",
        title: t('portfolio.tech.blocks.3.title'),
        description: t('portfolio.tech.blocks.3.description'),
    }
]));
</script>
