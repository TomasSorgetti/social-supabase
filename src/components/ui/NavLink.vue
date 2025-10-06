<script>
export default {
  name: "NavLink",
  props: {
    to: { type: String, required: true },
  },
};
</script>

<template>
  <router-link
    :to="to"
    class="text-font-secondary px-4 hover:text-font-primary"
    active-class="text-white"
    exact-active-class="text-white"
  >
    <slot />
  </router-link>
</template>
