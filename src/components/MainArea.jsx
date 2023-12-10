import { Box, Button, TextField, ToggleButton, Typography } from "@mui/material"
import { Chart } from "chart.js/auto"
import { useState, useRef, useEffect, useMemo } from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";

const theme = createTheme({
    palette: {
        info: {
            main: '#cacaca',
        },
    },
});


const MainArea = (props) => {
    const { reactors, apiKey, setReactors } = props
    const canvasRef = useRef(null)
    const [pastTemps, setPastTemps] = useState([])
    const [cooling, setCooling] = useState(false)
    const [edit, setEdit] = useState(false)
    const [celsius, setCelsius] = useState(true)
    const [reactorsInfo, setReactorsInfo] = useState({}) //Stores general info about the reactors
    const [loading, setLoading] = useState(true)
    const [avgTemps, setAvgTemps] = useState([]) //Stores the average temps for the chart
    const [tempPlantName, setTempPlantName] = useState("")
    const { enqueueSnackbar } = useSnackbar()

    const addMessage = () => {
        enqueueSnackbar("This is a good message", { variant: "success" })
    }

    useEffect(() => {
        const chart = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels: avgTemps.map((_, index) => index),
                datasets: [{
                    label: "Temperature (°C)",
                    data: avgTemps,
                    borderWidth: 2,
                }]
            },
            options: {
                animation: false,
            }
        })

        return () => {
            chart.destroy()
        }
    }, [avgTemps])



    useEffect(() => {
        const getReactorInfo = async () => {
            const rawTitle = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
            const jsonTitle = await rawTitle.json()

            const reactorsTemps = await Promise.all(reactors.map(async (reactor) => {
                const rawTemp = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${reactor.id}?apiKey=${apiKey}`)
                const jsonTemp = await rawTemp.json()
                return jsonTemp.temperature
            }))

            const reactorsOutputs = await Promise.all(reactors.map(async (reactor) => {
                const rawOutput = await fetch(`https://nuclear.dacoder.io/reactors/output/${reactor.id}?apiKey=${apiKey}`)
                const jsonOutput = await rawOutput.json()
                return jsonOutput
            }))
            setLoading(false)

            // if (!loading) {
            const totalTemp = reactorsTemps.reduce((accumulator, temp) => -(-accumulator - temp.amount), 0)
            const avgTemp = (totalTemp / reactorsTemps.length).toFixed(2)
            const totalOutputMW = reactorsOutputs.reduce((accumulator, outputData) => accumulator + outputData.output.amount, 0)
            const totalOutputGW = (totalOutputMW / 1000).toFixed(3)

            // const rawCoolant = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=${apiKey}`)
            // const jsonCoolant = await rawCoolant.json()
            setReactorsInfo({
                ...reactorsInfo,
                plantName: jsonTitle.plant_name,
                avgTemp: avgTemp,
                totalOutput: totalOutputGW
            })

            let newAvgTemps = avgTemps
            newAvgTemps.push(avgTemp)
            setAvgTemps(newAvgTemps.slice(-201))

            // if (!edit) {
            //     console.log("agggagagagag")
            //     setTempPlantName(reactorsInfo.plantName)
            // }
        }
        getReactorInfo()

        const dataInterval = setInterval(getReactorInfo, 500)

        return () => {
            clearInterval(dataInterval)
        }

    }, [reactors])


    const killAll = async () => {
        await Promise.all(reactors.map(async (reactor) => {
            const killMessage = await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${reactor.id}?apiKey=${apiKey}`, {
                method: "POST"
            })
            const response = killMessage.json()
            killMessage.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`${reactor.name} died a tragic death`, { variant: "success" })
        }))
    }

    const coolAll = async () => {
        await Promise.all(reactors.map(async (reactor) => {
            const coolMessage = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=${apiKey}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coolant: cooling ? "off" : "on"
                })
            })
            const response = coolMessage.json()
            coolMessage.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`${reactor.name} is ${!cooling ? "chilling out" : "fired up"}`, { variant: "success" })
        }))
        setCooling(prevCooling => !prevCooling)
    }

    const sleepAll = async () => {
        await Promise.all(reactors.map(async (reactor) => {
            const sleepMessage = await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${reactor.id}?apiKey=${apiKey}`, {
                method: "POST"
            })
            const response = sleepMessage.json()
            sleepMessage.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`${reactor.name} is out to lunch`, { variant: "success" })
        }))
    }

    const reset = async () => {
        const resetMessage = await fetch(`https://nuclear.dacoder.io/reactors/reset?apiKey=${apiKey}`, {
            method: "POST"
        })
        setReactors([])
        const response = resetMessage.json()
        resetMessage.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("Have another go", { variant: "success" })
    }

    const handlePlantNameChange = async () => {
        if (edit) {
            const nameChange = await fetch(`https://nuclear.dacoder.io/reactors/plant-name?apiKey=${apiKey}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: tempPlantName
                })
            })
            const response = nameChange.json()
            nameChange.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`The plant is now named ${tempPlantName}`, { variant: "success" })
        }
        setTempPlantName(reactorsInfo.plantName)
    }

    const updatePlantName = (event) => {
        setTempPlantName(event.target.value)
    }

    // const debouncedChangeHandler = useMemo(
    //     () => debounce(handlePlantNameChange, 300)
    //     , [])

    // useEffect(() => {
    //     return () => {
    //         debouncedChangeHandler.cancel();
    //     }
    // }, [])
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100vw",
                borderBottom: 1,
                padding: "10px",
                alignItems: "center",
            }}>
                <Box sx={{
                    // border: 1,
                    // borderColor: "orange",
                    display: "flex",
                    height: "16vh",
                    width: "100vw",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}>
                    <div className="totals-area">
                        <Typography variant="h6" sx={{ textDecoration: "underline", fontSize: 15 }}>Avg. Temp</Typography>
                        <Typography variant="h4" sx={{ color: "#bfd7ea", fontSize: 25 }}>
                            {reactorsInfo.avgTemp}
                            {celsius ? "°C" : "K"}
                        </Typography>
                    </div>
                    {!edit && (
                        <Typography variant="h6" sx={{
                            width: "20vw",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {reactorsInfo.plantName}
                        </Typography>

                    )}
                    {edit && (
                        <TextField
                            style={{
                                width: "20vw",
                                borderRadius: "5px",
                            }}
                            color="info"
                            inputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            label={reactorsInfo.plantName}
                            value={tempPlantName}
                            onChange={updatePlantName}
                        />
                    )}
                    <div className="totals-area">
                        <Typography variant="h6" sx={{ textDecoration: "underline", fontSize: 15 }}>Total Output</Typography>
                        <Typography variant="h4" sx={{ fontSize: 25 }}>{reactorsInfo.totalOutput} GW</Typography>
                    </div>

                </Box>
                <Box sx={{
                    // backgroundColor: "orange",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}>
                    <Box sx={{
                        // border: 1,
                        // borderColor: "green",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5vh",
                        justifyContent: "space-around",
                        width: "80vw",
                    }}>
                        <div className="main-buttons">
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "150px",
                                    fontSize: 15,
                                    backgroundColor: "#ff6663",
                                    color: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "#ff3531"
                                    }
                                }
                                ]}
                                onClick={killAll}
                            >
                                KILL
                            </Button>
                            <ToggleButton
                                value="check"
                                selected={cooling}
                                onChange={coolAll}
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "150px",
                                    fontSize: 15,
                                    backgroundColor: "#bfd7ea",
                                    color: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "#0b3954",
                                        color: "#fefffe",
                                    }
                                }
                                ]}
                            >
                                COOL
                            </ToggleButton>
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "150px",
                                    fontSize: 15,
                                    backgroundColor: "#e0ff4f",
                                    color: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "#fffb00"
                                    }
                                }
                                ]}
                                onClick={sleepAll}
                            >
                                SLEEP
                            </Button>
                        </div>
                        <div className="main-buttons">
                            {/* <Button sx={[{
                                height: "6vh",
                                width: "150px",
                                backgroundColor: "#0b3954",
                                color: "#fefffe",
                                borderRadius: "15px",
                                border: 4,
                                borderColor: "#a5a5a5",
                            },
                            {
                                '&:hover': {
                                    backgroundColor: "#16567b"
                                }
                            }]}
                                variant="contained"
                                onClick={() => {
                                    setSeeSysLogs(prevSeeSysLogs => !prevSeeSysLogs)
                                }}
                            >
                                SYSTEM LOGS
                            </Button> */}
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "150px",
                                    fontSize: 15,
                                    backgroundColor: "#1b1212",
                                    color: "#fefffe",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "#2d2d2d"
                                    }
                                }
                                ]}
                                onClick={reset}
                            >
                                RESET
                            </Button>
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "150px",
                                    fontSize: 15,
                                    backgroundColor: "#29b6f6",
                                    color: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "#4fc3f7"
                                    }
                                }
                                ]}
                                onClick={() => {
                                    setEdit(prevEdit => !prevEdit)
                                    handlePlantNameChange()
                                }}
                            >
                                EDIT
                            </Button>
                        </div>
                    </Box>
                </Box>
                <Box sx={{
                    height: "30vh",
                    width: "40vw",
                    margin: "40px 0 30px",
                    backgroundColor: "white",
                }}>
                    <canvas ref={canvasRef}></canvas>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default MainArea