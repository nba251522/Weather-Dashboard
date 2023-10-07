var timer = 60;
var currentQuestion = 0;
var score = 0;
var feedbackTimeout;

var questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Transfer Markup Language"],
        correct: 2
    },
    {
        question: "Which CSS attribute alters the background shade of an element?",
        answers: ["background", "color", "bgcolor", "background-color"],
        correct: 3
    },
    {
        question: "CSS is an acronym for what?",
        answers: ["Computer Style Structure", "Computer Style Sheets", "Cascading Style Structure", "Cascading Style Sheets"],
        correct: 3
    },
    {
        question: "Identify the JavaScript library from the options below.",
        answers: ["HTML", "Python", "jQuery", "PHP"],
        correct: 2
    },
    {
        question: "Which HTML tag is employed to produce clickable links?",
        answers: ["<ahref>", "<hl>", "<link>", "<a>"],
        correct: 3
    },
    {
        question: "Which is not recognized as a valid HTTP verb?",
        answers: ["PUT", "GET", "FETCH", "POST"],
        correct: 2
    },
    {
        question: "Which character in CSS denotes an element with a particular class name?",
        answers: ["%", "#", "!", "."],
        correct: 3
    },
    {
        question: "Which JavaScript method verifies if any element in an array satisfies the provided test?",
        answers: ["filter()", "find()", "some()", "every()"],
        correct: 2
    },
    {
        question: "What is not a method to retain data on the browser of a user?",
        answers: ["Cookies", "Disk Storage", "Session Storage", "Local Storage"],
        correct: 1
    }
];

function displayFeedback(isCorrect) {
    const feedbackDiv = document.getElementById('feedback');
    clearTimeout(feedbackTimeout);
    if (isCorrect) {
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.style.color = '#00FF00';
    } else {
        feedbackDiv.textContent = 'Incorrect!';
        feedbackDiv.style.color = '#FF0000';
    }
    feedbackDiv.style.display = 'block';
    feedbackTimeout = setTimeout(() => {
        feedbackDiv.style.display = 'none';
    }, 5000);
}

document.getElementById('start-btn').addEventListener('click', function() {
    this.style.display = 'none';
    shuffle(questions);
    document.getElementById('question-container').style.display = 'block';
    startTimer();
    displayQuestion();
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        document.getElementById('time-value').innerText = timer;

        if (timer <= 0 || currentQuestion >= questions.length) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}
function displayQuestion() {
    var q = questions[currentQuestion];
    var container = document.getElementById('answer-buttons');
    container.innerHTML = '';
    document.getElementById('question-text').innerText = q.question;

     for (var i = 0; i < q.answers.length; i++) {
        (function(index) {
            var btn = document.createElement('button');
            btn.innerText = q.answers[index];
            btn.addEventListener('click', function(e) {
                if (index === q.correct) {
                    score++;
                    displayFeedback(true);
                } else {
                    timer -= 10; 
                    displayFeedback(false);
                }
    
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    displayQuestion();
                } else {
                    endGame();
                }
            });
            container.appendChild(btn);
        })(i);
    }
}
function endGame() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('score-value').innerText = score;

    document.getElementById('save-score-btn').addEventListener('click', function() {
        var initials = document.getElementById('initials').value;
        if (initials) {  
            var highscores = JSON.parse(localStorage.getItem('highscores') || "[]");
            highscores.push({ initials: initials, score: score });
            localStorage.setItem('highscores', JSON.stringify(highscores));
            document.getElementById('score-container').style.display = 'none';
            document.getElementById('quiz-section').classList.add('hidden');
            document.getElementById('highscores-section').classList.remove('hidden');
            displayHighScores();
        } else {
            alert('Please enter your initials.');
        }                                                                                                                                                                                                                                                                                                                                                                                                           
    });
}

function displayHighScores() {
    var highscoresList = document.getElementById('highscores-list');
    highscoresList.innerHTML = ''; 

    var highscores = JSON.parse(localStorage.getItem('highscores') || "[]");
    highscores.sort((a, b) => b.score - a.score);
    highscores.forEach((score, index) => {
        var listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;       
        highscoresList.appendChild(listItem);
    });
}

displayHighScores();

document.getElementById('play-again-btn').addEventListener('click', playAgain);
function playAgain() {
    timer = 60;
    currentQuestion = 0;
    score = 0;
    document.getElementById('highscores-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('time-value').innerText = timer;
}

document.getElementById('view-highscores-btn').addEventListener('click', toggleHighscores);
function toggleHighscores() {
    const quizSection = document.getElementById('quiz-section');
    const highscoresSection = document.getElementById('highscores-section');
    
    if (quizSection.classList.contains('hidden')) {
        quizSection.classList.remove('hidden');
        highscoresSection.classList.add('hidden');
    } else {
        quizSection.classList.add('hidden');
        highscoresSection.classList.remove('hidden');
    }
}