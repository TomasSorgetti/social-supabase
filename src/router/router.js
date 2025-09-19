import {
  createRouter,
  // createWebHashHistory
  createWebHistory,
} from "vue-router";
import HomeView from "../pages/HomeView.vue";
import ChatView from "../pages/ChatView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/chat",
    component: ChatView,
  },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
