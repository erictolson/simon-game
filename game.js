
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

$(document).keypress(function() {
    if(level == 0) {
        nextSequence();
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer();

    if(level != 0) {
        checkEndTurn();
    }
}); 

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    level += 1;
    $("h1").text("Level " + level);
    
    gamePattern.push(randomChosenColor)
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer() {
    for(let i = 0; i < userClickedPattern.length; i++) {
        if(userClickedPattern[i] != gamePattern[i]) {
            gameOver();
        }
    }
    return "correct";
}

function checkEndTurn() {
    if(gamePattern.length == userClickedPattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);

    $("h1").text("Game Over, Press Any Key to Restart");

    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}