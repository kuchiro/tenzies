import Die from './Die'
import {useState} from "react"

export default function App (){

    const [allDices, setAllDices] = useState(generateAllNewDice);

    function generateAllNewDice(){
        const allDiceF = []
        for(var i = 0; i < 10; i++){
            const randomNumber = 1 + Math.floor(Math.random() * 6)
            allDiceF.push(randomNumber)
        }
        return allDiceF
    }

    return(
        <main>
            <div className="container">
                {allDices.map(
                    allDice => 
                        <Die value={ allDice }/>
                )}
            </div>
        </main>
    )
}