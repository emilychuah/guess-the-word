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
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

addPlaceholders(word);

// Add an event listener for the button.
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); // This is to prevent the default behavior of clicking a button, the form submitting, and then reloading the page.
    message.innerText = ""; // Empty message paragraph.
    const guess = letterInput.value; // This grabs what was entered in the input.
    const goodGuess = validateInput(guess); // This makes sure that it is a single letter.
    
    if (goodGuess) { // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = ""; // This clears the input every time the button is clicked.
});

// Check player's input.
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; // /[a-zA-Z]/ matches any character from lowercase a through uppercase Z.
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

// Capture player's input.
const makeGuess = function (guess) {
    guess = guess.toUpperCase(); // Recommended to convert each letter to uppercase because JavaScript is case-sensitive and sees uppercase and lowercase letters as different characters.
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've guessed this letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Display guessed letters on the page.
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = ""; // Empty the unordered list where the player's guessed letters will display, so that it prevents duplicated letters to appear.
    for (const letter of guessedLetters) {
        const li = document.createElement("li"); // Create a new list item for each letter.
        li.innerText = letter; 
        guessedLettersElement.append(li); // Add each letter to the unordered list.
    }
};

// Replace the circle symbols with the correct letters guessed.
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); // The word has to be converted to uppercase to match the guessed letters in uppercase.
    const wordArray = wordUpper.split(""); // Split the word string into an array so that the letter can appear in the guessedLetters array.
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

// Check if the player won.
const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congratulations!</p>';
    }
};