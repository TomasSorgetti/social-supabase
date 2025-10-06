<script setup>
import circuit from "../../../assets/images/lines.webp";
import feed from "../../../assets/images/feed.webp";
</script>

<template>
  <div class="w-full h-full -translate-y-30">
    <!-- todo => animation -->
    <img
      :src="circuit"
      alt=""
      draggable="false"
      loading="lazy"
      class="w-full h-auto"
    />
    <!-- todo => animation -->
    <img
      :src="feed"
      alt=""
      draggable="false"
      loading="lazy"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
    />
  </div>
</template>
