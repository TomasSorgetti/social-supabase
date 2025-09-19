<script>
import LangSwitcher from "./ui/LangSwitcher.vue";

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
          <router-link to="/">Chat</router-link>
        </li>
        <li>
          <router-link to="/">Blog</router-link>
        </li>
        <li>
          <LangSwitcher />
        </li>
      </ul>
    </nav>
  </header>
</template>
