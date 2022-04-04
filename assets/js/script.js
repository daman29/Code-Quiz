var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button");
var timer = document.querySelector("#timer");
var options = document.querySelector(".options");
var viewHighscores = document.querySelector("#view-highscores");
var heading = document.querySelector("#heading");
var subheading = document.querySelector("#subheading");
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
  question: "question1",
  option0: "option1",
  option1: "option2",
  option2: "option3",
  option3: "option4",
  rightOption: "option3",
};
var question2 = {
  question: "question2",
  option0: "option21",
  option1: "option22",
  option2: "option23",
  option3: "option24",
  rightOption: "option0",
};
var question3 = {
  question: "question3",
  option0: "option21",
  option1: "option22",
  option2: "option23",
  option3: "option24",
  rightOption: "option0",
};
var questions = [question1, question2, question3];
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
  var same = true;
  if (lastQuestion.length === 0) {
    currentQuestion = Math.floor(Math.random() * questions.length);
    lastQuestion[0] = currentQuestion
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
    for (let j = 0; j < 4; j++) {
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
    console.log("incorrect");
  }
}

function outOfTime() {
  clearView();
  timer.textContent = "Time is up";
  subheading.textContent = "Sorry you ran out of time. Better luck next time";
  resultsDisplay.classList.remove("hide");
  clearButton.style.display = "none";
}

function initialRender() {
  heading.textContent = "Welcome To Javascript Code Quiz";
  subheading.textContent = "Press start button to start the quiz";
  startButton.style.display = "block";
  clearButton.style.display = "inline-block";
  initialInput.textContent = "";
  timer.textContent = "Timer: " + seconds;
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
  stopTimer = false;
  doneCount = 0;
  seconds = 30;
  lastQuestion = [];
  initialRender();
}

viewHighscores.addEventListener("click", function (event) {
  //   event.preventDefault();
  stopTimer = true;
  startButton.style.display = "none";
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
