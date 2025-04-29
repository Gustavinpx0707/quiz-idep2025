const questions = [
  // [as 20 perguntas exatamente como já enviei antes]
];

const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const playerNameDisplay = document.getElementById('player-name-display');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let seconds = 15;
let playerName = '';

function startGame() {
  playerName = document.getElementById('player-name').value || 'Jogador';
  document.getElementById('menu-screen').classList.remove('active');
  document.getElementById('quiz-screen').classList.add('active');
  playerNameDisplay.innerHTML = `👤 ${playerName}`;
  score = 0;
  currentQuestionIndex = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  let current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;

  let options = [...current.options, current.correct];
  options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    if (option === current.correct) button.dataset.correct = 'true';
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  seconds = 15;
  timerEl.textContent = '15s';
  nextButton.style.display = 'none';
  backButton.style.display = 'inline-block';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);
  const selected = e.target;
  const isCorrect = selected.dataset.correct === 'true';

  if (isCorrect) {
    selected.classList.add('correct');
    score++;
    scoreEl.textContent = `Pontos: ${score}`;
  } else {
    selected.classList.add('wrong');
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    }
  });

  nextButton.style.display = 'inline-block';
}

function startTimer() {
  timer = setInterval(() => {
    seconds--;
    timerEl.textContent = `${seconds}s`;
    if (seconds === 0) {
      clearInterval(timer);
      selectAnswer({ target: { dataset: {}, classList: { add(){} } } });
    }
  }, 1000);
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = `Fim do jogo, ${playerName}! Você acertou ${score} de ${questions.length} perguntas.`;
    answerButtons.innerHTML = '';
    nextButton.innerText = 'Jogar Novamente';
    nextButton.style.display = 'inline-block';
    nextButton.onclick = startGame;
  }
});

backButton.addEventListener('click', () => {
  clearInterval(timer);
  document.getElementById('quiz-screen').classList.remove('active');
  document.getElementById('menu-screen').classList.add('active');
});
