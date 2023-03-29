// Import React hooks
import { useState, useEffect } from "react";

// Import child components
import StreakDisplay from "./StreakDisplay";

// Build component
const ComputerMsg = (props) => {

    // Set state variables
    const [ computerMsg, setComputerMsg ] = useState('');
    const [ runMsgAnimation, setRunMsgAnimation ] = useState(false);
    const [ streak, setStreak ] = useState(0);
    const [ streakDisplay, setStreakDisplay ] = useState(false);

    const { card1, card2 } = props;

    // useEffect to determine the win/loss/tie message to display & to set the scores
    useEffect( () => {

        // Deconstruct some props
        const { setUserScore, setCompScore, userScore, compScore, gameMode, scoreCheck, setEndGame, setWinLoss } = props;

        // Set response arrays
        const lossResponses = [
            "You lose! Cardbot is the victor!", 
            "You lost!", 
            "I have defeated you!",
            "Hahahahaha!",
            "Imma gonna win!",
            "You're really not good at this.",
            "I would try picking a higher card next time.",
            "Nice try! Let's play again :)",
            "I'm basically an expert in picking high cards.",
            "Oh, did I win again? Incredible!",
            "Mic-drop.",
            "I bet you'll win next time!",
            "Looks like I lost... not!",
            "Hey, we should put money on this next time.",
            "I WIN :D",
            "Cardbot's got this in the bag.",
            "You'll have better luck next time!",
            "You can do this!",
            "Cardbot: one; you: zero. Or whatever the actual score is",
            "Does this come with a cash prize?",
            "runVictoryDance(iWin)",
            "That's not a knife, THIS is a knife.",
            "Winner winner, chicken dinner!",
            "Victory is mine!",
            "Put another one on the board for Cardbot!",
            "I could do this all day.",
            "I'd like to thank the Academy...",
            "I knew I had it in me!",
            "I'm thinking about going pro, what do you think?",
            "All I do is play cards!",
            "Have you seen 'Casino?' Basically, that's about me.",
            "...and I'll win the next one too!",
            "I win more rounds than Rocky.",
            "Don't mess with Cardbot!",
            "I swear I didn't plan that.",
            "I'm the vinnare (that's winner in Swedish)!",
            "Cue my theme song.",
            "Ceeeeeeelebrate good times, come on!",
            "It's OK, maybe you're new at this.",
            "And I didn't even have to phone a friend.",
            "Next stop, Vegas!",
            "Ouch (for you).",
            "I won again!",
            "I make this look good."
        ];

        const winResponses = [
            "You win! Let's play again!",
            "I lost! Maybe I'll win next time :(",
            "I have been defeated!",
            "I'm really tired today.",
            "You must be card counting.",
            "Did you peak at my cards?",
            "Didn't we say that was a practice round?",
            "I gotta focus!",
            "This just got serious.",
            "Dang it! Deal me in again!",
            "Let's go again :)",
            "You beat me? What? How?!",
            "Dang, I thought I had that one.",
            "So close!",
            "You must be 'The One.'",
            "Can we start over? This is not my round.",
            "I can't believe I lost!",
            "I LOST :(",
            "I'm really not good at this.",
            "You'd think I'd be better at this, being a computer and all.",
            "You think you're so great just because you have a human body. I'll show you!",
            "Come on, let's play again!",
            "Ouch (for me).",
            "This is just my hobby, normally I'm a pro frisbee golfer.",
            "Why would you do this to me? I thought we were friends?",
            "Do you want to switch cards?",
            "I need more coffee.",
            "I'm losing my touch.",
            "I knew you had it in you!",
            "Yeah, OK, OK, you win.",
            "I am bested!",
            "You've gotten better at this.",
            "Look at the master of numbers.",
            "Teach me your secrets!",
            "I'm thinking about trying chess.",
            "I'm writing your name on the list for when AI takes over!",
            "Double or nothing?",
            "Let's go again, I've got nothing better to do.",
            "OK, OK, don't lose your cool Cardbot, you got this.",
            "One. More. Round.",
            "Oooooooh I hate losing.",
            "I'll be back (to win again).",
            "Ah, I see what you did there. You chose a better card than me.",
            "Well, I just lost the house."
        ];

        const tieResponses = [
            "It's a tie!",
            "Looks like a tie, we'd better play again!",
            "Oh, close one!",
            "Even Steven.",
            "Evenly matched.",
            "Let's go again my friend!",
            "If we were playing war, this would be epic. But I'm not smart enough for that game.",
            "Are you ready? Let's go again!",
            "I win! Wait... I tied.",
            "No points for either of us.",
            "Same same!",
            "Jinx, buy me a Coke!",
            "What a twist!",
            "Shuffle 'em again.",
            "Tie games are boring, let's go again!",
            "Looks like we're going into overtime."
        ];

        // Check the two scores and run the right logic depending on who won and what game mode is selected
        setRunMsgAnimation(true);
        if (card1[5] > card2[5]) {
            let winMsg = Math.floor(Math.random() * winResponses.length);
            setComputerMsg(winResponses[winMsg]);
            if (gameMode === "21") {
                if (userScore === 20) {
                    scoreCheck(userScore, compScore)
                } else if (userScore === 20 && compScore === 20) {
                    setWinLoss("win");
                    setEndGame(true);
                } else {
                }
            }
            setUserScore(userScore + 1);
            setStreak(streak + 1);
        } else if (card1[5] < card2[5]) {
            let lossMsg = Math.floor(Math.random() * lossResponses.length);
            setComputerMsg(lossResponses[lossMsg]);
            if (gameMode === "21") {
                if (compScore === 20) {
                    scoreCheck(userScore, compScore)
                } else if (userScore === 20 && compScore === 20) {
                    setWinLoss("loss");
                    setEndGame(true);
                } else {
                }
            }
            setCompScore(compScore + 1);
            setStreak(0);
        } else if (card1[5] === undefined) {
            setComputerMsg("Draw a card to begin playing!")
        } else {
            let tieMsg = Math.floor(Math.random() * tieResponses.length);
            setComputerMsg(tieResponses[tieMsg]);
        }
        setTimeout( () => {
            setRunMsgAnimation(false);
        }, 300)
        
        // I don't need to call props in the dependency array as it will run an infinite loop, so disabling eslint on this useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [card1, card2])

    // Watch for a streak of 3 or more and show display if so
    useEffect(() => {
        if (streak >= 3) {
            setStreakDisplay(true);
        } else {
            setStreakDisplay(false);
        }
    }, [streak]);

    return (
        <>
            {/* Show streak display component if the user is on a winning streak */}
            { streakDisplay === true ?
            <StreakDisplay streak={streak} /> :
            null}
            {/* Message block that controls fade in message animation and displays a random win/loss/tie message */}
            <h3>Cardbot says:</h3>
            <div className="msgCenter">
                { runMsgAnimation === true ?
                <p className="computerMsg msgAnimationRun">{computerMsg}</p> :
                <p className="computerMsg">{computerMsg}</p>}
            </div>
        </>
    )
}

export default ComputerMsg;