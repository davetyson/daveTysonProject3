import { useState, useEffect } from "react";

import axios from "axios";

import CardDisplay from "./CardDisplay";
import ComputerMsg from "./ComputerMsg";

const DrawCard = (props) => {

    let [ card1Object, setCard1Object ] = useState([]);

    let [ card2Object, setCard2Object ] = useState([]);

    let [ card1Array, setCard1Array ] = useState([]);

    let [ card2Array, setCard2Array ] = useState([]);

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

    useEffect( () => {
        if (deckUrl === 'https://deckofcardsapi.com/api/deck//draw/') {
        } else {
            axios ({
                url: deckUrl,
                params: {
                    count: 2
                }
            }).then( (bothCardsRaw) => {
                setCard1Object(bothCardsRaw.data.cards[0])
                setCard2Object(bothCardsRaw.data.cards[1])
                rawDataConverter1(bothCardsRaw.data.cards[0], bothCardsRaw.data.cards[0].value)
                rawDataConverter2(bothCardsRaw.data.cards[1], bothCardsRaw.data.cards[1].value)
            }); 
        }
    }, [props.drawCount])

    return (
        <section className="gameArea">
            <div className="cardArea">
                <div className="cardBlock">
                    <h3>Your Card</h3>
                    {card1Array === undefined ?
                    <CardDisplay key={"card1"} photoUrl={card1Object.image} altText={card1Object.value + " of " + card1Object.suit} />
                    : <CardDisplay key={"card1"} photoUrl={card1Object.image} altText={"The back of a playing card. Draw a card to start playing!"}  />
                    }
                </div>
                <div className="msgBlock">
                    <ComputerMsg card1={card1Array} card2={card2Array}/>
                    <button onClick={props.drawCountHandler}>Draw cards</button>
                </div>
                <div className="cardBlock">
                    <h3>Cardbot</h3>
                    {card2Array === undefined ?
                    <CardDisplay key={"card2"} photoUrl={card2Object.image} altText={card2Object.value + " of " + card2Object.suit}  whichCard={card2Array[6]}/>
                    :<CardDisplay key={"card2"} photoUrl={card2Object.image} altText={"The back of a playing card. Draw a card to start playing!"}  /> }
                </div>
            </div>

        </section>
    )
}

export default DrawCard;