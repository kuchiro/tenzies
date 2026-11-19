export default function Die(props){

    return(
        <button style={props.isHeld ? {backgroundColor:"#59E391"} : {backgroundColor:"#ffffff"} }
        onClick={props.setHeld}
        >
            {props.value}
        </button>
    )
}