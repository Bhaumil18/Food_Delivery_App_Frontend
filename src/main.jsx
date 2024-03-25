import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { Provider } from "react-redux";
import { Toaster } from './components/ui/sonner'
import Store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <AppRoutes/>
        <Toaster
          richColors
          position="top-left" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
