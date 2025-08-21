'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ThemeProvider } from './components/theme-provider'


export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  )
}
