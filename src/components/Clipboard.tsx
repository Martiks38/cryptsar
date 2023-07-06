import { ChangeEvent, useEffect, useState } from 'react'

import { CopyButton } from './CopyButton'
import { useTranslations } from '../hooks/useTranslations'

type ClipboardProps = {
  clearTextarea: () => void
  compilerText: (ev: ChangeEvent<HTMLTextAreaElement>) => void
  isEncrypt: boolean
  styles: string
}

export function Clipboard({ compilerText, clearTextarea, isEncrypt, styles }: ClipboardProps) {
  const { currentTexts } = useTranslations()
  const { clipboardBtns, errorMessage, message } = currentTexts
  const { copy, erase } = clipboardBtns
  const [viewEraseText, setViewEraseText] = useState(false)

  const changeText = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const message = ev.currentTarget.value
    compilerText(ev)

    if (message && !viewEraseText) setViewEraseText(true)
    if (!message) setViewEraseText(false)
  }

  const clearText = () => {
    clearTextarea()
  }

  useEffect(() => {
    setViewEraseText((prevView: boolean) => !prevView)
  }, [isEncrypt])

  return (
    <div>
      <div className={`rope ${styles}`}></div>
      <textarea
        onChange={changeText}
        cols={30}
        rows={10}
        className='clipboard'
        readOnly={!isEncrypt}
        autoCorrect='off'
        spellCheck='false'
      ></textarea>
      <button
        onClick={clearText}
        className={`clipboard__clearText ${isEncrypt && viewEraseText ? '' : 'hidden'}`}
        aria-label={erase}
      >
        <span>X</span>
      </button>
      <CopyButton errorMessage={errorMessage} message={message} visible={isEncrypt} label={copy} />
    </div>
  )
}
