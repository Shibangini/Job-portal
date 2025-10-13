import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster />
  </React.StrictMode>,
)
