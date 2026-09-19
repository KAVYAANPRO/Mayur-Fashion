import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.addEventListener('error', (e) => {
  document.body.innerHTML += `<div style="color:red; background:white; padding:20px; position:absolute; top:0; left:0; z-index:9999; font-size:16px;"><b>Error:</b> ${e.message}<br/>${e.filename}:${e.lineno}<br/><pre>${e.error?.stack}</pre></div>`;
});

window.addEventListener('unhandledrejection', (e) => {
  document.body.innerHTML += `<div style="color:red; background:white; padding:20px; position:absolute; top:0; left:0; z-index:9999; font-size:16px;"><b>Unhandled Rejection:</b> ${e.reason?.message || e.reason}<br/><pre>${e.reason?.stack}</pre></div>`;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
