import { ChangeEvent } from 'react'

import { CopyButton } from './CopyButton'

type ClipboardProps = {
  compilerText: (ev: ChangeEvent<HTMLTextAreaElement>) => void
  errorMessage: string
  isEncrypt: boolean
  message: string
  styles: string
}

export function Clipboard({
  compilerText,
  errorMessage,
  isEncrypt,
  message,
  styles
}: ClipboardProps) {
  return (
    <div>
      <div className={`rope ${styles}`}></div>
      <textarea
        onChange={compilerText}
        cols={30}
        rows={10}
        className='clipboard'
        readOnly={!isEncrypt}
        autoCorrect='off'
        spellCheck='false'
      ></textarea>
      <CopyButton errorMessage={errorMessage} message={message} visible={isEncrypt} />
    </div>
  )
}
