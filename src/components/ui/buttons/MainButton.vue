<script setup>
const {
  type,
  to = "/chat",
  disabled = false,
} = defineProps(["type", "to", "disabled"]);

const commonClasses =
  "relative cursor-pointer bg-primary/20 border border-primary text-primary-bis text-lg font-semibold py-3 px-10 min-w-[18.75rem] hover:bg-primary/30 active:bg-primary/50 transition-colors duration-300 ease-in-out flex items-center justify-center";
</script>

<template>
  <button
    v-if="type"
    :type="type"
    :disabled="disabled"
    :class="commonClasses + ' ' + { 'cursor-not-allowed': disabled }"
  >
    <slot />
    <div
      class="absolute bottom-2 left-1/2 -translate-x-1/2 h-2 w-2/3 bg-primary-bis rounded-full blur-lg"
    ></div>
  </button>

  <router-link
    v-else
    :to="to"
    :class="commonClasses + ' ' + { 'cursor-not-allowed': disabled }"
  >
    <slot />
    <div
      class="absolute bottom-2 left-1/2 -translate-x-1/2 h-2 w-2/3 bg-primary-bis rounded-full blur-lg"
    ></div>
  </router-link>
</template>
