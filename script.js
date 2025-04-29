const questions = [
  {
    question: "Quem dirigiu o filme 'A Origem' (Inception)?",
    correct: "Christopher Nolan",
    options: ["Martin Scorsese", "James Cameron", "Christopher Nolan", "Steven Spielberg"]
  },
  {
    question: "Qual filme ganhou o Oscar de Melhor Filme em 2020?",
    correct: "Parasita",
    options: ["1917", "Coringa", "Parasita", "Era Uma Vez em... Hollywood"]
  },
  {
    question: "Quem interpretou o Coringa em 'O Cavaleiro das Trevas'?",
    correct: "Heath Ledger",
    options: ["Joaquin Phoenix", "Heath Ledger", "Jared Leto", "Jack Nicholson"]
  },
  {
    question: "Em que ano foi lançado o primeiro filme dos Vingadores?",
    correct: "2012",
    options: ["2010", "2012", "2014", "2008"]
  },
  {
    question: "Qual personagem diz a frase 'Eu sou o rei do mundo!'?",
    correct: "Jack em Titanic",
    options: ["Forrest Gump", "Tony Stark", "Jack em Titanic", "Simba"]
  },
  // adicione até 20 assim
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let seconds = 0;
let playerName = "";

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const nameDisplayEl = document.getElementById("name-display");
const menuEl = document.getElementById("menu");
const quizEl = document.getElementById("quiz-container");

function startGame() {
  const input = document.getElementById("player-name");
  playerName = input.value.trim() || "Jogador";
  nameDisplayEl.textContent = playerName;
  score = 0;
  seconds = 0;
  currentQuestionIndex = 0;
  menuEl.classList.add("hide");
  quizEl.classList.remove("hide");
  updateScore();
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = `${seconds}s`;
  }, 1000);
}

function updateScore() {
  scoreEl.textContent = score;
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  if (!q) {
    questionEl.textContent = "Quiz finalizado!";
    answersEl.innerHTML = `<p>Pontuação final: ${score}</p><button onclick="backToMenu()">Voltar ao Menu</button>`;
    clearInterval(timerInterval);
    return;
  }

  questionEl.textContent = q.question;

  const shuffledOptions = q.options.sort(() => Math.random() - 0.5);
  answersEl.innerHTML = "";

  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option, q.correct, btn);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(selected, correct, btn) {
  const allBtns = document.querySelectorAll(".answer-btn");
  allBtns.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    allBtns.forEach(b => {
      if (b.textContent === correct) {
        b.classList.add("correct");
      }
    });
  }

  updateScore();
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

function backToMenu() {
  clearInterval(timerInterval);
  quizEl.classList.add("hide");
  menuEl.classList.remove("hide");
}
