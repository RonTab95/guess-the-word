const guesses = document.querySelector(".guessed-letters");
const Guessbutton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuess = document.querySelector("span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector("play-again-hide");

let word = "magnolia";

//Array to contain the guessed letters
const guessedLetters = [];

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

maskedWord(word);

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
//*******Check if the player guessed correctly *****//
const checkIfWinner  = function(completedWord){

  if (completedWord === word.toUpperCase()){
      messages.classList.add(".win");
      messages.innerHTML= `<p class="highlight">You guessed correct the word! Congrats!</p>`;
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
        } else {
            unmaskArray.push("●");
        }
        wordInProgress.innerText = unmaskArray.join("");
    }
    console.log(wordInProgress.innerText);
    checkIfWinner(wordInProgress.innerText);
    console.log(word);

};

//********Function to Capture Input***********//

const makeGuess = function (letter) {
    if (guessedLetters.includes(letter)) {
        messages.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(letter);
        displayGuesses(letter);
        updateWordInprogress(guessedLetters);
    }
};
//***Accept and Validate Player Guesses***//

//Function to Check Player’s Input
const checkInput = function (input) {
    //Show the game in progress... message
    messages.innerText = " Guess again.";
    //variable for the accepted letter sequence   
    const acceptedLetter = /[a-zA-Z]/; //<<REGEX
    //***conditional block to check for different scenarios***//
    //check if the input is empty?
    if (input === "") {
        messages.innerText="Please input a letter.";
    } else
        //only one letter allowed 
        if (input.length >= 2) {
            messages.innerText="Only a single letter is allowed.";
            //Clear the input field after each guesses
            clearInput();
        } else
            //Check for letters only
            if (!input.match(acceptedLetter)) {
                messages.innerText="Invalid entry. Only letters are allowed.";
                //Clear the input field after each guesses
                clearInput();
            } else
                //Good input
                if (input.match(acceptedLetter)) {
                    // Call the makeGuess function
                    makeGuess(input);
                    //Clear the input field after each guesses
                    clearInput();

                }

    console.log(guessedLetters);
    
};