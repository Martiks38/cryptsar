import { ChangeEvent, useEffect, useState } from 'react'

import { Cipher } from './components/Cipher'

import { texts } from './assets/texts.ts'

import './style.css'
import './styles/displacement.css'

export default function HomePage() {
  const [displacementValue, setDisplacementValue] = useState(3)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const lang = window.localStorage.getItem('lang')

    if (lang !== null) {
      setLang(lang)
    } else {
      window.localStorage.setItem('lang', 'en')
    }
  }, [])

  const { displacement, errorMessage, exchange, intro, labelActionButton, language, message } =
    texts[lang]
  const { labelLangButton, flagAlt } = language
  const isLanguageEnglish = lang === 'en'

  const changeLanguage = () => {
    window.localStorage.setItem('lang', lang === 'en' ? 'es' : 'en')
    setLang((currentLang) => (currentLang === 'en' ? 'es' : 'en'))
  }

  const changeDisplacement = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.currentTarget.value)

    if (value < 0) {
      setDisplacementValue(0)
      return
    }

    if (isLanguageEnglish && value > 26) {
      setDisplacementValue(26)
      return
    }

    if (isLanguageEnglish && value > 27) {
      setDisplacementValue(27)
      return
    }

    // Filtra el cero a la izquierda luego de borrar el número actual de desplazamiento
    ev.currentTarget.value = value.toString()
    setDisplacementValue(value)
  }

  return (
    <div className='maxWidthPage'>
      <div className='heroImage'></div>
      <header className='pageHeader'>
        <button
          onClick={changeLanguage}
          className='pageHeader__button'
          aria-label={labelLangButton}
        >
          <img src={isLanguageEnglish ? '/en.png' : '/es.png'} alt={flagAlt} aria-hidden='true' />
        </button>
      </header>
      <main className='mainContent'>
        <h1 className='mainContent__title'>Cryptsar</h1>
        <img src='/column.png' alt='' className='column column_left' />
        <img src='/column.png' alt='' className='column column_right' />
        <div className='containerWidth'>
          <div className='description'>
            <p id='introduction' className='introduction'>
              {intro}
            </p>
            <div className='displacement'>
              <span className='displacement__text'>{displacement}</span>
              <input
                type='number'
                name='displacement'
                id='displacement'
                className='displacement__input'
                placeholder='3'
                min='0'
                max='27'
                onChange={changeDisplacement}
                value={displacementValue}
              />
            </div>
          </div>
          <Cipher
            displacementValue={displacementValue}
            errorMessage={errorMessage}
            exchange={exchange}
            labelActionButton={labelActionButton}
            lang={lang}
            message={message}
          />
        </div>
      </main>
    </div>
  )
}
