<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const comicsData = ref(null);
const loading = ref(true);
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const itemsPerRow = 7;

const getComicsData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${baseUrl}comics`, {
      params: {
        ts: 1,
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        hash: import.meta.env.VITE_API_HASH,
        limit: itemsPerRow,
      },
    });
    comicsData.value = response.data.data.results;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getComicsData();
});
</script>

<template>
  <section class="comicsWrapper">
    <h2 class="listTitle">ÖNE ÇIKANLAR</h2>
    <div class="cardsWrapper">
      <div v-for="comic in comicsData" :key="comic.id" class="comicsCard">
        <img
          :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
          :alt="comic.title"
          class="comicImage"
        />
        <h3>{{ comic.title }}</h3>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.comicsWrapper {
  margin: 1rem;

  .listTitle {
    font-size: 2.25rem;
    margin-bottom: 0.5rem;
    color: white;
  }

  .cardsWrapper {
    display: flex;
  }

  .comicsCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.1rem;
    overflow: hidden;
    border: 1px solid white;
    border-radius: 1rem;
    background-color: #f5f5f5;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.1);
      z-index: 1;
    }

    .comicImage {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    h3 {
      margin: 0.5rem;
      font-size: 1rem;
      margin-top: auto;
    }
  }
}
</style>
