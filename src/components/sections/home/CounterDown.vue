<script setup>
import Label from "../../ui/Label.vue";
import MainButton from "../../ui/buttons/MainButton.vue";
import CounterImage from "../../../assets/images/counterdown.webp";
</script>

<template>
  <section
    class="relative container mx-auto min-h-[35rem] flex items-center justify-between max-w-7xl my-40 border border-border"
  >
    <div
      class="absolute -top-[1px] -left-[1px] w-20 h-20 border-l border-t border-tertiary"
    ></div>
    <div
      class="absolute -top-[1px] -right-[1px] w-20 h-20 border-r border-t border-tertiary"
    ></div>
    <div
      class="absolute -bottom-[1px] -left-[1px] w-20 h-20 border-l border-b border-tertiary"
    ></div>
    <div
      class="absolute -bottom-[1px] -right-[1px] w-20 h-20 border-r border-b border-tertiary"
    ></div>

    <div
      class="w-1/2 h-full flex flex-col items-start justify-center space-y-4 pl-24"
    >
      <Label variant="tertiary">Join the waitlist</Label>
      <h2 class="text-5xl font-semibold">
        Countdown to <span class="text-tertiary">Nerd Feed Beta</span>
      </h2>
      <p
        class="text-base text-font-secondary lg:text-lg max-w-[30rem] mt-4 mb-10"
      >
        Be among the first to join Nerd Feed and share bugs, memes, and code
        tips before anyone else.
      </p>
      <span class="font-bold text-font-primary text-7xl">
        241 : 00 : 00 : 00
      </span>
    </div>
    <img
      :src="CounterImage"
      alt=""
      draggable="false"
      loading="lazy"
      class="h-full px-10"
    />
  </section>
</template>
