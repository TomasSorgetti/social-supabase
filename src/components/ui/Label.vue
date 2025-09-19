<script setup>
import { computed } from "vue";

const { variant } = defineProps(["variant"]);

const color = computed(() => {
  switch (variant) {
    case "primary":
      return "text-primary-bis border-primary bg-primary/15";
    case "secondary":
      return "text-secondary border-secondary bg-secondary/15";
    case "tertiary":
      return "text-tertiary border-tertiary bg-tertiary/15";
    default:
      return "text-primary-bis border-primary bg-primary/15";
  }
});
</script>

<template>
  <span
    class="text-xs border-1 rounded-full px-6 py-2 font-semibold"
    :class="color"
  >
    <slot></slot>
  </span>
</template>
