<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

import Header from "@/components/Header.vue";
import Comics from "../components/Comics.vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const data = ref(null);
</script>

<template>
  <main>
    <Header />
    <Comics />
  </main>
</template>

<style lang="scss"></style>
