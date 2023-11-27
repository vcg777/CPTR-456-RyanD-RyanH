import * as React from 'react'
import { useState } from 'react'
import { TextField, Box, Button, Typography, Modal, Select, MenuItem } from '@mui/material'
import { useEffect } from 'react'

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
};

export default function ReactorView(props) {
    const { open, handleClose } = props

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
                
                
            </Box>
        </Modal>
    );
}