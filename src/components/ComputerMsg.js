import { useState, useEffect } from "react";

const ComputerMsg = (props) => {

    const [ computerMsg, setComputerMsg ] = useState('');

    const [ runMsgAnimation, setRunMsgAnimation ] = useState(false);

    const lossResponses = ["You lose! Cardbot is the victor!", "You lost! Better luck next time!", "I have defeated you!"];

    const winResponses = ["You win! Let's play again!", "I lost! Maybe I'll win next time :( ", "I have been defeated!"];

    const tieResponses = ["It's a tie!", "Looks like a tie, we'd better play again!", "Oh, close one!"];

    useEffect( () => {
        setRunMsgAnimation(true);
        if (props.card1[5] > props.card2[5]) {
            let winMsg = Math.floor(Math.random() * winResponses.length);
            setComputerMsg(winResponses[winMsg]);
            props.setUserScore(props.userScore + 1);
            props.setStreak(props.streak + 1);
        } else if (props.card1[5] < props.card2[5]) {
            let lossMsg = Math.floor(Math.random() * lossResponses.length);
            setComputerMsg(lossResponses[lossMsg]);
            props.setCompScore(props.compScore + 1);
            props.setStreak(0);
        } else if (props.card1[5] === undefined) {
            setComputerMsg("Draw a card to begin playing!")
        } else {
            let tieMsg = Math.floor(Math.random() * tieResponses.length);
            setComputerMsg(tieResponses[tieMsg]);
        }
        setTimeout( () => {
            setRunMsgAnimation(false);
        }, 300)

    }, [props.card1, props.card2])

    return (
        <div>
            <h3>Cardbot says:</h3>
            <div className="msgCenter">
                { runMsgAnimation === true ?
                <p className="computerMsg msgAnimationRun">{computerMsg}</p> :
                <p className="computerMsg">{computerMsg}</p>}
            </div>
        </div>
    )
}

export default ComputerMsg;