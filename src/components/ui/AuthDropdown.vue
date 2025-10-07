<script>
import { signOutUser } from "../../services/auth";
import defaultAvatar from "../../assets/images/avatar.webp";

export default {
  name: "AuthDropdown",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultAvatar,

      isDropdownOpen: false,
      loading: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
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
      <img
        :src="user.avatar || defaultAvatar"
        :alt="user?.username + ' avatar'"
        class="w-7 h-7 rounded-full bg-gray-700"
      />
      <!-- {{ $t("Navbar.account") }} -->
      {{ user?.username || user?.email || $t("Navbar.account") }}
    </button>

    <ul
      v-show="isDropdownOpen"
      class="absolute right-0 mt-2 w-40 border bg-background rounded shadow-lg border-border"
    >
      <li @click="closeDropdown">
        <router-link
          to="/account/profile"
          class="block px-4 py-2 text-font-secondary hover:text-font-primary hover:bg-border/20"
          active-class="text-white"
          exact-active-class="text-white"
          >{{ $t("Navbar.profile") }}</router-link
        >
      </li>
      <li @click="closeDropdown">
        <router-link
          to="/account/settings"
          class="block px-4 py-2 text-font-secondary hover:text-font-primary hover:bg-border/20"
          active-class="text-white"
          exact-active-class="text-white"
          >{{ $t("Navbar.settings") }}</router-link
        >
      </li>
      <li @click="closeDropdown">
        <button
          @click="handleLogout"
          :disabled="loading"
          class="w-full cursor-pointer text-left px-4 py-2 text-red-400 hover:bg-red-400/5"
          :class="loading ? 'cursor-not-allowed text-font-secondary' : ''"
        >
          {{ $t("Navbar.logout") }}
        </button>
      </li>
    </ul>
  </div>
</template>
