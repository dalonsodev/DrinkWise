import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import es from "./locales/es.json"
import en from "./locales/en.json"

export default i18next
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources: {
         es: { translation: es },
         en: { translation: en },
      },
      fallbackLng: "es",
      detection: {
         order: ["localStorage", "navigator"],
         caches: ["localStorage"]
      },
      interpolation: {
         escapeValue: false,
      },
   })