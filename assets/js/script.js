const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const quitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const nextBtn = quizBox.querySelector("footer .next_btn");
const timeOff = quizBox.querySelector("header .timer .time_text");
const timeCount = quizBox.querySelector("header .timer .time_sec");
const timeLine = quizBox.querySelector("header .time_line");
const optionList = document.querySelector(".option_list");
const resultBox = document.querySelector(".result_box");
const restartBtn = resultBox.querySelector(".buttons .restart");
const endBtn = resultBox.querySelector(".buttons .quit");
let questionCount = 0;
let questionNum = 1;
let counter;
let counterLine;
let widthValue = 0;
let timeValue = 15;
let userScore = 0;
let tickIcon = /*html*/ `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = /*html*/ `<div class="icon cross"><i class="fas fa-times"></i></div>`;

startBtn.onclick = () => {
  infoBox.classList.add("active");
};

quitBtn.onclick = () => {
  infoBox.classList.remove("active");
};

continueBtn.onclick = () => {
  infoBox.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(0);
  questionCounter(1);
  startTimer(15);
  startTimerLine(0);
};

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    ++questionCount;
    ++questionNum;
    showQuestions(questionCount);
    questionCounter(questionNum);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeOff.textContent = "Time Left";
    nextBtn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();

    console.log("Question Completed!");
  }
};

restartBtn.onclick = () => {
  quizBox.classList.add("active");
  resultBox.classList.remove("active");
  questionCount = 0;
  questionNum = 1;
  widthValue = 0;
  timeValue = 15;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNum);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeOff.textContent = "Time Left";
  nextBtn.classList.remove("show");
};

endBtn.onclick = () => {
  window.location.reload();
};

function showQuestions(idx) {
  const questionText = document.querySelector(".que_text");
  let questionTag = /*html*/ `<span>${questions[idx].num}. ${questions[idx].question}</span>`;
  let optionTag = /*html*/ `
    <div class="option"><span>${questions[idx].options[0]}</span></div>
    <div class="option"><span>${questions[idx].options[1]}</span></div>
    <div class="option"><span>${questions[idx].options[2]}</span></div>
    <div class="option"><span>${questions[idx].options[3]}</span></div>
  `;

  questionText.innerHTML = questionTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }

  if (questions[idx].question != questions[questions.length - 1].question) {
    nextBtn.textContent = "Next Question";
  } else {
    nextBtn.textContent = "See Result";
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    --time;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = `0${addZero}`;
    }

    if (time < 0) {
      let correctAnswer = questions[questionCount].answer;
      let allOptions = optionList.children;

      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i].textContent === correctAnswer) {
          allOptions[i].setAttribute("class", "option correct");
          allOptions[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }

      for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add("disabled");
      }

      nextBtn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = `${time}px`;

    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children;

  clearInterval(counter);
  clearInterval(counterLine);

  if (userAnswer == correctAnswer) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);

    console.log("Answer Correct!");
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions.length; i++) {
      if (allOptions[i].textContent == correctAnswer) {
        allOptions[i].setAttribute("class", "option correct");
        allOptions[i].insertAdjacentHTML("beforeend", tickIcon);
        console.log("Answer Wrong!");
      }
    }
  }

  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.add("disabled");
  }

  nextBtn.classList.add("show");
}

function questionCounter(idx) {
  const totalQuestionText = document.querySelector(".total_que");
  let totalQuestionTag = /*html*/ `<span><p>${idx}</p>of<p>${questions.length}</p>Questions</span>`;

  totalQuestionText.innerHTML = totalQuestionTag;
}

function showResult() {
  infoBox.classList.remove("active");
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = resultBox.querySelector(".score_text");

  if (userScore == questions.length) {
    let scoreTag = /*html*/ `<span>and congrats! Your answer are all right.</span>`;

    scoreText.innerHTML = scoreTag;
  } else if (userScore >= 3) {
    let scoreTag = /*html*/ `<span>and great! You got only <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;

    scoreText.innerHTML = scoreTag;
  } else if (userScore >= 1) {
    let scoreTag = /*html*/ `<span>and nice! You got only <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;

    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = /*html*/ `<span>and sorry. Neither of your answers is correct.</span>`;

    scoreText.innerHTML = scoreTag;
  }
}
