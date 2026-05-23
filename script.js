document.addEventListener('DOMContentLoaded', () => {

    // ===== Питання на тему Minecraft =====
    const questions = [
        {
            question: "Коли почалася Перша світова війна?",
            answers: ["1904", "1914", "1915", "1918"],
            correct: 1
        },
        {
            question: "Скільки крайн приймали участь в Першій світовій війні?",
            answers: ["23", "38", "45", "12"],
            correct: 1
        },
        {
            question: "Хто очолив Третій рейх?",
            answers: ["Гітлер", "Сталін", "Зеленський", "Вільгельм II"],
            correct: 0
        },
        {
            question: "Коли була створена УНР?",
            answers: ["1923", "1914", "1918", "1917"],
            correct: 3
        },
        {
            question: "Скільки країн були союзникам Німечини в Першій світовій війні ?",
            answers: ["2", "67", "3", "34"],
            correct: 2
        },
        {
            question: "У якому році США вступили у цю війну?",
            answers: ["1923", "1914", "1918", "1917"],
            correct: 3
        },
        {
        question: "Яка країна першою застосувала танки під час цієї війни?",
            answers: ["Велика Британія", "Франція", "Німечина", "Австро-Угорщина"],
            correct: 0
            
        },
        {
        question: "Кого убили в Сараєві в 1914 році?",
            answers: ["Гітлера", "Мусоліні", "Франц Фердинанд", "Вільгельма 2"],
            correct: 2
            
        },
        {
        question: "Хто перший випустив іприт в Першій світовій війні?",
            answers: ["Велика Британія", "Франція", "Німечина", "Австро-Угорщина"],
            correct: 2
        },
        {
        question: "Чи сподобався тобі квіз?",
            answers: ["Так", "ні",],
            correct: 0 
        }
    ];

    // ===== Отримання елементів =====
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    // ===== Показ запитання =====
    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }
    }

    // ===== Перевірка відповіді =====
    function checkAnswer(button, i) {
        clearInterval(interval);

        if (i === questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        scoreDisplay.innerText = `💎 Бали: ${score}`;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(nextQuestion, 1000);
    }

    // ===== Перехід до наступного запитання =====
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    // ===== Показ результату =====
    function showResult() {
        clearInterval(interval);
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    // ===== Старт гри =====
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `💎 Бали: 0`;
        showQuestion(questions[questionIndex]);
    }

    // ===== Таймер =====
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `⏱ Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `⏱ Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                setTimeout(nextQuestion, 500);
            }
        }, 1000);
    }

    // ===== Слухачі подій =====
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
