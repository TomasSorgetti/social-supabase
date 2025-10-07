<script>
import { PaperClipIcon, PhotoIcon } from "@heroicons/vue/24/solid";
import { useAuthState } from "../../../services/auth";
import { createPost } from "../../../services/post";
import MainButton from "../../ui/buttons/MainButton.vue";

let unsubscribeFromAuthState = () => {};

export default {
  name: "CreatePost",

  components: {
    MainButton,
    PaperClipIcon,
    PhotoIcon,
  },
  data() {
    return {
      sendingPost: false,
      error: "",

      form: {
        message: "",
      },

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

  methods: {
    async handleSubmit(event) {
      event.preventDefault();

      if (!this.form.message.trim()) return;

      this.sendingPost = true;

      try {
        await createPost(this.user.id, this.form);
        this.form.message = "";
      } catch (err) {
        this.error = err.message || "Something went wrong";
      } finally {
        this.sendingPost = false;
      }
    },
  },
  async mounted() {
    unsubscribeFromAuthState = useAuthState(
      (userState) => (this.user = userState)
    );
  },

  unmounted() {
    unsubscribeFromAuthState();
  },
};
</script>

<!-- todo => for create a post need to complete profile first -->
<template>
  <form @submit="handleSubmit" class="w-full mt-10">
    <label for="message" class="sr-only">Message:</label>
    <textarea
      v-model="form.message"
      id="message"
      name="message"
      cols="30"
      rows="4"
      :placeholder="$t('PostPage.placeholder')"
      required
      class="w-full border border-border p-4 min-h-50 resize-none"
    ></textarea>
    <div class="flex items-center justify-between py-4">
      <div class="flex gap-4 items-center">
        <PaperClipIcon class="w-8 h-8 text-border cursor-not-allowed" />
        <PhotoIcon class="w-8 h-8 text-border cursor-not-allowed" />
      </div>
      <MainButton type="submit">{{ $t("PostPage.send") }}</MainButton>
    </div>
  </form>
</template>
