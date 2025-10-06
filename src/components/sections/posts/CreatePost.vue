<script>
import { PaperClipIcon, PhotoIcon } from "@heroicons/vue/24/solid";

import MainButton from "../../ui/buttons/MainButton.vue";
import { createPost } from "../../../services/post";

export default {
  name: "CreatePost",
  props: {
    userId: {
      type: String,
      required: false,
      default: null,
    },
  },
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
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();

      if (!this.form.message.trim()) return;

      this.sendingPost = true;

      try {
        await createPost(this.userId, this.form);
        this.form.message = "";
      } catch (err) {
        this.error = err.message || "Something went wrong";
      } finally {
        this.sendingPost = false;
      }
    },
  },
};
</script>

<template>
  <form @submit="handleSubmit" class="w-full mt-10">
    <label for="message" class="sr-only">Message:</label>
    <textarea
      v-model="form.message"
      id="message"
      name="message"
      cols="30"
      rows="4"
      placeholder="Your message..."
      required
      class="w-full border border-border p-4 min-h-50 resize-none"
    ></textarea>
    <div class="flex items-center justify-between py-4">
      <div class="flex gap-4 items-center">
        <PaperClipIcon class="w-8 h-8 text-border cursor-not-allowed" />
        <PhotoIcon class="w-8 h-8 text-border cursor-not-allowed" />
      </div>
      <MainButton type="submit">Send</MainButton>
    </div>
  </form>
</template>
