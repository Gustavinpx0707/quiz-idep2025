const questions = [
  // Filmes
  {
    question: "Quem dirigiu o filme 'A Origem' (Inception)?",
    answers: [
      { text: "Steven Spielberg", correct: false },
      { text: "Christopher Nolan", correct: true },
      { text: "James Cameron", correct: false },
      { text: "Martin Scorsese", correct: false }
    ]
  },
  {
    question: "Em qual filme vemos o personagem 'Buzz Lightyear'?",
    answers: [
      { text: "Toy Story", correct: true },
      { text: "Shrek", correct: false },
      { text: "Procurando Nemo", correct: false },
      { text: "Os Incríveis", correct: false }
    ]
  },
  {
    question: "Qual filme ganhou o Oscar de Melhor Filme em 2024?",
    answers: [
      { text: "Oppenheimer", correct: true },
      { text: "Barbie", correct: false },
      { text: "Duna: Parte 2", correct: false },
      { text: "Killers of the Flower Moon", correct: false }
    ]
  },
  // Séries
  {
    question: "Qual série da Netflix é baseada em um jogo de xadrez?",
    answers: [
      { text: "The Queen's Gambit (O Gambito da Rainha)", correct: true },
      { text: "Stranger Things", correct: false },
      { text: "Dark", correct: false },
      { text: "The Witcher", correct: false }
    ]
  },
  {
    question: "Em 'Breaking Bad', qual é o nome do alter ego de Walter White?",
    answers: [
      { text: "Heisenberg", correct: true },
      { text: "Gus", correct: false },
      { text: "Jesse", correct: false },
      { text: "Saul", correct: false }
    ]
  },
  {
    question: "Qual série é um spin-off de 'Breaking Bad'?",
    answers: [
      { text: "Better Call Saul", correct: true },
      { text: "El Camino", correct: false },
      { text: "Ozark", correct: false },
      { text: "Narcos", correct: false }
    ]
  },
  {
    question: "Qual série tem o personagem Geralt de Rívia?",
    answers: [
      { text: "The Witcher", correct: true },
      { text: "The Mandalorian", correct: false },
      { text: "Vikings", correct: false },
      { text: "House of the Dragon", correct: false }
    ]
  },
  {
    question: "Qual dessas séries se passa no universo de 'Game of Thrones'?",
    answers: [
      { text: "House of the Dragon", correct: true },
      { text: "The Witcher", correct: false },
      { text: "The Boys", correct: false },
      { text: "The Last of Us", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = 'Próxima';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('wrong');
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
  nextButton.innerText = 'Jogar Novamente';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
