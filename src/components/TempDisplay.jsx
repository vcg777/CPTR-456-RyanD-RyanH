import { Typography } from "@mui/material"
import { useState, useEffect } from "react"

const TempDisplay = (props) => {
    const { id, apiKey } = props
    const [tempData, setTempData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getTempInfo = async () => {
            const rawTemp = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${id}?apiKey=${apiKey}`)
            const jsonTemp = await rawTemp.json()
            setTempData(jsonTemp.temperature)
            setLoading(false)
        }
        getTempInfo()

        const dataInterval = setInterval(getTempInfo, 500)

        return () => {
            clearInterval(dataInterval)
        }
    }, [])

    return (
        <>
            {!loading && (
                <div className="temp-display">
                    <Typography
                        variant="h6"
                        sx={{
                            textDecoration: "underline",
                        }}
                    >
                        Temperature
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#bfd7ea"
                        }}
                    >
                        {tempData.amount.toFixed(2)}
                        {tempData.unit === "celsius" ? "°C" : " K"}
                    </Typography>
                </div>
            )}
        </>
    )
}

export default TempDisplay