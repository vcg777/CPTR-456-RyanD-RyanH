import * as React from 'react'
import { useState } from 'react'
import { TextField, Box, Button, Typography, Modal, Select, MenuItem, ToggleButton } from '@mui/material'
import { useEffect } from 'react'
import standIn from "../images/stand-in.jpg"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70vw",
    height: "100vh",
    bgcolor: '#242424',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "3vh"
};

export default function ReactorView(props) {
    const { open, handleClose } = props
    const [selected, setSelected] = useState(false)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                height: "100vh"
            }}
        >
            <Box sx={style}>
                <div className='reactor-page reactor-top'>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        width: "35vw",
                        height: "40vh",
                    }}>
                        <Typography variant='h5'>Name</Typography>
                        <img src={standIn} />
                        <Typography variant='h5'>Online</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        width: "35vw",
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
                        width: "35vw",
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
                            <Button
                                sx={[{
                                    height: "6vh",
                                    borderRadius: "15px",
                                    width: "75px",
                                    fontSize: 13,
                                    backgroundColor: "warning.main",
                                    color: "#1b1212",
                                    border: 4,
                                    borderColor: "#a5a5a5",
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: "warning.light"
                                    }
                                }
                                ]}
                            >
                                FUEL {/* This will hopefully be an icon */}
                            </Button>
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
                        width: "35vw",
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

            </Box>
        </Modal>
    );
}