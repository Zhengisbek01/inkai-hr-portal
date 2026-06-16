import React from 'react'
import ReactDOM from 'react-dom/client'

// @ts-ignore
import * as HrModule from './hr-app.jsx'

// @ts-ignore
const App = HrModule.default || HrModule

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
