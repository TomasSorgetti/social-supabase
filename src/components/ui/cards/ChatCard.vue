<script setup>
import { computed } from "vue";
import { formatDate } from "../../../utils/formatDate";
import defaultAvatar from "../../../assets/images/avatar.webp";
import FavoriteIcon from "../../../assets/icons/star.svg";
import CommentIcon from "../../../assets/icons/comment.svg";
import ShareIcon from "../../../assets/icons/share.svg";

const props = defineProps({
  to: { type: String, default: "/#" },
  avatar: { type: String, required: false, default: null },
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: [String, Date], required: true },
  comments: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
});

const formatedDate = computed(() => {
  return formatDate(props.date);
});
</script>

<template>
  <div
    class="relative group min-h-46 w-full border border-border bg-background p-4 flex flex-col justify-between items-start hover:scale-105 duration-300 ease-in-out"
  >
    <div
      class="absolute -top-[1px] -left-[1px] w-5 h-5 border-l border-t group-hover:border-primary duration-300 ease-in-out"
    ></div>
    <div
      class="absolute -top-[1px] -right-[1px] w-5 h-5 border-r border-t group-hover:border-primary duration-300 ease-in-out"
    ></div>
    <div
      class="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-l border-b group-hover:border-primary duration-300 ease-in-out"
    ></div>
    <div
      class="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-r border-b group-hover:border-primary duration-300 ease-in-out"
    ></div>

    <div class="flex items-center gap-4">
      <div
        class="flex items-center rounded-full w-10 h-10 bg-border border border-font-secondary overflow-hidden"
      >
        <img
          :src="avatar ? avatar : defaultAvatar"
          :alt="username + ' avatar'"
          draggable="false"
          loading="lazy"
          class="w-full h-full object-contain"
        />
      </div>
      <h3>{{ username }}</h3>
    </div>
    <p class="text-font-secondary mt-2 flex-1 text-base lg:text-lg">
      {{ content }}
    </p>

    <div
      class="text-font-secondary text-sm w-full flex items-center justify-between"
    >
      <ul class="flex items-center gap-3">
        <li>
          <button class="flex items-center gap-1 cursor-pointer">
            <img :src="FavoriteIcon" alt="favorite icon" />
            {{ favorites }}
          </button>
        </li>
        <li>
          <button class="flex items-center gap-1 cursor-pointer">
            <img :src="CommentIcon" alt="comment icon" />
            {{ comments }}
          </button>
        </li>
        <li>
          <button class="cursor-pointer flex items-center">
            <img :src="ShareIcon" alt="share icon" />
          </button>
        </li>
      </ul>

      <p class="italic">
        {{ formatedDate }}
      </p>
    </div>
  </div>
</template>
