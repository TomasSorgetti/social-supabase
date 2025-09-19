<script>
export default {
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
    },
  },
};
</script>

<template>
  <div>
    <h3>{{ $t("language") }}</h3>
    <button @click="changeLanguage('en')">
      {{ $t("switch_to", { lang: "English" }) }}
    </button>
    <button @click="changeLanguage('es')">
      {{ $t("switch_to", { lang: "Español" }) }}
    </button>
  </div>
</template>

<style scoped>
button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
