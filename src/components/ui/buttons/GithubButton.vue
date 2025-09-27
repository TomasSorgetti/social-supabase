<script>
import GithubIcon from "../../../assets/icons/github.svg";

export default {
  name: "GithubButton",
  components: {},
  data() {
    return {
      GithubIcon,
    };
  },
};
</script>

<template>
  <a
    href="#"
    class="duration-300 ease-in-out w-full border border-border min-h-14 text-font-secondary hover:border-font-secondary hover:text-font-primary px-2 flex items-center gap-2 text-sm"
  >
    <img :src="GithubIcon" alt="Github icon" class="w-10 h-10" />
    <slot></slot>
  </a>
</template>
