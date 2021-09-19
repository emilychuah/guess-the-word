// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");

// The button with the text “Guess!” in it.
const guessLetterButton = document.querySelector(".guess");

// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");

// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");

// The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");

// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");

// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; 
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters.
const addPlaceholders = function (word) {
    for (const letter of word) { 
        wordInProgress.append("●");
    }
};

addPlaceholders(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); // This is to prevent the default behavior of clicking a button, the form submitting, and then reloading the page.
    message.innerText = ""; // Empty message paragraph.
    const guess = letterInput.value; // This grabs what was entered in the input.
    const goodGuess = validateInput(guess); // This makes sure that it is a single letter.
    
    if (goodGuess) { // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; 
    if (input === "") { 
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {  
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) { 
        message.innerText = "Please enter a letter from A to Z.";
    } else { 
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've guessed this letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};