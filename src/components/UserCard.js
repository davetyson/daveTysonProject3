// import { useState } from "react";

const UserCard = (props) => {
    return (
        <div>
            <img src={props.photoUrl} alt={props.altText}/>
        </div>
    )
}

export default UserCard;