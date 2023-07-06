import { useContext } from 'react'
import { TranlationsCtx } from '../context/TranslationsCtx'
import { Translations } from '../assets/texts'

export type UseTranslationsError = {
  emitError: () => void
}

export type UseTranslationsCorrect = {
  changeLanguage: () => void
  currentTexts: Translations
  lang: string
}

export function useTranslations() {
  const values = useContext(TranlationsCtx)

  if (values === null) throw new Error('useTranslations must be used within a TranlationsProvider')

  const { changeLanguage, currentTexts, lang } = values

  return { changeLanguage, currentTexts, lang }
}
