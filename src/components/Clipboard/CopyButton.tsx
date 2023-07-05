import { MouseEvent, ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type CopyButtonProps = {
  errorMessage: string
  message: string
  visible: boolean
}

export function CopyButton({ errorMessage, message, visible }: CopyButtonProps) {
  const [popupMessage, setPopupMessage] = useState<ReactNode | null>(null)
  const isVisibleMessage = useRef(false)

  const copyText = (ev: MouseEvent<HTMLButtonElement>) => {
    const btn = ev.currentTarget

    const textarea = btn.closest('div')?.querySelector('textarea')

    if (textarea instanceof HTMLTextAreaElement) {
      const text = textarea.value

      navigator.clipboard
        .writeText(text)
        .then(() => {
          if (isVisibleMessage.current || text === '') return

          const popupP = document.createElement('p')
          popupP.innerText = message

          setPopupMessage((<p>{message}</p>) as unknown as ReactNode)

          setTimeout(() => {
            setPopupMessage(<span>{message}</span>)
            setTimeout(() => setPopupMessage(null), 300)

            isVisibleMessage.current = false
          }, 1500)

          isVisibleMessage.current = true
        })
        .catch(() => {
          setTimeout(() => {
            setPopupMessage(<span>{errorMessage}</span>)
            setTimeout(() => setPopupMessage(null), 300)

            isVisibleMessage.current = false
          }, 1500)
        })
    }
  }

  return (
    <>
      <button
        className={`clipboard__copy ${visible ? 'hidden' : ''}`}
        onClick={copyText}
        aria-describedby='cryptText'
      >
        <svg
          aria-hidden='true'
          enableBackground='new 0 0 24 24'
          focusable='false'
          height='24'
          viewBox='0 0 24 24'
          width='24'
        >
          <g>
            <rect fill='none' height='24' width='24'></rect>
          </g>
          <g>
            <path
              fill='#dab086'
              d='M16,20H5V6H3v14c0,1.1,0.9,2,2,2h11V20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9 C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z'
            ></path>
          </g>
        </svg>
      </button>
      {popupMessage
        ? createPortal(popupMessage, document.getElementById('messagePortal') as HTMLElement)
        : null}
    </>
  )
}
