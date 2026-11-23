export default function Die(props){

    // the size of the die is managed in the css (.die) so it can get smaller on a phone
    return(
        <img
            className="die"
            src={`/images/dice-${props.value}.svg`}
            alt={`Die with value ${props.value}`}
            style={{backgroundColor: props.isHeld ? "#045d27" : "#ffffff" }}
            onClick={props.setHeld}
        />
    )
}
