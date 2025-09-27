import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import ChatView from "../pages/ChatView.vue";
import LoginView from "../pages/auth/LoginView.vue";
import RegisterView from "../pages/auth/RegisterView.vue";
import ForgotPasswordView from "../pages/auth/ForgotPasswordView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/chat",
    component: ChatView,
  },
  {
    path: "/auth/login",
    component: LoginView,
  },
  {
    path: "/auth/register",
    component: RegisterView,
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPasswordView,
  },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
