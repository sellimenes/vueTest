<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

import Header from "@/components/Header.vue";
import Comics from "../components/Comics.vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const loading = ref(true);
const featuredData = ref(null);
const newsData = ref(null);
const mostWatchedData = ref(null);

// Öne Çıkanlar fonksiyonu
const getFeaturedData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${baseUrl}comics`, {
      params: {
        ts: 1,
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        hash: import.meta.env.VITE_API_HASH,
        limit: 7,
        offset: 5,
      },
    });
    featuredData.value = response.data.data.results;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// Yeni Çıkanlar fonksiyonu
const getNewsData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${baseUrl}comics`, {
      params: {
        ts: 1,
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        hash: import.meta.env.VITE_API_HASH,
        limit: 5,
        offset: 30,
      },
    });
    newsData.value = response.data.data.results;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// En Çok İzlenenler fonksiyonu
const getMostWatched = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${baseUrl}comics`, {
      params: {
        ts: 1,
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        hash: import.meta.env.VITE_API_HASH,
        limit: 5,
        offset: 90,
      },
    });
    mostWatchedData.value = response.data.data.results;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  await getFeaturedData();
  await getNewsData();
  await getMostWatched();
});
</script>

<template>
  <div v-if="loading" class="loadingWrapper">Loading...</div>
  <main v-else>
    <Header />
    <Comics :vertical="true" title="Öne Çıkanlar" :data="featuredData" />
    <Comics :vertical="false" title="Yeni Çıkanlar" :data="newsData" />
    <Comics
      :vertical="false"
      title="En Çok İzlenenler"
      :data="mostWatchedData"
    />
  </main>
</template>

<style lang="scss">
.loadingWrapper {
  color: white;
  font-size: 2rem;
}
</style>
