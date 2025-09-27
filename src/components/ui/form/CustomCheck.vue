<script>
export default {
  name: "CustomCheck",
  props: {
    id: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
};
</script>

<template>
  <div class="flex items-center gap-2 text-font-secondary">
    <input
      :id="id"
      type="checkbox"
      class="w-4 h-4"
      :aria-checked="modelValue.toString()"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="id" class="cursor-pointer select-none">
      <slot />
    </label>
  </div>
</template>
