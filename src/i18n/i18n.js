import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

const messages = {
  en,
  es,
};

const savedLanguage = localStorage.getItem("lang") || "en";

const i18n = createI18n({
  locale: savedLanguage,
  fallbackLocale: "en",
  messages,
});

export default i18n;
