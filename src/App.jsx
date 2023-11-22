import { useState } from 'react'
import './App.css'
import MainArea from "./components/MainArea"
import NameDisplay from "./components/NameDisplay"
import ReactorDisplay from "./components/ReactorDisplay"
import TempDisplay from "./components/TempDisplay"

function App() {

  return (
    <main>
      <div className='first'>
        <ReactorDisplay />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay />
      </div>
      <div className='second'>
        <div className='names'>
          <NameDisplay />
          <NameDisplay />
        </div>
        <MainArea />
        <div className='names'>
          <NameDisplay />
          <NameDisplay />
        </div>
      </div>
      <div className='third'>
        <ReactorDisplay />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay />
      </div>
    </main>
  )
}

export default App
