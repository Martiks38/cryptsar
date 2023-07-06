import { ChangeEvent, useState } from 'react'

import { CopyButton } from './CopyButton'
import { useTranslations } from '../hooks/useTranslations'

type ClipboardProps = {
  clearTextarea: () => void
  compilerText: (ev: ChangeEvent<HTMLTextAreaElement>) => void
  isEncrypt: boolean
  styles: string
}

export function Clipboard({ compilerText, clearTextarea, isEncrypt, styles }: ClipboardProps) {
  const [text, setText] = useState('')
  const { currentTexts } = useTranslations()
  const { clipboardBtns, errorMessage, message } = currentTexts
  const { copy, erase } = clipboardBtns

  const changeText = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setText(ev.currentTarget.value)
    compilerText(ev)
  }

  const clearText = () => {
    setText('')
    clearTextarea()
  }

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
        value={text}
      ></textarea>
      <button
        onClick={clearText}
        className={`clipboard__clearText ${isEncrypt && text ? '' : 'hidden'}`}
        aria-label={erase}
      >
        <span>X</span>
      </button>
      <CopyButton errorMessage={errorMessage} message={message} visible={isEncrypt} label={copy} />
    </div>
  )
}
