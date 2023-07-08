import { useState } from 'react'
import { useTranslations } from '../hooks/useTranslations'

import '../styles/clipboard.css'
import '../styles/actionBar.css'
import { ClipboardContainer } from './Clipboards'

type CipherProps = {
  displacementValue: number
}

export function Cipher({ displacementValue }: CipherProps) {
  const [isEncrypt, setIsEncrypt] = useState(true)
  const { currentTexts } = useTranslations()

  const { exchange, labelActionButton } = currentTexts
  const [titleOriginal, titleEncrypt] = exchange
  const currentlabelActionButton = labelActionButton[isEncrypt ? 0 : 1]

  const changeAction = () => {
    const clipboards = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.clipboard'))

    const clipboard = clipboards[isEncrypt ? 1 : 0]

    setIsEncrypt((prevAction) => !prevAction)

    if (clipboard instanceof HTMLTextAreaElement) clipboard.focus()
  }

  return (
    <section>
      <header className={`action ${isEncrypt ? '' : 'action_rowReverse'}`}>
        <h2>{titleOriginal}</h2>
        <button
          className='action__button'
          aria-label={currentlabelActionButton}
          onClick={changeAction}
        >
          <svg
            aria-hidden='true'
            className='action__arrowBoth'
            xmlns='http://www.w3.org/2000/svg'
            width='800'
            height='800'
            viewBox='0 0 24 24'
          >
            <path
              fill='#fff'
              d='M7.78 5.97a.75.75 0 0 0-1.06 0l-5.25 5.25a.75.75 0 0 0 0 1.06l5.25 5.25a.75.75 0 0 0 1.06-1.06L3.81 12.5h16.38l-3.97 3.97a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06l-5.25-5.25a.75.75 0 1 0-1.06 1.06L20.19 11H3.81l3.97-3.97a.75.75 0 0 0 0-1.06z'
            />
          </svg>
        </button>
        <h2>{titleEncrypt}</h2>
      </header>
      <ClipboardContainer displacementValue={displacementValue} isEncrypt={isEncrypt} />
      <div className='messagePortal' aria-describedby='cryptText'></div>
    </section>
  )
}
