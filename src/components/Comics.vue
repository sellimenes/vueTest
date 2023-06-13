<script setup>
import { useStore } from "vuex";

const store = useStore();

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

const handleLike = () => {
  store.commit("increment");
  console.log("cliekd");
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
        <div
          class="likeBtn"
          @click.prevent="handleLike"
          :class="{ isVerticalLikeBtn: vertical }"
        >
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
    position: relative;
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

    .likeBtn {
      display: none;
    }

    &:hover .likeBtn {
      display: block;
      position: absolute;
      top: 2%;
      right: 3%;

      svg {
        width: 1rem;
        height: 1rem;
        fill: red;

        &:hover {
          cursor: pointer;
          fill: #a00000;
        }
      }
    }

    &:hover .isVerticalLikeBtn {
      top: 1%;
    }
  }
}
</style>
