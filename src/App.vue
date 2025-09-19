<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<template>
  <NavBar />
  <h1>{{ $t("welcome") }}</h1>
  <p>{{ $t("greeting", { name: "Usuario" }) }}</p>
</template>
