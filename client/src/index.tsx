import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

import './style/tailwind.css'
import './style/style.scss'
import SocketProvider from './socket/SocketProvider'
import ThemeProvider from './components/Providers/ThemeProvider'

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
