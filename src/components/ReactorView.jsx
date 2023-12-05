import * as React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, Box, Button, IconButton, Typography, Modal, MenuItem, ToggleButton, Select } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EditRounded, LocalGasStationRounded } from '@mui/icons-material';
import { useEffect } from 'react'
import standIn from "../images/stand-in.jpg"

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
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [selected, setSelected] = useState(false)
    const [reactorInfo, setReactorInfo] = useState({})
    const [tempColor, setTempColor] = useState("")
    const [loading, setLoading] = useState(true)


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
            setReactorInfo({
                ...reactorInfo,
                temperature: jsonTemp.temperature,
                coolant: jsonCoolant.coolant,
                output: jsonOutput.output,
                fuelLevel: jsonFuelLevel.fuel,
                reactorState: jsonReactorState.state,
                rodState: jsonRodState.control_rods,
            })
            setLoading(false)
        }
        getReactorInfo()


        // const dataInterval = setInterval(getReactorInfo, 500)

        // return () => {
        //     clearInterval(dataInterval)
        // }

    }, [])

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
        const changeCoolantState = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    const dropRod = async () => {
        const dropRod = await fetch(`https://nuclear.dacoder.io/reactors/drop-rod/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    const raiseRod = async () => {
        const raiseRod = await fetch(`https://nuclear.dacoder.io/reactors/raise-rod/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    const emergencyShutdown = async () => {
        const emergencyShutdown = await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    const controlledShutdown = async () => {
        const controlledShutdown = await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    const maintenance = async () => {
        const maintenance = await fetch(`https://nuclear.dacoder.io/reactors/maintenance/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    const refuel = async () => {
        maintenance
        const refuel = await fetch(`https://nuclear.dacoder.io/reactors/refuel/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        maintenance
        // Snack log the result
    }

    const changeStatus = (event) => {
        const { value } = event.target.value
        if (value === "online") {
            startReactor
        } else if (value === "offline") {
            controlledShutdown
        } else if (value === "maintenance") {
            maintenance
        } else {
            controlledShutdown
        }

        console.log(value)
        setReactorInfo(prevReactorInfo => {
            return ({
                ...prevReactorInfo,
                reactorState: { value }
            })
        })
    }

    const startReactor = async () => {
        const startReactor = await fetch(`https://nuclear.dacoder.io/reactors/start-reactor/${id}?apikey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }


    return (
        <>
            {!loading && (
                <ThemeProvider theme={theme}>
                    <h1>{JSON.stringify(reactorInfo, null, 2)}</h1>
                    <Box sx={{
                        width: "100vw",
                        height: "100vh",
                        bgcolor: '#242424',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "3vh"
                    }}>
                        <div className='reactor-page reactor-top'>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100vw",
                                height: "40vh",
                            }}>
                                <div className='name-area'>
                                    <Typography variant='h5' sx={{ padding: 1 }}>Name</Typography>
                                    <IconButton
                                        onClick={() => handleOpen()}
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
                                    <MenuItem value="online">Online </MenuItem>
                                    <MenuItem value="offline">Offline</MenuItem>
                                    <MenuItem value="maintenance">Maintenance</MenuItem>
                                    <MenuItem value="emergency-shutdown">Dead</MenuItem>
                                </Select>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100vw",
                                height: "40vh",
                            }}>
                                {/* <canvas ref={canvasRef}></canvas> */}
                                <div className='canvas-understudy'></div> {/* This is representing the graph for styling purposes */}
                                <div className='output-words'>
                                    <Typography variant='h5'>OUTPUT:</Typography>
                                    <Typography variant='h4'>{reactorInfo.output}</Typography>
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
                                    <ToggleButton
                                        value="check"
                                        selected={selected}
                                        onChange={() => {
                                            setSelected(!selected)
                                            changeCoolantState
                                        }}
                                        sx={[{
                                            height: "6vh",
                                            borderRadius: "15px",
                                            width: "75px",
                                            fontSize: 13,
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

                            }}>
                                <Typography variant='h5'>Temperature</Typography>
                                <div className='temp-data'>
                                    <Typography variant='h4' sx={{ color: "#bfd7ea" }}>
                                        {reactorInfo.temperature.amount}
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
                                        <Typography variant='h4'>150</Typography>
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
                                        <Typography variant='h4'>150</Typography>
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
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <p>This will have an input where you can change the name</p>
                        </Box>
                    </Modal>
                </ThemeProvider>
            )
            }
        </>
    );
}