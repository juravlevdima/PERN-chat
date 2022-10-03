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
  <Provider store={store}>
    <BrowserRouter>
      <SocketProvider>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </SocketProvider>
    </BrowserRouter>
  </Provider>
)

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
