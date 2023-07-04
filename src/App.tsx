import { Cipher } from './components/Cipher'

import { texts } from './assets/texts.ts'

import './style.css'

export default function HomePage() {
  let lang = window.localStorage.getItem('lang')

  if (!lang) {
    window.localStorage.setItem('lang', 'en')
    lang = 'en'
  }

  const { displacement, exchange, intro, labelButton } = texts[lang]

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
              defaultValue={3}
            />
          </div>
          <Cipher exchange={exchange} labelButton={labelButton} lang={lang} />
        </div>
      </main>
    </div>
  )
}
