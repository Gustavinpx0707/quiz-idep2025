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
  {
    question: "Em qual filme vemos o personagem 'Buzz Lightyear'?",
    answers: shuffleAnswers([
      { text: "Toy Story", correct: true },
      { text: "Shrek", correct: false },
      { text: "Procurando Nemo", correct: false },
      { text: "Os Incríveis", correct: false }
    ])
  },
  {
    question: "Qual filme ganhou o Oscar de Melhor Filme em 2024?",
    answers: shuffleAnswers([
      { text: "Oppenheimer", correct: true },
      { text: "Barbie", correct: false },
      { text: "Duna: Parte 2", correct: false },
      { text: "Killers of the Flower Moon", correct: false }
    ])
  },
  {
    question: "Qual série da Netflix é baseada em um jogo de xadrez?",
    answers: shuffleAnswers([
      { text: "The Queen's Gambit (O Gambito da Rainha)", correct: true },
      { text: "Stranger Things", correct: false },
      { text: "Dark", correct: false },
      { text: "The Witcher", correct: false }
    ])
  },
  {
    question: "Em 'Breaking Bad', qual é o nome do alter ego de Walter White?",
    answers: shuffleAnswers([
      { text: "Heisenberg", correct: true },
      { text: "Gus", correct: false },
      { text: "Jesse", correct: false },
      { text: "Saul", correct: false }
    ])
  },
  {
    question: "Qual série é um spin-off de 'Breaking Bad'?",
    answers: shuffleAnswers([
      { text: "Better Call Saul", correct: true },
      { text: "El Camino", correct: false },
      { text: "Ozark", correct: false },
      { text: "Narcos", correct: false }
    ])
  },
  {
    question: "Qual série tem o personagem Geralt de Rívia?",
    answers: shuffleAnswers([
      { text: "The Witcher", correct: true },
      { text: "The Mandalorian", correct: false },
      { text: "Vikings", correct: false },
      { text: "House of the Dragon", correct: false }
    ])
  },
  {
    question: "Qual dessas séries se passa no universo de 'Game of Thrones'?",
    answers: shuffleAnswers([
      { text: "House of the Dragon", correct: true },
      { text: "The Witcher", correct: false },
      { text: "The Boys", correct: false },
      { text: "The Last of Us", correct: false }
    ])
  },
  {
    question: "Qual filme apresenta o personagem Coringa interpretado por Joaquin Phoenix?",
    answers: shuffleAnswers([
      { text: "Joker", correct: true },
      { text: "The Dark Knight", correct: false },
      { text: "Birdman", correct: false },
      { text: "The Master", correct: false }
    ])
  },
  {
    question: "Em 'Stranger Things', qual é o nome da garota com poderes psíquicos?",
    answers: shuffleAnswers([
      { text: "Onze (Eleven)", correct: true },
      { text: "Nancy", correct: false },
      { text: "Max", correct: false },
      { text: "Joyce", correct: false }
    ])
  },
  {
    question: "Qual diretor é conhecido por filmes como 'Pulp Fiction' e 'Kill Bill'?",
    answers: shuffleAnswers([
      { text: "Quentin Tarantino", correct: true },
      { text: "Guy Ritchie", correct: false },
      { text: "Francis Ford Coppola", correct: false },
      { text: "Steven Soderbergh", correct: false }
    ])
  },
  {
    question: "Qual série é baseada no universo de 'The Last of Us'?",
    answers: shuffleAnswers([
      { text: "The Last of Us", correct: true },
      { text: "The Walking Dead", correct: false },
      { text: "The 100", correct: false },
      { text: "The Rain", correct: false }
    ])
  },
  {
    question: "Em 'The Mandalorian', qual é o nome popular do personagem 'The Child'?",
    answers: shuffleAnswers([
      { text: "Grogu", correct: true },
      { text: "Yoda", correct: false },
      { text: "Boba", correct: false },
      { text: "Mace", correct: false }
    ])
  },
  {
    question: "Quem é o protagonista do filme 'Matrix'?",
    answers: shuffleAnswers([
      { text: "Neo", correct: true },
      { text: "Morpheus", correct: false },
      { text: "Trinity", correct: false },
      { text: "Smith", correct: false }
    ])
  },
  {
    question: "Em 'Harry Potter', quem é o padrinho de Harry?",
    answers: shuffleAnswers([
      { text: "Sirius Black", correct: true },
      { text: "Severus Snape", correct: false },
      { text: "Alvo Dumbledore", correct: false },
      { text: "Rúbeo Hagrid", correct: false }
    ])
  }
];

const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const startContainer = document.getElementById('start-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function startQuiz() {
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
  questionElement.innerText = `Você acertou ${score} de ${shuffledQuestions.length} perguntas!`;
  nextButton.innerText = 'Jogar Novamente';
  nextButton.classList.remove('hide');
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

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function shuffleAnswers(answers) {
  return shuffleArray(answers);
}
