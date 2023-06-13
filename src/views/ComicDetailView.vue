<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";

const store = useStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const loading = ref(true);
const comicData = ref(null);

const getSingleComic = async (id) => {
  loading.value = true;
  try {
    const response = await axios.get(`${baseUrl}comics/${id}`, {
      params: {
        ts: 1,
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        hash: import.meta.env.VITE_API_HASH,
      },
    });
    comicData.value = response.data.data.results;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleLike = () => {
  store.commit("increment");
};

onMounted(() => {
  // Params üzerinden alınabilir.
  getSingleComic(window.location.pathname.split("/").reverse()[0]);
});
</script>

<template>
  <div v-if="loading" class="loading"><Loading /></div>
  <section v-else>
    <Header />
    <div class="comicDetailWrapper">
      <div class="comicDetails">
        <!-- <a href="/">Back</a> -->
        <div class="comicDetail">
          <img
            :src="`${comicData[0].thumbnail.path}/portrait_uncanny.${comicData[0].thumbnail.extension}`"
            :alt="comicData[0].title"
            class="comicDetailImage"
          />
          <div class="comicDetailInfo">
            <h2 class="comicDetailTitle">{{ comicData[0].title }}</h2>
            <p class="comicDetailDescription">
              {{ comicData[0].description || "No description" }}
            </p>
            <div class="comicDetailCreators">
              <h3>Creators</h3>
              <div class="comicDetailCreatorsWrapper">
                <p v-if="comicData[0].creators.items.length === 0">
                  No creator info.
                </p>
                <a
                  v-else
                  v-for="creator in comicData[0].creators.items"
                  target="_blank"
                  :key="creator.resourceURI"
                  :href="creator.resourceURI"
                  class="comicDetailCreator"
                >
                  {{ creator.name }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 26 26"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M18,17.759v3.366C18,22.159,17.159,23,16.125,23H4.875C3.841,23,3,22.159,3,21.125V9.875   C3,8.841,3.841,8,4.875,8h3.429l3.001-3h-6.43C2.182,5,0,7.182,0,9.875v11.25C0,23.818,2.182,26,4.875,26h11.25   C18.818,26,21,23.818,21,21.125v-6.367L18,17.759z"
                      />
                      <g>
                        <path
                          d="M22.581,0H12.322c-1.886,0.002-1.755,0.51-0.76,1.504l3.22,3.22l-5.52,5.519    c-1.145,1.144-1.144,2.998,0,4.141l2.41,2.411c1.144,1.141,2.996,1.142,4.14-0.001l5.52-5.52l3.16,3.16    c1.101,1.1,1.507,1.129,1.507-0.757L26,3.419C25.999-0.018,26.024-0.001,22.581,0z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <div class="comicDetailCharacters">
              <h3>Characters</h3>
              <div class="comicDetailCharactersWrapper">
                <p v-if="comicData[0].characters.items.length === 0">
                  No character info.
                </p>
                <a
                  v-else
                  v-for="character in comicData[0].characters.items"
                  target="_blank"
                  :key="character.resourceURI"
                  :href="character.resourceURI"
                  class="comicDetailCharacter"
                >
                  {{ character.name }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 26 26"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M18,17.759v3.366C18,22.159,17.159,23,16.125,23H4.875C3.841,23,3,22.159,3,21.125V9.875   C3,8.841,3.841,8,4.875,8h3.429l3.001-3h-6.43C2.182,5,0,7.182,0,9.875v11.25C0,23.818,2.182,26,4.875,26h11.25   C18.818,26,21,23.818,21,21.125v-6.367L18,17.759z"
                      />
                      <g>
                        <path
                          d="M22.581,0H12.322c-1.886,0.002-1.755,0.51-0.76,1.504l3.22,3.22l-5.52,5.519    c-1.145,1.144-1.144,2.998,0,4.141l2.41,2.411c1.144,1.141,2.996,1.142,4.14-0.001l5.52-5.52l3.16,3.16    c1.101,1.1,1.507,1.129,1.507-0.757L26,3.419C25.999-0.018,26.024-0.001,22.581,0z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <div class="likeBtn" @click="handleLike">Like</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 3rem;
  color: white;
}

.comicDetailWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;

  .comicDetails {
    width: 100%;
    max-width: 1200px;
    background-color: #1f1f1f;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    & > a {
      display: block;
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      color: black;
      font-size: 1.5rem;
      text-decoration: none;
      transition: all 0.3s ease-in-out;
      background-color: white;
      opacity: 0.8;
      max-width: max-content;

      &:hover {
        background-color: #dfdcdc;
      }
    }

    .comicDetail {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .comicDetailImage {
      width: 100%;
      max-width: 300px;
      border-radius: 1rem;
    }

    .comicDetailInfo {
      margin-left: 2rem;
      width: 100%;
      max-width: 600px;

      .comicDetailTitle {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .comicDetailDescription {
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      .comicDetailCreators {
        margin-bottom: 2rem;

        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .comicDetailCreatorsWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          .comicDetailCreator {
            color: inherit;
            text-decoration: none;
            display: flex;
            gap: 0.2rem;

            svg {
              fill: white;
              width: 0.7rem;
              height: 0.7rem;
            }

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      .comicDetailCharacters {
        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .comicDetailCharactersWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          .comicDetailCharacter {
            color: inherit;
            text-decoration: none;
            display: flex;
            gap: 0.2rem;

            svg {
              fill: white;
              width: 0.7rem;
              height: 0.7rem;
            }

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      .likeBtn {
        display: block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        font-size: 1.5rem;
        transition: all 0.3s ease-in-out;
        background-color: rgb(63, 151, 1);
        color: white;
        opacity: 0.8;
        max-width: max-content;

        &:hover {
          background-color: #1c6b00;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
