import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import i18nResources from "../../shared/locales";

export const initi18n = () => {
  i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    supportedLngs: ['fi', 'en'],
    lng: "fi",
    resources: i18nResources,
  })
}

export const currentLng = () => i18next.language as 'fi'|'en'
