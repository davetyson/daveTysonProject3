import { useState, useEffect } from "react";

import axios from "axios";

import CardDisplay from "./CardDisplay";
import ComputerMsg from "./ComputerMsg";

const DrawCard = (props) => {

    let [ card1Object, setCard1Object ] = useState([]);

    let [ card2Object, setCard2Object ] = useState([]);

    let [ card1Array, setCard1Array ] = useState([]);

    let [ card2Array, setCard2Array ] = useState([]);

    let [ imgStart1, setImgStart1 ] = useState("../cardBack.png");

    let [ imgStart2, setImgStart2 ] = useState("../cardBack.png");

    let [ altTextStart1, setAltTextStart1 ] = useState("The back of a playing card. Draw a card to start playing!");

    let [ altTextStart2, setAltTextStart2 ] = useState("The back of a playing card. Draw a card to start playing!");


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

    const checkImgUrl1 = (arrayImg) => {
        if (props.drawCount === 0 ) {
            let filteredPhotoUrl1 = "../cardBack.png";
            setImgStart1(filteredPhotoUrl1);
            console.log(filteredPhotoUrl1);
        } else {
            let filteredPhotoUrl1 = arrayImg;
            setImgStart1(filteredPhotoUrl1);
            console.log(filteredPhotoUrl1);
        }
    };

    const checkImgUrl2 = (arrayImg) => {
        if (props.drawCount === 0 ) {
            let filteredPhotoUrl2 = "../cardBack.png";
            setImgStart2(filteredPhotoUrl2);
            console.log(filteredPhotoUrl2);
        } else {
            let filteredPhotoUrl2 = arrayImg;
            setImgStart2(filteredPhotoUrl2);
            console.log(filteredPhotoUrl2);
        }
    };

    const checkAltText1 = (arrayValue, arraySuit) => {
        if (props.drawCount === 0 ) {
            let filteredAltText1 = "The back of a playing card. Draw a card to start playing!";
            setAltTextStart1(filteredAltText1);
        } else {
            let filteredAltText1 = arrayValue + " of " + arraySuit;
            setAltTextStart1(filteredAltText1);
        }
    };

    const checkAltText2 = (arrayValue, arraySuit) => {
        if (props.drawCount === 0 ) {
            let filteredAltText2 = "The back of a playing card. Draw a card to start playing!";
            setAltTextStart2(filteredAltText2);
        } else {
            let filteredAltText2 = arrayValue + " of " + arraySuit;
            setAltTextStart2(filteredAltText2);
        }
    };



    useEffect( () => {
        if (props.drawCount === 0) {
        } else {
            axios ({
                url: deckUrl,
                params: {
                    count: 2
                }
            }).then( (bothCardsRaw) => {
                console.log(bothCardsRaw.data.cards);
                setCard1Object(bothCardsRaw.data.cards[0])
                setCard2Object(bothCardsRaw.data.cards[1])
                console.log(card1Object);
                rawDataConverter1(bothCardsRaw.data.cards[0], bothCardsRaw.data.cards[0].value)
                rawDataConverter2(bothCardsRaw.data.cards[1], bothCardsRaw.data.cards[1].value)
                console.log(card1Array);
                console.log(card2Array);
            })
            .then( () => {
                checkImgUrl1(card1Object.image);
                checkImgUrl2(card2Object.image);
                checkAltText1(card1Object.value, card1Object.suit);
                checkAltText2(card2Object.value, card2Object.suit);
            }); 
        }
    }, [props.drawCount])

    return (
        <section className="gameArea">
            <div className="cardArea">
                <div className="cardBlock">
                    <h3>Your Card</h3>
                    <CardDisplay key={"card1"} photoUrl={imgStart1} altText={altTextStart1}/> 
                    {/* {card1Array === undefined ?
                    <CardDisplay key={"card1"} photoUrl={card1Object.image} altText={card1Object.value + " of " + card1Object.suit} />
                    : <CardDisplay key={"card1"} photoUrl={card1Object.image} altText={"The back of a playing card. Draw a card to start playing!"}  />} */}
                </div>
                <div className="msgBlock">
                    <ComputerMsg card1={card1Array} card2={card2Array}/>
                    <button onClick={props.drawCountHandler}>Draw cards</button>
                </div>
                <div className="cardBlock">
                    <h3>Cardbot</h3>
                    <CardDisplay key={"card2"} photoUrl={imgStart2} altText={altTextStart2}/> 
                    {/* {card2Array === undefined ?
                    <CardDisplay key={"card2"} photoUrl={card2Object.image} altText={card2Object.value + " of " + card2Object.suit}  whichCard={card2Array[6]}/>
                    :<CardDisplay key={"card2"} photoUrl={card2Object.image} altText={"The back of a playing card. Draw a card to start playing!"}  /> } */}
                </div>
            </div>

        </section>
    )
}

export default DrawCard;