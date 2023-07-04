import { Cipher } from './components/Cipher'

import { texts } from './assets/texts.ts'

import './style.css'
import { ChangeEvent, useState } from 'react'

export default function HomePage() {
  const [displacementValue, setDisplacementValue] = useState(3)

  let lang = window.localStorage.getItem('lang')

  if (!lang) {
    window.localStorage.setItem('lang', 'en')
    lang = 'en'
  }

  const { displacement, exchange, intro, labelButton } = texts[lang]

  const changeDisplacement = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.currentTarget.value)

    if (value < 0) {
      setDisplacementValue(0)
      return
    }

    if (lang === 'en' && value > 26) {
      setDisplacementValue(26)
      return
    }

    if (lang === 'es' && value > 27) {
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
      <header className='pageHeader'></header>
      <main className='mainContent'>
        <h1 className='mainContent__title'>Cryptsar</h1>
        <img src='/column.png' alt='' className='column column_left' />
        <img src='/column.png' alt='' className='column column_right' />
        <div className='containerWidth'>
          <p id='introduction' className='introduction'>
            {intro}
          </p>
          <div className='displacement'>
            <span className='displacement__text'>{displacement}</span>
            <input
              type='number'
              name='displacement'
              id='displacement'
              placeholder='3'
              min='0'
              max='27'
              onChange={changeDisplacement}
              value={displacementValue}
            />
          </div>
          <Cipher
            displacementValue={displacementValue}
            exchange={exchange}
            labelButton={labelButton}
            lang={lang}
          />
        </div>
      </main>
    </div>
  )
}
