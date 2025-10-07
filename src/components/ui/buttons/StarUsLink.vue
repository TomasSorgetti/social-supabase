<script>
import GithubIcon from "../../../assets/icons/github.svg";

export default {
  name: "StarUsLink",
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
    href="https://github.com/TomasSorgetti/social-supabase"
    target="_blank"
    class="duration-300 ease-in-out text-font-secondary hover:text-font-primary p-2 flex items-center gap-2 text-sm"
  >
    <img :src="GithubIcon" alt="Github icon" />
    {{ $t("Navbar.starus") }}
  </a>
</template>
