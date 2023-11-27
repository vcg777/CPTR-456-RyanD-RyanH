import { Typography } from "@mui/material"

const NameDisplay = (props) => {
    const { currentName } = props

    return (
        <>
            <Typography
                variant="h4"
            >
                Name
            </Typography>
        </>
    )
}

export default NameDisplay