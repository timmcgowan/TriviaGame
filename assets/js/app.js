/*
Trivia Game by Tim
Prototype game, that tests your knowledge around the US Marine Corps, and a few other historic questions.
*/

// Globals
var gameover; // To track when game ends
var timerSeconds = 45; // configurable "seconds"
var correct;  // Track number of correct answers
var incorrect; // Track number of incorrect answers
var win; // no... 


// Winning Score is correctly answering 80% of the questions.
function calculateWinScore(arr){
    let number = arr.length;
    let percent= (70 / 100);
    let result = ((number)*(percent));
    return Math.floor(result)
}
function endGame(){
    gameover=true;
    gameCounter.stop();
    let win = calculateWinScore(qObj);//the winning score
    console.log("Winning Score is " + win);

    let _message ; // place holder
    let _par ;
    console.log("correct qty is " + correct);
    if (correct >= win){
        _message = $("<h1>").html("You are a winner!")
        _par = $("<p>").text("You are a Rockstar! Please play again.");
    } else {
        _message = $("<h1>").html("You have lost!")
        _par = $("<p>").text("You most score at least " + win + " to win. Please try again.");
    }
    $("#message").html(_message).append(_par);
    $("#start").text("Play Again?").fadeIn();
}

// Timer logic & running Display
function updateTimer(sec){
    console.log(sec);
    $("#timer").text("00:" + pad2(sec));
    if (sec > 10) {
        $("#timer").attr("class","timer-green");
    } else if (sec > 0) {
        $("#timer").attr("class","timer-red");
    } else {
        $("#timer").attr("class","timer-red");
        endGame();
        $("#message").html("<h1>Out of Time, Game Over!</h1>");
        //$("#start").text("Play Again?").fadeIn();
    }
}
function updateScore(){
    let correct_text = $("<p style='color:green'>").text("Correct Answers: " + correct);
    let incorrect_text = $("<p style='color:red'>").text("Incorrect Answers: " + incorrect);
    $("#scorediv").html("<h1>Score</h1>").append(correct_text).append(incorrect_text);
}

// Format proper seconds display
function pad2(number) {
    return (number < 10 ? '0' : '') + number  
}

// Countdown Clock, help from stackoverflow
function Countdown(options) {
    var timer,
    instance = this,
    seconds = options.seconds || 10,
    updateStatus = options.onUpdateStatus || function () {},
    counterEnd = options.onCounterEnd || function () {};

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
        counterEnd();
        instance.stop();
        }
        seconds--;
    }
    
    this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };
    
    this.stop = function () {
        clearInterval(timer);
    };
}

// Initialize Countdown
var gameCounter = new Countdown({  
    seconds: timerSeconds,  // number of seconds to count down
    onUpdateStatus: function(sec){updateTimer(sec)}, // callback for each second
    onCounterEnd: function(){ alert('Out of Time, Game Over!');} // final action
});

// The Game Starter
function startGame(){
    correct = 0;  // reset correct answers
    incorrect = 0; //reset incorret
    win = 0; //reset win
    gameover = false;
    updateScore(); //clear scoreboard
    gameCounter.start(); // Start Count Down Clock
    getQuestion(0); // start with 0 (first question)
}

//  Start Game on click.
$(document).ready(function(){
    $("#start").click(function(){
        $(this).fadeOut();
        startGame();
    });
});

// Verify Questions exits.

// Question selector & Display
function getQuestion(qid){
    var ql = qObj.length ; // max questions
    // if no question selected, start at beginning
    if (!qid){qid = 0;} 
    //sets up new questions & answerList
    console.log("last clicked" + qid);
    console.log("ql = " + ql);
    if (qid === ql){
        endGame()
    }else{
        $('#message').html('Question # '+ (qid + 1) +'/'+ ql);
        $('#message').append('<h1>' + qObj[qid].question + '</h1>');
        let ol = qObj[qid].options.length;
        for(var i = 0; i < ol; i++){
            var choices = $('<div class="choices">');
            choices.text(qObj[qid].options[i]);
            choices.attr({'data-index': i });
            choices.attr({'data-key': qid });
            choices.addClass('thisChoice');
            $('#message').append(choices);
        } 
    }
}

// Answer Evaluator
function selAnswer(choice,qid){
    console.log("choice " + choice);
    console.log("qid " + qid);
	var rightAnswerText = qObj[qid].options[qObj[qid].answer];
    var rightAnswerIndex = qObj[qid].answer;
    
    console.log("RI " + rightAnswerIndex);
    console.log("Rtext " + rightAnswerText);
    
    //checks to see correct, incorrect, or unanswered
	if (choice === rightAnswerIndex){
        correct++;
        $('#message').html("correct");
 	} else {
        incorrect++;
        $('#message').html('<em>Incorrect Choice</em> -> The correct answer was: ' + rightAnswerText);
    }
    updateScore();// update score

    qid++
    console.log("SEL QID PLUS " + qid);
    getQuestion(qid);
}

// Answer Select event 

$(document).on('click', '.choices', function () {
    let choice = $(this).attr("data-index");
    let qid = $(this).attr("data-key");

    // Check click input
    if (!gameover){
        selAnswer(choice,qid);
        console.log("sel_ " + choice + ":"+ qid)
    } else {
        endGame();
    }

});

// Score Keeper, Calculator & Display

// Game Restart