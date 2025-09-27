<script>
import GoogleIcon from "../../../assets/icons/google.svg";

export default {
  name: "GoogleButton",
  components: {},
  data() {
    return {
      GoogleIcon,
    };
  },
};
</script>

<template>
  <a
    href="#"
    class="relative w-full bg-white min-h-14 flex items-center justify-start gap-2 px-2 text-background text-sm font-normal rounded-xs"
  >
    <img :src="GoogleIcon" alt="Google icon" />
    <slot></slot>
  </a>
</template>
