var questionCount = 0;
var clicked = false;

function frontPage(){
	//wait 3 seconds to display clickStart

	setInterval(function(){ 
		$('#clickToStart').css("display","inline-block");

	}, 3000)
		
	$('#clickToStart').on('click',function(){
	clickedStart();
	questionTimer.runTime();

	$('.answers').on('click', function(){
		questionTimer.stopTime();
		var checkUserAnswer = $(this)[0].innerText;
		var checkedAnswer = checkAnswer(checkUserAnswer);
		createBtwQuestScreen(checkedAnswer, questionAnswerObj[questionCount].correctAnswer);
		});
	});
}
function clickedStart(){
	//once the user has clicked start hide the frontpage
	$('.frontPage').hide();

	//create template for the trivia question screens
	createTemplate();
	createQuestion(questionCount);
}
function createQuestion(questionNumber){
		$('#question').text(questionAnswerObj[questionNumber].question);
		$('#imageHolder').attr('src', questionAnswerObj[questionNumber].questionImage);
		$('#answer1').text(questionAnswerObj[questionNumber].answers[0]);
		$('#answer2').text(questionAnswerObj[questionNumber].answers[1]);
		$('#answer3').text(questionAnswerObj[questionNumber].answers[2]);	
		$('#answer4').text(questionAnswerObj[questionNumber].answers[3]);
}

function createDivWithRowContainer(){
	var newRow = $('<div class="row container">');
	return newRow;
}
function createDivWithContainer(){
	var newDiv = $('<div class="container">');
	return newDiv;
}
function createSpan(){
	var newSpan = $('<span>');
	return newSpan;
}
function createTemplate(){
	var questionRow = createDivWithRowContainer();
	questionRow.attr('id','questionRow');
	questionRow.addClass('jumbotron');
	$('#fullSiteContainer').append(questionRow);

	var image = $('<img>');
	image.attr('id', 'imageHolder');
	image.addClass('imageClass')
	$('#fullSiteContainer').append(image);

	var question = createSpan();
	question.attr('id', 'question');
	question.addClass('overallSiteText');
	$('#questionRow').append(question);

	var answerRow = createDivWithRowContainer();
	answerRow.attr('id', 'answerRow');
	$('#fullSiteContainer').append(answerRow);

	var answerContainer = createDivWithContainer();
	answerContainer.addClass('col-md-12')
	answerContainer.attr('id', 'answerContainer');
	$('#answerRow').append(answerContainer);

	
	var timerBox = createSpan();
	timerBox.attr('id', 'timerBox');
	timerBox.addClass('timer overallSiteText');
	timerBox.text(questionTimer.time);
	$('#answerContainer').before(timerBox);

	for(i = 0; i < 4; i++){
		var answerContainerRow = createDivWithRowContainer();
		answerContainerRow.addClass('answerContainerRow')
		answerContainerRow.attr('id', 'answer' + (i + 1) + 'holder');
		$('#answerContainer').append(answerContainerRow)

		var answers = createSpan();
		answers.addClass('overallSiteText answers');
		answers.attr('id', 'answer' + (i + 1));
		$('#answer' + (i + 1) + 'holder').append(answers);

		var addBreak = $('<br>');
		$('#answer' + (i + 1) + 'holder').append(addBreak);
	}
}
function checkAnswer(userAnswer){

	if(userAnswer == questionAnswerObj[questionCount].correctAnswer){
		results.correctAnswers++;
	}
	else{
		results.wrongAnswers++;
	}
	return userAnswer;
}
function newQuestion(){
	//hide responseDivs
	for(i = 0; i < 3; i++){
		$('#responseDiv' + (i + 1)).hide();
	}

	$('#questionRow').show();
	$('#imageHolder').show();
	$('#answerRow').show();

	if(questionCount != (questionAnswerObj.length - 1)){
		questionCount++;
		questionTimer.resetTime();
		questionTimer.runTime();
		createQuestion(questionCount);
	}
	else{
		$('#questionRow').remove();
		$('#answerRow').remove();	
		$('#responseDiv1').remove();
		$('#responseDiv2').empty();
		$('#imageHolder').attr('src', 'assets/images/peter-on-can.jpg');
		var finalResultToUser;
		if(results.correctAnswers > results.wrongAnswers)
			finalResultToUser = 'YOU WIN!';
		else{
			finalResultToUser = 'YOU LOSE!';
		}

		var finalScore = createSpan();
		finalScore.addClass('overallSiteText');
		finalScore.text(finalResultToUser);
		$('#responseDiv2').append(finalScore);

		$('#responseDiv2').show();
		$('#responseDiv3').show();
	}
}
function createBtwQuestScreen(userPick, correctPick){
	$('#questionRow').hide();
	$('#imageHolder').hide();
	$('#answerRow').hide();
	var addBreak = $('<br><br>');

	if(questionCount == 0){
	//create divs for response spans
	for(i = 0; i < 3; i++){
		var responseDiv = createDivWithRowContainer();
		responseDiv.attr('id', 'responseDiv' + (i + 1));
		responseDiv.addClass('overallSiteText');
		$('#fullSiteContainer').append(responseDiv);
	}

	var imageAnsHolder = $('<img>');
	imageAnsHolder.attr('id', 'imageAnsHolder');
	imageAnsHolder.attr('src', questionAnswerObj[questionCount].answerImage);
	imageAnsHolder.addClass('imageClass')
	$('#responseDiv1').append(imageAnsHolder);

	var timerBoxAnsCheck = createSpan();
	timerBoxAnsCheck.attr('id', 'timerBoxAnsCheck');
	timerBoxAnsCheck.addClass('timer overallSiteText');
	timerBoxAnsCheck.text(answerTimer.time);
	$('#responseDiv1').append(timerBoxAnsCheck);
	
	//create user and correct choice

	var userPickSpan = createSpan();
	userPickSpan.attr('id','userPick');
	userPickSpan.addClass('overallSiteText questionResults');
	userPickSpan.text('You picked: ' + userPick);
	$('#responseDiv2').append(userPickSpan);


	var correctPickSpan = createSpan();
	correctPickSpan.attr('id', 'correctPick');
	correctPickSpan.addClass('overallSiteText questionResults');
	correctPickSpan.text('Right Answer: ' + correctPick);
	$('#responseDiv2').append(correctPickSpan);


	var userRight = results.correctAnswers;
	var userWrong = results.wrongAnswers;

	userRightSpan = createSpan();
	userRightSpan.attr('id', 'userRightSpan');
	userRightSpan.addClass('overallSiteText questionResults');
	userRightSpan.text('Correct: '+ userRight);
	$('#responseDiv3').append(userRightSpan);
	
	$('#responseDiv3').append(addBreak);

	userWrongSpan = createSpan();
	userWrongSpan.attr('id', 'userWrongSpan');
	userWrongSpan.addClass('overallSiteText questionResults');
	userWrongSpan.text('Incorrect: '+ userWrong);
	$('#responseDiv3').append(userWrongSpan);
	}
	else{
		for(i = 0; i < 3; i++){
			$('#responseDiv' + (i + 1)).show();
		}
		$('#imageAnsHolder').attr('src', questionAnswerObj[questionCount].answerImage);
		$('#userPick').text('You picked: ' + userPick);
		$('#correctPick').text('Right Answer: ' + correctPick);
		$('#userRightSpan').text('Correct: ' + results.correctAnswers);
		$('#userWrongSpan').text('Incorrect: ' + results.wrongAnswers);
	}
	answerTimer.runTime();
}
//questions object
var questionAnswerObj = [{
	question: 'Who\'s this\? ',
	answers: ['Who cares\?', 'Ewwwwwww', 'Gross', 'Shut up, Meg'],
	correctAnswer: 'Shut up, Meg',
	questionImage: 'assets/images/meg.jpg',
	answerImage: 'assets/images/shutupmeg.jpeg'
},
{
	question: 'Who is Stewie\'s best friend\?',
	answers: ['Meg','Lois','Chris', 'Rupert'],
	correctAnswer: 'Rupert',
	questionImage: 'assets/images/stewie.gif',
	answerImage: 'assets/images/stewie-rupert.jpg'
},
{
	question: 'The Griffins live on which street\?',
	answers: ['Broadway','Spooner','Evergreen', 'Quahog'],
	correctAnswer: 'Spooner',
	questionImage: 'assets/images/house.jpg',
	answerImage: 'assets/images/spooner.jpg'
},
{
	question: 'What does Quagmire do for a living\?',
	answers: ['Pilot','Garbage Man','Banker', 'Women'],
	correctAnswer: 'Pilot',
	questionImage: 'assets/images/quagmire.png',
	answerImage: 'assets/images/qpilot.jpg'
},
{
	question: 'How long has Bonnie been pregnant\?',
	answers: ['4 months','1 month','8 months', 'The whole freakin\' show!'],
	correctAnswer: 'The whole freakin\' show!',
	questionImage: 'assets/images/Bonny.png',
	answerImage: 'assets/images/Bonny.png'
}
];
var results = {
	correctAnswers:0,
	wrongAnswers: 0
}
var questionTimer = {
	time: 30,

	resetTime: function(){
		questionTimer.time = 30;
		$('#timerBox').html(questionTimer.time);
	},
	checkTime: function(){
		questionTimer.time--;
		if(questionTimer.time == 0){
			questionTimer.stopTime();
			//user picked nothing
			var userPickedNothing = 'Nothing!';
			results.wrongAnswers++;
			createBtwQuestScreen(userPickedNothing, questionAnswerObj[questionCount].correctAnswer);
		}
		else{
			$('#timerBox').html(questionTimer.time);
		}
	},
	runTime: function(){
		counter = setInterval(questionTimer.checkTime, 1000);
	},
	stopTime: function(){
		clearInterval(counter);
	}
}
var answerTimer = {
	time: 5,
	
	resetTime: function(){
		answerTimer.time = 5;
		$('#timerBoxAnsCheck').html(answerTimer.time);
	},
	checkTime: function(){
		answerTimer.time--;
		if(answerTimer.time == 0){
			answerTimer.stopTime();
			answerTimer.resetTime();
			newQuestion();
		}
		else{
			$('#timerBoxAnsCheck').html(answerTimer.time);
		}
	},
	runTime: function(){
		counterAnsTimer = setInterval(answerTimer.checkTime, 1000);
	},
	stopTime: function(){
		clearInterval(counterAnsTimer);
	}
}
$(document).ready(function(){

	frontPage();

});