
//list of states

var states = ["texas", "missouri", "california", "newyork", "colorado", "illinois", "florida", "maine", "arizona"];

const maxTries = 10;      //Max number of attempts

var guessedLetters = [];  //Letters guessed bank
var currentWordIndex;     //Index of states in the array
var guessingWord = [];    //Word that user is guessing
var remainingGuesses = 0; //Remaining # of guesses user has left
var gameStarted = false;  //Alerts when game has started
var hasFinished = false;  //Alerts for user to press any key to try again
var wins = 0;             //Tracks # of wins

//Reset game variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    //Math.floor to round random # down to nearest whole #
    currentWordIndex = Math.floor(Math.random() * (states.length));

    //Clear out arrays
    guessedLetters = [];
    guessingWord = [];


    //Adding the blanks
    for (var i = 0; i < states[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    //Deals with game images
    document.getElementById("pressKeyTryAgain").style.cssText="display: none";
    document.getElementById("gameover-image").style.cssText="display: none";
    document.getElementById("youwin-image").style.cssText="display: none";

    //Update display
    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";

    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }

    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display:block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};


//Evaluates guesses
function evaluateGuess(letter) {
    //Array to store positions of letters in string
    var positions = [];

    for (var i = 0; i < states[currentWordIndex].length; i++) {
        if (states[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

//Checks for a win ***
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display:block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        wins++;
        hasFinished = true;
    }
};

//Check for a loss
function checkLoss() {
    if (remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display:block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
    checkLoss();
}; 

//Make a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        //Make sure letter hasn't been used
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};

//Event Listener
document.onkeydown = function(event) {
    //If finished game, leave 1 keystroke & reset
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        //Check to make sure letters A-Z were pressed
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};


