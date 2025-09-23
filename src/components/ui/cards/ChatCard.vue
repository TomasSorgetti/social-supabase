<script setup>
import { computed } from "vue";
import { formatDate } from "../../../utils/formatDate";
import defaultAvatar from "../../../assets/images/avatar.webp";

const props = defineProps({
  to: { type: String, default: "/#" },
  avatar: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: [String, Date], required: true },
});

const formatedDate = computed(() => {
  return formatDate(props.date);
});
</script>

<template>
  <a
    :href="to"
    class="relative group min-h-46 w-full border border-border bg-background p-4 flex flex-col hover:shadow-lg hover:shadow-primary hover:scale-105 duration-300 ease-in-out"
  >
    <div
      class="absolute -top-[1px] -left-[1px] w-5 h-5 border-l border-t group-hover:border-primary duration-300 ease-in-out"
      :class="borderColor"
    ></div>
    <div
      class="absolute -top-[1px] -right-[1px] w-5 h-5 border-r border-t group-hover:border-primary duration-300 ease-in-out"
      :class="borderColor"
    ></div>
    <div
      class="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-l border-b group-hover:border-primary duration-300 ease-in-out"
      :class="borderColor"
    ></div>
    <div
      class="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-r border-b group-hover:border-primary duration-300 ease-in-out"
      :class="borderColor"
    ></div>

    <div class="flex items-center gap-4">
      <div
        class="flex items-center rounded-full w-10 h-10 bg-border border border-font-secondary overflow-hidden"
      >
        <img
          :src="avatar ? avatar : defaultAvatar"
          alt=""
          draggable="false"
          loading="lazy"
          class="w-full h-full object-contain"
        />
      </div>
      <h3>{{ name }}</h3>
    </div>
    <p class="text-font-secondary mt-2 text-base lg:text-lg">
      {{ message }}
    </p>
    <p
      class="absolute bottom-3 right-3 text-font-secondary text-xs mt-2 italic"
    >
      {{ formatedDate }}
    </p>
  </a>
</template>
