const unOrderedList = document.querySelector(".guessed-letters");
const Guessbutton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const inprogress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuess = document.querySelector("span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector("play-again-hide");

let word = "magnolia";

console.log(Guessbutton);

Guessbutton.addEventListener("click", function(e){
e.preventDefault();

let input = textInput.value;
console.log(input);

//Clear the input field after a guess
clearInput();

});

// Function to clear the text input
const clearInput = function(){
    textInput.value ="";
};