import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import i18n from "./i18n/i18n";
import router from "./router/router";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount("#app");
