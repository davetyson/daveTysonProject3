import { useState, useEffect } from "react";

import axios from "axios";

// import ComputerCard from "./ComputerCard";
import UserCard from "./UserCard";
import ComputerMsg from "./ComputerMsg";

const DrawCard = (props) => {

    console.log(props.deckId);
    const deckUrl = 'https://deckofcardsapi.com/api/deck/' + props.deckId + '/draw/';
    console.log(deckUrl);

    const [ twoCards, setTwoCards ] = useState([]);

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
    }, [props.deckId])

    return (
        <div>
            <h2>Draw Card Component</h2>
            {twoCards.map((card) => {
                return(
                    <UserCard key={card.code} photoUrl={card.image} altText={card.value + " of " + card.suit} value={card.value} />
                )
             })}
            <ComputerMsg twoCards={twoCards}/>

        </div>
    )
}

export default DrawCard;