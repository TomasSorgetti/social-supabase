<script>
export default {
  name: "AuthLink",
  props: {
    to: { type: String, required: true, default: "/" },
  },
};
</script>

<template>
  <router-link
    :to="to"
    class="duration-200 transition-all font-bold flex items-center justify-center h-8 px-4 text-xs border-button-grey relative text-font-primary tracking-snug text-center"
    role="link"
  >
    <slot />
  </router-link>
</template>

<style>
.border-button-grey {
  position: relative;
  border: none;
  border-radius: 9999px;
  overflow: hidden;
}

.border-button-grey:before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -10;
  border-radius: 9999px;
  border-width: 1px;
  border-color: transparent;
  background: linear-gradient(#090a0c, #090a0c) padding-box,
    linear-gradient(180deg, hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0.15))
      border-box;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
  opacity: 1;
}

.border-button-grey:after {
  content: "";
  opacity: 0;
}

.border-button-grey:hover:before {
  opacity: 1;
}

.border-button-grey:hover {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.13),
    rgba(255, 255, 255, 0.027)
  );
  transition: background 0.2s ease;
}
</style>
