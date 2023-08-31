var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("level " + level);

    nextSequence();
    started = true;
    }
});
// nextSequence();


function nextSequence(){

    userClickedPattern = [];

    
    $("#level-title").text("level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel1){
 if(gamePattern[currentLevel1] === userClickedPattern[currentLevel1])
 {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
 }


 else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");

    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
 }
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}







