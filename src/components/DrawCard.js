// Import React hooks
import { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import child components
import CardDisplay from "./CardDisplay";
import ComputerMsg from "./ComputerMsg";

// Build component
const DrawCard = (props) => {

    // Set state variables
    const [ card1Object, setCard1Object ] = useState([]);
    const [ card2Object, setCard2Object ] = useState([]);
    const [ card1Array, setCard1Array ] = useState([]);
    const [ card2Array, setCard2Array ] = useState([]);
    const [ userScore, setUserScore ] = useState(0);
    const [ compScore, setCompScore ] = useState(0);
    const [ streak, setStreak ] = useState(0);

    // Set the current deck URL to pull cards from
    const deckUrl = 'https://deckofcardsapi.com/api/deck/' + props.deckId + '/draw/';

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
            newCardArray.push(14);
        } else {
            alert("There was an error while checking card values");
        }
        setCard1Array(newCardArray);
        return card1Array;
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
            newCardArray.push(14);
        } else {
            alert("There was an error while checking card values");
        }

        // Extra line in this one so I can determine which card needs the alt animation later
        newCardArray.push('card2');

        setCard2Array(newCardArray);
        return card2Array;
    };

    // This is a function set a winning streak counter, but I'm not sure it's necessary, so commenting it out for now
    // const handleStreak = (newArrayValue1, newArrayValue2) => {
    //     if (newArrayValue1 > newArrayValue2) {
    //         setStreak(streak + 1);
    //     } else {
    //         setStreak(0);
    //     }
    // };

    // useEffect to draw 2 new cards every time the button is clicked (technically it's activated when the state that is changed by the button click changes). The raw card data is sorted into the data I need with the functions I declared above
    useEffect( () => {
        if (props.drawCount < 2) {
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
            });
        }
    }, [props.drawCount])

    return (
        // The main gameplay area
        <section className="gameArea">
            <div className="cardArea">

                {/* User card block */}
                <div className="cardBlock">
                    <h3>Your Card</h3>
                    <CardDisplay key={"card1"} whichCard={"card1"} photoUrl={card1Object.image} altText={card1Array === undefined ? card1Object.value + " of " + card1Object.suit : "The back of a playing card. Draw a card to start playing!"}/>
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
                        streak={streak}
                        setStreak={setStreak} 
                    />
                    <button onClick={props.drawCountHandler}>Draw cards</button>
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
                        
                        {/* Here's the code for the streak function if I want to add that back */}
                        {/* <div className="streak">
                            <h4>Your Winning Streak: </h4>
                            <div className="centerScore">
                                <p>{streak}</p>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Computer card block */}
                <div className="cardBlock">
                    <h3>Cardbot</h3>
                    <CardDisplay key={"card2"} photoUrl={card2Object.image} altText={card2Array === undefined ? card2Object.value + " of " + card2Object.suit : "The back of a playing card. Draw a card to start playing!"}/>
                </div>
            </div>

        </section>
    )
}

export default DrawCard;