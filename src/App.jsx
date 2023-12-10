import { useEffect, useState } from 'react'
import './App.css'
import MainArea from "./components/MainArea"
import ReactorDisplay from "./components/ReactorDisplay"
import { useSnackbar } from 'notistack'


function App(props) {
  const { apiKey } = props
  const [reactors, setReactors] = useState([])
  const { enqueueSnackbar } = useSnackbar()


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

      
    }

    const getTemperatures = async () => {
      for (let i = 0; i < length(reactors); i++) {
        const reactorTempRaw = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${reactors[i].id}?apiKey=${apiKey}`)
        const reactorTempJson = await reactorTempRaw.json()
        setReactors({
          ...reactors,
        })

      }
    }

    getReactors()

    const dataInterval = setInterval(getReactors, 500)

    return () => {
      clearInterval(dataInterval)
    }

  }, [])

  return (
    <main>
      <MainArea
        reactors={reactors}
        apiKey={apiKey}
        setReactors={setReactors}
      />

      {reactors.map(reactor => {
        return <ReactorDisplay key={reactor.id} id={reactor.id} apiKey={apiKey} />
      })}
    </main>
  )
}

export default App
