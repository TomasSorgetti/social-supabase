<script>
import EyeIcon from "../../../assets/icons/eye.svg";
import EyeOffIcon from "../../../assets/icons/eye-off.svg";

export default {
  name: "CustomInput",
  props: {
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    icon: { type: String, default: null },
    error: { type: String, default: "" },
  },
  emits: ["update:value"],
  data() {
    return {
      isPasswordVisible: false,
      EyeIcon,
      EyeOffIcon,
    };
  },
  computed: {
    isPassword() {
      return this.type === "password";
    },
    inputType() {
      return this.isPassword
        ? this.isPasswordVisible
          ? "text"
          : "password"
        : this.type;
    },
  },
  methods: {
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    onInput(event) {
      this.$emit("update:value", event.target.value);
    },
  },
};
</script>

<template>
  <div class="w-full flex flex-col items-start gap-2">
    <label :for="id" class="font-medium">
      {{ label }}
    </label>

    <div class="relative w-full">
      <div
        v-if="icon"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <img :src="icon" :alt="`${name} icon`" class="w-5 h-5" />
      </div>

      <button
        v-if="isPassword"
        type="button"
        @click="togglePassword"
        class="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2"
        :aria-label="
          isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'
        "
      >
        <img
          :src="isPasswordVisible ? EyeOffIcon : EyeIcon"
          alt=""
          aria-hidden="true"
          class="w-6 h-6"
        />
      </button>

      <input
        :type="inputType"
        :id="id"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        @input="onInput"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : null"
        :autocomplete="
          type === 'email'
            ? 'email'
            : type === 'password'
            ? 'current-password'
            : 'off'
        "
        class="border border-border min-h-12 py-2 px-4 w-full placeholder:text-font-secondary hover:border-font-secondary focus:border-font-secondary"
        :class="{ 'pl-12': icon }"
      />

      <small
        v-if="error"
        :id="`${id}-error`"
        class="text-red-500 mt-1 block"
        role="alert"
      >
        {{ error }}
      </small>
    </div>
  </div>
</template>
