import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './store/contextApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextApi> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ContextApi>
  </React.StrictMode>,
)
