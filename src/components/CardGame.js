// Import React hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import child components
import DrawCard from "./DrawCard";
import Error from './Error';

// Build component
const CardGame = () => {

    // Set state variables
    const [ deckId, pullNewDeck ] = useState([]);
    const [ drawCount, setDrawCount ] = useState(0);
    const [ error, setError ] = useState(false);

    // Set drawCount advancing function for when button is clicked
    const drawCountHandler = () => {
        if (drawCount === 26 || drawCount === 0) {
            setDrawCount(1);
        } else {
            setDrawCount(drawCount + 1);
        }
    };

    // useEffect to see if the deck has been fully used, and if so, generate a new deck to pull from
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
            
            // Error handling if axios call errors out
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code that falls out of the range of 2xx
                  setError(true);
                } else if (error.request) {
                  // The request was made but no response was received
                  setError(true);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  setError(true);
                }
              });
        } else if (drawCount >= 26) {
            axios ({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
                params: {
                    deck_count: 1
                }
            }).then((apiData) => {
                pullNewDeck(apiData.data.deck_id);
            })

            // Error handling if axios call errors out
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code that falls out of the range of 2xx
                  setError(true);
                } else if (error.request) {
                  // The request was made but no response was received
                  setError(true);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  setError(true);
                }
              });
        }
    }, [drawCount])

    return (
        <>  
            {/* Error handling component */}
            { error === true ?
            <Error error={error} setError={setError} /> : null }
            {/* Create an instance of the card generator component and pass deck details down to it as props */}
            <section className="cardGame">
                <DrawCard deckId={deckId} drawCountHandler={drawCountHandler} drawCount={drawCount}/>
            </section>
        </>
    )
}

export default CardGame;