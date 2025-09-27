<script>
export default {
  name: "CustomForm",
  emits: ["submit"],
  methods: {
    onSubmit(event) {
      this.$emit("submit", event);
    },
  },
};
</script>

<template>
  <form
    class="relative border border-border p-8 min-h-[32rem]"
    role="form"
    aria-labelledby="form-title"
    @submit.prevent="onSubmit"
  >
    <slot />

    <div
      class="absolute -top-[1px] -left-[1px] w-5 h-5 border-l border-t border-white"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-l border-b border-white"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -top-[1px] -right-[1px] w-5 h-5 border-r border-t border-white"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-r border-b border-white"
      aria-hidden="true"
    ></div>
  </form>
</template>
