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
  const [logs, setLogs] = useState([])


  useEffect(() => {
    const getReactors = async () => {
      const reactorRaw = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
      const jsonReactor = await reactorRaw.json()
      setReactors(jsonReactor.reactors)

      const logsRaw = await fetch(`https://nuclear.dacoder.io/reactors/logs?apiKey=${apiKey}`)
      const jsonLogs = await logsRaw.json()
      setLogs(jsonLogs.dynamic_id)
    }

    getReactors()

    setIdsArray(reactors.map(reactor => reactor.id))

  }, [])


  return (
    <main>
      <div className='main-page top-row'>
        <ReactorDisplay id={idsArray[0]} />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay id={idsArray[1]} />
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
        <ReactorDisplay id={idsArray[2]} />
        <TempDisplay />
        <TempDisplay />
        <ReactorDisplay id={idsArray[3]} />
      </div>
    </main>
  )
}

export default App
