import { ChangeEvent, useRef, useState } from 'react'
import { decrypt, decryptSpanish, encrypt, encryptSpanish } from '../utils/crypt'

type CipherProps = {
  exchange: string[]
  labelButton: string[]
  lang: string
}

export function Cipher({ exchange, lang }: CipherProps) {
  const [isEncrypt, setIsEncrypt] = useState(true)
  const cryptTimeoutId = useRef<number | undefined>(undefined)

  const [titleOriginal, titleEncrypt] = exchange

  const changeAction = () => {
    const clipboards = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.clipboard'))

    const clipboard = clipboards[isEncrypt ? 1 : 0]

    setIsEncrypt((prevAction) => !prevAction)

    if (clipboard instanceof HTMLTextAreaElement) clipboard.focus()
  }

  const encryptText = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const message = ev.currentTarget.value
    const displacementInput = document.querySelector<HTMLInputElement>("input[type='number']")

    let displacement = 0

    if (displacementInput instanceof HTMLInputElement) {
      const value = Number(displacementInput.value)
      const sizeAlphabet = lang === 'es' ? 27 : 26

      if (value >= 0 && value <= sizeAlphabet) displacement = value
    }

    if (cryptTimeoutId.current) window.clearTimeout(cryptTimeoutId.current)

    const data = { displacement, message }
    const clipboards = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.clipboard'))
    const clipboard = clipboards[isEncrypt ? 1 : 0]

    if (isEncrypt) {
      cryptTimeoutId.current = window.setTimeout(() => {
        const encryptedText = lang === 'en' ? encrypt(data) : encryptSpanish(data)

        clipboard.value = encryptedText
      }, 600)
    } else {
      cryptTimeoutId.current = window.setTimeout(() => {
        const encryptedText = lang === 'en' ? decrypt(data) : decryptSpanish(data)

        clipboard.value = encryptedText
      }, 600)
    }
  }

  return (
    <section>
      <header className={`action ${isEncrypt ? '' : 'action_rowReverse'}`}>
        <h2>{titleOriginal}</h2>
        <button
          className='action__button'
          aria-label='Cambiar a desencriptar mensaje'
          onClick={changeAction}
        >
          <svg
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
      <div className={`clipboardContainer ${isEncrypt ? '' : 'clipboardContainer_reverse'}`}>
        <div>
          <div className={`rope rope__top ${isEncrypt ? '' : 'rope_reverse'}`}></div>
          <textarea onChange={encryptText} cols={30} rows={10} className='clipboard'></textarea>
        </div>
        <div>
          <div className={`rope rope__bottom ${isEncrypt ? '' : 'rope_reverse'}`}></div>
          <textarea onChange={encryptText} cols={30} rows={10} className='clipboard'></textarea>
        </div>
      </div>
    </section>
  )
}
