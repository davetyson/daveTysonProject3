import { useState, useEffect } from "react";

import axios from "axios";

// import ComputerCard from "./ComputerCard";
import UserCard from "./UserCard";
import ComputerMsg from "./ComputerMsg";

const DrawCard = (props) => {

    let [ twoCards, setTwoCards ] = useState([]);

    let [ drawCount, setDrawCount ] = useState(1);

    console.log(props.deckId);
    const deckUrl = 'https://deckofcardsapi.com/api/deck/' + props.deckId + '/draw/';
    console.log(deckUrl);


    const handleClick = () => {
        setDrawCount(drawCount++);
        console.log(drawCount);
        // some kind of logic here eventually for if the draw count reaches 26, start a new deck
        // Basically, if drawCount === 26 then
            // set some kind of drawReset variable to true which would trigger the reshuffle in CardGame
            // reset drawCount to 1
            // reset drawReset to false
    };

    useEffect( () => {

        axios ({
            url: deckUrl,
            params: {
                count: 2
            }
        }).then((twoCards) => {
            setTwoCards(twoCards.data.cards);
            console.log(twoCards.data.cards);
        }) 
    }, [drawCount])
    
    // I'm not quite sure how to adjust the card presentations so that one says user card and one says computer card. I will do one of two things:
        // Figure out how to make a ternary statement that basically says if card 1, print "User card", else print "Computer card". That could either go here somewhere or in the UserCard, I'm not sure how it works yet
        // I could potentially get this done with CSS by just including the blocks inside of a larger frame in the DrawCard or CardGame modules and move the headings to an overview category that isn't generating the fresh images

    return (
        <div>
            <h2>Draw Card Component</h2>
            {twoCards.map((card) => {
                return(
                    <UserCard key={card.code} photoUrl={card.image} altText={card.value + " of " + card.suit} value={card.value} />
                )
             })}

            {/* Still need to figure out why I have to click this button twice to get the draw to run. it seems to update the state variable that I need to trigger the useEffect each time, but it only actually updates the cards on every second click */}
            <button onClick={handleClick}>Click me to draw cards</button>
            <ComputerMsg twoCards={twoCards}/>

        </div>
    )
}

export default DrawCard;