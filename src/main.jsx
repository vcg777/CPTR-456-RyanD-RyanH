import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import App from './App.jsx'
import ReactorView from './components/ReactorView.jsx'
import { SnackbarProvider } from 'notistack'

const howellApiKey = "1126c414c3ab0ef7"
const downsApiKey = "41379ac7c513012b"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "left", vertical: "bottom"}} autoHideDuration={5000}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App apiKey={howellApiKey} />} />
          {/* <Route path='/' element={<App apiKey={downsApiKey} />} /> */}
          <Route path='/:id' element={<ReactorView apiKey={howellApiKey} />} />
          {/* <Route path='/:id' element={<ReactorView apiKey={downsApiKey} />} /> */}
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>,
)
