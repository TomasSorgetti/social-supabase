<script>
import { useAuthState } from "../../services/auth";
import defaultProfile from "../../assets/images/avatar.webp";
import { updateUserProfile } from "../../services/user";

let unsubscribeFromAuthState = () => {};

export default {
  name: "ProfileView",
  data() {
    return {
      defaultProfile,

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
        avatar: null,
      },
    };
  },
  mounted() {
    unsubscribeFromAuthState = useAuthState(
      (userState) => (this.user = userState)
    );
    console.log("user", this.user);
  },
  unmounted() {
    unsubscribeFromAuthState();
  },
  methods: {
    async updateUserProfile() {},
  },
};
</script>

<template>
  <main class="my-40 min-h-[30vh] container mx-auto">
    <form action="#" class="flex items-start justify-start gap-16">
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
        <h1 class="text-5xl font-bold">Hello, {{ user.username }}</h1>
        <span
          class="uppercase text-font-secondary mt-4 block text-2xl tracking-[1rem]"
          >{{ user.tag }}</span
        >
        <ul class="mt-10">
          <li>Email: {{ user.email }}</li>
          <li>Username: {{ user.username }}</li>
        </ul>
      </div>
    </form>
  </main>
</template>
