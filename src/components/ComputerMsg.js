import { useEffect } from "react";

const ComputerMsg = (props) => {

    console.log(props.twoCards);
    console.log(props.twoCards[0]);
    console.log(props.twoCards[1]);

    useEffect(() => {

    // Tried this thing
    //         const checkCard1 = (cardValue) => {
    //     if (cardValue <= 9) {
    //         let adjustedCardValue1 = cardValue;
    //     } else if (cardValue === 10 ) {
    //         let adjustedCardValue1 = "10";
    //     } else if (cardValue === "JACK") {
    //         let adjustedCardValue1 = "11";
    //     } else if (cardValue === "QUEEN") {
    //         let adjustedCardValue1 = "12";
    //     } else if (cardValue === "KING") {
    //         let adjustedCardValue1 = "13";
    //     } else if (cardValue === "ACE") {
    //         let adjustedCardValue1 = "14";
    //     } else {
    //         alert("There was an error while checking card values");
    //         console.log(cardValue);
    //         return cardValue;
    //     }
    // };

    // console.log(checkCard1);
    // console.log(checkCard1(props.twoCards[0]));

    // const checkCard2 = (cardValue) => {
    //     if (cardValue <= 9) {
    //         let adjustedCardValue2 = cardValue;
    //     } else if (cardValue === 10 ) {
    //         let adjustedCardValue2 = "10";
    //     } else if (cardValue === "JACK") {
    //         let adjustedCardValue2 = "11";
    //     } else if (cardValue === "QUEEN") {
    //         let adjustedCardValue2 = "12";
    //     } else if (cardValue === "KING") {
    //         let adjustedCardValue2 = "13";
    //     } else if (cardValue === "ACE") {
    //         let adjustedCardValue2 = "14";
    //     } else {
    //         alert("There was an error while checking card values");
    //     }
    // };

        // Logic still needed
            // Figure out why 10s don't work
            // Figure out how to assign a number to the face cards so they compare correctly
        
        // May want to try setting up a new variable with the props.twoCards[0] or [1] values and put it in an if else
            // For card1 (repeat this for card2, probably will make a function declared elsewhere)
            // if 1-9, then put twoCards value in new card1 variable
            // else if 10, then put value "10" in new card1 variable
            // else if JACK, then put value "11" in new card1 variable
            // else if QUEEN, then put value "12" in new card1 variable
            // else if KING, then put value "13" in new card1 variable
            // else if ACE, then put value "14" in new card1 variable
            // else, error handling
        
        // Take new card1 & card2 variables with appropriate amount and use to compare against in below statements
        // Should now be simpler, with things for sure the right number, and would compare in the 3 straightforward rules (win, lose, tie)

        // Logic we have right now
        // Check if value 1 is bigger than value 2
            // Numbers 2-9 work well
            // Strings beat numbers in all cases, so when it's face card v number, face cards win which works
            // ace beats other numbers and work as strings
            // tens do NOT work they are registering as 1's so need to figure out how to keep the 0 in the value
            // when it's string v string, I think it is registering alphabetically, but the logic doesn't work well


        // checkCard1(props.twoCards[0].value);
        // checkCard2(props.twoCards[1].value);

        
        if (props.twoCards[0].value > props.twoCards[1].value) {
            console.log("you win!");
        } else if (props.twoCards[0].value < props.twoCards[1].value) {
            console.log("you lose!");
        } else {
            console.log(props.twoCards[0].value);
            console.log(props.twoCards[1].value);
            console.log("it's a tie!");
        }
    }, [props.twoCards])


    return (
        <div>
            <h2>Computer Message Component</h2>

        </div>
    )
}

export default ComputerMsg;