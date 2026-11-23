import Die from './Die'
import StartScreen from './StartScreen'
import {useState, useRef, useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

// min and max number of dice the user can choose on the start screen
const MIN_DICE = 4
const MAX_DICE = 30

export default function App (){

    // state to save the number of dice chosen on the start screen (0 = the game is not started yet)
    const [numberOfDice, setNumberOfDice] = useState(0);

    // variable to know if we are on the start screen or in the game
    const gameStarted = numberOfDice > 0

    // Create an object of dice which is like [{value:randomNumber, isHeld:false, id:eeee} , {value:randomNumber, isHeld:false, id:eeee}..]
    const [allDices, setAllDices] = useState([]);

    // variable to know if the game is won or not by not using state only the rendering
    // (we check gameStarted because an empty array would give "true" with every())
    const gameWon = gameStarted &&
    allDices.every(die => die.isHeld) &&
    allDices.every(die => die.value === allDices[0].value);

    // variable create to when we won the game, the current selected button is the restart button
    const newGameSection = useRef(null);

    // state to count the number we roll the dice
    const [counterDice, setCounterDice] = useState(0);

    // state to count the seconds since the beginning of the game
    const [seconds, setSeconds] = useState(0);

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

    // useEffect for the timer : every second we add 1 to the seconds
    // the timer only runs when the game is started and not won yet
    useEffect(() => {
        if (!gameStarted || gameWon) {
            return
        }
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
        }, 1000)

        // we clean the interval when the game is won or when we go back to the start screen
        return () => clearInterval(intervalId)
    }, [gameStarted, gameWon])

    // function to show the time like 01:05 instead of 65
    function formatTime(totalSeconds){
        const minutes = Math.floor(totalSeconds / 60)
        const secondsLeft = totalSeconds % 60
        return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`
    }

    // function to generate the dice from the game
    function generateAllNewDice(number = 10){
        const allDiceF = []
        for(var i = 0; i < number; i++){
            const randomNumber = 1 + Math.floor(Math.random() * 6)
            allDiceF.push({value:randomNumber, isHeld: false, id: nanoid()})
        }
        return allDiceF
    }

    // function called by the start screen with the number of dice chosen
    function startGame(number){
        setNumberOfDice(number)
        setCounterDice(0)
        setSeconds(0)
        setAllDices(generateAllNewDice(number))
    }

    // function to go back to the start screen to choose another number of dice
    function backToMenu(){
        setNumberOfDice(0)
        setAllDices([])
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

    // function to handle the effect of the restart (same number of dice as before)
    function handleRestartGame(){
        startGame(numberOfDice)
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
        // we can't change the dice anymore when the game is won
        if (gameWon) {
            return
        }
        setAllDices(prevDices =>
            prevDices.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }

    // if the game is not started we show the start screen
    if (!gameStarted) {
        return <StartScreen startGame={startGame} minDice={MIN_DICE} maxDice={MAX_DICE} />
    }

    // number of columns of the grid depending on the number of dice
    // up to 12 dice : 2 rows, up to 20 dice : 5 columns, more : 6 columns
    let columns = 6
    if (numberOfDice <= 12) {
        columns = Math.ceil(numberOfDice / 2)
    } else if (numberOfDice <= 20) {
        columns = 5
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

            <div className="stats">
                <p>Rolls : <span>{counterDice}</span></p>
                <p>Time : <span>{formatTime(seconds)}</span></p>
            </div>

            {gameWon && <p className="win-message">
                You win with {counterDice} {counterDice > 1 ? "rolls" : "roll"} in {formatTime(seconds)} !
            </p>}

            <div className="container" style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 50px))`}}>
                {diceElements}
            </div>

            <button className="roll-dice" onClick={handleRollClick} ref={newGameSection}> {gameWon ? "New Game" : "Roll" } </button>
            <button className="menu-button" onClick={backToMenu}>Change number of dice</button>
        </main>
    )
}
