<script>
import ChatCard from "../components/ui/cards/ChatCard.vue";
import { getPosts, usePostState } from "../services/post";
import { useAuthState } from "../services/auth";
import CreatePost from "../components/sections/posts/CreatePost.vue";
import CommentsModal from "../components/ui/ComentModal.vue";

let unsubscribeFromAuthState = () => {};
let unsubscribeFromPostState = () => {};

export default {
  name: "PostView",
  components: {
    ChatCard,
    CreatePost,
    CommentsModal,
  },
  
  data() {
    return {
      loading: false,
      posts: [],

      user: {
        id: null,
        email: null,
        profileId: null,
        username: null,
        tag: null,
        avatar: null,
      },

      isCommentsOpen: false,
      selectedPostId: null,
    };
  },

  async mounted() {
    unsubscribeFromAuthState = useAuthState(async (userState) => {
      this.loading = true;
      this.user = userState;

      if (this.user?.id) {
        this.posts = await getPosts(this.user.id);
        this.loading = false;
      }
    });
    unsubscribeFromPostState = usePostState((newPost) => {
      this.posts.unshift(newPost);
    });
  },

  unmounted() {
    unsubscribeFromAuthState();
    unsubscribeFromPostState();
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
  <main class="container mx-auto max-w-5xl px-4 py-32">
    <h1 class="text-3xl font-bold">{{ $t("PostPage.title") }}</h1>

    <CreatePost />

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

      <li v-else v-for="post in posts" :key="post.id">
        <!-- todo => comments and favorites lenght -->
        <ChatCard
          :to="'chat/' + post.id"
          :avatar="post.user.avatar"
          :username="post.user.username"
          :tag="user.tag"
          :email="post.user.email"
          :content="post.content"
          :date="post.created_at"
          :comments="post.comments.length"
          :favorites="post.favorites.length"
          :postId="post.id"
          :userId="user.id"
          :isFavorited="post.isFavorited"
          @open-comments="handleOpenComments"
        />
      </li>
    </ul>

    <CommentsModal
      :key="selectedPostId"
      v-if="selectedPostId"
      :postId="selectedPostId"
      :userId="user.id"
      :isOpen="isCommentsOpen"
      @close="isCommentsOpen = false"
    />
  </main>
</template>
