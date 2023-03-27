// Import React hooks
import { useState, useEffect } from "react";

// Build component
const CardDisplay = (props) => {

    // Set up state variables
    const [ cardAnimation, setCardAnimation ] = useState(false);

    // useEffect to trigger animation styles
    useEffect( () => {
        setCardAnimation(true);
        setTimeout( () => {
            setCardAnimation(false);
        }, 300)
    }, [props.photoUrl])
    
    return (
        <>
            {/* Conditional card block to display the right card/animation combo */}
            <figure className="cardDisplay">
                {props.whichCard === "card1" ?
                    (cardAnimation === true ? 
                        <img className={props.photoUrl === undefined ? "" : "runTossCardL"} src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>: 
                        <img src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>)
                :   (cardAnimation === true ? 
                        <img className={props.photoUrl === undefined ? "" : "runTossCardR"} src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>: 
                        <img src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>)
                }
            </figure>
        </>
    )
}

export default CardDisplay;