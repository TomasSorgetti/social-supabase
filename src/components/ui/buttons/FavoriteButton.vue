<script>
import FavoriteIcon from "../../../assets/icons/star.svg";
import FavoriteActiveIcon from "../../../assets/icons/favorite.svg";
import { addFavorite, removeFavorite } from "../../../services/favorite";

export default {
  props: {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    initialIsFavorited: { type: Boolean, default: false },
    initialCount: { type: Number, default: 0 },
  },
  data() {
    return {
      isFavorited: this.initialIsFavorited,
      count: this.initialCount,
      isLoading: false,
    };
  },
  computed: {
    icon() {
      return this.isFavorited ? FavoriteActiveIcon : FavoriteIcon;
    },
  },
  methods: {
    async toggle() {
      if (this.isLoading) return; // para que no me sume 2 al clickear rapido
      this.isLoading = true;

      try {
        if (this.isFavorited) {
          await removeFavorite(this.postId, this.userId);
          this.isFavorited = false;
          this.count = Math.max(0, this.count - 1);
        } else {
          await addFavorite(this.postId, this.userId);
          this.isFavorited = true;
          this.count += 1;
        }
      } catch (err) {
        console.error("Error toggling favorite:", err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <button @click="toggle" class="flex items-center gap-1 cursor-pointer">
    <img
      :src="icon"
      alt="favorite icon"
      :class="{ 'brightness-150 saturate-200 hue-rotate-10': isFavorited }"
    />
    {{ count }}
  </button>
</template>
