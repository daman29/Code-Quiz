// variable declaration
// buttons selectors
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button");
// timer text selector
var timer = document.querySelector("#timer");
// Questions answer options lists selector
var options = document.querySelector(".options");
//view highscore button
var viewHighscores = document.querySelector("#view-highscores");
// text fields selectors
var heading = document.querySelector("#heading");
var subheading = document.querySelector("#subheading");
var answerFeedback = document.querySelector("#answer");
var formInput = document.querySelector("#form");
var resultsDisplay = document.querySelector("#results");
var initialInput = document.querySelector("#initials");
var resultsTable = document.querySelector("#results-table");
//empty array of 'li' elements and 'a' elements
var optionLi = [...Array(4)];
var optionA = [...Array(4)];
// empty array of highscores
var highscores = [];
var liEl = [];
var lastQuestion = [];
//check and counter variables
var finalScore;
var check;
var doneCount;
var currentQuestion;
var stopTimer;
//question objects with answer choices and correct answer properties
var question1 = {
  question: "Which type of JavaScript language is ___",
  option0: "Object-Oriented",
  option1: "Object-Based",
  option2: "Assembly-language",
  option3: "High-level",
  rightOption: "option1",
};
var question2 = {
  question: "Which one of the following also known as Conditional Expression:",
  option0: "Alternative to if-else",
  option1: "Switch statement",
  option2: "If-then-else statement",
  option3: "immediate if",
  rightOption: "option3",
};
var question3 = {
  question: "In JavaScript, what is a block of statement?",
  option0: "Conditional block",
  option1:
    "block that combines a number of statements into a single compound statement",
  option2: "both conditional block and a single statement",
  option3: "block that contains a single statement",
  rightOption: "option1",
};
var question4 = {
  question: 'The "function" and "var" are known as:',
  option0: "Keywords",
  option1: "Data types",
  option2: "Declaration statements",
  option3: "Prototypes",
  rightOption: "option2",
};
var question5 = {
  question: "What does DOM stand for?",
  option0: "Domain of Mathematics",
  option1: "Document orientated model",
  option2: "Document object model",
  option3: "Document object material",
  rightOption: "option2",
};
var question6 = {
  question:
    "Which of the following number object function returns the value of the number?",
  option0: "toString()",
  option1: "valueOf()",
  option2: "toLocaleString()",
  option3: "toPrecision()",
  rightOption: "option1",
};
var question7 = {
  question:
    "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
  option0: "slice()",
  option1: "split()",
  option2: "substr()",
  option3: "search()",
  rightOption: "option2",
};
var question8 = {
  question: "In JavaScript the x===y statement implies that:",
  option0:
    "Both x and y are equal in value, type and reference address as well.",
  option1: "Both are x and y are equal in value only.",
  option2: "Both are equal in the value and data type.",
  option3: "Both are not same at all.",
  rightOption: "option2",
};
var question9 = {
  question:
    "Which of the following given functions of the Number Object formats a number with a different number of digits to the right of the decimal?",
  option0: "toExponential()",
  option1: "toFixed()",
  option2: "toPrecision()",
  option3: "toLocaleString()",
  rightOption: "option1",
};
var question10 = {
  question:
    "Which of the following variables takes precedence over the others if the names are the same?",
  option0: "Global variable",
  option1: "The local element",
  option2: "The two of the above",
  option3: "None of the above",
  rightOption: "option1",
};
//array with all the questions
var questions = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
];
// p element
var pEl = document.createElement("p");
//seconds variable declaration
var seconds;

//function to start the quiz from the start button
function startQuiz() {
  startButton.style.display = "none";
  heading.textContent = "";
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }
  //function then calls the start timer function and render view functions to rended the questions
  startTimer();
  renderView();
}

// function to print questions and their options
function renderView() {
  answerFeedback.textContent = "";
  var same = true;
  //check if first question is being printed then chooses a random question from the question array
  if (lastQuestion.length === 0) {
    currentQuestion = Math.floor(Math.random() * questions.length);
    lastQuestion[0] = currentQuestion;
  } else {
    // if not the first question chooses a random question from the array and checks if it has been chosen before. if yes then chooses another random one else prints it.
    while (same) {
      currentQuestion = Math.floor(Math.random() * questions.length);
      if (lastQuestion.includes(currentQuestion)) {
        same = true;
      } else {
        lastQuestion.push(currentQuestion);
        same = false;
      }
    }
  }
  subheading.textContent = questions[currentQuestion].question;
  //creates 'li' and 'a' elements with all the answer choices
  createOptions(currentQuestion);
}

//function to clear all the text fields and tables.
function clearView() {
  heading.textContent = "";
  subheading.textContent = "";
  pEl.textContent = "";
  resultsTable.textContent = "";
  viewHighscores.textContent = "";
  timer.textContent = "";
  initialInput.textContent = "";
  if (optionA[0] !== undefined) {
    for (let j = 0; j < optionA.length; j++) {
      optionA[j].textContent = "";
    }
  }
}

//function to create list of multiple answers for each question
function createOptions(currentQuestion) {
  //check if first question then generates new elements else changes value of existing elements
  if (doneCount === 0) {
    for (let z = 0; z < 4; z++) {
      var currentOption = "option" + z;
      optionLi[z] = document.createElement("li");
      optionA[z] = document.createElement("a");
      optionA[z].setAttribute("data-option", z);
      optionA[z].setAttribute("href", "#");
      optionA[z].textContent = questions[currentQuestion][currentOption];
      options.appendChild(optionLi[z]);
      optionLi[z].appendChild(optionA[z]);
    }
  } else {
    for (let j = 0; j < 4; j++) {
      var currentOption = "option" + j;
      optionA[j].textContent = questions[currentQuestion][currentOption];
    }
  }
}

//function to start and stop timer
function startTimer() {
  var timerInterval = setInterval(function () {
    console.log(stopTimer);
    if (stopTimer !== true) {
      if (seconds > 0) {
        seconds--;
        timer.textContent = "Timer: " + seconds;
      } else {
        //if time runs out then run outOfTime function
        clearInterval(timerInterval);
        outOfTime();
      }
    } else if (stopTimer === true) {
      //if stop timer is passed to this function then stop the timer and print empty string for timer
      timer.textContent = "";
      clearInterval(timerInterval);
    }
  }, 1000);
}

//displays the highscores in a 'ul' element
function displayResults() {
  clearView();
  viewHighscores.style.display = "none";
  for (let i = 0; i < highscores.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = highscores[i];
    resultsTable.appendChild(liEl);
  }
  subheading.textContent = "Highscores";
  resultsDisplay.classList.remove("hide");
}

// posts the final score and updates the highscore array with the latest score
function postResults(initials) {
  formInput.classList.add("hide");
  highscores.unshift(initials + " - " + finalScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayResults();
}

//if all questions are answered correctly before time runs out the score is printed and user is prompted to enter initials and save score
function quizComplete() {
  stopTimer = true;
  clearView();
  //while there are options in the 'ul' element then keep removing them
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  finalScore = seconds;
  subheading.textContent = "Quiz complete!";
  pEl.textContent = "Your score is " + finalScore;
  subheading.appendChild(pEl);
  formInput.classList.remove("hide");
}

//function to check answer that user has selected
function checkAnswer(selected) {
  var chosenOption = "option" + selected;
  //if selected answer is the correct answer then either keep printing questions or end quiz
  if (chosenOption === questions[currentQuestion].rightOption) {
    doneCount++;
    //if questions remain in the array then keep printing new questions
    if (doneCount < questions.length) {
      renderView();
      //else run quizComplete function
    } else {
      quizComplete();
    }
  } else if (chosenOption !== questions[currentQuestion].rightOption) {
    //if chosen answer is wrong then minus 3 seconds from the timer and give user feedback that the selection is wrong
    seconds = seconds - 3;
    answerFeedback.textContent = "Wrong!";
  }
}

//outOfTime function to let user know they are out of time and provide button to reset quiz
function outOfTime() {
  clearView();
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  timer.textContent = "Time is up";
  subheading.textContent = "Sorry you ran out of time. Better luck next time";
  resultsDisplay.classList.remove("hide");
  clearButton.style.display = "none";
}

//initial screen render
function initialRender() {
  heading.textContent = "Welcome To Coding Quiz Challenge";
  subheading.textContent =
    "This quiz is a multiple choice questions quiz. Each wrong answer will minus 3 seconds from your time remaining. At the end the remaining time will be your score. You will be able to submit your score into the leader board. Press start button to start the quiz.";
  startButton.style.display = "block";
  clearButton.style.display = "inline-block";
  answerFeedback.textContent = "";
  initialInput.textContent = "";
  timer.textContent = "Timer: " + seconds;
  viewHighscores.style.display = "inline-block";
  viewHighscores.textContent = "View Highscores";
  resultsDisplay.classList.add("hide");
}

//clear highscore if the clear button is pressed
function clearHighscores() {
  //delete data from local storage
  localStorage.clear();
  highscores = [];
  while (resultsTable.firstChild) {
    resultsTable.removeChild(resultsTable.firstChild);
  }
}

//initialization function
function init() {
  doneCount = 0;
  seconds = 75;
  lastQuestion = [];
  stopTimer = false;
  initialRender();
}

//event listener on the view highscore button
viewHighscores.addEventListener("click", function (event) {
  stopTimer = true;
  startButton.style.display = "none";
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  displayResults();
});

//event listener on the clear button
clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearHighscores();
});

// event listener on the back button
backButton.addEventListener("click", init);

//event listener on the options for each question
options.addEventListener("click", function (e) {
  var node = e.target;
  if (node && node.nodeName == "A") {
    check = checkAnswer(node.dataset.option);
  }
});

//event listener on the submit highscore button
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initialText = initialInput.value.trim();
  if (initialText === "") {
    window.alert("Please input initials in the text field");
  } else {
    postResults(initialText);
  }
});

//event listener on the start button
startButton.addEventListener("click", startQuiz);

//initialise the quiz when the JS finished loading
init();
