var number1 = Math.floor(Math.random()*4);

var buttonColours = ["red","blue","green","yellow"];
var randomChosenColours = [];
var gamePattern = [];
var useClickPattern = [];
var initSound = "wrong";
var track = 0;
var level = 0;
var numCheck = 0;


$(document).keypress(function() {
    if(track <1) {
    nextSequence();
    track++;
    }
});

$(`#${buttonColours[number1]}`).addClass("pressed");
setTimeout(()=>$(`#${buttonColours[number1]}`).removeClass("pressed"), 60);

//  Set userChosenColour
$(".btn").click(function (){
    var userChosenColour = $(this).attr("id"); 
    useClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(useClickPattern.length-1);
})
    
function checkAnswer(currentLevel) {
    if (useClickPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        if (useClickPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1500*(i+1));
            
        }
    }else{
        console.log('wrong');
        playSound(initSound);
        $("h1").html("Game over, press any key to restart.")
        $(`body`).addClass("game-over");
        $(`body`).on("keypress", startOver);
        setTimeout(()=>$(`body`).removeClass("game-over"), 200);
        
    }
}

function nextSequence(){
    useClickPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);
    hintSequence(gamePattern);
    console.log(gamePattern+" game pattern");
    playSound(randomColour);
    $("h1").html("Level "+level);
    level++
}

function hintSequence(array){

    for (let i = 0; i< array.length; i++){
        setTimeout(()=>{animatePressSequence(array[i])}, 1000*(i+1));
    }

}

function playSound(colour) {
    var audio = new Audio(`./sounds/${colour}.mp3`);
    audio.play();
}

function animatePress(animate){
    $(`#${animate}`).addClass("pressed");
    setTimeout(()=>$(`#${animate}`).removeClass("pressed"), 100);
}
function animatePressSequence(animate){
    $(`#${animate}`).addClass("pressed2");
    playSound(animate)
    setTimeout(()=>$(`#${animate}`).removeClass("pressed2"), 500);
}


function startOver(){
    track = 0;
    level = 0;
    numCheck = 0;
    randomChosenColours = [];
    gamePattern = [];
    useClickPattern = [];
    $("h1").html("Level "+level);
}