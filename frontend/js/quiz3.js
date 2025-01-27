const questions = [
    {
      question: "Which country is known for its cherry blossoms in the spring?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correct: 1,
    },
    {
      question: "What is the traditional greeting in Thailand?",
      options: ["Bow", "High-five", "Thumbs up", "Handshake"],
      correct: 0,
    },
    {
      question: "Which continent is the Carnival of Rio de Janeiro celebrated on?",
      options: ["North America", "South America", "Europe", "Africa"],
      correct: 1,
    },
    {
      question: "Which country uses the peso as its currency?",
      options: ["Mexico", "Spain", "Portugal", "Italy"],
      correct: 0,
    },
    {
      question: "In which country is tipping often considered rude?",
      options: ["Japan", "USA", "Australia", "Canada"],
      correct: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    const questionData = questions[currentQuestionIndex]; 
    quizContainer.innerHTML = `
      <div class="quiz-question">
        <p>${currentQuestionIndex + 1}. ${questionData.question}</p>
        ${questionData.options
          .map(
            (option, index) =>
              `<button class="option" onclick="checkAnswer(this, ${index === questionData.correct})">${option}</button>`
          )
          .join("")}
      </div>
      <button id="next-btn" class="next-btn" onclick="nextQuestion()" style="display: none;">Next</button>
    `;
  }
  
  function checkAnswer(button, isCorrect) {
    const allButtons = document.querySelectorAll(".option");
    allButtons.forEach((btn) => (btn.disabled = true)); 
  
    if (isCorrect) {
      button.classList.add("correct"); 
      score++; 
    } else {
      button.classList.add("incorrect"); 
    }
  
   
    document.getElementById("next-btn").style.display = "block";
  }
  
  function nextQuestion() {
    currentQuestionIndex++; 
    if (currentQuestionIndex < questions.length) {
      loadQuestion(); 
    } else {
      showResults(); 
    }
  }
  
  function showResults() {
    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("result");
    quizContainer.style.display = "none"; 
    resultContainer.style.display = "block"; 
  
    document.getElementById(
      "score"
    ).textContent = `You got ${score} out of ${questions.length} questions correct!`;
  
    document.querySelector(".restart-btn").style.display = "block";
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0; 
    score = 0; 
    document.getElementById("result").style.display = "none"; 
    document.getElementById("quiz").style.display = "block"; 
    loadQuestion(); 
  
    document.querySelector(".restart-btn").style.display = "none";
  }
  
  document.addEventListener("DOMContentLoaded", loadQuestion);
  