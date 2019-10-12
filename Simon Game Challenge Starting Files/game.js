// Variables

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// Start Game

$(document).keydown(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Start over

function startOver() {
 level = 0;
 gamePattern = [];
 started = false;
}

// Sounds and Animations

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}


// User's Choices

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);

});

// Computer Choices

function nextSequence() {

userClickedPattern = [];

  level++;

$("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}

// Check Answers

function checkAnswer(currentLevel) {

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success");


if (userClickedPattern.length === gamePattern.length) {
  setTimeout(function(){
    nextSequence();
  }, 1000);

}

}
else {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game over, press any key to restart.");
  startOver();
}

}
