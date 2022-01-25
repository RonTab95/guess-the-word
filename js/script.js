const guesses = document.querySelector(".guessed-letters");
const Guessbutton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuess = document.querySelector("span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let numberOfGuessesLeft = 8;
let word = "";
//Array to contain the guessed letters
const guessedLetters = [];

const getWord = async function () {
    const userRequest = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await userRequest.text();
    //****Array for the words****//
    const wordArray = words.split("\n");
    // console.log(wordArray);
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    console.log(word);
    maskedWord(word);
};
getWord();
Guessbutton.addEventListener("click", function (e) {
    e.preventDefault();
    //Variable for the text input
    let input = textInput.value.toUpperCase();

    //Check the inputs
    checkInput(input);
});

// Function to clear the text input
const clearInput = function () {
    textInput.value = "";
};

//Mask the word to be guessed
const maskedWord = function (guessWord) {
    //Array to mask the letters
    const maskedWord = [];
    for (let letters of guessWord) {
        maskedWord.push("●");
    }
    wordInProgress.innerText = maskedWord.join("");
};
//********Function to display guessed letters**********//

const displayGuesses = function (guessedLetters) {
    // clear the innerHTML of the UL
    guessedLetters.innerHTML = "";
    //create a list item
    const guessItem = document.createElement("li");
    //set the innertext to the guessedLetters
    guessItem.innerText = guessedLetters;
    //Append the guesses letter to the UL
    guesses.append(guessItem);
};
//**********How many guesses left?********/
const howManyGuessesLeft = function (letter) {
    const upperWord = word.toUpperCase();
    const arrayWord = upperWord.split("");
    console.log(arrayWord);
    if (arrayWord.includes(letter)) {
        messages.innerText = `Good guess. The word contains ${letter}`;
    } else if (!arrayWord.includes(letter)) {

        messages.innerText = `Try again. The word does not contain ${letter}`;
        numberOfGuessesLeft -= 1;
        remainingGuesses.innerHTML = `<p> You have ${numberOfGuessesLeft} guesses left</p>`;

        if (numberOfGuessesLeft <= 0) {

            remainingGuesses.innerHTML = `<p> You have ${numberOfGuessesLeft} guesses left</p>`;
            messages.innerHTML = `You are out of guesses.The word is <span class="highlight"> ${word} </span>.`;
            startOver();
        }
    }
};
//*******Check if the player guessed correctly *****//
const checkIfWinner = function (completedWord) {

    if (completedWord === word.toUpperCase()) {
        messages.classList.add(".win");
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};
//*******Function to update the word in progress******//
const updateWordInprogress = function (guessedLetters) {
    //Convert the word to uppercase and split() them into an array//
    let wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //Compare the guessedLetters with the contents of the wordArray
    const unmaskArray = [];

    for (let elements of wordArray) {
        if (guessedLetters.includes(elements)) {
            unmaskArray.push(elements);
            console.log(numberOfGuessesLeft);

        } else {
            unmaskArray.push("●");
        }
        wordInProgress.innerText = unmaskArray.join("");
   }
};
//********Function to Capture Input***********//

const makeGuess = function (letter) {
    if (guessedLetters.includes(letter)) {
        messages.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(letter);
        displayGuesses(letter);
        updateWordInprogress(guessedLetters);
        howManyGuessesLeft(letter);
        checkIfWinner(wordInProgress.innerText);
    }
};
//***Accept and Validate Player Guesses***//

//Function to Check Player’s Input
const checkInput = function (input) {
    //Show the game in progress... message
    messages.innerText = " Try to guess the hidden word!";
    //variable for the accepted letter sequence   
    const acceptedLetter = /[a-zA-Z]/; //<<REGEX
    //***conditional block to check for different scenarios***//
    //check if the input is empty?
    if (input === "") {
        messages.innerText = "Please input a letter.";
    } else
        //only one letter allowed 
        if (input.length >= 2) {
            messages.innerText = "Only a single letter is allowed.";
            //Clear the input field after each guesses
            clearInput();
        } else
            //Check for letters only
            if (!input.match(acceptedLetter)) {
                messages.innerText = "Invalid entry. Only letters are allowed.";
                //Clear the input field after each guesses
                clearInput();
            } else
                //Good input
                if (input.match(acceptedLetter)) {
                    //Clear the message
                    messages.innerHTML = "";
                    // Call the makeGuess function
                    makeGuess(input);
                    //Clear the input field after each guesses
                    clearInput();
                }
    // console.log(guessedLetters);
};
const startOver = function () {
    playAgainButton.classList.remove("hide");
    Guessbutton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guesses.classList.add("hide");
    guesses.innerText = "";
    textInput.disabled = true;//Disable the text input

};
playAgainButton.addEventListener("click", function (e) {
    e.preventDefault();
    textInput.disabled = false;//Enable the text input
    playAgainButton.classList.add("hide");
    Guessbutton.classList.remove("hide");
    guesses.classList.remove("hide");
    numberOfGuessesLeft = 8;
    remainingGuesses.innerHTML = `<p> You have ${numberOfGuessesLeft} guesses left</p>`;
    messages.innerText = "";
    getWord();//Restart the word guessing game
    playAgainButton.classList.add("hide");
    Guessbutton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");

});