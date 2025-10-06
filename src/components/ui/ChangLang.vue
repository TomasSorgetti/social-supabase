<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import useClickOutside from "../../composables/useClickOutside";
import worldIcon from "../../assets/icons/world.svg";

const { locale } = useI18n();

const isEsActive = computed(() => locale.value === "es");
const isEnActive = computed(() => locale.value === "en");

const isDropdownOpen = ref(false);
const langSwitcherRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const changeLanguage = (lang) => {
  localStorage.setItem("lang", lang);
  locale.value = lang;
  isDropdownOpen.value = false;
};

useClickOutside(langSwitcherRef, () => {
  isDropdownOpen.value = false;
});
</script>

<template>
  <div ref="langSwitcherRef" class="relative">
    <button
      @click.stop="toggleDropdown"
      class="flex items-center gap-2 cursor-pointer uppercase text-font-secondary"
    >
      <span class="sr-only">change language</span>
      <img :src="worldIcon" alt="" />
      {{ locale }}
    </button>

    <ul
      class="absolute right-0 mt-3 w-40 border bg-background rounded text-center shadow-lg border-border"
      :class="{ hidden: !isDropdownOpen }"
    >
      <!-- todo=> bucle language list -->
      <li>
        <button
          @click="changeLanguage('en')"
          :class="[
            'w-full py-2 hover:bg-font-secondary/10 cursor-pointer',
            isEnActive ? 'text-font-primary' : 'text-font-secondary',
          ]"
          :disabled="isEnActive"
        >
          English
        </button>
      </li>
      <li>
        <button
          @click="changeLanguage('es')"
          :class="[
            'w-full py-2 hover:bg-font-secondary/10 cursor-pointer',
            isEsActive ? 'text-font-primary' : 'text-font-secondary',
          ]"
          :disabled="isEsActive"
        >
          Español
        </button>
      </li>
    </ul>
  </div>
</template>
