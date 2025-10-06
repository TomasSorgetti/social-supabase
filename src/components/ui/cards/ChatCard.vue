<script>
import { supabase } from "../../../lib/supabase";
import defaultAvatar from "../../../assets/images/avatar.webp";
import FavoriteIcon from "../../../assets/icons/star.svg";
import CommentIcon from "../../../assets/icons/comment.svg";
import ShareIcon from "../../../assets/icons/share.svg";
import { formatDate } from "../../../utils/formatDate";

export default {
  name: "ChatCard",
  props: {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    avatar: { type: String, default: null },
    username: { type: String, default: null },
    email: { type: String, default: null },
    content: { type: String, default: null },
    date: { type: [String, Date], default: null },
    comments: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    isFavorited: { type: Boolean, default: false },
  },
  data() {
    return {
      localIsFavorited: this.isFavorited,
      favoritesCount: this.favorites,
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
  methods: {
    async toggleFavorite() {
      if (!this.userId) return;

      if (this.localIsFavorited) {
        // Quitar favorito
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("post_id", this.postId)
          .eq("user_id", this.userId);

        if (!error) {
          this.localIsFavorited = false;
          this.favoritesCount = Math.max(0, this.favoritesCount - 1);
        }
      } else {
        // Agregar favorito
        const { error } = await supabase
          .from("favorites")
          .insert([{ post_id: this.postId, user_id: this.userId }]);

        if (!error) {
          this.localIsFavorited = true;
          this.favoritesCount += 1;
        }
      }
    },
  },
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
      <h3>{{ username || email }}</h3>
    </div>

    <p class="text-font-secondary mt-2 flex-1 text-base lg:text-lg">
      {{ content }}
    </p>

    <div
      class="text-font-secondary text-sm w-full flex items-center justify-between"
    >
      <ul class="flex items-center gap-3">
        <li>
          <button
            @click="toggleFavorite"
            class="flex items-center gap-1 cursor-pointer"
            :class="{ 'text-yellow-400': localIsFavorited }"
          >
            <img
              :src="FavoriteIcon"
              alt="favorite icon"
              :class="{
                'brightness-150 saturate-200 hue-rotate-10': localIsFavorited,
              }"
            />
            {{ favoritesCount }}
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

      <p class="italic">{{ formattedDate }}</p>
    </div>
  </div>
</template>
