import Polyglot from 'node-polyglot'

import { locales, mobileLocales } from '../../../locales'
import { isDesktop } from './'

const defaultLocale = 'en'

const unsupportedLocale = () => {
  console.warn('Locale not supported')
  return defaultLocale
}

const setLocale = (language) => {
  if (!language || !language.locale) return defaultLocale
  return locales[language.locale] ? language.locale : unsupportedLocale()
}

export const setI18n = (language) => {
  const locale = setLocale(language)
  const phrases = locales[locale]
  const polyglot = new Polyglot({locale, phrases, onMissingKey: () => null})
  if (!isDesktop) polyglot.extend(mobileLocales[locale])
  return polyglot
}