import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { Toaster } from 'sonner';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
)
