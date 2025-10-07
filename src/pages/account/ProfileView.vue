<script>
import { setUser, useAuthState } from "../../services/auth";
import defaultProfile from "../../assets/images/avatar.webp";
import { updateUserProfile } from "../../services/user";

let unsubscribeFromAuthState = () => {};

export default {
  name: "ProfileView",
  data() {
    return {
      defaultProfile,

      loading: false,
      error: "",
      success: "",

      user: {
        id: null,
        email: null,
        profileId: null,
        username: null,
        tag: null,
        avatar: null,
      },

      form: {
        username: null,
        tag: null,
        // avatar: null,
      },
    };
  },

  mounted() {
    unsubscribeFromAuthState = useAuthState((userState) => {
      this.user = userState;

      this.form.username = userState.username;
      this.form.tag = userState.tag;
    });
  },

  unmounted() {
    unsubscribeFromAuthState();
  },

  computed: {
    isUserChanged() {
      if (
        !this.form.username ||
        !this.user.username ||
        !this.form.tag ||
        !this.user.tag
      )
        return false;

      return (
        this.form.username.trim() !== this.user.username ||
        this.form.tag.trim() !== this.user.tag
      );
    },
  },

  methods: {
    async handleSubmit() {
      if (!this.isUserChanged) return;

      this.loading = true;
      this.error = "";
      this.success = "";

      try {
        // todo => update user in auth?
        await updateUserProfile({
          id: this.user.id,
          username: this.form.username.trim(),
          tag: this.form.tag.trim(),
        });

        // this not necesary?
        this.user.username = this.form.username.trim();
        this.user.tag = this.form.tag.trim();

        // todo => update user in auth?
        setUser({
          username: this.user.username,
          tag: this.user.tag,
        });

        this.success = "Username updated successfully";
      } catch (err) {
        console.log(err);
        this.error = err.message || "Error updating username.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <main class="my-40 min-h-[35vh] container mx-auto">
    <form
      @submit.prevent="handleSubmit"
      class="flex items-start justify-start gap-16"
    >
      <div
        class="w-50 h-50 rounded-full overflow-hidden flex-shrink border-2 border-border"
      >
        <img
          :src="user.avatar || defaultProfile"
          :alt="user.username + ' avatar'"
          class="w-full h-full object-cover"
          draggable="false"
          loading="lazy"
        />
      </div>

      <div class="flex-1">
        <span
          class="min-h-10 block"
          :class="error ? 'text-red-500' : 'text-green-500'"
          >{{ error || success }}</span
        >
        <h1 class="text-5xl font-bold">Hello, {{ user.username }}</h1>
        <input
          id="tag"
          type="text"
          v-model="form.tag"
          class="border rounded px-2 py-1 uppercase text-font-secondary mt-4 block text-2xl tracking-[1rem] w-full max-w-md"
        />

        <ul class="mt-10 space-y-2">
          <li>Email: {{ user.email }}</li>
          <li>
            <label for="username" class="">Username:</label>
            <input
              id="username"
              type="text"
              v-model="form.username"
              class="border rounded px-2 py-1"
            />
          </li>
        </ul>

        <button
          type="submit"
          :disabled="!isUserChanged || loading"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {{ loading ? "Updating..." : "Update" }}
        </button>
      </div>
    </form>
  </main>
</template>
