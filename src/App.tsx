import './style.css'
import texts from './assets/texts.json'
import { Cipher } from './components/Cipher'

export default function HomePage() {
  const $ = (selector: string) => document.querySelector(selector)

  const lang = window.localStorage.getItem('lang')
  const isEncrypt = window.localStorage.getItem('encrypt')

  if (!lang) window.localStorage.setItem('lang', 'en')

  const { displacement, exchange, intro, labelButton } = lang === 'es' ? texts.es : texts.en

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
              value={3}
            />
          </div>
          <Cipher exchange={exchange} labelButton={labelButton} />
        </div>
      </main>
    </div>
  )
}
