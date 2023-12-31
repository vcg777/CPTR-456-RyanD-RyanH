import * as React from 'react'
import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, Box, Button, IconButton, Typography, MenuItem, Select } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EditRounded, LocalGasStationRounded } from '@mui/icons-material';
import { useEffect } from 'react'
import SystemLogs from "./SystemLogs"
import { Chart } from "chart.js/auto"


import standIn from "../images/stand-in.jpg"
import { enqueueSnackbar } from 'notistack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#242424',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const theme = createTheme({
    palette: {
        info: {
            main: '#cacaca',
        },
    },
});


export default function ReactorView(props) {
    const { apiKey } = props
    const { id } = useParams()
    const [reactorInfo, setReactorInfo] = useState({})
    const [tempColor, setTempColor] = useState("")
    const [loading, setLoading] = useState(true)
    const [logs, setLogs] = useState({})
    const [seeSysLogs, setSeeSysLogs] = useState(false)
    const canvasRef = useRef(null)
    const [outputData, setOutputData] = useState([])
    const [edit, setEdit] = useState(false)
    const [tempReactorName, setTempReactorName] = useState("New Name")


    useEffect(() => {
        const getReactorInfo = async () => {
            // const id = "789fa846-1c22-4499-8ccf-ae3300772b61"
            const rawTemp = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${id}?apiKey=${apiKey}`)
            const rawCoolant = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${id}?apiKey=${apiKey}`)
            const rawOutput = await fetch(`https://nuclear.dacoder.io/reactors/output/${id}?apiKey=${apiKey}`)
            const rawFuelLevel = await fetch(`https://nuclear.dacoder.io/reactors/fuel-level/${id}?apiKey=${apiKey}`)
            const rawReactorState = await fetch(`https://nuclear.dacoder.io/reactors/reactor-state/${id}?apiKey=${apiKey}`)
            const rawRodState = await fetch(`https://nuclear.dacoder.io/reactors/rod-state/${id}?apiKey=${apiKey}`)
            const jsonTemp = await rawTemp.json()
            const jsonCoolant = await rawCoolant.json()
            const jsonOutput = await rawOutput.json()
            const jsonFuelLevel = await rawFuelLevel.json()
            const jsonReactorState = await rawReactorState.json()
            const jsonRodState = await rawRodState.json()

            const rawNames = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
            const jsonNames = await rawNames.json()
            const reactorName = jsonNames.reactors.map(reactor => reactor).filter((value) => value.id === id)[0].name

            setReactorInfo({
                ...reactorInfo,
                name: reactorName,
                temperature: jsonTemp.temperature,
                coolant: jsonCoolant.coolant,
                output: jsonOutput.output,
                fuelLevel: jsonFuelLevel.fuel,
                reactorState: jsonReactorState.state,
                rodState: jsonRodState.control_rods,
            })
            let newData = outputData
            newData.push(jsonTemp.temperature.amount)
            setOutputData(newData.slice(-601))

            const logsRaw = await fetch(`https://nuclear.dacoder.io/reactors/logs?apiKey=${apiKey}`)
            const jsonLogs = await logsRaw.json()
            setLogs(jsonLogs)

            setLoading(false)
        }
        getReactorInfo()

        const dataInterval = setInterval(getReactorInfo, 500)

        return () => {
            clearInterval(dataInterval)
        }

    }, [])


    useEffect(() => {
        const chart = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels: outputData.map((datum, index) => index),
                datasets: [{
                    label: "Temperature",
                    data: outputData,
                    borderWidth: 2,
                },]
            },
            options: {
                animation: false,
            }
        })

        return () => {
            chart.destroy()
        }
    }, [reactorInfo])

    // useEffect(() => {
    //     setTempColor(() => {
    //         if (reactorInfo.temperature.status === "Safe") {
    //             return "success.main"
    //         } else if (reactorInfo.temperature.status === "Warning") {
    //             return "warning.main"
    //         } else if (reactorInfo.temperature.status === "Danger") {
    //             return "error.dark"
    //         } else {
    //             return "secondary.main"
    //         }
    //     })
    // }, [reactorInfo.temperature])

    const changeCoolantState = async () => {
        const changeCoolantState = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${id}?apiKey=${apiKey}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                coolant: reactorInfo.coolant === "on" ? "off" : "on"
            })
        })
        const response = changeCoolantState.json()
        changeCoolantState.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`Coolant is now ${reactorInfo.coolant === "on" ? "off" : "on"}`, { variant: "success" })
    }

    const dropRod = async () => {
        const dropRod = await fetch(`https://nuclear.dacoder.io/reactors/drop-rod/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        const response = dropRod.json()
        dropRod.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`Rod down`, { variant: "success" })
    }

    const raiseRod = async () => {
        const raiseRod = await fetch(`https://nuclear.dacoder.io/reactors/raise-rod/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        const response = raiseRod.json()
        raiseRod.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("Rod up", { variant: "success" })
    }

    const emergencyShutdown = async () => {
        const emergencyShutdown = await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        const response = emergencyShutdown.json()
        emergencyShutdown.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("DIE DIE DIE DIE", { variant: "success" })
    }

    const controlledShutdown = async () => {
        const controlledShutdown = await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        const response = controlledShutdown.json()
        controlledShutdown.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("GoToSleep GoToSleep GoToSleep", { variant: "success" })
    }

    const maintenance = async () => {
        const maintenance = await fetch(`https://nuclear.dacoder.io/reactors/maintenance/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        const response = maintenance.json()
        maintenance.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("Under repair", { variant: "success" })
    }

    const refuel = async () => {
        maintenance()
        const refuel = await fetch(`https://nuclear.dacoder.io/reactors/refuel/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        maintenance
        const response = refuel.json()
        refuel.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("Guzzling that go-go juice", { variant: "success" })
    }

    const changeStatus = (event) => {
        console.log(event.target)
        const value = event.target.value
        if (value === "Active") {
            startReactor()
        } else if (value === "Offline") {
            controlledShutdown()
        } else if (value === "Maintenance") {
            maintenance()
        } else {
            controlledShutdown()
        }
        // console.log(value)
        // setReactorInfo(prevReactorInfo => {
        //     return ({
        //         ...prevReactorInfo,
        //         reactorState: value
        //     })
        // })
        // console.log(reactorInfo.reactorState)
    }

    const startReactor = async () => {
        const startReactor = await fetch(`https://nuclear.dacoder.io/reactors/start-reactor/${id}?apiKey=${apiKey}`, {
            method: "POST"
        })
        const response = startReactor.json()
        startReactor.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar("Hello. Who am I? What is my purpose?", { variant: "success" })
    }

    const handleReactorNameChange = async () => {
        if (edit) {
            const nameChange = await fetch(`https://nuclear.dacoder.io/reactors/set-reactor-name/${id}?apiKey=${apiKey}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: tempReactorName
                })
            })
            const response = nameChange.json()
            nameChange.status === 400 ? response.message.map(item => enqueueSnackbar(item, { variant: "error" })) : enqueueSnackbar(`This reactor's name is now ${tempReactorName}`, { variant: "success" })
        }
        setTempReactorName(reactorInfo.reactorName)
    }

    return (
        <>
            {!loading && (
                <ThemeProvider theme={theme}>
                    <Box sx={{
                        width: "100vw",
                        height: "fit-content",
                        bgcolor: '#242424',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    className="reactor-sections"
                    >
                        <div className='reactor-page reactor-top'>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100vw",
                                height: "40vh",
                            }}
                            className="name-pic-state"
                            >
                                <div className='name-area'>
                                    <div className='spacer'></div>
                                    {!edit && <Typography variant='h5' sx={{ padding: 1 }}>{reactorInfo.name}</Typography>}
                                    {edit && <TextField
                                        color="info"
                                        inputProps={{
                                            style: {
                                                color: "white",
                                            }
                                        }}
                                        label={reactorInfo.name}
                                        value={tempReactorName}
                                        onChange={() => setTempReactorName(event.target.value)}
                                    />
                                    }
                                    <IconButton
                                        onClick={() => {
                                            setEdit(prevEdit => !prevEdit)
                                            handleReactorNameChange()
                                        }}
                                        sx={[{
                                            height: "4vh",
                                            borderRadius: "11px",
                                            width: "3vw",
                                            color: "info.light",
                                        },
                                        {
                                            '&:hover': {
                                                backgroundColor: "info.main",
                                                color: "#1b1212",
                                            }
                                        }
                                        ]}
                                    >
                                        <EditRounded />
                                    </IconButton>
                                </div>
                                <img src={standIn} />
                                <Select
                                    value={reactorInfo.reactorState}
                                    onChange={changeStatus}
                                    label="Status"
                                    sx={[{
                                        backgroundColor: "info.light"
                                    }
                                    ]}
                                    displayEmpty
                                    renderValue={() => reactorInfo.reactorState}
                                >
                                    <MenuItem value="Active">Active </MenuItem>
                                    <MenuItem value="Offline">Offline</MenuItem>
                                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                                </Select>
                            </Box>
                            <Button sx={[{
                                height: "65px",
                                width: "290px",
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
                            </Button>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100vw",
                                height: "40vh",
                            }}>
                                {/* <canvas ref={canvasRef}></canvas> */}
                                <div className='canvas-understudy'>
                                    <canvas ref={canvasRef}></canvas>
                                </div> {/* This is representing the graph for styling purposes */}
                                <div className='output-words'>
                                    <Typography variant='h5'>OUTPUT:</Typography>
                                    <Typography variant='h4'>{reactorInfo.output.amount.toFixed(2)}</Typography>
                                    <Typography variant='h5'>MW</Typography>
                                </div>

                            </Box>
                        </div>
                        <div className='reactor-page reactor-bottom'>
                            <Box sx={{
                                height: "55vh",
                                width: "100vw",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}>
                                <Typography variant='h5'>Control Panel</Typography>
                                <div className='control-buttons'>
                                    <div>
                                    <Typography variant="Body1">Cooling: </Typography>
                                    <Button
                                        // value="check"
                                        // selected={reactorInfo.coolant === "on"}
                                        onClick={changeCoolantState}
                                        disabled={!(reactorInfo.reactorState === "Active")}
                                        // backgroundColor="White"
                                        sx={[{
                                            // color={value === "check" ? "success" : "disabled"}
                                            height: "6vh",
                                            borderRadius: "15px",
                                            width: "75px",
                                            fontSize: 13,
                                            backgroundColor: "#0b3954",
                                            color: "#fefffe",
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
                                        {reactorInfo.coolant}
                                    </Button>
                                    </div>
                                    <IconButton
                                        sx={[{
                                            height: "6vh",
                                            borderRadius: "15px",
                                            width: "75px",
                                            fontSize: 13,
                                            backgroundColor: "warning.light",
                                            color: "#1b1212",
                                            border: 4,
                                            borderColor: "#a5a5a5",
                                        },
                                        {
                                            '&:hover': {
                                                backgroundColor: "warning.main"
                                            }
                                        }
                                        ]}
                                        onClick={refuel}
                                    >
                                        <LocalGasStationRounded />
                                    </IconButton>
                                </div>
                                <Button
                                    sx={[{
                                        height: "10vh",
                                        borderRadius: "15px",
                                        width: "30vw",
                                        fontSize: 13,
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
                                    onClick={controlledShutdown}
                                >
                                    SLEEP
                                </Button>
                                <Button
                                    sx={[{
                                        height: "10vh",
                                        borderRadius: "15px",
                                        width: "30vw",
                                        fontSize: 13,
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
                                    onClick={emergencyShutdown}
                                >
                                    KILL
                                </Button>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100vw",
                                height: "55vh",
                                borderLeft: "1px solid #fefffe",

                            }}
                            className="right-side"
                            >
                                <Typography variant='h5'>Temperature</Typography>
                                <div className='temp-data'>
                                    <Typography variant='h4' sx={{ color: "#bfd7ea" }}>
                                        {reactorInfo.temperature.amount.toFixed(2)}
                                        {reactorInfo.temperature.unit === "celsius" ? "°C" : "K"}
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            color: tempColor
                                        }}
                                    >
                                        {reactorInfo.temperature.status.toUpperCase()}
                                    </Typography>
                                </div>
                                <Typography variant='h5' sx={{ marginTop: 5 }}>Rods</Typography>
                                <div className='rods-data'>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: 'column',
                                        alignItems: "center",
                                        gap: 3,
                                    }}>
                                        <Typography variant='h5'>Inserted</Typography>
                                        <Typography variant='h4'>{reactorInfo.rodState.in}</Typography>
                                        <Button sx={[{
                                            height: "6vh",
                                            width: "7vw",
                                            borderRadius: "15px",
                                            fontSize: 13,
                                            backgroundColor: "info.main",
                                            color: "#1b1212",
                                        },
                                        {
                                            '&:hover': {
                                                color: "info.light",
                                            }
                                        }
                                        ]}
                                            onClick={dropRod}
                                        >
                                            Insert
                                        </Button>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: 'column',
                                        alignItems: "center",
                                        gap: 3,
                                    }}>
                                        <Typography variant='h5'>Removed</Typography>
                                        <Typography variant='h4'>{reactorInfo.rodState.out}</Typography>
                                        <Button sx={[{
                                            height: "6vh",
                                            width: "7vw",
                                            borderRadius: "15px",
                                            fontSize: 13,
                                            backgroundColor: "info.main",
                                            color: "#1b1212",

                                        },
                                        {
                                            '&:hover': {
                                                color: "info.light",
                                            }
                                        }
                                        ]}
                                            onClick={raiseRod}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </div>
                            </Box>
                        </div>
                    </Box >
                    {seeSysLogs && (
                        <SystemLogs key={id} id={id} logs={logs} />
                    )
                    }

                </ThemeProvider >
            )
            }
        </>
    );
}