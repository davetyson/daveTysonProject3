import { useState, useEffect } from "react";

const CardDisplay = (props) => {

    const [ runMsgAnimation, setRunMsgAnimation ] = useState(false);

    useEffect( () => {
        setRunMsgAnimation(true);
        setTimeout( () => {
            setRunMsgAnimation(false);
        }, 300)
    }, [props.photoUrl])


    return (
        <div>
            <figure className="cardDisplay">
                {runMsgAnimation === true ? 
                <img className="runTossCard" src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>: 
                <img src={props.photoUrl === undefined ? "../cardBack.png" : props.photoUrl} alt={props.altText}/>}
            </figure>
        </div>
    )
}

export default CardDisplay;