// import { useState } from "react";

const CardDisplay = (props) => {

    console.log(props.photoUrl);
    console.log(props.altText);

    return (
        <div>
            <figure className="cardDisplay">
                <img src={props.photoUrl} alt={props.altText}/>
            </figure>
        </div>
    )
}

export default CardDisplay;