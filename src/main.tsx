import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TranslationsProvider } from './context/TranslationsCtx'

import App from './App'

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <StrictMode>
    <TranslationsProvider>
      <App />
    </TranslationsProvider>
  </StrictMode>
)
