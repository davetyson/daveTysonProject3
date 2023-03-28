// Build component
const GameOver = (props) => {

    // Deconstruct some props
    const { winLoss } = props;

    // Declare a function to refresh the page when the user clicks the refresh button
    const refreshPage = () => {
        window.location.reload(false);
    };

    return (
        <>
            {/* Show the win or loss message to the user at the end of the game, depending on whether they won or lost */}
            { winLoss === "win" ?
                <div className="gameOver">
                    <h2>Congratulations, you have won the game!</h2>
                    <p>It was close at times, but you stuck it out and defeated Cardbot! Congratulations!</p>
                    <p>Would you like the play again?</p>
                    <button onClick={refreshPage}>Click to play again</button>
                </div> :
                null
            }
            { winLoss === "loss" ?
                <div className="gameOver">
                    <h2>You have lost the game!</h2>
                    <p>You tried your best, but Cardbot beat you!</p>
                    <p>Would you like the play again?</p>
                    <button onClick={refreshPage}>Click to play again</button>
                </div> :
                null 
            }
        </>
    )
}

export default GameOver;