// Build component
const Instructions = () => {
    return (
        // Instructions block
        <section className="instructions">
            <h3>Instructions</h3>
            <p>Click to draw a card and see if you can beat the computer! Highest card wins each round.</p>      
            <p>Use the Game Mode buttons to change the gameplay! Aces can be changed to high or low. "Infinite Play" allows you to play forever, and in "First to 21" mode, the first one to reach 21 points wins the game.</p>
            <p>Selecting "First to 21" will reset the scores so you can start the game at 0. Page loads with ace high and "Infinite Play" activated. Thanks to Chase Roberts for the <a href="https://deckofcardsapi.com/">Deck of Cards API</a> :)</p>
        </section>
    )
}

export default Instructions;