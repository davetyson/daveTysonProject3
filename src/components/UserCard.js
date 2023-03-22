// import { useState } from "react";

const UserCard = (props) => {

    console.log(props.value);

    // I'm pretty sure this is where I need an if/else statement to determine the message that is going to load

    return (
        <div>
            <h2>Card Reveal Component</h2>
            <img src={props.photoUrl} alt={props.altText}/>
        </div>
    )
}

export default UserCard;