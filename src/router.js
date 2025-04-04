import { createRouter, createWebHistory } from "vue-router";
import SuccessPage from "./components/SuccessPage.vue";
import ShoesPage from "./components/ShoesPage.vue";
import Ordered from "./components/admin/Ordered.vue";

const routes = [
  {
    path: "/success",
    name: "SuccessPage",
    component: SuccessPage,
  },
  {
    path: "/shoes-page",
    name: "ShoesPage",
    component: ShoesPage,
  },
  {
    path: "/ordered-items",
    name: "Ordered",
    component: Ordered,
  },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHashHistory() if needed
  routes,
});

export default router;
