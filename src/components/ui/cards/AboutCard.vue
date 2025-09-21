<script setup>
import { computed } from "vue";
import Label from "../Label.vue";

const { label, title, description, image, variant } = defineProps([
  "label",
  "title",
  "description",
  "image",
  "variant",
]);

const borderColor = computed(() => {
  switch (variant) {
    case "primary":
      return "border-primary";
    case "secondary":
      return "border-secondary";
    case "tertiary":
      return "border-tertiary";
    default:
      return "border-primary";
  }
});

const textColor = computed(() => {
  switch (variant) {
    case "primary":
      return "text-primary";
    case "secondary":
      return "text-secondary";
    case "tertiary":
      return "text-tertiary";
    default:
      return "text-primary";
  }
});
</script>

<template>
  <div
    class="relative flex flex-col justify-between w-full h-full min-h-[40rem] text-left border border-border lg:max-w-[25rem]"
  >
    <div
      class="absolute -top-[1px] -left-[1px] w-5 h-5 border-l border-t"
      :class="borderColor"
    ></div>
    <div
      class="absolute -top-[1px] -right-[1px] w-5 h-5 border-r border-t"
      :class="borderColor"
    ></div>
    <div
      class="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-l border-b"
      :class="borderColor"
    ></div>
    <div
      class="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-r border-b"
      :class="borderColor"
    ></div>

    <div class="h-2/5 px-4 pt-4 lg:px-8 lg:pt-8">
      <Label :variant="variant">{{ label }}</Label>
      <h3 class="mt-4 text-2xl font-semibold min-h-16" :class="textColor">
        {{ title }}
      </h3>
      <p class="text-font-secondary mt-2 text-base lg:text-lg">
        {{ description }}
      </p>
    </div>

    <div class="relative h-3/5">
      <div
        class="absolute top-0 left-0 bg-gradient-to-b from-background to-bg-background/0 w-full h-20"
      ></div>
      <img
        :src="image"
        :alt="title"
        draggable="false"
        loading="lazy"
        class="w-full h-full object-cover select-none"
      />
    </div>
  </div>
</template>
