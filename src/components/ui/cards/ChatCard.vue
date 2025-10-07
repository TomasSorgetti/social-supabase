<script>
import defaultAvatar from "../../../assets/images/avatar.webp";
import FavoriteIcon from "../../../assets/icons/star.svg";
import CommentIcon from "../../../assets/icons/comment.svg";
import ShareIcon from "../../../assets/icons/share.svg";
import { formatDate } from "../../../utils/formatDate";
import FavoriteButton from "../buttons/FavoriteButton.vue";

export default {
  name: "ChatCard",
  components: {
    FavoriteButton,
  },
  props: {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    avatar: { type: String, default: null },
    username: { type: String, default: null },
    tag: { type: String, default: null },
    email: { type: String, default: null },
    content: { type: String, default: null },
    date: { type: [String, Date], default: null },
    comments: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    isFavorited: { type: Boolean, default: false },
  },
  data() {
    return {
      defaultAvatar,
      FavoriteIcon,
      CommentIcon,
      ShareIcon,
    };
  },
  computed: {
    formattedDate() {
      return formatDate(this.date);
    },
  },
  methods: {},
  mounted() {},
};
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
        class="flex items-center rounded-full w-14 h-14 bg-border border border-font-secondary overflow-hidden"
      >
        <img
          :src="avatar ? avatar : defaultAvatar"
          :alt="username + ' avatar'"
          draggable="false"
          loading="lazy"
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex flex-col">
        <a :href="`/feed/${userId}`" class="text-base">
          {{ username || email }}
        </a>
        <span class="text-font-secondary text-xs uppercase">{{ tag }}</span>
      </div>
    </div>

    <p class="text-font-secondary mt-2 flex-1 text-sm lg:text-base">
      {{ content }}
    </p>

    <div
      class="text-font-secondary text-sm w-full flex items-center justify-between"
    >
      <ul class="flex items-center gap-3">
        <li>
          <FavoriteButton
            :postId="postId"
            :userId="userId"
            :initialIsFavorited="isFavorited"
            :initialCount="favorites"
          />
        </li>

        <li>
          <button
            @click="$emit('open-comments', postId)"
            class="flex items-center gap-1 cursor-pointer"
          >
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

      <p class="italic">{{ formattedDate }}</p>
    </div>
  </div>
</template>
