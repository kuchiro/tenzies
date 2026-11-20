import Die from './Die'
import {useState, useRef, useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App (){

    // Create an object of dice which is like [{value:randomNumber, isHeld:false, id:eeee} , {value:randomNumber, isHeld:false, id:eeee}..]
    const [allDices, setAllDices] = useState(() => generateAllNewDice());

    // variable to know if the game is won or not by not using state only the rendering
    const gameWon = allDices.every(die => die.isHeld) && 
    allDices.every(die => die.value === allDices[0].value);

    // variable create to when we won the game, the current selected button is the restart button 
    const newGameSection = useRef(null);

    // state to count the number we roll the dice
    const [counterDice, setCounterDice] = useState(0);

    // function to add each roll
    function addCounter(){
        setCounterDice(prevCounter => prevCounter + 1)
    }

    // useEffect using to have the current click on the restart button only when we saw a change on the gameWon
    useEffect(() => {
        if (gameWon) {
            newGameSection.current.focus()
        }
    }, [gameWon])


    // function to generate the dice from the game
    function generateAllNewDice(number = 10){
        const allDiceF = []
        for(var i = 0; i < number; i++){
            const randomNumber = 1 + Math.floor(Math.random() * 6)
            allDiceF.push({value:randomNumber, isHeld: false, id: nanoid()})
        }
        return allDiceF
    }

    // function to handle the effect of the roll
    function handleRollingDice(){
        addCounter();
        setAllDices(prevDices =>
            prevDices.map(die =>
                !die.isHeld ? { ...die, value : 1 + Math.floor(Math.random() * 6) } : die
            )
        )
    }

    // function to handle the effect of the restart
    function handleRestartGame(){
        setCounterDice(0)
        setAllDices(generateAllNewDice())
    }

    // depending the gameWon variable, whether we are restarting the game, or roll the dice
    function handleRollClick(){
        if(gameWon){
            handleRestartGame();
        } else {
            handleRollingDice();
        }
        
    }

    // Function to change a variable to determine if something is being click or not
    function setHeld(id) {
        setAllDices(prevDices =>
            prevDices.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }
    
    // All dices elements
    const diceElements = allDices.map(
        (allDice => 
            <Die key={allDice.id} 
                value={allDice.value} 
                isHeld={allDice.isHeld}
                setHeld={() => setHeld(allDice.id)}
            />
        )
    )


    return(
        <main>
            {gameWon && <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
            /> }
            <div className="sr-only" aria-live="polite">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <p> {gameWon ? `You win with ${counterDice} roll`: `You did ${counterDice} roll` }</p>
            <div className="container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick={handleRollClick} ref={newGameSection}> {gameWon ? "New Game" : "Roll" } </button>
        </main>
    )
}