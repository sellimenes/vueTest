<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

import Header from "@/components/Header.vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const data = ref(null);
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
