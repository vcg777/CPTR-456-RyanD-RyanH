import { Typography } from "@mui/material"

const TempDisplay = (props) => {
    const { currentTemp } = props

    return (
        <div className="temp-display">
            <Typography
                variant="h6"
                sx={{
                    textDecoration: "underline",
                    marginTop: "40px"
                }}
            >
                Temperature
            </Typography>
            <Typography
                variant="h3"
                sx={{
                    color: "#bfd7ea"
                }}
            >
                25°C
            </Typography>

        </div>
    )
}

export default TempDisplay