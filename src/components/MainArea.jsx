import { Box, Button, Typography } from "@mui/material"
import { Chart } from "chart.js/auto"
import { useState, useRef, useEffect } from "react"

const MainArea = (props) => {
    const canvasRef = useRef(null)
    const [pastTemps, setPastTemps] = useState([])

    // useEffect(() => {
    //     let tempInterval

    //     const getData = async () => {
    //       const rawTemp = await fetch("http://")
    //       const jsonTemp = await rawTemp.json()
    //       setPastTemps(jsonTemp.temperatures_Maybe)
    //     }

    //     tempInterval = setInterval(getData, 60000)

    //     return () => {
    //       clearInterval(tempInterval)
    //     }
    //   }, [])

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

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "34vw",
                border: 1
            }}>
                <Box sx={{
                    // border: 1,
                    // borderColor: "orange",
                    display: "flex",
                    height: "16vh",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    boxSizing: "border-box",
                    p: 1,
                }}>
                    <div className="totals-area">
                        <Typography variant="h6" sx={{ textDecoration: "underline", fontSize: 15 }}>Avg. Temp</Typography>
                        <Typography variant="h4" sx={{ color: "#bfd7ea", fontSize: 25 }}>25°C</Typography>
                        <Typography variant="h6" sx={{ textDecoration: "underline", fontSize: 15 }}>Total Output</Typography>
                        <Typography variant="h4" sx={{ fontSize: 25 }}>1.3 GW</Typography>
                    </div>
                    <Typography variant="h6" sx={{ width: "10vw", display: "flex", alignItems: "center" }}>The Power Plant</Typography>
                    <Button sx={[{
                        width: "13vh",
                        height: "13vh",
                        backgroundColor: "#0b3954",
                        color: "#fefffe",
                        borderRadius: 3,
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
                </Box>
                <Box sx={{
                    display: "flex"
                }}>
                    <Box sx={{
                        // border: 1,
                        // borderColor: "red",
                        height: "16vh",
                        width: "17vw"
                    }}>
                        <canvas ref={canvasRef}></canvas>
                    </Box>
                    <Box sx={{
                        // border: 1,
                        // borderColor: "green",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5vh",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "16vh",
                        width: "17vw",
                    }}>
                        <div className="main-buttons">
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "75px",
                                    fontSize: 10,
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
                            >
                                KILL
                            </Button>
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "75px",
                                    fontSize: 10,
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
                            >
                                COOL
                            </Button>
                        </div>
                        <div className="main-buttons">
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "75px",
                                    fontSize: 10,
                                    backgroundColor: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "#2d2d2d"
                                    }
                                }
                                ]}
                            >
                                RESET
                            </Button>
                            <Button
                                variant="contained"
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "75px",
                                    fontSize: 10,
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
                            >
                                SLEEP
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MainArea