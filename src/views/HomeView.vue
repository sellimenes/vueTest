<script>
import axios from "axios";

import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      data: null,
      baseUrl: import.meta.env.VITE_API_BASE_URL,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${this.baseUrl}comics`, {
        params: {
          ts: 1,
          apikey: import.meta.env.VITE_API_PUBLIC_KEY,
          hash: import.meta.env.VITE_API_HASH,
        },
      });
      this.data = response.data.data.results;
      console.log(this.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<template>
  <main>
    <Header />
    <h1>Home</h1>
  </main>
</template>

<style lang="scss">
body {
  background-color: red;

  main {
    background-color: blue;
  }
}
</style>
