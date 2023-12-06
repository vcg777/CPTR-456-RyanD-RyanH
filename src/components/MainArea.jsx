import { Box, Button, Typography } from "@mui/material"
import { Chart } from "chart.js/auto"
import { useState, useRef, useEffect } from "react"

const MainArea = (props) => {
    const { reactors, apiKey } = props
    const canvasRef = useRef(null)
    const [pastTemps, setPastTemps] = useState([])
    const [cooling, setCooling] = useState(false)

    // useEffect(() => {
    //     const chart = new Chart(canvasRef.current, {
    //       type: "line",
    //       data: {
    //         labels: pastTemps.map((_, index) => index),
    //         datasets: [{
    //           label: "Temperature (°C)",
    //           data: [...pastTemps],
    //           borderWidth: 2,
    //         }]
    //       },
    //       options: {
    //         animation: false,
    //       }
    //     })

    //     return () => {
    //       chart.destroy()
    //     }
    //   }, [data])

    const killAll = async () => {
        await Promise.all(reactors.map(async (reactor) => {
            await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${reactor}?apiKey=${apiKey}`, {
                method: "POST"
            })
        }))
    }

    const coolAll = async () => {
        await Promise.all(reactors.map(async (reactor) => {
            await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor}?apiKey=${apiKey}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coolant: cooling ? "off" : "on"
                })
            })
        }))
        setCooling(prevCooling => !prevCooling)
    }

    const sleepAll = async () => {
        await Promise.all(reactors.map(async (reactor) => {
            await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${reactor}?apiKey=${apiKey}`, {
                method: "POST"
            })
        }))
    }

    const reset = async () => {
        const reset = await fetch(`https://nuclear.dacoder.io/reactors/reset?apiKey=${apiKey}`, {
            method: "POST"
        })
        // Snack log the result
    }

    return (
        <>
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
                        <Typography variant="h4" sx={{ color: "#bfd7ea", fontSize: 25 }}>25°C</Typography>
                    </div>
                    <Typography variant="h6" sx={{
                        width: "20vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        The Power Plant
                    </Typography>
                    <div className="totals-area">
                        <Typography variant="h6" sx={{ textDecoration: "underline", fontSize: 15 }}>Total Output</Typography>
                        <Typography variant="h4" sx={{ fontSize: 25 }}>1.3 GW</Typography>
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
                            <Button
                                variant="contained"
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
                                        backgroundColor: "#3b95de"
                                    }
                                }
                                ]}
                                onClick={coolAll}
                            >
                                COOL
                            </Button>
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
                            <Button sx={[{
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
                            >
                                SYSTEM LOGS
                            </Button>
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
                                    backgroundColor: "info.main",
                                    color: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "info.light"
                                    }
                                }
                                ]}
                            >
                                EDIT
                            </Button>
                        </div>
                    </Box>
                </Box>
                <Box sx={{
                    border: 1,
                    borderColor: "red",
                    height: "30vh",
                    width: "40vw",
                    margin: "40px 0 30px",
                }}>
                    {/* <canvas ref={canvasRef}></canvas> */}
                </Box>
            </Box>
        </>
    )
}

export default MainArea