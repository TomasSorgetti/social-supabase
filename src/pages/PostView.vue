<script>
import ChatCard from "../components/ui/cards/ChatCard.vue";
import { getPosts, usePostState } from "../services/post";
import { useAuthState } from "../services/auth";
import CreatePost from "../components/sections/posts/CreatePost.vue";

let unsubscribeFromAuthState = () => {};
let unsubscribeFromPostState = () => {};

export default {
  name: "PostView",
  components: {
    ChatCard,
    CreatePost,
  },

  data() {
    return {
      // loadingPosts: false,
      posts: [],

      user: {
        id: null,
        email: null,
        profileId: null,
        username: null,
        tag: null,
        avatar: null,
      },
    };
  },

  async mounted() {
    unsubscribeFromAuthState = useAuthState(async (userState) => {
      this.user = userState;
      if (this.user?.id) {
        this.posts = await getPosts(this.user.id);
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
};
</script>

<template>
  <main class="container mx-auto max-w-5xl px-4 py-32">
    <h1 class="text-3xl font-bold">Chat Page</h1>

    <CreatePost />

    <ul
      ref="postContainer"
      class="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-3 lg:mt-20"
    >
      <li v-for="post in posts" :key="post.id">
        <!-- todo => comments and favorites lenght -->
        <ChatCard
          :to="'chat/' + post.id"
          :avatar="post.user.avatar"
          :username="post.user.username"
          :email="post.user.email"
          :content="post.content"
          :date="post.created_at"
          :comments="post.comments.length"
          :favorites="post.favorites.length"
          :postId="post.id"
          :userId="user.id"
          :isFavorited="post.isFavorited"
        />
      </li>
    </ul>
  </main>
</template>
