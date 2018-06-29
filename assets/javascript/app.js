var triviaQuestions = [{
	question: "Ren Solo now leads the:?",
	answerList: ["New Sith Order", "Knights of Ren", "First Order"],
	answer: 1
},{
	question: "Obi-Wan learned to become one with the force from:?",
	answerList: ["Qui-Gon-Jinn", "Mace Windu", "Yoda"],
	answer: 0
},{
	question: "Darth Vader cuts of Luke's_____hand?",
	answerList: ["Right", "Left"],
	answer: 0
},{
	question: "Han Solo obtains the rank of _____ during the Galactic Civil War.?",
	answerList: ["Commander", "Admiral", "General"],
	answer: 2
},{
	question: "Who has the first line in A New Hope?",
	answerList: ["Luke Skywalker", "R2-D2", "C-3PO", "Princess Leila"],
	answer: 3
},{
	question: "Luke Skywalker's self-imposed exile takes place on:?",
	answerList: ["Ach-to", "Takodana", "Dagobah"],
	answer: 0
},{
	question: "How old is Yoda when he passes?",
	answerList: ["700", "900", "800", "was omitted from the films"],
	answer: 1
},{
	question: "What color lasers do the Tie Fighters shoot?",
	answerList: ["Red", "Orange", "Green"],
	answer: 2
},{
	question: "Which of these last names does Leia NOT have a family connection to?",
	answerList: ["Skywalker", "Fett", "Amidala", "Organa"],
	answer: 1
},{
	question: "Who founded the Resistance?",
	answerList: ["Count Dooku", "Po Dameron", "Admiral Ackbar", "Leia Organa"],
	answer: 3
},{
	question: "George Lucas' orginal las name for Luke was?",
	answerList: ["Starkiller", "Skykiller", "Starwalker"],
	answer: 0
},{
	question: "Yoda claims that Luke's training will not be complete until he:?",
	answerList: ["Discovers the truth about Leia", "Faces Darth Vader", "Builds a Lighsaber"],
	answer: 1
},{
	question: "What is the name of Luke's childhood best friend, who later served alongside him in the rebellion?",
	answerList: ["Jyn Erso", "Wedge Antilles", "Nien Numb", "Biggs Darklighter"],
	answer: 3
},{
	question: "Who's father is responsible for the first Death Star's fatal flaw?",
	answerList: ["Jyn Erso", "Rey", "Rose Tico"],
	answer: 0
},{
	question: "Rey is a scavenger from _____ ?",
	answerList: ["Takodana", "Utapau", "Jakku", "Tatooine"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var wrongAnswer; var unanswered; var seconds; var time; var answered; var userChoice;
var messages = {
	correct: "That's Awesome, you're right!!",
	incorrect: "Nope, the force is not strong with you",
	endTime: "Out of time!",
	finished: "So, let's see if the force is stong with you"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userChoice == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userChoice != rightAnswerIndex) && (answered == true)){
		wrongAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + wrongAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}