import translationEn from './en/translation.ts'
import translationFi from './fi/translation.ts'

const i18nResources = {
  en: {
    translation: translationEn,
  },
  fi: {
    translation: translationFi,
  },
} as const

export default i18nResources
