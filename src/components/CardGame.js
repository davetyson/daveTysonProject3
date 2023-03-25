// Import React hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import child components
import DrawCard from "./DrawCard";

const CardGame = () => {

    let [ deckId, pullNewDeck ] = useState([]);

    let [ drawCount, setDrawCount ] = useState(0);

    const drawCountHandler = () => {
        if (drawCount === 26) {
            setDrawCount(1);
        } else {
            setDrawCount(drawCount + 1);
        }
    };

    useEffect( () => {
        if (drawCount > 0 && drawCount < 26) {
        } else if (drawCount === 0) {
            drawCount = 1;
            axios ({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
                params: {
                    deck_count: 1
                }
            }).then((apiData) => {
                pullNewDeck(apiData.data.deck_id);
            })
        } else if (drawCount >= 26) {
            axios ({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
                params: {
                    deck_count: 1
                }
            }).then((apiData) => {
                pullNewDeck(apiData.data.deck_id);
            })
        }
    }, [drawCount])

    return (
        <>
            <h2>Card Game Component</h2>
            <DrawCard deckId={deckId} drawCountHandler={drawCountHandler} drawCount={drawCount}/>
        </>
    )
}

export default CardGame;