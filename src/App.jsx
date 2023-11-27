import { useState } from 'react'
import './App.css'
import MainArea from "./components/MainArea"
import NameDisplay from "./components/NameDisplay"
import ReactorDisplay from "./components/ReactorDisplay"
import TempDisplay from "./components/TempDisplay"
import ReactorView from './components/ReactorView'


function App() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)



  return (
    <main>
      <div className='main-page top-row'>
        <ReactorDisplay
          handleOpen={handleOpen}
        />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay
          handleOpen={handleOpen}
        />
      </div>
      <div className='main-page middle-row'>
        <div className='main-page names'>
          <NameDisplay />
          <div className='h-line'></div>
          <NameDisplay />
        </div>
        <MainArea />
        <div className='main-page names'>
          <NameDisplay />
          <div className='h-line'></div>
          <NameDisplay />
        </div>
      </div>
      <div className='main-page bottom-row'>
        <ReactorDisplay
          handleOpen={handleOpen}
        />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay
          handleOpen={handleOpen}
        />
      </div>
      <ReactorView
        open={open}
        handleClose={handleClose}
      />
    </main>
  )
}

export default App
