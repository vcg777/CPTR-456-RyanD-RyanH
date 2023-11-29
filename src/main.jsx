import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import App from './App.jsx'
import ReactorView from './components/ReactorView.jsx'

const howellApiKey = "1126c414c3ab0ef7"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App apiKey={howellApiKey} />} />
        <Route path='/:id' element={<ReactorView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
