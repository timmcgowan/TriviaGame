/*
Trivia Game by Tim
Prototype game, that tests your knowledge around the US Marine Corps, and a few other historic questions.
*/

// Globals
var endgame; // To track when game ends
var timerSeconds = 30; // configurable "seconds"
var correct  // Track number of correct answers
var incorrect  // Track number of incorrect answers


// Timer logic & running Display
function updateTimer(sec){
    console.log(sec);
    $("#timer").text("00:" + pad2(sec));
    if (sec > 10) {
        $("#timer").attr("class","timer-green");
    } else if ((sec < 10)&&(sec > 0)) {
        $("#timer").attr("class","timer-red");
    } else {
        $("#timer").attr("class","timer-red");
        endgame = true;
        $("#message").html("<h1>Out of Time, Game Over!</h1>");
        $("#start").text("Play Again?").fadeIn();
    }
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
    // Setup Count Down Clock
    gameCounter.start();
    getQuestion();
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
    if (!qid){qid = 0};
	//sets up new questions & answerList
	$('#message').html('Question # '+ (qid + 1) +'/'+ qObj.length);
    $('#message').html('<h1>' + qObj[qid].question + '</h1>');
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

// Answer Evaluator
function selAnswer(choice,qid){
    console.log("choice " + choice);
    console.log("qid " + qid);
	var rightAnswerText = qObj[qid].options[qObj[qid].answer];
    var rightAnswerIndex = qObj[qid].answer;
    console.log("RI " + rightAnswerIndex);
    console.log("Rtext " + rightAnswerText);
	//checks to see correct, incorrect, or unanswered
	if(choice === rightAnswerIndex){
        correct++;
        $('#message').html("correct");
        qid++
        getQuestion(qid);
	} else if(choice != rightAnswerIndex){
        incorrect++;
        $('#message').html('<em>Incorrect Choice</em> -> The correct answer was: ' + rightAnswerText);
	} else {
		$('#message').html('The correct answer was: ' + rightAnswerText);
    }
    
}

// Answer Selector 

$(document).on('click', '.choices', function () {
    let choice = $(this).attr("data-index");
    let qid = $(this).attr("data-key");
    if (!endgame){
        selAnswer(choice,qid);
    }else{
        $('#message').html("<h1>Your Game is over</h1>");
    }
});

// Score Keeper, Calculator & Display

// Game Restart