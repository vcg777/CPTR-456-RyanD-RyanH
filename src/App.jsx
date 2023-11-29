import { useEffect, useState } from 'react'
import './App.css'
import MainArea from "./components/MainArea"
import NameDisplay from "./components/NameDisplay"
import ReactorDisplay from "./components/ReactorDisplay"
import TempDisplay from "./components/TempDisplay"
import ReactorView from './components/ReactorView'


function App(props) {
  const { apiKey } = props
  const [reactors, setReactors] = useState([])
  const [plantName, setPlantName] = useState("")
  const [idsArray, setIdsArray] = useState([])

  useEffect(() => {
    const getReactors = async () => {
      const rawData = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
      const jsonData = await rawData.json()
      setReactors(jsonData.reactors)
    }
    getReactors()
  }, [])

  // setIdsArray(reactors.map(reactor => reactor.id))

  return (
    <main>
      <div className='main-page top-row'>
        <ReactorDisplay />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay />
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
        <ReactorDisplay />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay />
      </div>
    </main>
  )
}

export default App
