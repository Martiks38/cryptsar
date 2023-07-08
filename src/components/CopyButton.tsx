import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type CopyButtonProps = {
  errorMessage: string
  label: string
  message: string
  visible: boolean
}

export function CopyButton({ errorMessage, label, message, visible }: CopyButtonProps) {
  const [popupMessage, setPopupMessage] = useState<ReactNode | null>(null)
  const isVisibleMessage = useRef(false)
  const closePopup = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (closePopup.current) clearTimeout(closePopup.current)
    }
  }, [])

  const visiblePopup = (msg: string) => {
    return window.setTimeout(() => {
      setPopupMessage(<span>{msg}</span>)
      closePopup.current = window.setTimeout(() => setPopupMessage(null), 300)
      isVisibleMessage.current = false

      const messagePortal = document.querySelector('.messagePortal')
      if (messagePortal instanceof HTMLDivElement) messagePortal.classList.toggle('visible')
    }, 1500)
  }

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

          closePopup.current = visiblePopup(message)

          isVisibleMessage.current = true

          const messagePortal = document.querySelector('.messagePortal')
          if (messagePortal instanceof HTMLDivElement) {
            messagePortal.classList.toggle('visible')
          }
        })
        .catch(() => {
          setPopupMessage(<p>{errorMessage}</p>)

          closePopup.current = visiblePopup(message)
          const messagePortal = document.querySelector('.messagePortal')
          if (messagePortal instanceof HTMLDivElement) {
            messagePortal.classList.toggle('visible')
          }
        })
    }
  }

  return (
    <>
      <button
        className={`clipboard__copy ${visible ? '' : 'hidden'}`}
        onClick={copyText}
        aria-describedby='cryptText'
        aria-label={label}
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
        ? createPortal(popupMessage, document.querySelector('.messagePortal') as HTMLElement)
        : null}
    </>
  )
}
