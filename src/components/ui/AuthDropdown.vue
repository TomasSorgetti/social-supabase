<script>
import { signOutUser } from "../../services/auth";

export default {
  name: "AuthDropdown",
  data() {
    return {
      isDropdownOpen: false,
      loading: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async handleLogout() {
      this.loading = true;
      try {
        await signOutUser();
        this.$router.push("/auth/login");
      } catch (error) {
        this.$router.push("/500");
      } finally {
        this.loading = false;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-1 cursor-pointer"
    >
      <div class="w-7 h-7 rounded-full bg-gray-700"></div>
      Account
    </button>

    <ul
      v-show="isDropdownOpen"
      class="absolute right-0 mt-2 w-40 border bg-background rounded shadow-lg border-border"
    >
      <li>
        <router-link
          to="/account/profile"
          class="block px-4 py-2 hover:bg-border/20"
          >Profile</router-link
        >
      </li>
      <li>
        <router-link
          to="/account/settings"
          class="block px-4 py-2 hover:bg-border/20"
          >Settings</router-link
        >
      </li>
      <li>
        <button
          @click="handleLogout"
          :disabled="loading"
          class="w-full cursor-pointer text-left px-4 py-2 hover:bg-border/20"
          :class="loading ? 'cursor-not-allowed text-font-secondary' : ''"
        >
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>
