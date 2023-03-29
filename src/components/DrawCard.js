// Import React hooks
import { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import child components
import CardDisplay from "./CardDisplay";
import ComputerMsg from "./ComputerMsg";
import GameOver from "./GameOver";
import Error from "./Error";

// Build component
const DrawCard = (props) => {

    // Set state variables
    const [ card1Object, setCard1Object ] = useState([]);
    const [ card2Object, setCard2Object ] = useState([]);
    const [ card1Array, setCard1Array ] = useState([]);
    const [ card2Array, setCard2Array ] = useState([]);
    const [ userScore, setUserScore ] = useState(0);
    const [ compScore, setCompScore ] = useState(0);
    const [ ace, setAce ] = useState(14);
    const [ gameMode, setGameMode ] = useState("infinite");
    const [ endGame, setEndGame ] = useState(false);
    const [ winLoss, setWinLoss ] = useState("");
    // const [ instructions, setInstructions ] = useState(false);
    const [ error, setError ] = useState(false);

    // Deconstruct some props
    const { drawCount, drawCountHandler } = props;

    // Declare a function to set the ace value to low or high
    const aceChange = () => {
        if (ace === 14) {
            setAce(1);
        } else {
            setAce(14);
        }
    };

    // Declare a function to switch the game mode
    const changeGameMode = () => {
        if (gameMode === "infinite") {
            setGameMode("21");
            setUserScore(0)
            setCompScore(0)
        } else {
            setGameMode("infinite");
        }
    };

    // Declare a function to check the scores when playing first to 21, and determine a winner if needed
    const scoreCheck = (score1, score2) => {
        if (gameMode === "21") {
            if (score1 >= 20) {
                setWinLoss("win")
                setEndGame(true);
            } else if (score2 >= 20) {
                setWinLoss("loss")
                setEndGame(true);
            }
        } else {
        }
    };

    // useEffect to check for the end of the game and help display the end of game window if needed
    useEffect(() => {
        if (winLoss === "win" || winLoss === "loss") {
            setEndGame(true);
        } else {
        }
    }, [winLoss])

    // useEffect to draw 2 new cards every time the button is clicked (technically it's activated when the state that is changed by the button click changes). The raw card data is sorted into the data I need with the functions I declared above
    useEffect( () => {

        // Deconstruct some props
        const { deckId } = props;

        // Set the current deck URL to pull cards from
        const deckUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/`;

        // Declare 2 functions (rawDataConverter 1 & 2) to handle the API data coming in from the card pull and sort it into the Arrays and Objects I need to properly compare the values and determine a winner
        const rawDataConverter1 = (dataArray, dataValue) => {
            const newCardArray = Object.entries(dataArray);
            if (dataValue <= 9) {
                newCardArray.push(dataValue);
            } else if (dataValue === "10" ) {
                newCardArray.push(10);
            } else if (dataValue === "JACK") {
                newCardArray.push(11);
            } else if (dataValue === "QUEEN") {
                newCardArray.push(12);
            } else if (dataValue === "KING") {
                newCardArray.push(13);
            } else if (dataValue === "ACE") {
                if (ace === 14) {
                    newCardArray.push(14);
                } else {
                    newCardArray.push(1);
                }
            } else {
                setError(true);
            }
            setCard1Array(newCardArray);
        };

        const rawDataConverter2 = (dataArray, dataValue) => {
            const newCardArray = Object.entries(dataArray);
            if (dataValue <= 9) {
                newCardArray.push(dataValue);
            } else if (dataValue === "10" ) {
                newCardArray.push(10);
            } else if (dataValue === "JACK") {
                newCardArray.push(11);
            } else if (dataValue === "QUEEN") {
                newCardArray.push(12);
            } else if (dataValue === "KING") {
                newCardArray.push(13);
            } else if (dataValue === "ACE") {
                if (ace === 14) {
                    newCardArray.push(14);
                } else {
                    newCardArray.push(1);
                }
            } else {
                setError(true);
            }

            // Extra line in this one so I can determine which card needs the right card animation later
            newCardArray.push('card2');

            setCard2Array(newCardArray);
        };

        // Axios logic to keep pulling a pair of cards every time the user clicks to draw cards
        if (drawCount < 2) {
        } else {
            axios ({
                url: deckUrl,
                params: {
                    count: 2
                }
            }).then( (bothCardsRaw) => {
                setCard1Object(bothCardsRaw.data.cards[0]);
                setCard2Object(bothCardsRaw.data.cards[1]);
                rawDataConverter1(bothCardsRaw.data.cards[0], bothCardsRaw.data.cards[0].value);
                rawDataConverter2(bothCardsRaw.data.cards[1], bothCardsRaw.data.cards[1].value);
            })

            // Error handling if axios call errors out
            .catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.status);
                setError(true);
                } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                setError(true);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setError(true);
                }
            });
        }
        
        // I don't need to call ace in the dependency array as it will run an infinite loop, so disabling eslint on this useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawCount, props])

    return (

        <>
            {/* Game Over message */}
            { endGame === true ? 
            <GameOver winLoss={winLoss} />
            : null }
            {/* Error handling component */}
            { error === true ?
            <Error error={error} setError={setError} /> : null }
            {/* The main gameplay area */}
            <section className="gameArea">
                <div className="cardArea">

                    {/* User card block */}
                    <div className="cardBlock">
                        <h2>Your Card</h2>
                        <CardDisplay key={"card1"} whichCard={"card1"} photoUrl={card1Object.image} altText={card1Array.length === 0 ? "The back of a playing card. Draw a card to start playing!" : `${card1Object.value} of ${card1Object.suit}`} />
                    </div>

                    {/* Message block, draw button, scores */}
                    <div className="msgBlock">
                        <ComputerMsg
                            card1={card1Array} 
                            card2={card2Array} 
                            userScore={userScore} 
                            compScore={compScore}
                            setUserScore={setUserScore} 
                            setCompScore={setCompScore}
                            gameMode={gameMode}
                            setEndGame={setEndGame}
                            setWinLoss={setWinLoss}
                            scoreCheck={scoreCheck}
                        />
                        <button onClick={drawCountHandler}>Draw cards</button>
                        <h3>Scores</h3>
                        <div>
                            <div className="scorebox">
                                <h4>Your Score: </h4>
                                <div className="centerScore">
                                    <p>{userScore}</p>
                                </div>
                            </div>
                            <div className="scorebox">
                                <h4>Cardbot Score: </h4>
                                <div className="centerScore">
                                    <p>{compScore}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Computer card block */}
                    <div className="cardBlock">
                        <h2>Cardbot</h2>
                        <CardDisplay key={"card2"} photoUrl={card2Object.image} altText={card2Array.length === 0 ? "The back of a playing card. Draw a card to start playing!" : `${card2Object.value} of ${card2Object.suit}`}/>
                    </div>
                </div>

                {/* Game modes block */}
                 <div className="gameModes">
                    <button onClick={aceChange}>{ ace === 14 ? `Aces are High` : `Aces are Low` }</button>
                    <div></div>
                    <button onClick={changeGameMode}>{ gameMode === "infinite" ? `Infinite Play` : `First to 21` }</button>
                </div>
            </section>
        </>
    )
}

export default DrawCard;