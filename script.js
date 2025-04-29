const questions = [
  { question: "Quem dirigiu o filme 'A Origem' (Inception)?", answer: "Christopher Nolan", options: ["Steven Spielberg", "Martin Scorsese", "Christopher Nolan", "James Cameron"] },
  { question: "Quem interpretou o Coringa em 'Batman: O Cavaleiro das Trevas'?", answer: "Heath Ledger", options: ["Joaquin Phoenix", "Jack Nicholson", "Heath Ledger", "Jared Leto"] },
  { question: "Qual filme ganhou o Oscar de Melhor Filme em 2020?", answer: "Parasita", options: ["1917", "Coringa", "Era uma vez em... Hollywood", "Parasita"] },
  { question: "Qual o nome do hobbit interpretado por Elijah Wood?", answer: "Frodo", options: ["Bilbo", "Frodo", "Sam", "Merry"] },
  { question: "Qual filme é famoso pela frase 'Say hello to my little friend'?", answer: "Scarface", options: ["O Poderoso Chefão", "Scarface", "Pulp Fiction", "Clube da Luta"] },
  { question: "Em que filme Leonardo DiCaprio ganhou seu primeiro Oscar?", answer: "O Regresso", options: ["Titanic", "A Origem", "O Regresso", "O Lobo de Wall Street"] },
  { question: "Quem é o diretor de 'Pulp Fiction'?", answer: "Quentin Tarantino", options: ["Martin Scorsese", "Quentin Tarantino", "Francis Coppola", "Steven Spielberg"] },
  { question: "Qual é o nome do planeta natal de Superman?", answer: "Krypton", options: ["Terra", "Marte", "Krypton", "Vênus"] },
  { question: "Qual filme da Disney tem um gênio azul?", answer: "Aladdin", options: ["Aladdin", "Hércules", "Rei Leão", "Mulan"] },
  { question: "Quem protagonizou 'Missão Impossível'?", answer: "Tom Cruise", options: ["Brad Pitt", "Tom Cruise", "Matt Damon", "George Clooney"] },
  { question: "Qual é o subtítulo de 'Avatar 2'?", answer: "O Caminho da Água", options: ["Nova Era", "A Lenda de Pandora", "O Caminho da Água", "O Retorno"] },
  { question: "Em que filme temos a frase 'Eu sou seu pai'?", answer: "Star Wars: O Império Contra-Ataca", options: ["Star Wars: Uma Nova Esperança", "Star Wars: O Império Contra-Ataca", "Star Wars: A Ameaça Fantasma", "Star Wars: O Retorno de Jedi"] },
  { question: "Quem é o protagonista de 'Matrix'?", answer: "Keanu Reeves", options: ["Brad Pitt", "Tom Cruise", "Keanu Reeves", "Will Smith"] },
  { question: "Qual o nome da heroína interpretada por Gal Gadot?", answer: "Mulher-Maravilha", options: ["Viúva Negra", "Capitã Marvel", "Jean Grey", "Mulher-Maravilha"] },
  { question: "Qual filme tem o personagem Jack Sparrow?", answer: "Piratas do Caribe", options: ["Indiana Jones", "Piratas do Caribe", "Gladiador", "Percy Jackson"] },
  { question: "Quem dirigiu 'Titanic'?", answer: "James Cameron", options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"] },
  { question: "Qual é o brinquedo cowboy em Toy Story?", answer: "Woody", options: ["Buzz", "Woody", "Jessie", "Zurg"] },
  { question: "Em que filme aparece o personagem Thanos?", answer: "Vingadores: Guerra Infinita", options: ["Thor", "Vingadores: Guerra Infinita", "Guardiões da Galáxia", "Homem de Ferro 2"] },
  { question: "Quem é o pai de Simba?", answer: "Mufasa", options: ["Mufasa", "Scar", "Zazu", "Rafiki"] },
  { question: "Qual o nome da boneca em 'Invocação do Mal'?", answer: "Annabelle", options: ["Anabelle", "Mary", "Annabelle", "Carla"] }
];

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startGame() {
  const name = document.getElementById("nameInput").value || "Jogador";
  document.getElementById("username").innerText = name;
  score = 0;
  currentIndex = 0;
  shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  document.getElementById("score").innerText = score;
  document.getElementById("menu").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft + "s";
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const current = shuffledQuestions[currentIndex];
  if (!current) {
    document.getElementById("question").innerText = "Fim do quiz!";
    document.getElementById("options").innerHTML = "";
    return;
  }

  const options = [...current.options].sort(() => 0.5 - Math.random());
  document.getElementById("question").innerText = current.question;
  document.getElementById("options").innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option";
    btn.onclick = () => selectAnswer(opt, current.answer, btn);
    document.getElementById("options").appendChild(btn);
  });
}

function selectAnswer(selected, correct, btn) {
  clearInterval(timer);
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(o => o.disabled = true);

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
    document.getElementById("score").innerText = score;
  } else {
    btn.classList.add("incorrect");
    allOptions.forEach(o => {
      if (o.innerText === correct) o.classList.add("correct");
    });
  }
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= shuffledQuestions.length) {
    endGame();
  } else {
    loadQuestion();
  }
}

function endGame() {
  clearInterval(timer);
  document.getElementById("question").innerText = `Fim do quiz! Você fez ${score} ponto${score === 1 ? '' : 's'}!`;
  document.getElementById("options").innerHTML = "";
  document.querySelector(".buttons").innerHTML = `
    <button onclick="startGame()">Reiniciar Quiz</button>
    <button onclick="backToMenu()">Voltar ao Menu</button>
  `;
}

function backToMenu() {
  clearInterval(timer);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("menu").style.display = "block";
}
