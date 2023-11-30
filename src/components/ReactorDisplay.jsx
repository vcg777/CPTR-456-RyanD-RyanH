import { useNavigate } from "react-router-dom"
import standIn from "../images/stand-in.jpg"
import TempDisplay from "./TempDisplay"
import { Typography } from "@mui/material"

const ReactorDisplay = (props) => {
    const { id } = props
    const navigate = useNavigate()
    return (
        <button className="reactor-display" onClick={() => navigate(`${id}`)}>
            <div>
                <img src={standIn} />
            </div>
            <div className="reactor-info">
                <TempDisplay />
                <Typography variant="h4">Name</Typography>
            </div>
        </button>
    )
}

export default ReactorDisplay