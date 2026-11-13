// Game variables
let secretNumber;
let maxNumber;
let maxAttempts;
let attemptsLeft;
let attemptsUsed;
let score;
let gameOver = false;

// Start game and apply selected difficulty
function startGame() {
    let difficulty = document.getElementById("difficulty").value;

    if (difficulty == "easy") {
        maxNumber = 50;
        maxAttempts = 10;
    } else if (difficulty == "medium") {
        maxNumber = 100;
        maxAttempts = 7;
    } else {
        maxNumber = 200;
        maxAttempts = 5;
    }

    // Generate a random number between 1 and maxNumber
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    // Reset counters for the new round
    attemptsLeft = maxAttempts;
    attemptsUsed = 0;
    score = 0;
    gameOver = false;

    // Show game screen and hide other screens
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    // Update labels on screen
    document.getElementById("range").textContent = "Range: 1 to " + maxNumber;
    document.getElementById("level").textContent = "Difficulty: " + difficulty.toUpperCase();
    document.getElementById("attempts").textContent = "Attempts Left: " + attemptsLeft;
    document.getElementById("score").textContent = "Current Score: 0";
    document.getElementById("result").textContent = "";
    document.getElementById("result").className = "";
    document.getElementById("final-message").className = "";

    // Reset input field
    document.getElementById("guess").value = "";
    document.getElementById("guess").min = 1;
    document.getElementById("guess").max = maxNumber;
    document.getElementById("guess").step = 1;
    document.getElementById("guess").disabled = false;
    document.getElementById("submit-button").disabled = false;
}

// Check the player's guess
function checkGuess() {
    if (gameOver == true) {
        return;
    }

    let guessText = document.getElementById("guess").value;
    let guess = Number(guessText);

    // Validate input range and whole number
    if (guessText == "" || !Number.isInteger(guess) || guess < 1 || guess > maxNumber) {
        document.getElementById("result").className = "error";
        document.getElementById("result").textContent = "Please enter a valid whole number between 1 and " + maxNumber;
        return;
    }

    attemptsLeft--;
    attemptsUsed++;

    // Compare guess with secret number
    if (guess == secretNumber) {
        score = (attemptsLeft + 1) * 100;
        document.getElementById("result").className = "success";
        document.getElementById("result").textContent = "Congratulations! You guessed the correct number!";
        document.getElementById("score").textContent = "Current Score: " + score;
        document.getElementById("attempts").textContent = "Attempts Left: " + attemptsLeft;
        endGame(true);
    } else if (guess < secretNumber) {
        document.getElementById("result").className = "warning";
        document.getElementById("result").textContent = "Too Low! Try a Higher Number";
        updateGame();
    } else {
        document.getElementById("result").className = "warning";
        document.getElementById("result").textContent = "Too High! Try a Lower Number";
        updateGame();
    }

    // End game if no attempts remain
    if (attemptsLeft == 0 && guess != secretNumber) {
        endGame(false);
    }
}

// Refresh attempts and clear input after a wrong guess
function updateGame() {
    document.getElementById("attempts").textContent = "Attempts Left: " + attemptsLeft;
    document.getElementById("score").textContent = "Current Score: 0";
    document.getElementById("guess").value = "";
}

// Show final win or lose screen
function endGame(won) {
    gameOver = true;

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "flex";
    document.getElementById("guess").disabled = true;
    document.getElementById("submit-button").disabled = true;

    if (won == true) {
        document.getElementById("final-message").className = "win";
        document.getElementById("final-message").textContent = "Congratulations! You Won!";
    } else {
        score = 0;
        document.getElementById("final-message").className = "lose";
        document.getElementById("final-message").textContent = "Game Over! Better Luck Next Time!";
    }

    document.getElementById("correct-number").textContent = "The Secret Number Was: " + secretNumber;
    document.getElementById("final-attempts").textContent = "Attempts Used: " + attemptsUsed;
    document.getElementById("final-score").textContent = "Your Final Score: " + score;
}

// Restart the game
function playAgain() {
    startGame();
}

// Button click and Enter key listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("submit-button").addEventListener("click", checkGuess);
document.getElementById("play-again-button").addEventListener("click", playAgain);

document.getElementById("guess").addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        checkGuess();
    }
});
