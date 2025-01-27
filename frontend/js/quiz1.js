const questions = [
    {
      question: "Which country is home to the Eiffel Tower?",
      options: ["France", "Italy", "Germany", "Spain"],
      correct: 0,
    },
    {
      question: "What is the name of the ancient city carved into rock in Jordan?",
      options: ["Petra", "Machu Picchu", "Angkor Wat", "Chichen Itza"],
      correct: 0,
    },
    {
      question: "Which U.S. city is the Golden Gate Bridge located in?",
      options: ["New York", "Los Angeles", "San Francisco", "Chicago"],
      correct: 2,
    },
    {
      question: "Which country is known for the Great Wall?",
      options: ["China", "India", "Russia", "Japan"],
      correct: 0,
    },
    {
      question: "Where is the Taj Mahal located?",
      options: ["India", "Pakistan", "Bangladesh", "Nepal"],
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
  