<script setup>
import Label from "../../ui/Label.vue";
import MainButton from "../../ui/buttons/MainButton.vue";
import CtaImage from "../../../assets/images/cta.webp";
</script>

<template>
  <section
    class="relative container mx-auto min-h-[35rem] flex items-center justify-between max-w-7xl mt-20 border border-border"
  >
    <div
      class="absolute -top-[1px] -left-[1px] w-20 h-20 border-l border-t border-primary"
    ></div>
    <div
      class="absolute -top-[1px] -right-[1px] w-20 h-20 border-r border-t border-primary"
    ></div>
    <div
      class="absolute -bottom-[1px] -left-[1px] w-20 h-20 border-l border-b border-primary"
    ></div>
    <div
      class="absolute -bottom-[1px] -right-[1px] w-20 h-20 border-r border-b border-primary"
    ></div>

    <img
      :src="CtaImage"
      alt=""
      draggable="false"
      loading="lazy"
      class="w-1/2 pr-10"
    />
    <div
      class="w-1/2 h-full flex flex-col items-start justify-center space-y-4 pl-10"
    >
      <Label variant="primary">Nerd Feed</Label>
      <h2 class="text-5xl font-semibold">
        Stop lurking. <span class="text-primary">Start posting.</span>
      </h2>
      <p
        class="text-base text-font-secondary lg:text-lg max-w-[32rem] mt-4 mb-10"
      >
        Create your free account today and start sharing your bugs, memes, and
        code tips with developers like you.
      </p>
      <MainButton>Try it Free</MainButton>
    </div>
  </section>
</template>
