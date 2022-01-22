const guesses = document.querySelector(".guessed-letters");
const Guessbutton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const inprogress = document.querySelector(".word-in-progress");
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

//Function to display guessed letters

const displayGuesses = function(guessedLetters){
    // clear the innerHTML of the UL
    guessedLetters.innerHTML = "";

    //create a list item
    const guessItem =document.createElement("li");
    
    //set the innertext to the guessedLetters
    guessItem.innerText= guessedLetters ;
   
    //Append the guesses letter to the UL
    guesses.append(guessItem);


}

// Function to Capture Input

const makeGuess = function (letter) {

    if (!guessedLetters.includes(letter)) {

       //Verify the array is updating its elements
        guessedLetters.push(letter);
        displayGuesses(letter);


    } else {
       
        messages.innerText = "You already guessed that letter!";
    }

};



//   Accept and Validate Player Guesses  //


  //Function to Check Player’s Input
   const checkInput = function (input) {

    //Show the game in progress... message
    messages.innerText = "In progress...";

    //variable for the accepted letter sequence   
    const acceptedLetter = /[a-zA-Z]/; //<<REGEX

    // conditional block to check for different scenarios

    //check if the input is empty?
    if (input === "") {
        console.log("EMPTY FIELD!!!");

    } else {
        //only one letter allowed 
        if (input.length >= 2) {
            console.log("Too many letters!!!");
            //Clear the input field after each guesses
            clearInput();

        } else {

            //Check for letters only
            if (!input.match(acceptedLetter)) {
                console.log("Letters Only!!!");
                //Clear the input field after each guesses
                clearInput();

            } else {

                //Good input
                if (input.match(acceptedLetter)) {
                    // Call the makeGuess function
                    makeGuess(input);
                    

                    //Clear the input field after each guesses
                    clearInput();

                }



            }

        }

    }





    console.log(guessedLetters);


};