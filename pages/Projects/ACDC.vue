<template>
    <div class="ud-content">
        <BackBtn />
        <div class="presentation">
            <div class="content">
                <p class="title-midle text-less">{{ $t("acdc.header.overlay") }}</p>
                <p id="presentation-title" class="title">
                    {{ $t("acdc.header.title.1") }} 
                    <br />
                    {{ $t("acdc.header.title.2") }}
                </p>
                <p class="title-mini description text-less">
                    {{ $t("acdc.header.description.body.1") }}
                </p>
            </div>
        </div>

        <TechnoSection :blocks="technoBlocks" />

        <PresentationSection imageSrc="/images/TC/devops.png" imageAlt="Devops schema" 
        :overview="$t('acdc.about.overlay')" :title="$t('acdc.about.title')" dir="left">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t("acdc.about.description.1") }} 
                    <br />
                    {{ $t("acdc.about.description.2") }} 
                    <br />
                    {{ $t("acdc.about.description.3") }} 
                </p>

            </template>
        </PresentationSection>

        <PresentationSection imageSrc="/images/TC/gitlab_cicd.png" imageAlt="Before and After Post processing"
        :overview="$t('acdc.designer.overlay')" :title="$t('acdc.designer.title')" dir="right">

            <template #description>
                <p class="title-mini description text-less">
                    {{ $t("acdc.designer.description.1") }} 
                    <br />
                    {{ $t("acdc.designer.description.2") }} 
                </p>

            </template>
        </PresentationSection>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import PresentationSection from '~/components/PresentationSection.vue';
import BackBtn from '~/components/BackBtn.vue';
import TechnoSection from '~/components/TechnoSection.vue';

const { t } = useI18n();

useHead({
  title: 'ACDC',
  meta: [
    { name: 'description', content: t('acdc.head.content') }
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
        { threshold: 0.5 }
    );

    observer.observe(presentation);
});

const technoBlocks = [
    {
        image: "/images/ACDC/teaching_logo.png",
        title: t('acdc.tech.blocks.1.title'),
        description: t('acdc.tech.blocks.1.description'),
    },
    {
        image: "/images/lang/CSharp_Logo.png",
        title: t('acdc.tech.blocks.2.title'),
        description: t('acdc.tech.blocks.2.description'),
    },
    {
        image: "/images/lang/rust_logo.png",
        title: t('acdc.tech.blocks.3.title'),
        description: t('acdc.tech.blocks.3.description'),
    }
];

</script>

<style scoped>
.redirectBtn {
    margin-top: 1.5em;
    width: 18em;
    height: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
}

.redirectBtn:hover {
    background-color: #25cee9;
    box-shadow: 0px 15px 20px rgba(46, 192, 229, 0.25);
    color: #fff;
    transform: translateY(-6px);
}

.ud-logo {
    max-height: 200px;
    transform: translate(-100px, 30px);
}

.trailer {
    border-radius: 10px;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    width: 125vh;
    height: 33vw;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 54px 55px, rgba(0, 0, 0, 0.25) 0px -12px 30px, rgba(0, 0, 0, 0.25) 0px 4px 6px, rgba(0, 0, 0, 0.34) 0px 12px 13px, rgba(0, 0, 0, 0.18) 0px -3px 5px;
}

.ud-content {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    color: #fff;
    font-family: WF Visual Sans, Arial, sans-serif;
    letter-spacing: .01em;
    line-height: 1.04;
}

.presentation {
    position: relative;
    width: 100vw;
    display: flex;
    color: white;
    overflow: hidden;
}

.presentation::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0) 100%),
        url('/images/ACDC/logo_tp.png') center/cover no-repeat;
    z-index: 1;
    transform: scale(1.2);
    transition: transform 3.5s cubic-bezier(0.04, 0.68, 0.15, 1);
    filter: blur(3px);
}

.presentation.visible::before {
    transform: scale(1);
}

.presentation .content {
    position: relative;
    z-index: 10;
    padding-top: 6%;
    padding-left: 10%;
    max-width: 31%;
    padding-bottom: 15%;
    width: 100%;
}

.title {
    font-size: 3.7rem;
    font-weight: 600;
    margin: 0%;
}

.title-midle {
    font-size: 3rem;
    font-weight: 550;
    margin: 0%;
}

.title-mini {
    line-height: 150%;
    font-size: 1.3em;
    font-weight: 500;
    margin: 0%;
}

.text-less {
    color: #c2c2c2d3;
}

#presentation-title {
    padding-bottom: 50px;
}
</style>