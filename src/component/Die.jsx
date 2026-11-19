export default function Die(props){

    return(
        <button style={props.isHeld ? {backgroundColor:"#59E391"} : {backgroundColor:"#ffffff"} }
            onClick={props.setHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
    )
}