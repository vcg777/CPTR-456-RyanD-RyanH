import { useEffect, useState } from 'react'
import './App.css'
import MainArea from "./components/MainArea"
import ReactorDisplay from "./components/ReactorDisplay"
import { useSnackbar } from 'notistack'


function App(props) {
  const { apiKey } = props
  const [reactors, setReactors] = useState([])
  const [logs, setLogs] = useState({})
  // const { enqueueSnackbar } = useSnackbar()


  // const addMessage = () => {
  //   enqueueSnackbar("This is a good message", { variant: "success"})
  // }

  // const addBadMessage = () => {
  //   enqueueSnackbar("This is a bad message", { variant: "error"})
  // }

  // const addInfoMessage = () => {
  //   enqueueSnackbar("This is an info message", { variant: "info"})
  // }

  useEffect(() => {
    const getReactors = async () => {
      const reactorRaw = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
      const jsonReactor = await reactorRaw.json()
      setReactors(jsonReactor.reactors)

      const logsRaw = await fetch(`https://nuclear.dacoder.io/reactors/logs?apiKey=${apiKey}`)
      const jsonLogs = await logsRaw.json()
      setLogs(jsonLogs.dynamic_id)
    }

    const getTemperatures = async() => {
      for (let i = 0; i < length(reactors); i++){
        const reactorTempRaw = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${reactors[i].id}?apiKey=${apiKey}`)
        const reactorTempJson = await reactorTempRaw.json()
        setReactors({
          ...reactors,
        })

      }
    }

    getReactors()

  }, [])

  const ids = reactors.map(reactor => reactor.id)

  return (
    <main>
        <MainArea reactors={reactors} apiKey={apiKey} />
        <ReactorDisplay id={ids[0]} />
        <ReactorDisplay id={ids[1]} />
        <ReactorDisplay id={ids[2]} />
        <ReactorDisplay id={ids[3]} />
        {/* {reactors.map(reactor => {
          <ReactorDisplay id={reactor.id} />
        })} */}
    </main>
  )
}

export default App
