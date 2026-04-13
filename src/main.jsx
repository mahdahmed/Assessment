import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './components/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastProvider/>
  </StrictMode>,
)
