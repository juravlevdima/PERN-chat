import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

import SocketProvider from './socket/SocketProvider'
import ThemeProvider from './components/Providers/ThemeProvider'

import './style/tailwind.css'
import './style/style.scss'
import './style/scrollbar.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <SocketProvider>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </SocketProvider>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
