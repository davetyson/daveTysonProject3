import { useState, useEffect } from "react";

import axios from "axios";

import CardDisplay from "./CardDisplay";
import ComputerMsg from "./ComputerMsg";

const DrawCard = (props) => {

    const [ card1Object, setCard1Object ] = useState([]);

    const [ card2Object, setCard2Object ] = useState([]);

    const [ card1Array, setCard1Array ] = useState([]);

    const [ card2Array, setCard2Array ] = useState([]);

    const [ userScore, setUserScore ] = useState(0);

    const [ compScore, setCompScore ] = useState(0);

    const [ streak, setStreak ] = useState(0);

    const deckUrl = 'https://deckofcardsapi.com/api/deck/' + props.deckId + '/draw/';

    // Put the new data cruncher function here to make sure the card has a real integer value
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

        newCardArray.push('card2');

        setCard2Array(newCardArray);
        return card2Array;
    };

    // const calculateScore = (userCardValue, compCardValue) => {
    //     if (userCardValue > compCardValue) {
    //         setUserScore(userScore + 1);
    //     } else if (userCardValue < compCardValue){
    //         setCompScore(compScore + 1);
    //     }
    // };

    // This is a function set a winning streak counter, but right now it only updates the actual number on the page after the next set of cards has dropped. Example: you have no streak, then you win a round, it won't change the streak number to 1 until the next time you click to draw cards so it's always one round behind. Want it to show right when the win happens and be cleared if you lose. For now I'm commenting out to work on scoring
    // const handleStreak = (newArrayValue1, newArrayValue2) => {
    //     if (newArrayValue1 > newArrayValue2) {
    //         setStreak(streak + 1);
    //     } else {
    //         setStreak(0);
    //     }
    // };

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

                // // call the streaking function
                // handleStreak(card1Array[5], card2Array[5]);

                // call the calculate score function
                // calculateScore(card1Array[5], card2Array[5]);
            });
        }
    }, [props.drawCount])

    return (
        <section className="gameArea">
            <div className="cardArea">
                <div className="cardBlock">
                    <h3>Your Card</h3>
                    <CardDisplay key={"card1"} photoUrl={card1Object.image} altText={card1Array === undefined ? card1Object.value + " of " + card1Object.suit : "The back of a playing card. Draw a card to start playing!"}/>
                </div>
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
                            <h4>Computer Score: </h4>
                            <div className="centerScore">
                                <p>{compScore}</p>
                            </div>
                        </div>
                        {/* <div className="streak">
                            <h4>Your Winning Streak: </h4>
                            <div className="centerScore">
                                <p>{streak}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="cardBlock">
                    <h3>Cardbot</h3>
                    <CardDisplay key={"card2"} photoUrl={card2Object.image} altText={card2Array === undefined ? card2Object.value + " of " + card2Object.suit : "The back of a playing card. Draw a card to start playing!"}/>
                </div>
            </div>

        </section>
    )
}

export default DrawCard;