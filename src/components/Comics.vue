<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const { vertical, data, title } = defineProps({
  vertical: Boolean,
  data: Object,
  title: String,
});

const getComicImageSrc = (comic) => {
  if (vertical) {
    return `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`;
  } else {
    return `${comic.thumbnail.path}/landscape_large.${comic.thumbnail.extension}`;
  }
};
</script>

<template>
  <section class="comicsWrapper">
    <h2 class="listTitle" :class="{ uppercase: vertical }">
      {{ title }}
    </h2>
    <div class="cardsWrapper">
      <a
        v-for="comic in data"
        :key="comic.id"
        :href="comic.id"
        class="comicsCard"
      >
        <img
          :src="getComicImageSrc(comic)"
          :alt="comic.title"
          class="comicImage"
        />
        <h3>{{ comic.title }}</h3>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
.uppercase {
  text-transform: uppercase !important;
}

.comicsWrapper {
  margin: 1rem;
  margin-bottom: 3rem;

  a {
    text-decoration: none;
    color: inherit;
  }

  .listTitle {
    margin-bottom: 0.5rem;
    color: white;
    text-transform: capitalize;
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
