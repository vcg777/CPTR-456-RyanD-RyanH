import { useNavigate } from "react-router-dom"
import standIn from "../images/stand-in.jpg"

const ReactorDisplay = (props) => {
    const { id } = props
    return (
        <>
            {/* onClick={useNavigate(`/${id}`)} */}
            <button>
                <img src={standIn} />
            </button>
        </>
    )
}

export default ReactorDisplay