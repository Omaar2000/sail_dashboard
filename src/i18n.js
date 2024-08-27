import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../public/locales/en/translation.json";
import translationAR from "../public/locales/ar/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // default language
  fallbackLng: localStorage.getItem("language") || "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
