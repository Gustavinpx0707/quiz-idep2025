const questions = [
  {
    question: "Quem dirigiu o filme 'A Origem' (Inception)?",
    correct: "Christopher Nolan",
    options: ["Steven Spielberg", "James Cameron", "Martin Scorsese"]
  },
  {
    question: "Em qual filme vemos o personagem 'Buzz Lightyear'?",
    correct: "Toy Story",
    options: ["Shrek", "Procurando Nemo", "Os Incríveis"]
  },
  {
    question: "Qual filme ganhou o Oscar de Melhor Filme em 2024?",
    correct: "Oppenheimer",
    options: ["Barbie", "Duna: Parte 2", "Killers of the Flower Moon"]
  },
  {
    question: "Qual série da Netflix é baseada em um jogo de xadrez?",
    correct: "The Queen's Gambit (O Gambito da Rainha)",
    options: ["Stranger Things", "Dark", "The Witcher"]
  },
  {
    question: "Em 'Breaking Bad', qual é o nome do alter ego de Walter White?",
    correct: "Heisenberg",
    options: ["Gus", "Jesse", "Saul"]
  },
  {
    question: "Qual série é um spin-off de 'Breaking Bad'?",
    correct: "Better Call Saul",
    options: ["El Camino", "Ozark", "Narcos"]
  },
  {
    question: "Qual série tem o personagem Geralt de Rívia?",
    correct: "The Witcher",
    options: ["The Mandalorian", "Vikings", "House of the Dragon"]
  },
  {
    question: "Qual dessas séries se passa no universo de 'Game of Thrones'?",
    correct: "House of the Dragon",
    options: ["The Witcher", "The Boys", "The Last of Us"]
  },
  {
    question: "Quem interpretou o Coringa em 'Coringa' (2019)?",
    correct: "Joaquin Phoenix",
    options: ["Heath Ledger", "Jared Leto", "Jack Nicholson"]
  },
  {
    question: "Qual é o nome do navio em 'Titanic'?",
    correct: "RMS Titanic",
    options: ["Queen Mary", "Britannic", "Oceanic"]
  },
  {
    question: "Qual série começa com um ataque à Muralha?",
    correct: "Game of Thrones",
    options: ["The Witcher", "The Boys", "The Mandalorian"]
  },
  {
    question: "Em que cidade se passa 'Stranger Things'?",
    correct: "Hawkins",
    options: ["Springfield", "Riverdale", "Gotham"]
  },
  {
    question: "Quem é o criador da série 'The Office' (EUA)?",
    correct: "Greg Daniels",
    options: ["Ricky Gervais", "Steve Carell", "Larry David"]
  },
  {
    question: "Quem é o pai do Simba em 'O Rei Leão'?",
    correct: "Mufasa",
    options: ["Scar", "Zazu", "Rafiki"]
  },
  {
    question: "Qual personagem é conhecido como 'Capitão América'?",
    correct: "Steve Rogers",
    options: ["Tony Stark", "Bruce Banner", "Peter Parker"]
  },
  {
    question: "Qual filme da Pixar se passa na Itália?",
    correct: "Luca",
    options: ["Soul", "Ratatouille", "Divertida Mente"]
  },
  {
    question: "Qual vilão aparece em 'Avengers: Guerra Infinita'?",
    correct: "Thanos",
    options: ["Loki", "Ultron", "Dormammu"]
  },
  {
    question: "Em que série o personagem 'Sheldon Cooper' aparece?",
    correct: "The Big Bang Theory",
    options: ["How I Met Your Mother", "Brooklyn Nine-Nine", "Young Sheldon"]
  },
  {
    question: "Qual série é estrelada por Pedro Pascal como um mandaloriano?",
    correct: "The Mandalorian",
    options: ["The Last of Us", "Andor", "Obi-Wan Kenobi"]
  },
  {
    question: "Em 'Harry Potter', qual é o nome da escola de magia?",
    correct: "Hogwarts",
    options: ["Durmstrang", "Beauxbatons", "Ilvermorny"]
  }
];

const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const playerInfo = document.getElementById('player-info');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let seconds = 15;
let playerName = '';

function startGame() {
  playerName = document.getElementById('player-name').value || 'Jogador';
  document.getElementById('menu-screen').classList.remove('active');
  document.getElementById('quiz-screen').classList.add('active');
  playerInfo.textContent = `👤 ${playerName}`;
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
