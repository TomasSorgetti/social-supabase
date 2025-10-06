import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import ChatView from "../pages/ChatView.vue";
import LoginView from "../pages/auth/LoginView.vue";
import RegisterView from "../pages/auth/RegisterView.vue";
import ForgotPasswordView from "../pages/auth/ForgotPasswordView.vue";
import ProfileView from "../pages/account/ProfileView.vue";
import SettingsView from "../pages/account/SettingsView.vue";

import ServerErrorView from "../pages/error/ServerErrorView.vue";
import NotFoundErrorView from "../pages/error/NotFoundErrorView.vue";

import { useAuthState } from "../services/auth";

const routes = [
  // public routes
  {
    path: "/",
    component: HomeView,
  },

  // auth routes
  {
    path: "/auth/login",
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: "/auth/register",
    component: RegisterView,
    meta: { guestOnly: true },
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPasswordView,
    meta: { guestOnly: true },
  },

  // private routes
  {
    path: "/chat",
    component: ChatView,
    meta: { requiresAuth: true },
  },
  {
    path: "/account/profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/account/settings",
    component: SettingsView,
    meta: { requiresAuth: true },
  },

  // admin routes

  // error routes
  {
    path: "/*",
    component: NotFoundErrorView,
  },
  {
    path: "/500",
    component: ServerErrorView,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

let user = {
  id: null,
  email: null,
};

useAuthState((userState) => (user = userState));

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && user.id === null) {
    return "/auth/login";
  }

  // if (to.meta.guestOnly && user.id !== null) {
  //   return "/";
  // }
});

export default router;
