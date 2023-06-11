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
  async mounted() {},
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
