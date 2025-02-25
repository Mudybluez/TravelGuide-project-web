const apiUrl = "/api/quiz/famousLandmarks"; // Выбери нужную категорию
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", async () => {
    await fetchQuestions();
    loadQuestion();
});

async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Fetched data:", data);  // Лог для проверки
        questions = data;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}

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
    `;
    document.getElementById("next-btn").style.display = "none";
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

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").innerHTML = `You got ${score} out of ${questions.length} questions correct!`;
    document.getElementById("result").style.display = "block";
    document.getElementById("restart-btn").style.display = "block";
}

document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("restart-btn").style.display = "none";
    loadQuestion();
});
