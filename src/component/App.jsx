import Die from './Die'
import {useState, useRef, useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App (){

    const [allDices, setAllDices] = useState(() => generateAllNewDice());

    const gameWon = allDices.every(die => die.isHeld) && 
    allDices.every(die => die.value === allDices[0].value);

    const newGameSection = useRef(null);

    useEffect(() => {
        if (gameWon) {
            newGameSection.current.focus()
        }
    }, [gameWon])


    function generateAllNewDice(){
        const allDiceF = []
        for(var i = 0; i < 10; i++){
            const randomNumber = 1 + Math.floor(Math.random() * 6)
            allDiceF.push({value:randomNumber, isHeld: false, id: nanoid()})
        }
        return allDiceF
    }

    function rollDice(){
        !gameWon ? 
        (setAllDices(prevDices =>
            prevDices.map(die =>
                !die.isHeld ? { ...die, value : 1 + Math.floor(Math.random() * 6) } : die
            )
        )) : 
        setAllDices(generateAllNewDice())
    }

    function setHeld(id) {
        setAllDices(prevDices =>
            prevDices.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }
    

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
            <div className="container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick={rollDice} ref={newGameSection}> {gameWon ? "New Game" : "Roll" } </button>
        </main>
    )
}