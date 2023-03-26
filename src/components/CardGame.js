// Import React hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import child components
import DrawCard from "./DrawCard";

const CardGame = () => {

    let [ deckId, pullNewDeck ] = useState([]);

    let [ drawCount, setDrawCount ] = useState(0);

    console.log(drawCount);

    const drawCountHandler = () => {
        if (drawCount === 26) {
            setDrawCount(1);
        } else if (drawCount === 0){
            setDrawCount(1);
        } else {
            setDrawCount(drawCount + 1);
            console.log(drawCount);
        }
    };

    useEffect( () => {
        if (drawCount > 0 && drawCount < 26) {
            console.log(drawCount)
        } else if (drawCount === 0) {
            setDrawCount(1);
            axios ({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
                params: {
                    deck_count: 1
                }
            }).then((apiData) => {
                pullNewDeck(apiData.data.deck_id);
                console.log(apiData.data.deck_id);
            })
        } else if (drawCount >= 26) {
            axios ({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
                params: {
                    deck_count: 1
                }
            }).then((apiData) => {
                pullNewDeck(apiData.data.deck_id);
                console.log(apiData.data.deck_id);
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