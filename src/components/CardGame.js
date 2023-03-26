// Import React hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import child components
import DrawCard from "./DrawCard";

const CardGame = () => {

    const [ deckId, pullNewDeck ] = useState([]);

    const [ drawCount, setDrawCount ] = useState(0);

    const drawCountHandler = () => {
        if (drawCount === 26 || drawCount === 0) {
            setDrawCount(1);
        } else {
            setDrawCount(drawCount + 1);
        }
    };

    useEffect( () => {
        if (drawCount > 1 && drawCount < 26) {
        } else if (drawCount === 0) {
            setDrawCount(1);
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
            <section className="cardGame">
                <DrawCard deckId={deckId} drawCountHandler={drawCountHandler} drawCount={drawCount}/>
            </section>
        </>
    )
}

export default CardGame;