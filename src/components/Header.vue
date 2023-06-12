<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const comicsData = ref(null);
const headerComicData = ref(null);
const loading = ref(true);
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getComicsData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${baseUrl}comics`, {
      params: {
        ts: 1,
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        hash: import.meta.env.VITE_API_HASH,
        limit: 10,
      },
    });
    comicsData.value = response.data.data.results;
    headerComicData.value =
      comicsData.value[Math.floor(Math.random() * comicsData.value.length)];
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
  <div>
    <template v-if="loading">
      <p>Loading...</p>
    </template>
    <template v-else-if="headerComicData">
      <header>
        <img
          class="headerLogo"
          src="../assets/header_logo.png"
          alt="marvel logo"
        />
        <img
          class="headerImage"
          src="../assets/header_pic.jpg"
          :alt="headerComicData?.title"
        />
        <div class="imageOverlay" />
        <div class="favoriteIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 455 455"
            xml:space="preserve"
          >
            <path
              d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.383-60.399-46.92-99.132-46.92  C57.586,10.346,0,67.931,0,138.714c0,55.426,33.049,119.535,98.23,190.546c50.162,54.649,104.729,96.96,120.257,108.626l9.01,6.769  l9.009-6.768c15.53-11.667,70.099-53.979,120.26-108.625C421.95,258.251,455,194.141,455,138.714  C455,67.931,397.414,10.346,326.632,10.346z"
            />
          </svg>
        </div>
      </header>
    </template>
  </div>
</template>

<style lang="scss">
header {
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  position: relative;

  .headerLogo {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 100px;
    object-fit: contain;
    z-index: 1;
  }

  .headerImage {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .imageOverlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }

  .favoriteIcon {
    position: absolute;
    top: 5%;
    right: 2%;
    width: 40px;
    height: 40px;
    z-index: 1;
    background-color: red;
    border-radius: 100%;
    display: grid;
    place-items: center;
  }

  .favoriteIcon svg {
    width: 24px;
    height: 24px;
    object-fit: contain;
    fill: white;
  }
}
</style>
