import { Box, Typography } from "@mui/material"

const SystemLogs = (props) => {
    const { id, logs } = props

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
                <Box sx={{
                    height: "auto",
                    width: "80vw",
                    backgroundColor: "#cacaca",
                }}>
                    {logs && (
                        logs.filter(log => {
                            // log is an Object. The key is the value of id, but I don't know 
                            // what to do with that.
                            if (log === id) {
                                return log.id.map(message => message)
                            } else {
                                return
                            }
                        })
                    )
                    }
                </Box>
            </Box>
        </>
    )
}

export default SystemLogs