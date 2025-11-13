import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provides routing capabilities */}
    <BrowserRouter>
      {/* Main application component */}
      <App />
      
      {/* For pop-up notifications */}
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>,
)