<script setup>
import circuit from "../../../assets/images/lines.webp";
import feed from "../../../assets/images/feed.webp";
</script>

<template>
  <div class="w-full h-full -translate-y-30">
    <img :src="circuit" alt="" class="w-full h-auto" />
    <img
      :src="feed"
      alt=""
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
    />
  </div>
</template>
