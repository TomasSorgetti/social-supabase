<script>
import CloseIcon from "../../assets/icons/close.svg";
import defaultAvatar from "../../assets/images/avatar.webp";
import { addComment, getComments } from "../../services/comment";

export default {
  props: {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    isOpen: { type: Boolean, default: false },
  },
  data() {
    return {
      CloseIcon,
      defaultAvatar,
      comments: [],
      loading: false,
      error: "",
      newComment: "",
    };
  },
  watch: {
    isOpen: {
      immediate: true,
      async handler(open) {
        if (open) {
          await this.fetchComments();
        }
      },
    },
  },
  methods: {
    async fetchComments() {
      this.loading = true;
      const { data, error } = await getComments(this.postId);

      if (error) {
        this.error = error.message;
        this.loading = false;
        return;
      }

      this.comments = data || [];
      this.loading = false;
    },

    // todo => add comment no cambia la cantidad de comentarios en tiempo real
    async addComment() {
      if (!this.newComment.trim()) return;
      if (!this.userId) {
        console.log("No user logged in.", this.userId);
        return;
      }

      const { data, error } = await addComment(
        this.postId,
        this.userId,
        this.newComment
      );

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        this.comments.push(data);
        this.newComment = "";
      }
    },

    handleClickOutside(e) {
      if (e.target === e.currentTarget) {
        this.$emit("close");
      }
    },
  },
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    @click="handleClickOutside"
  >
    <div
      ref="modalContent"
      class="relative w-full max-w-2xl min-h-140 p-8 rounded-lg shadow-lg border border-border bg-background"
    >
      <h3 class="text-xl font-bold mb-4">Comentarios</h3>
      <form @submit.prevent="addComment" class="mt-4 flex gap-2">
        <input
          v-model="newComment"
          placeholder="Agrega un comentario..."
          class="flex-1 border rounded p-2"
        />
        <button class="bg-blue-500 text-white px-4 rounded cursor-pointer">
          Enviar
        </button>
      </form>

      <ul class="space-y-2 mt-16 max-h-96 overflow-y-auto">
        <li v-if="loading" class="text-center">Loading comments...</li>
        <template v-else-if="comments.length > 0">
          <li
            v-for="comment in comments"
            :key="comment.id"
            class="flex items-start gap-2"
          >
            <img
              :src="comment.profile?.avatar || defaultAvatar"
              :alt="comment.profile?.username + ' avatar'"
              class="w-20 h-20 rounded-full object-contain"
            />
            <p class="mt-2 flex flex-col items-start text-font-secondary">
              <strong class="text-font-primary">
                {{ comment.profile?.username || "Usuario desconocido" }}:
              </strong>
              {{ comment.content }}
            </p>
          </li>
        </template>
        <template v-else>
          <li class="text-center text-font-secondary">
            <p>No comments. Be the first!</p>
          </li>
        </template>
      </ul>

      <button
        @click="$emit('close')"
        class="text-2xl absolute top-4 right-4 cursor-pointer"
      >
        <img :src="CloseIcon" alt="close icon" />
      </button>
    </div>
  </div>
</template>
