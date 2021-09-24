const guessedLettersElement = document.querySelector(".guessed-letters");

const guessLetterButton = document.querySelector(".guess");

const letterInput = document.querySelector(".letter");

const wordInProgress = document.querySelector(".word-in-progress");

const remainingGuessesElement = document.querySelector(".remaining");

const remainingGuessesSpan = document.querySelector(".remaining span");

const message = document.querySelector(".message");

const playAgainButton = document.querySelector(".play-again");

let word;  
let guessedLetters = [];  
let remainingGuesses;  

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();  
    const wordArray = words.split("\n");  
    const randomIndex = Math.floor(Math.random() * wordArray.length);  
    word = wordArray[randomIndex].trim();  
    addPlaceholders(word);
    setGuessLimit(word);
};

getWord();  

const setGuessLimit = function (word) {
    remainingGuesses = word.length;  
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
};

const addPlaceholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");  
};

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();  
    message.innerText = "";  
    const guess = letterInput.value;  
    const goodGuess = validateInput(guess);  
    
    if (goodGuess) {  
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
        showGuessedLetters();
        countRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";  
    for (const letter of guessedLetters) {
        const li = document.createElement("li");  
        li.innerText = letter; 
        guessedLettersElement.append(li);  
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();  
    const wordArray = wordUpper.split("");  
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();  
    if (upperWord.includes(guess)) {
        message.innerText = `Good guess! The word has ${guess}.`;
    } else {
        message.innerText = `Uh-oh, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congratulations! 🥳</p>';
        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
    letterInput.disabled = true;  
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    letterInput.disabled = false;  
    
    getWord();
});