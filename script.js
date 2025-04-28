const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const startContainer = document.getElementById('start-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;
let timeLeft = 15;

const questions = [
  // 20 perguntas (filmes e séries)
  { question: "Quem dirigiu 'A Origem' (Inception)?", answers: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Martin Scorsese"], correct: "Christopher Nolan" },
  { question: "Em qual filme vemos 'Buzz Lightyear'?", answers: ["Toy Story", "Shrek", "Procurando Nemo", "Os Incríveis"], correct: "Toy Story" },
  { question: "Qual filme ganhou o Oscar de Melhor Filme em 2024?", answers: ["Oppenheimer", "Barbie", "Duna: Parte 2", "Killers of the Flower Moon"], correct: "Oppenheimer" },
  { question: "Qual série é baseada em um jogo de xadrez?", answers: ["Stranger Things", "The Queen's Gambit", "Dark", "The Witcher"], correct: "The Queen's Gambit" },
  { question: "Alter ego de Walter White em Breaking Bad?", answers: ["Gus", "Heisenberg", "Jesse", "Saul"], correct: "Heisenberg" },
  { question: "Série spin-off de Breaking Bad?", answers: ["Better Call Saul", "El Camino", "Ozark", "Narcos"], correct: "Better Call Saul" },
  { question: "Quem é Geralt de Rívia?", answers: ["The Witcher", "The Mandalorian", "Vikings", "House of the Dragon"], correct: "The Witcher" },
  { question: "Universo de Game of Thrones?", answers: ["House of the Dragon", "The Boys", "The Witcher", "The Last of Us"], correct: "House of the Dragon" },
  { question: "Personagem principal de 'The Mandalorian'?", answers: ["Din Djarin", "Luke Skywalker", "Obi-Wan Kenobi", "Boba Fett"], correct: "Din Djarin" },
  { question: "Em 'Friends', quem se casa com Chandler?", answers: ["Phoebe", "Monica", "Rachel", "Janice"], correct: "Monica" },
  { question: "Cidade onde 'Stranger Things' acontece?", answers: ["Smallville", "Hawkins", "Springfield", "Hill Valley"], correct: "Hawkins" },
  { question: "Qual filme tem o personagem Jack Sparrow?", answers: ["Piratas do Caribe", "Harry Potter", "Percy Jackson", "Matrix"], correct: "Piratas do Caribe" },
  { question: "Quem é o 'Senhor dos Anéis'?", answers: ["Gandalf", "Frodo", "Sauron", "Aragorn"], correct: "Sauron" },
  { question: "Qual série é sobre zumbis?", answers: ["The Walking Dead", "The Witcher", "Vikings", "The Mandalorian"], correct: "The Walking Dead" },
  { question: "Vilão principal de 'Vingadores: Ultimato'?", answers: ["Loki", "Ultron", "Thanos", "Red Skull"], correct: "Thanos" },
  { question: "Nome da escola de Harry Potter?", answers: ["Hogwarts", "Narnia", "Camp Half-Blood", "Xavier's School"], correct: "Hogwarts" },
  { question: "Quem é o Pantera Negra?", answers: ["T'Challa", "Tony Stark", "Steve Rogers", "Peter Parker"], correct: "T'Challa" },
  { question: "Qual série se passa em uma prisão?", answers: ["Lost", "Breaking Bad", "Prison Break", "Stranger Things"], correct: "Prison Break" },
  { question: "Filme do 'De volta para o Futuro'?", answers: ["Back to the Future", "Blade Runner", "E.T.", "Star Wars"], correct: "Back to the Future" },
  { question: "Criador de 'Os Simpsons'?", answers: ["Seth MacFarlane", "Matt Groening", "Trey Parker", "Mike Judge"], correct: "Matt Groening" }
];

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
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  let currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  const shuffledAnswers = currentQuestion.answers.sort(() => Math.random() - 0.5);
  shuffledAnswers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('btn');
    button.addEventListener('click', selectAnswer);
    if (answer === currentQuestion.correct) {
      button.dataset.correct = true;
    }
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timerElement.innerText = `Tempo: ${timeLeft}`;
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
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Tempo: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeExpired();
    }
  }, 1000);
}

function handleTimeExpired() {
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.classList.remove('hide');
  questionElement.innerText = "⏰ Tempo esgotado!";
}
