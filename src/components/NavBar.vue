<script>
import LangSwitcher from "./ui/ChangLang.vue";
import Logo from "../assets/NerdFeed.svg";
import NavLink from "./ui/NavLink.vue";
import StarUsLink from "./ui/buttons/StarUsLink.vue";
import AuthLink from "./ui/buttons/AuthLink.vue";

export default {
  components: {
    LangSwitcher,
    NavLink,
    StarUsLink,
    AuthLink,
  },
  data() {
    return {
      Logo,
    };
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

      <ul class="flex items-center gap-8">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/chat">Chat</NavLink>
        </li>
        <li>
          <NavLink to="/">Blog</NavLink>
        </li>
        <!-- <li>
          <LangSwitcher />
        </li> -->
      </ul>

      <ul class="flex items-center gap-2">
        <li>
          <StarUsLink />
        </li>
        <li>
          <AuthLink to="/auth/login">Sign in</AuthLink>
        </li>
        <li>
          <AuthLink to="/auth/register">Sign up</AuthLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
