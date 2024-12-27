<template>
    <div class="grid-section">
        <p id="grid-title" class="title">{{ title }}</p>
        <p id="grid-description" class="text-less title-mini">{{ description }}</p>

        <div class="grids">
            <div v-for="(block, index) in blocks" :key="index" class="test-chamber">
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
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        blocks: Array
    }
};
</script>

<style scoped>
#grid-title {
    padding-bottom: 50px;
}

#grid-description {
    max-width: 70%;
}

.grid-section {
    padding: 2% 5% 0% 5%;
}

.title {
    font-size: 3.7rem;
    font-weight: 600;
    margin: 0%;
}

.title-midle {
    font-size: 2.5rem;
    font-weight: 650;
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

.test-chamber {
    margin: 10% 10% 0% 0%;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 19 /9;
    position: relative;

}

.grids {
    margin: 0%;
    padding: 0%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

.overlay {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 100%;
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
