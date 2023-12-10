import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import standIn from "../images/stand-in.jpg"
import TempDisplay from "./TempDisplay"
import { Typography } from "@mui/material"

const ReactorDisplay = (props) => {
    const { id, apiKey } = props
    const navigate = useNavigate()
    const [reactorInfo, setReactorInfo] = useState({})

    useEffect(() => {
        const getReactorInfo = async () => {
            const rawTemp = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${id}?apiKey=${apiKey}`)
            const jsonTemp = await rawTemp.json()

            const rawNames = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
            const jsonNames = await rawNames.json()
            const reactorName = jsonNames.reactors.map(reactor => reactor).filter((value) => value.id === id)[0].name
        
            setReactorInfo({
                ...reactorInfo,
                name: reactorName,
                temperature: jsonTemp.temperature
            })

        }
        getReactorInfo()

        const dataInterval = setInterval(getReactorInfo, 500)

        return () => {
            clearInterval(dataInterval)
        }
    }, [])

    return (
        <button className="reactor-display" onClick={() => navigate(`${id}`)}>
            <div>
                <img src={standIn} />
            </div>
            <div className="reactor-info">
                <TempDisplay id={id} apiKey={apiKey} />
                <Typography variant="h4">{reactorInfo.name}</Typography>
            </div>
        </button>
    )
}

export default ReactorDisplay