<script setup>
import Label from "../../ui/Label.vue";
import MainButton from "../../ui/buttons/MainButton.vue";
</script>

<template>
  <section
    class="relative w-full h-[90dvh] flex items-center justify-center overflow-hidden"
  >
    <div
      class="absolute rounded full top-0 left-1/2 -translate-x-1/2 bg-primary/50 w-1/2 h-40 blur-3xl -translate-y-20"
    ></div>
    <div class="flex flex-col items-center text-center gap-4">
      <Label variant="primary">{{ $t("HomePage.Hero.label") }}</Label>
      <h1 class="text-7xl font-bold lg:max-w-[43.75rem]">
        {{ $t("HomePage.Hero.title") }}
      </h1>
      <p class="text-base lg:text-lg text-font-secondary lg:max-w-[30rem] my-8">
        {{ $t("HomePage.Hero.description") }}
      </p>
      <MainButton>{{ $t("HomePage.Hero.cta") }}</MainButton>
    </div>
  </section>
</template>
