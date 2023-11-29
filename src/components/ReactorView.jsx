import * as React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, Box, Button, IconButton, Typography, Modal, MenuItem, ToggleButton } from '@mui/material'
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
    const { id } = useParams()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [selected, setSelected] = useState(false)

    return (
        <ThemeProvider theme={theme}>
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
                        <Typography variant='h5' sx={{ paddingTop: 1 }}>Online</Typography>
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
                            <Typography variant='h4'>260</Typography>
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
                                    setSelected(!selected);
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
                                },
                                {
                                    '&:active': {
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
                            <Typography variant='h4' sx={{ color: "#bfd7ea" }}>25°C</Typography>
                            <Typography variant='h4' sx={{ color: "success.main" }}>SAFE</Typography>
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
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center",
                                gap: 3,
                            }}>
                                <Typography variant='h5'>Removed</Typography>
                                <Typography variant='h4'>150</Typography>
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
    );
}