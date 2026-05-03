// main.jsx
// ─────────────────────────────────────────────
// React entry point. Mounts the <App /> component
// into the #root div defined in index.html.
// ─────────────────────────────────────────────
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
