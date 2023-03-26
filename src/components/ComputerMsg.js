import { useState, useEffect } from "react";

const ComputerMsg = (props) => {

    const [ computerMsg, setComputerMsg ] = useState('');

    useEffect( () => {
        if (props.card1[5] > props.card2[5]) {
            setComputerMsg("You win!");
            props.setUserScore(props.userScore + 1);
            props.setStreak(props.streak + 1);
        } else if (props.card1[5] < props.card2[5]) {
            setComputerMsg("You lose!");
            props.setCompScore(props.compScore + 1);
            props.setStreak(0);
        } else if (props.card1[5] === undefined) {
            setComputerMsg("Draw a card to begin playing!")
        } else {
            setComputerMsg("It's a tie!");
        }
    }, [props.card1, props.card2])

    return (
        <div>
            <h3>Cardbot says:</h3>
            <div className="msgCenter">
                <p className="computerMsg">{computerMsg}</p>
            </div>
        </div>
    )
}

export default ComputerMsg;