import { ChangeEvent, useEffect, useId, useRef, useState } from 'react'
import { useTranslations } from '../hooks/useTranslations'
import { CopyButton } from './CopyButton'
import { decrypt, decryptSpanish, encrypt, encryptSpanish } from '../utils/crypt'

type ClipboardContainerProps = {
  displacementValue: number
  isEncrypt: boolean
}

const initContent = {
  clipboardOne: '',
  clipboardTwo: ''
}

export function ClipboardContainer({ displacementValue, isEncrypt }: ClipboardContainerProps) {
  const [clipboardContent, setClipboardContent] = useState(initContent)
  const { currentTexts, lang } = useTranslations()
  const clipboardId = useId()
  const cryptTimeoutId = useRef<number | undefined>(undefined)

  const { clipboardBtns, errorMessage, message } = currentTexts
  const { copy, erase } = clipboardBtns

  useEffect(() => {
    return () => {
      if (cryptTimeoutId.current) clearTimeout(cryptTimeoutId.current)
    }
  }, [])

  const changeText = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const el = ev.currentTarget
    const { id } = el

    const message = el.value
    const data = { displacement: displacementValue, message }

    if (cryptTimeoutId.current) window.clearTimeout(cryptTimeoutId.current)

    if (isEncrypt) {
      cryptTimeoutId.current = window.setTimeout(() => {
        const encryptedText = lang === 'en' ? encrypt(data) : encryptSpanish(data)

        setClipboardContent((prevContent) => ({ ...prevContent, clipboardTwo: encryptedText }))
      }, 400)
    } else {
      cryptTimeoutId.current = window.setTimeout(() => {
        const encryptedText = lang === 'en' ? decrypt(data) : decryptSpanish(data)

        setClipboardContent((prevContent) => ({ ...prevContent, clipboardOne: encryptedText }))
      }, 400)
    }

    setClipboardContent((prevContent) => {
      return id === `${clipboardId}-1`
        ? { ...prevContent, clipboardOne: message }
        : { ...prevContent, clipboardTwo: message }
    })
  }

  const clearText = () => {
    setClipboardContent(initContent)
    clearTimeout(cryptTimeoutId.current)
  }

  useEffect(() => {
    const message = isEncrypt ? clipboardContent.clipboardOne : clipboardContent.clipboardTwo
    const data = { displacement: displacementValue, message }

    if (isEncrypt) {
      cryptTimeoutId.current = window.setTimeout(() => {
        const encryptedText = lang === 'en' ? encrypt(data) : encryptSpanish(data)

        setClipboardContent((prevContent) => ({ ...prevContent, clipboardTwo: encryptedText }))
      }, 400)
    } else {
      cryptTimeoutId.current = window.setTimeout(() => {
        const encryptedText = lang === 'en' ? decrypt(data) : decryptSpanish(data)

        setClipboardContent((prevContent) => ({ ...prevContent, clipboardOne: encryptedText }))
      }, 400)
    }

    return () => {}
  }, [lang])

  return (
    <div className={`clipboardContainer ${isEncrypt ? '' : 'clipboardContainer_reverse'}`}>
      <div>
        <div className={`rope rope__top ${isEncrypt ? '' : 'rope_reverse'}`}></div>
        <textarea
          onChange={changeText}
          id={`${clipboardId}-1`}
          cols={30}
          rows={10}
          className='clipboard'
          readOnly={!isEncrypt}
          autoCorrect='off'
          spellCheck='false'
          value={clipboardContent.clipboardOne}
        ></textarea>
        <button
          onClick={clearText}
          className={`clipboard__clearText ${
            isEncrypt && Boolean(clipboardContent.clipboardOne) ? '' : 'hidden'
          }`}
          aria-label={erase}
        >
          <span>X</span>
        </button>
        <CopyButton
          errorMessage={errorMessage}
          message={message}
          visible={!isEncrypt && Boolean(clipboardContent.clipboardOne)}
          label={copy}
        />
      </div>
      <div>
        <div className={`rope rope__bottom ${isEncrypt ? '' : 'rope_reverse'}`}></div>
        <textarea
          onChange={changeText}
          id={`${clipboardId}-2`}
          cols={30}
          rows={10}
          className='clipboard'
          readOnly={isEncrypt}
          autoCorrect='off'
          spellCheck='false'
          value={clipboardContent.clipboardTwo}
        ></textarea>
        <button
          onClick={clearText}
          className={`clipboard__clearText ${
            !isEncrypt && Boolean(clipboardContent.clipboardTwo) ? '' : 'hidden'
          }`}
          aria-label={erase}
        >
          <span>X</span>
        </button>

        <CopyButton
          errorMessage={errorMessage}
          message={message}
          visible={isEncrypt && Boolean(clipboardContent.clipboardTwo)}
          label={copy}
        />
      </div>
    </div>
  )
}
