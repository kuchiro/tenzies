export default function Die(props){

    return(
        <img
            src={`/images/dice-${props.value}.svg`}
            alt={`Die with value ${props.value}`}
            style={{width: "50px",
                    height: "50px", 
                    backgroundColor: props.isHeld ? "#59E391" : "#ffffff" }}
            onClick={props.setHeld}
        />
    )
}