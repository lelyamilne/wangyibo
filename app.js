

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availebleQuestions = [];
let availebleOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailebleQuestions(){
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++){
    	availebleQuestions.push(quiz[i]);
    }
}
//set question number and question and options
function getNewQuestion(){
	//set question question number
	questionNumber.innerHTML = "Вопрос " + (questionCounter + 1) + " из " + quiz.length

	//set question text
	//get random question
	const questionIndex = availebleQuestions[Math.floor(Math.random() * availebleQuestions.length)]
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	// get the position of 'questionIndex' from the availebleQuestion Arrey;
	const index1 = availebleQuestions.indexOf(questionIndex);
	//remove the 'questionIndex' from the availebleQuestion Arrey, so that the question does not repeat
	availebleQuestions.splice(index1, 1);
	
	if(currentQuestion.hasOwnProperty("img")){
		const img = document.createElement("img");
		img.src = currentQuestion.img;
		questionText.appendChild(img);
	}
	
	
	//set options
	//get the lenth of options
	const optionLen = currentQuestion.options.length
	//push options into availebleOptions Array
	for(let i = 0; i < optionLen; i++){
		availebleOptions.push(i)
	}
	optionContainer.innerHTML = '';
	let animationDelay = 0.2;
	//create options ininnerHTML
	for(let i = 0; i < optionLen; i++){
		//random option
		const optonIndex = availebleOptions[Math.floor(Math.random() * availebleOptions.length)];
		//get the position of 'optonIndex' from the availebleOptions Array
		const index2 = availebleOptions.indexOf(optonIndex);
		//remove the 'optonIndex' from the availebleOptions Array, so that the option does not repeat
		availebleOptions.splice(index2, 1);
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optonIndex];
		option.id = optonIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.15;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick", "getResult(this)");
	} 
	questionCounter++
}
// get the result of current attempt question
function getResult(element){
	const id = parseInt(element.id);
	//get the answer by comparing thr id of clicked option
	if(id === currentQuestion.answer){
		//set the yellow color to the correct option
		element.classList.add("correct");
		correctAnswers++;
	}
	else{
		//set the gray color to the incorrect option
		element.classList.add("wrong");
		//if the answeris incorrect the show the correct option by adding yellow color the correct option
		const optionLen = optionContainer.children.length;
		for (let i = 0; i < optionLen; i++){
			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
  attempt++;
  unclickableOptions();
}
// make all the options unclikcable once the user select a option (RESTRICT THE USEER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i = 0; i < optionLen; i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}


function next(){
	if(questionCounter === quiz.length){
		quizOver();
	}
	else{
		getNewQuestion();
	}
}
function quizOver(){
	//hide quiz Box
	quizBox.classList.add("hide");
	//show result Box
	resultBox.classList.remove("hide");
	quizResult(); 
}
//get the quiz Result
function quizResult(){
	resultBox.querySelector(".total-question").innerHTML = quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML = attempt;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
	const percentage = (correctAnswers / quiz.length) * 100;
	resultBox.querySelector(".total-procentage").innerHTML = percentage.toFixed() + "%"; 
	resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length; 
}
function resetQuiz(){
	questionCounter = 0;
	correctAnswers = 0;
	attempt = 0;
}

function tryAgainQuiz(){
	// hide the resultBox
	resultBox.classList.add("hide");
	// show the quizBox
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}
//#### STARTING POING ####

function startQuiz(){
	// hide home box
	homeBox.classList.add("hide");
	// show quiz Box
	quizBox.classList.remove("hide");
    // first we will set all questions in availebleQuestions Array
    setAvailebleQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
}

window.onload = function (){
	homeBox.querySelector(".total-question").innerHTML = quiz.length;
}