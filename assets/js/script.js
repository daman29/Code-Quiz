var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button");
var timer = document.querySelector("#timer");
var options = document.querySelector(".options");
var viewHighscores = document.querySelector("#view-highscores");
var heading = document.querySelector("#heading");
var subheading = document.querySelector("#subheading");
var answerFeedback = document.querySelector("#answer");
var formInput = document.querySelector("#form");
var resultsDisplay = document.querySelector("#results");
var initialInput = document.querySelector("#initials");
var resultsTable = document.querySelector("#results-table");
var optionLi = [...Array(4)];
var optionA = [...Array(4)];
var highscores = [];
var liEl = [];
var lastQuestion = [];
var finalScore;
var check;
var doneCount;
var currentQuestion;
var stopTimer;
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
var pEl = document.createElement("p");
var seconds;

function startQuiz() {
  startButton.style.display = "none";
  heading.textContent = "";
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }
  startTimer();
  renderView();
}

function renderView() {
  answerFeedback.textContent = "";
  var same = true;
  if (lastQuestion.length === 0) {
    currentQuestion = Math.floor(Math.random() * questions.length);
    lastQuestion[0] = currentQuestion;
  } else {
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
  createOptions(currentQuestion);
}

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

function createOptions(currentQuestion) {
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

function startTimer() {
  var timerInterval = setInterval(function () {
    console.log(stopTimer);
    if (stopTimer !== true) {
      if (seconds > 0) {
        seconds--;
        timer.textContent = "Timer: " + seconds;
      } else {
        clearInterval(timerInterval);
        outOfTime();
      }
    } else if (stopTimer === true) {
      timer.textContent = "";
      clearInterval(timerInterval);
    }
  }, 1000);
}

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

function postResults(initials) {
  formInput.classList.add("hide");
  highscores.unshift(initials + " - " + finalScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayResults();
}

function quizComplete() {
  stopTimer = true;
  clearView();
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  finalScore = seconds;
  subheading.textContent = "Quiz complete!";
  pEl.textContent = "Your score is " + finalScore;
  subheading.appendChild(pEl);
  formInput.classList.remove("hide");
}

function checkAnswer(selected) {
  var chosenOption = "option" + selected;
  if (chosenOption === questions[currentQuestion].rightOption) {
    doneCount++;
    if (doneCount < questions.length) {
      renderView();
    } else {
      quizComplete();
    }
  } else if (chosenOption !== questions[currentQuestion].rightOption) {
    seconds = seconds - 3;
    answerFeedback.textContent = "Wrong!";
  }
}

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

function initialRender() {
  heading.textContent = "Welcome To Code Quiz";
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

function clearHighscores() {
  localStorage.clear();
  highscores = [];
  while (resultsTable.firstChild) {
    resultsTable.removeChild(resultsTable.firstChild);
  }
}

function init() {
  doneCount = 0;
  seconds = 75;
  lastQuestion = [];
  stopTimer = false;
  initialRender();
}

viewHighscores.addEventListener("click", function (event) {
  stopTimer = true;
  startButton.style.display = "none";
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  displayResults();
});

clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearHighscores();
});

backButton.addEventListener("click", init);

options.addEventListener("click", function (e) {
  var node = e.target;
  if (node && node.nodeName == "A") {
    check = checkAnswer(node.dataset.option);
  }
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initialText = initialInput.value.trim();
  if (initialText === "") {
    window.alert("Please input initials in the text field");
  } else {
    postResults(initialText);
  }
});

startButton.addEventListener("click", startQuiz);

init();
