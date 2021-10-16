import Question from "./questions.js";
import Quiz from "./Quiz.js";

const App = (() => {
  //caching the DOM

  const QuizEl = document.querySelector(".app");
  const QuizQuestionEl = document.querySelector(
    "#question-container__question"
  );
  const optionsEl = document.querySelector(".options-container__choices");
  const trackerEl = document.querySelector("#question-container__ques-no");

  const nextBtnEl = document.querySelector(".next");
  const restartBtnEl = document.querySelector(".restart");
  const noteEl = document.querySelector("#note");
  const progressBarEl = document.querySelector("#progress-bar-inner");

  //event  listeners

  const listeners = () => {
    nextBtnEl.addEventListener("click", function () {
      if (quiz.hasEnded() == false) {
        const selectedRadioEl = document.querySelector(
          'input[name="choice"]:checked'
        );

        if (selectedRadioEl) {
          const key = selectedRadioEl.getAttribute("data-order");
          quiz.guess(key);
          console.log(quiz.score);
          renderAll();
        }
      }
    });
    restartBtnEl.addEventListener("click", function () {
      quiz.score = 0;
      quiz.currentIndex = 0;
      renderAll();
      optionsEl.style.opacity = 1;
      nextBtnEl.style.opacity = 1;
    });
  };
  listeners();

  //creating questions
  const q1 = new Question(
    "Who was the First Prime Minister of India ?",
    ["Shubham Fuloria", "Narendra Modi", "Manmohan Singh", "Indira Gandhi"],
    3
  );

  const q2 = new Question(
    "Solve this mathematical Expression: 3 + 2",
    [2, 5, 3, 5],
    1
  );

  const q3 = new Question(
    "When was Javascript Invented ?",
    ["June 1995", "Aug 2001", "Yesterday", "1995"],
    1
  );

  const questionArray = new Array(q1, q2, q3);
  const quiz = new Quiz(questionArray);

  const setValue = function (el, value) {
    el.innerHTML = value;
  };

  const renderQuestion = () => {
    const question = quiz.getCurrentQuestion().question;
    setValue(QuizQuestionEl, question);
  };

  const renderChoices = () => {
    let markup = "";
    const currentChoices = quiz.getCurrentQuestion().choices;

    currentChoices.forEach(function (ele, index) {
      markup += `
        <li class="quiz-choice">
        <input
          id="choice${index}"
          type="radio"
          name="choice"
          class="choice-input"
          data-order = ${index}
        />
        <label for="choice${index}" class="choice-label">${ele}</label>
      </li>
        `;
    });
    setValue(optionsEl, markup);
  };

  console.log(quiz);
  const renderTracker = () => {
    let total_no_of_ques = quiz.questions.length;
    let current_ques_no = quiz.currentIndex + 1;
    const markup = `
        ${current_ques_no} of ${total_no_of_ques}
    `;
    setValue(trackerEl, markup);
  };

  const renderProgress = () => {
    const total_ques = quiz.questions.length;
    const curret_ques_no = quiz.currentIndex;
    const progress = (curret_ques_no / total_ques) * 100;
    progressBarEl.style.width = `${progress}%`;
  };

  const renderEndScreen = () => {
    setValue(QuizQuestionEl, `Good Job`);
    setValue(
      trackerEl,
      `Your Score is Percentage: ${(
        (quiz.score / quiz.questions.length) *
        100
      ).toFixed(2)}`
    );
    setValue(noteEl, "Completed");
    optionsEl.style.opacity = 0;
    nextBtnEl.style.opacity = 0;
  };
  const renderAll = () => {
    if (quiz.hasEnded()) {
      //render end screen
      console.log("Quiz has ended");
      renderProgress();
      renderEndScreen();
    } else {
      //1. Render the Quesiton
      renderQuestion();
      //2. Render the tracker
      renderTracker();
      //3. Render the choices
      renderChoices();
      //4. Render the Progress
      renderProgress();
      //5. Render End Screen
      //done
      //6. Restart quiz functionality
    }
  };
  return {
    renderAll: renderAll,
  };
})();

App.renderAll();
