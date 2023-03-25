// Import React hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import child components
import DrawCard from "./DrawCard";

const CardGame = () => {

    const [ deckId, pullNewDeck ] = useState([]);

    // const [ drawnCardPair, drawCards ] = useState([]);

    useEffect( () => {

        axios ({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
            params: {
                deck_count: 5
            }
        }).then((apiData) => {
            pullNewDeck(apiData.data.deck_id);
        })

        // will likely need to put something to trigger this call again in dependency array, when the deck count has reached max and needs a shuffle. for now I just have the deck count at 5 so that it gives 130 pulls before erroring out
        
    }, [])

    return (
        <>
            <h2>Card Game Component</h2>
            <DrawCard deckId={deckId}/>
        </>
    )
}

export default CardGame;