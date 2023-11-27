import standIn from "../images/stand-in.jpg"

const ReactorDisplay = (props) => {
    const { handleOpen } = props
    return (
        <>
            <button onClick={handleOpen}>
                <img src={standIn} />
            </button>
        </>
    )
}

export default ReactorDisplay