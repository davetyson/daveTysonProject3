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
                deck_count: 1
            }
        }).then((apiData) => {
            console.log(apiData);
            console.log(apiData.data.deck_id);
            pullNewDeck(apiData.data.deck_id);
        })

    }, [])

    return (
        <>
            <h2>Card Game Component</h2>
            <DrawCard deckId={deckId}/>
        </>
    )
}

export default CardGame;