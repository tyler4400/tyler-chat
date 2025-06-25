import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import { LanguageType } from "../types";

type MessageSchema = typeof zh

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

export const initLocale = async () => {
  try {
    const config = await window.electronAPI.getConfig()
    if (config.language) {
      setI18nLanguage(config.language)
      console.log('[tyler-chat] 系统语言初始化:', config.language)
    }
  } catch (error) {
    console.error('Failed to load language config:', error)
  }
}
