import React from 'react'
import ReactDOM from 'react-dom/client'

// @ts-ignore
import App from './hr-app.jsx'

const root = document.getElementById('root')!

ReactDOM.createRoot(root).render(
  React.createElement(App)
)
