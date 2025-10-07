<script>
import ChatCard from "../components/ui/cards/ChatCard.vue";
import { getUserProfileById } from "../services/user";
import CommentsModal from "../components/ui/ComentModal.vue";
import defaultProfile from "../assets/images/avatar.webp";

export default {
  name: "UserView",
  components: {
    ChatCard,
    CommentsModal,
  },
  data() {
    return {
      defaultProfile,
      userId: this.$route.params.userId,

      loading: false,
      error: "",

      isCommentsOpen: false,
      selectedPostId: null,

      userProfile: {
        id: null,
        username: null,
        tag: null,
        avatar: null,
        posts: [],
      },
    };
  },
  async mounted() {
    try {
      if (!this.userId) return;

      this.loading = true;
      const data = await getUserProfileById(this.userId);
      console.log("User Details", data);
      this.userProfile = data;
    } catch (error) {
      console.log(error);
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    handleOpenComments(postId) {
      this.selectedPostId = postId;
      this.isCommentsOpen = true;
    },
  },
};
</script>

<template>
  <main class="my-40 container mx-auto max-w-6xl min-h-[60vh] px-4 lg:px-0">
    <span v-if="loading" class="text-center">Loading...</span>
    <template v-else>
      <div class="flex items-center gap-16">
        <div
          class="w-50 h-50 rounded-full overflow-hidden flex-shrink border-2 border-border"
        >
          <img
            :src="userProfile.avatar || defaultProfile"
            :alt="userProfile.username + ' avatar'"
            class="w-full h-full object-cover"
            draggable="false"
            loading="lazy"
          />
        </div>
        <div class="flex-1 flex flex-col gap-2 items-start">
          <h1 class="text-4xl font-bold">{{ userProfile.username }}</h1>
          <span
            class="uppercase text-font-secondary mt-4 block text-2xl tracking-[1rem]"
            >{{ userProfile.tag }}</span
          >
          <div class="flex gap-2 mt-4">
            <span
              class="bg-primary text-white py-2 px-6 rounded cursor-not-allowed"
              >Follow</span
            >
          </div>
        </div>
      </div>
      <ul
        ref="postContainer"
        class="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-3 lg:mt-20"
      >
        <li
          v-for="n in 3"
          :key="'skeleton-' + n"
          v-if="loading"
          class="col-span-1 bg-font-secondary/10 min-h-46 w-full animate-pulse"
        ></li>

        <li v-else v-for="post in userProfile.posts" :key="post.id">
          <!-- todo => comments and favorites lenght -->
          <ChatCard
            :to="'chat/' + post.id"
            :avatar="userProfile.avatar"
            :username="userProfile.username"
            :tag="userProfile.tag"
            :email="null"
            :content="post.content"
            :date="post.created_at"
            :comments="post.comments.length"
            :favorites="post.favorites.length"
            :postId="post.id"
            :userId="userProfile.id"
            :isFavorited="post.isFavorited"
            @open-comments="handleOpenComments"
          />
        </li>
      </ul>

      <CommentsModal
        :key="selectedPostId"
        v-if="selectedPostId"
        :postId="selectedPostId"
        :userId="userProfile.id"
        :isOpen="isCommentsOpen"
        @close="isCommentsOpen = false"
      />
    </template>
  </main>
</template>
