import { useEffect, useState } from 'react'
import './App.css'
import MainArea from "./components/MainArea"
import ReactorDisplay from "./components/ReactorDisplay"
import { useSnackbar } from 'notistack'
import ReactorView from './components/ReactorView'


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

    getReactors()

  }, [])


  return (
    <main>
        <MainArea />
        {reactors && reactors.map(reactor => {
          <ReactorView id={reactor.id} />
        })}
    </main>
  )
}

export default App
