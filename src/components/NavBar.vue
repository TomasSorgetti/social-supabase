<script>
import LangSwitcher from "./ui/ChangLang.vue";

export default {
  components: {
    LangSwitcher,
  },
};
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Logo</router-link>

      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/chat">Chat</router-link>
        </li>
        <li>
          <router-link to="/blog">Blog</router-link>
        </li>
        <li>
          <LangSwitcher />
        </li>
      </ul>
    </nav>
  </header>
</template>
