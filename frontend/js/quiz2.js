const quizData = [
    {
      question: "What is a must-have for international travel?",
      options: ["Passport", "Local SIM card", "A camera", "Guidebook"],
      correct: 0,
    },
    {
      question: "Which item is most important in a first-aid kit for travel?",
      options: ["Band-aids", "Thermometer", "Tweezers", "Antibiotic cream"],
      correct: 0,
    },
    {
      question: "What should you do before packing liquids for air travel?",
      options: [
        "Wrap bottles in plastic bags",
        "Leave liquids at home",
        "Buy travel-sized containers",
        "Both A and C",
      ],
      correct: 3,
    },
    {
      question: "What is the recommended way to protect valuables while traveling?",
      options: [
        "Use a money belt",
        "Keep them in your backpack",
        "Store them in your suitcase",
        "Leave them in your hotel room",
      ],
      correct: 0,
    },
    {
      question: "What is the maximum size of a carry-on bag allowed on most airlines?",
      options: [
        "22 x 14 x 9 inches",
        "24 x 16 x 10 inches",
        "20 x 12 x 8 inches",
        "It varies by airline",
      ],
      correct: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    const questionData = quizData[currentQuestionIndex];
  
    quizContainer.innerHTML = `
      <div class="quiz-question">
        <p>${currentQuestionIndex + 1}. ${questionData.question}</p>
        ${questionData.options
          .map(
            (option, index) =>
              `<button class="option" onclick="checkAnswer(this, ${
                index === questionData.correct
              })">${option}</button>`
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
    if (currentQuestionIndex < quizData.length) {
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
    ).textContent = `You got ${score} out of ${quizData.length} questions correct!`;
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
  }
  
  document.addEventListener("DOMContentLoaded", loadQuestion);
  