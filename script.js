const questions = [
  {
    question: "Quem dirigiu o filme 'A Origem' (Inception)?",
    answers: shuffleAnswers([
      { text: "Steven Spielberg", correct: false },
      { text: "Christopher Nolan", correct: true },
      { text: "James Cameron", correct: false },
      { text: "Martin Scorsese", correct: false }
    ])
  },
  // Adicione mais perguntas se quiser
];

const startButton = document.getElementById('start-btn');
const usernameInput = document.getElementById('username');
const quizContainer = document.getElementById('quiz-container');
const startContainer = document.getElementById('start-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const menuButton = document.getElementById('menu-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const playerName = document.getElementById('player-name');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;
let player = "";

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});
menuButton.addEventListener('click', returnMenu);

function startQuiz() {
  player = usernameInput.value.trim();
  if (!player) {
    alert("Digite seu nome para começar!");
    return;
  }
  playerName.innerText = `Boa sorte, ${player}!`;
  startContainer.classList.add('hide');
  quizContainer.classList.remove('hide');
  shuffledQuestions = shuffleArray(questions).slice(0, 20);
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = "Pontos: 0";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
    scoreElement.innerText = `Pontos: ${score}`;
  } else {
    selectedBtn.classList.add('wrong');
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.classList.remove('hide');
}

function showScore() {
  resetState();
  clearInterval(timer);
  questionElement.innerText = `Parabéns ${player}! Você acertou ${score} de ${shuffledQuestions.length} perguntas!`;
  playerName.innerText = '';
  nextButton.classList.add('hide');
}

function startTimer() {
  let timeLeft = 15;
  timerElement.innerText = `Tempo: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Tempo: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer({ target: { dataset: { correct: "false" } } });
    }
  }, 1000);
}

function returnMenu() {
  clearInterval(timer);
  quizContainer.classList.add('hide');
  startContainer.classList.remove('hide');
  usernameInput.value = "";
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function shuffleAnswers(answers) {
  return shuffleArray(answers);
}
