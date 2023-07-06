import React, { createContext, useEffect, useState } from 'react'
import { texts } from '../assets/texts'

import type { Translations } from '../assets/texts'

type TranslationsProps = {
  children: React.JSX.Element | React.JSX.Element[]
}

type TranslationsContext = {
  changeLanguage: () => void
  currentTexts: Translations
  lang: string
}

export const TranlationsCtx = createContext<TranslationsContext | null>(null)

export function TranslationsProvider({ children }: TranslationsProps) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const lang = window.localStorage.getItem('lang')

    if (lang !== null) {
      setLang(lang)
    } else {
      window.localStorage.setItem('lang', 'en')
    }
  }, [])

  const changeLanguage = () => {
    window.localStorage.setItem('lang', lang === 'en' ? 'es' : 'en')
    setLang((currentLang) => (currentLang === 'en' ? 'es' : 'en'))
  }

  const values = {
    changeLanguage,
    currentTexts: texts[lang],
    lang
  }

  return <TranlationsCtx.Provider value={values}>{children}</TranlationsCtx.Provider>
}
