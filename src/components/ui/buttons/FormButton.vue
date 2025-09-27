<script>
export default {
  name: "FormButton",
  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
};
</script>

<template>
  <button
    type="submit"
    :disabled="loading || disabled"
    class="bg-white text-background w-full h-12 rounded font-bold cursor-pointer"
  >
    <span v-if="loading">Loading...</span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>
