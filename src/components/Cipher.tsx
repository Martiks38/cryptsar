import { useState } from 'react'

type CipherProps = {
  exchange: string[]
  labelButton: string[]
}

export function Cipher({ exchange }: CipherProps) {
  const [titleOriginal, titleEncrypt] = exchange
  const [isEncrypt, setIsEncrypt] = useState(true)

  const changeAction = () => {
    const clipboards = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.clipboard'))

    setIsEncrypt((prevAction) => !prevAction)

    const clipboard = clipboards[isEncrypt ? 1 : 0]

    if (clipboard instanceof HTMLTextAreaElement) clipboard.focus()
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
          <textarea cols={30} rows={10} className='clipboard'></textarea>
        </div>
        <div>
          <div className={`rope rope__bottom ${isEncrypt ? '' : 'rope_reverse'}`}></div>
          <textarea cols={30} rows={10} className='clipboard'></textarea>
        </div>
      </div>
    </section>
  )
}
