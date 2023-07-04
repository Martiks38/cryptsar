import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { decrypt, decryptSpanish, encrypt, encryptSpanish } from '../utils/crypt'

type CipherProps = {
  displacementValue: number
  exchange: string[]
  labelActionButton: string[]
  lang: string
}

export function Cipher({ displacementValue, exchange, labelActionButton, lang }: CipherProps) {
  const [isEncrypt, setIsEncrypt] = useState(true)
  const cryptTimeoutId = useRef<number | undefined>(undefined)

  const [titleOriginal, titleEncrypt] = exchange
  const currentlabelActionButton = labelActionButton[isEncrypt ? 0 : 1]

  const changeAction = () => {
    const clipboards = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.clipboard'))

    const clipboard = clipboards[isEncrypt ? 1 : 0]

    setIsEncrypt((prevAction) => !prevAction)

    if (clipboard instanceof HTMLTextAreaElement) clipboard.focus()
  }

  const cryptAction = (message: string) => {
    const data = { displacement: displacementValue, message }

    if (cryptTimeoutId.current) window.clearTimeout(cryptTimeoutId.current)

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

  const compilerText = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const message = ev.currentTarget.value

    cryptAction(message)
  }

  useEffect(() => {
    const clipboards = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.clipboard'))
    const message = clipboards[0].value

    cryptAction(message)
  }, [displacementValue])

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
          <textarea
            onChange={compilerText}
            cols={30}
            rows={10}
            className='clipboard'
            readOnly={!isEncrypt}
          ></textarea>
        </div>
        <div>
          <div className={`rope rope__bottom ${isEncrypt ? '' : 'rope_reverse'}`}></div>
          <textarea
            onChange={compilerText}
            cols={30}
            rows={10}
            className='clipboard'
            readOnly={isEncrypt}
          ></textarea>
        </div>
      </div>
    </section>
  )
}
