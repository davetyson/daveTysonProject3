import { useState, useEffect } from "react";

const ComputerMsg = (props) => {

    const [ computerMsg, setComputerMsg ] = useState('')

    useEffect( () => {
        if (props.card1[5] > props.card2[5]) {
            setComputerMsg("You win!");
        } else if (props.card1[5] < props.card2[5]) {
            setComputerMsg("You lose!");
        } else if (props.card1[5] === undefined) {
            setComputerMsg("Draw a card to begin playing!")
        } else {
            setComputerMsg("It's a tie!");
        }
    }, [props.card1, props.card2])


    return (
        <div>
            <h2>Computer Message Component</h2>
            <p>{computerMsg}</p>
        </div>
    )
}

export default ComputerMsg;