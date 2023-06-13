import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ComicDetailView from "../views/ComicDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:comicId",
      name: "comic",
      component: ComicDetailView,
    },
  ],
});

export default router;
