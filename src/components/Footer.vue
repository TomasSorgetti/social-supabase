<script>
import NerdFeed from "../assets/NerdFeedFooter.webp";

export default {
  name: "Footer",

  data() {
    return {
      NerdFeed,
    };
  },
};
</script>

<template>
  <footer class="p-4 lg:px-0 border-t border-border">
    <div class="container mx-auto">
      <img
        :src="NerdFeed"
        alt="nerd feed"
        draggable="false"
        loading="lazy"
        class="w-full h-auto my-12"
      />
      <p class="text-center text-font-secondary border-t border-border pt-4">
        &copy;Copyright 2025
      </p>
    </div>
  </footer>
</template>
