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

const word = "magnolia"; // Magnolia is the starting word to test out the game until you fetch words from a hosted file in a later step.

// Display our symbols as placeholders for the chosen word's letters.
const addPlaceholders = function (word) {
    for (const letter of word) { // Strings are similar to arrays with just a few differences. Thus, you can use loops right away without the need to actually convert it to an array here.
        wordInProgress.append("●");
    }
};

addPlaceholders(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); // This is to prevent the default behavior of clicking a button, the form submitting, and then reloading the page.
    console.log(letterInput.value);
    letterInput.value = "";
});