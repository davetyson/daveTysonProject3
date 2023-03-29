// Build component
const StreakDisplay = (props) => {

    return (
        // Winning streak message
        <p className="streakDisplay">🔥 Winning Streak: {props.streak} 🔥</p>
    )
}

export default StreakDisplay;