// array that stores the colours:
var buttonColours = ["red", "blue", "green", "yellow"];

// array that stores the random picked colours:
var gamePattern = [];

//array that stires the users picked colours:
var userClickedPattern = [];

// Variable to keep track if the game has started:
var started = false; 

// Variable to store the current level:
var level = 0; 



$(document).keypress(function() {
    //this function detects when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

  if (!started) {
    //when the game has not yet started (!started)

    $("#level-title").text("Level " + level);
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".


    nextSequence();
        //The purpose of calling nextSequence() at this point is to initiate the game by generating the first random color in the sequence.

    started = true;
        //The line started = true; is necessary to indicate that the game has started. It ensures that subsequent key presses will not call nextSequence() again, preventing multiple sequences from being generated with each key press.
  }
});



$(".btn").click(function() {
    //dettect when a button got clicked

  var userChosenColour = $(this).attr("id");
    //store the clicked button into a variable named userChosenColour

  userClickedPattern.push(userChosenColour);
    // push that colour to the userClickedPattern array

  //check if it works
    //   console.log(userClickedPattern);

    playSound(userChosenColour);
        //generate the clicked colour sound

    animatePress(userChosenColour);
        //animates the colour of the clicked button

    checkAnswer(userClickedPattern.length - 1);
        //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});



function checkAnswer(currentLevel) {
    //check if the user choice it's the same with the random choice

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //check if the most recent user answer is the same as the game pattern.
    console.log("success");
        //If so then log "success",

    if (userClickedPattern.length === gamePattern.length) {
        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

      setTimeout(function() {
        nextSequence();
      }, 1000);
              //Call nextSequence() after a 1000 millisecond delay.
    }

  } else {
    // if user choice is wrong then:

    playSound("wrong");
        // the wrong song will play

    $("body").addClass("game-over");
        //the body color change to the color set in game-over class

      setTimeout(function () {
    $("body").removeClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");
  }, 200);
        //after 200ms the game-over class it's removed

  startOver();
         //Call startOver() if the user gets the sequence wrong
  }
}






function nextSequence(){
//nextSequence function generates a random colour

    userClickedPattern = [];
        // userClickedPattern array is necessary here so that it resets the userClickedPattern array at the start of each new sequence / is necessary to clear the previous sequence's clicked colors and start fresh for the new sequence.

  level++;
        // increase the level by 1 every time nextSequence() is called.

  $("#level-title").text("Level " + level); 
        // Update the h1 with the current level
  

    var randomNumber = Math.floor(Math.random()*4);
        //generate a random number between 0 and 3

    var randomChosenColour = buttonColours[randomNumber];
        //pick a color using the random number from buttonColours array

    gamePattern.push(randomChosenColour);
        //push that color to the empty array called gamePattern

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        //create a flash effect for the random colour

    playSound(randomChosenColour);
        //generate the colour sound
}







function playSound(name) {
    //a playSound function that generates sound for the chosen input

  var audio = new Audio("sounds/" + name + ".mp3");
    //the input will determine the location of the mp3 file

  audio.play();
    //call the play property of Audio class
}





function animatePress(currentColour){
// an animatePress function that generates a flash on click

    $("#"+ currentColour).addClass("pressed");
  setTimeout(function () {
    //add the css class to the clicked button:

    $("#"+currentColour).removeClass("pressed");
  }, 100);
      //after 100ms remove the pressed class:
}




function startOver(){
//The startOver() function is used to reset the game to its initial state when the user gets the sequence wrong or when they want to restart the game. 
  level = 0;
  //This line sets the level variable to 0, effectively resetting the level back to the starting level. This ensures that the game starts from the beginning when restarted.
  gamePattern = [];
  //This line assigns an empty array to the gamePattern variable. It clears out the stored game pattern, removing any previously generated colors. This ensures that when the game restarts, a new sequence of colors will be generated.
  started = false;
  //This line sets the started variable to false, indicating that the game has not started yet. It allows the game to be triggered again by pressing a key, starting from the beginning.
}