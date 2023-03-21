import DrawCard from "./DrawCard";
import ComputerCard from "./ComputerCard";
import UserCard from "./UserCard";
import ComputerMsg from "./ComputerMsg";

const CardGame = () => {
    return (
        <>
            <h2>Card Game Component</h2>
            <ComputerCard />
            <UserCard />
            <ComputerMsg />
            <DrawCard />
        </>
    )
}

export default CardGame;