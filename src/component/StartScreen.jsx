import {useState} from "react"

export default function StartScreen(props){

    // state to keep the number of dice chosen by the user (10 by default like the original game)
    const [diceChoice, setDiceChoice] = useState(10);

    // function to update the state when the user change the input
    function handleChange(event){
        setDiceChoice(Number(event.target.value))
    }

    // function to send the number of dice to App when the form is submitted
    function handleSubmit(event){
        event.preventDefault()
        props.startGame(diceChoice)
    }

    return(
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                The timer starts when you press "Start" and stops when you win!
            </p>

            <form className="start-form" onSubmit={handleSubmit}>
                <label htmlFor="dice-number">How many dice do you want to play with?</label>
                <p className="dice-choice">{diceChoice} dice</p>
                <input
                    id="dice-number"
                    type="range"
                    min={props.minDice}
                    max={props.maxDice}
                    value={diceChoice}
                    onChange={handleChange}
                />
                <div className="range-labels">
                    <span>{props.minDice}</span>
                    <span>{props.maxDice}</span>
                </div>
                <button className="roll-dice" type="submit">Start</button>
            </form>
        </main>
    )
}
