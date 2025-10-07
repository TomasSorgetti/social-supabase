<script>
import LangSwitcher from "./ui/ChangLang.vue";
import Logo from "../assets/NerdFeed.svg";
import NavLink from "./ui/NavLink.vue";
import StarUsLink from "./ui/buttons/StarUsLink.vue";
import AuthLink from "./ui/buttons/AuthLink.vue";

import { useAuthState } from "../services/auth";
import AuthDropdown from "./ui/AuthDropdown.vue";

let unsubscribeFromAuthState = () => {};

export default {
  components: {
    LangSwitcher,
    NavLink,
    StarUsLink,
    AuthLink,
    AuthDropdown,
  },
  data() {
    return {
      Logo,

      user: {
        id: null,
        email: null,
      },
    };
  },

  mounted() {
    unsubscribeFromAuthState = useAuthState(
      (userState) => (this.user = userState)
    );
  },
  unmounted() {
    unsubscribeFromAuthState();
  },
};
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-90 bg-background border-b border-border"
  >
    <nav
      class="flex items-center justify-between container mx-auto px-4 lg:px-0"
    >
      <router-link to="/">
        <img :src="Logo" alt="logo de nerd feed" />
      </router-link>

      <ul class="flex items-center gap-2">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li v-if="user.id !== null">
          <NavLink to="/feed">Feed</NavLink>
        </li>
        <li class="mx-4">
          <LangSwitcher />
        </li>
        <li>
          <StarUsLink />
        </li>

        <template v-if="user.id === null">
          <li>
            <AuthLink to="/auth/login">Sign in</AuthLink>
          </li>
          <li>
            <AuthLink to="/auth/register">Sign up</AuthLink>
          </li>
        </template>
        <template v-else>
          <li>
            <AuthDropdown />
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
