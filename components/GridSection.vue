<template>
    <div class="grid-section">
        <p id="grid-title" class="title">{{ title }}</p>
        <p id="grid-description" class="text-less title-mini">{{ description }}</p>

        <div class="grids">
            <div v-for="(block, index) in blocks" :key="index" >
                <div v-if='block.link !== ""' class="test-chamber">
                    <NuxtLink :to="block.link">
                        <div class="image-container">
                            <img :src="block.image" :alt="block.title" />
                            <div class="overlay">
                                <p id="block-title" class="title-mini text-less">{{ block.title }}</p>
                                <p id="block-description" class="title-midle">{{ block.description }}</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div v-else class="test-chamber">
                    <div class="image-container">
                        <img :src="block.image" :alt="block.title" />
                        <div class="overlay">
                            <p id="block-title" class="title-mini text-less">{{ block.title }}</p>
                            <p id="block-description" class="title-midle">{{ block.description }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        blocks: Array,
        link: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
#grid-title {
    padding-bottom: clamp(1.5rem, 4vw, 3.125rem);
}

#grid-description {
    max-width: 70ch;
}

.grid-section {
    padding: 2% var(--page-gutter) 0;
}

.title-midle {
    font-size: clamp(1.25rem, 0.9rem + 1.4vw, 2.5rem);
    font-weight: 650;
    margin: 0%;
}

/* A 19:9 tile inside a 110px column was a 52px-tall sliver; 16:9 survives a narrow column. */
.test-chamber {
    margin-top: clamp(1rem, 5vw, 3rem);
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 19 / 9;
    position: relative;
}

/* Was repeat(3, 1fr) at every width, which squeezed three tiles onto a phone. */
.grids {
    margin: 0%;
    padding: 0%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
    gap: clamp(1rem, 3vw, 2.5rem);
}

@media (max-width: 720px) {
    .test-chamber {
        aspect-ratio: 16 / 9;
    }
}

.test-chamber img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(1);
    transition: transform ease 0.5s;
}

.test-chamber:hover img {
    transform: scale(1.05);
}

.image-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1) 50%);
    box-shadow: inset 30px 30px 60px rgba(0, 0, 0, 0.5), inset -30px -30px 60px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

/* width: 100% with left: 5% pushed the caption 5% outside the card and clipped the text. */
.overlay {
    position: absolute;
    inset: auto 5% 5% 5%;
    color: white;
    padding: 10px;
    box-sizing: border-box;
    transition: transform ease 0.3s;
}

.test-chamber:hover .overlay {
    transform: translateY(-10px);
}

.overlay p {
    margin: 0;
}
</style>
