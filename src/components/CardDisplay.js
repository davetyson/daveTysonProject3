import { useState, useEffect } from "react";

const CardDisplay = (props) => {

    const [ cardAnimation, setCardAnimation ] = useState(false);

    useEffect( () => {
        setCardAnimation(true);
        setTimeout( () => {
            setCardAnimation(false);
        }, 300)
    }, [props.photoUrl])
    
    return (
        <div>
            <figure className="cardDisplay">
                {props.whichCard === "card1" ?
                    (cardAnimation === true ? 
                        <img className="runTossCard" src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>: 
                        <img src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>)
                :   (cardAnimation === true ? 
                        <img className="runTossCardR" src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>: 
                        <img src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>)
                }
            </figure>
        </div>
    )
}

export default CardDisplay;