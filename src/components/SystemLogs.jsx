import { Box, Typography, Paper } from "@mui/material"

const SystemLogs = (props) => {
    const { id, logs } = props

    const oneReactor = logs.filter(log => Object.keys(log)[0] === id)
    const reactorValues = oneReactor.map(log => Object.values(log))[0][0]

    return (
        <>
            <Box sx={{
                height: "auto",
                width: "100vw",
                backgroundColor: "#343434",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1vh"
            }}>
                <Typography variant="h5" sx={{ margin: "1vh 0 2vh" }}>System Logs</Typography>
                <Paper sx={{
                    height: "auto",
                    width: "85vw",
                    backgroundColor: "#cacaca",
                    boxSizing: "border-box",
                    padding: "1vw",
                }}
                elevation={7}
                >
                    {reactorValues.map(message => {
                        return (
                            <Typography sx={{
                                color: "#1b1212",
                                marginTop: "3px",
                                width: "83vw",
                                display: "flex",
                                justifyContent: "baseline",
                            }}>
                                - {message}
                            </Typography>
                        )
                    })}
                </Paper>
            </Box>
        </>
    )
}

export default SystemLogs