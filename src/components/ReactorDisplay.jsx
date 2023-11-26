import standIn from "../images/stand-in.jpg"

const ReactorDisplay = (props) => {
    const { image } = props
    return (
        <>
            <button>
                <img src={standIn} />
            </button>
        </>
    )
}

export default ReactorDisplay