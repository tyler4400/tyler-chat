import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

type MessageSchema = typeof zh
type LanguageType = 'zh' | 'en'

export const i18n = createI18n<[MessageSchema], LanguageType>({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

export function setI18nLanguage(locale: LanguageType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    (i18n.global.locale as any).value = locale
  }
}
