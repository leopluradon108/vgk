const quizContent = document.getElementById('quiz-content');
let selectedPositions = [];
let selectedTemplates = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function renderQuizSetup() {
    quizContent.innerHTML = `
        <div class="quiz-setup">
            <div class="setup-section">
                <h2>Select Positions</h2>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="all" id="select-all-positions">
                        <span>Select All</span>
                    </label>
                </div>
                <div class="checkbox-group" id="position-checkboxes">
                    <label class="checkbox-label">
                        <input type="checkbox" value="L" class="position-check">
                        <span>Left Wing</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="R" class="position-check">
                        <span>Right Wing</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="C" class="position-check">
                        <span>Center</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="D" class="position-check">
                        <span>Defense</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="G" class="position-check">
                        <span>Goalie</span>
                    </label>
                </div>
            </div>

            <div class="setup-section">
                <h2>Select Question Types</h2>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="player-numbers" class="template-check">
                        <span>Player Numbers</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="handedness" class="template-check">
                        <span>Handedness</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="special-questions" class="template-check">
                        <span>Special Questions</span>
                    </label>
                </div>
            </div>

            <button class="btn" id="start-quiz">Start Quiz</button>
            <p class="error-message" id="error-msg"></p>
        </div>
    `;

    setupEventListeners();
}

function setupEventListeners() {
    const selectAll = document.getElementById('select-all-positions');
    const positionChecks = document.querySelectorAll('.position-check');
    const startBtn = document.getElementById('start-quiz');

    selectAll.addEventListener('change', (e) => {
        positionChecks.forEach(check => check.checked = e.target.checked);
    });

    positionChecks.forEach(check => {
        check.addEventListener('change', () => {
            const allChecked = Array.from(positionChecks).every(c => c.checked);
            selectAll.checked = allChecked;
        });
    });

    startBtn.addEventListener('click', startQuiz);
}

function startQuiz() {
    const positionChecks = document.querySelectorAll('.position-check:checked');
    const templateChecks = document.querySelectorAll('.template-check:checked');
    const errorMsg = document.getElementById('error-msg');

    selectedPositions = Array.from(positionChecks).map(c => c.value);
    selectedTemplates = Array.from(templateChecks).map(c => c.value);

    if (selectedPositions.length === 0) {
        errorMsg.textContent = 'Please select at least one position';
        return;
    }

    if (selectedTemplates.length === 0) {
        errorMsg.textContent = 'Please select at least one question type';
        return;
    }

    errorMsg.textContent = '';
    generateQuestions();
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}

function generateQuestions() {
    currentQuestions = [];
    const filteredPlayers = players.filter(p => selectedPositions.includes(p.position));

    // Expand simplified categories into detailed templates
    const expandedTemplates = [];

    selectedTemplates.forEach(category => {
        switch(category) {
            case 'player-numbers':
                expandedTemplates.push('number-by-name', 'name-by-number', 'position-by-name');
                break;
            case 'handedness':
                // Include all handedness questions
                expandedTemplates.push('players-by-handedness', 'count-forwards-handedness',
                    'count-defense-handedness', 'count-wingers-handedness',
                    'count-centers-handedness', 'centers-shoot-right');

                // Add shoots/catches based on selected positions
                if (selectedPositions.some(p => p !== 'G')) {
                    expandedTemplates.push('shoots');
                }
                if (selectedPositions.includes('G')) {
                    expandedTemplates.push('catches');
                }
                break;
            case 'special-questions':
                expandedTemplates.push('captain');
                break;
        }
    });

    expandedTemplates.forEach(template => {
        const questions = generateQuestionsForTemplate(template, filteredPlayers);
        currentQuestions.push(...questions);
    });

    // Shuffle all questions
    currentQuestions = shuffleArray(currentQuestions);
}

function generateQuestionsForTemplate(template, filteredPlayers) {
    const questions = [];

    switch(template) {
        case 'number-by-name':
            filteredPlayers.forEach(player => {
                questions.push({
                    question: `What number does ${player.name} wear?`,
                    correctAnswer: player.number.toString(),
                    options: generateNumberOptions(player.number),
                    type: 'multiple-choice'
                });
            });
            break;

        case 'name-by-number':
            filteredPlayers.forEach(player => {
                questions.push({
                    question: `Who wears #${player.number}?`,
                    correctAnswer: player.name,
                    options: generatePlayerOptions(player, filteredPlayers),
                    type: 'multiple-choice'
                });
            });
            break;

        case 'position-by-name':
            filteredPlayers.forEach(player => {
                questions.push({
                    question: `What position does ${player.name} play?`,
                    correctAnswer: positionNames[player.position],
                    options: generatePositionOptions(player.position),
                    type: 'multiple-choice'
                });
            });
            break;

        case 'shoots':
            // For non-goalies
            const nonGoalies = filteredPlayers.filter(p => p.position !== 'G');
            nonGoalies.forEach(player => {
                questions.push({
                    question: `Which side does ${player.name} shoot?`,
                    correctAnswer: player.handedness === 'L' ? 'Left' : 'Right',
                    options: ['Left', 'Right'],
                    type: 'multiple-choice'
                });
            });
            break;

        case 'catches':
            // For goalies only
            const goalies = filteredPlayers.filter(p => p.position === 'G');
            goalies.forEach(player => {
                questions.push({
                    question: `Which hand does ${player.name} catch with?`,
                    correctAnswer: player.handedness === 'L' ? 'Left' : 'Right',
                    options: ['Left', 'Right'],
                    type: 'multiple-choice'
                });
            });
            break;

        case 'players-by-handedness':
            // Which player shoots left/right?
            const leftShooters = filteredPlayers.filter(p => p.handedness === 'L' && p.position !== 'G');
            const rightShooters = filteredPlayers.filter(p => p.handedness === 'R' && p.position !== 'G');

            if (leftShooters.length >= 2) {
                const randomLeft = leftShooters[Math.floor(Math.random() * leftShooters.length)];
                questions.push({
                    question: 'Which player shoots left?',
                    correctAnswer: randomLeft.name,
                    options: generatePlayerOptions(randomLeft, filteredPlayers.filter(p => p.position !== 'G')),
                    type: 'multiple-choice'
                });
            }

            if (rightShooters.length >= 2) {
                const randomRight = rightShooters[Math.floor(Math.random() * rightShooters.length)];
                questions.push({
                    question: 'Which player shoots right?',
                    correctAnswer: randomRight.name,
                    options: generatePlayerOptions(randomRight, filteredPlayers.filter(p => p.position !== 'G')),
                    type: 'multiple-choice'
                });
            }
            break;

        case 'count-forwards-handedness':
            const forwards = filteredPlayers.filter(p => ['L', 'R', 'C'].includes(p.position));
            if (forwards.length > 0) {
                const leftCount = forwards.filter(p => p.handedness === 'L').length;
                const rightCount = forwards.filter(p => p.handedness === 'R').length;

                questions.push({
                    question: 'How many forwards shoot left?',
                    correctAnswer: leftCount.toString(),
                    options: generateCountOptions(leftCount, forwards.length),
                    type: 'multiple-choice'
                });

                questions.push({
                    question: 'How many forwards shoot right?',
                    correctAnswer: rightCount.toString(),
                    options: generateCountOptions(rightCount, forwards.length),
                    type: 'multiple-choice'
                });
            }
            break;

        case 'count-defense-handedness':
            const defense = filteredPlayers.filter(p => p.position === 'D');
            if (defense.length > 0) {
                const leftCount = defense.filter(p => p.handedness === 'L').length;
                const rightCount = defense.filter(p => p.handedness === 'R').length;

                questions.push({
                    question: 'How many defensemen shoot left?',
                    correctAnswer: leftCount.toString(),
                    options: generateCountOptions(leftCount, defense.length),
                    type: 'multiple-choice'
                });

                questions.push({
                    question: 'How many defensemen shoot right?',
                    correctAnswer: rightCount.toString(),
                    options: generateCountOptions(rightCount, defense.length),
                    type: 'multiple-choice'
                });
            }
            break;

        case 'count-wingers-handedness':
            const leftWingers = filteredPlayers.filter(p => p.position === 'L');
            const rightWingers = filteredPlayers.filter(p => p.position === 'R');

            if (leftWingers.length > 0) {
                const lwLeft = leftWingers.filter(p => p.handedness === 'L').length;
                const lwRight = leftWingers.filter(p => p.handedness === 'R').length;

                questions.push({
                    question: 'How many left wingers shoot left?',
                    correctAnswer: lwLeft.toString(),
                    options: generateCountOptions(lwLeft, leftWingers.length),
                    type: 'multiple-choice'
                });

                questions.push({
                    question: 'How many left wingers shoot right?',
                    correctAnswer: lwRight.toString(),
                    options: generateCountOptions(lwRight, leftWingers.length),
                    type: 'multiple-choice'
                });
            }

            if (rightWingers.length > 0) {
                const rwLeft = rightWingers.filter(p => p.handedness === 'L').length;
                const rwRight = rightWingers.filter(p => p.handedness === 'R').length;

                questions.push({
                    question: 'How many right wingers shoot left?',
                    correctAnswer: rwLeft.toString(),
                    options: generateCountOptions(rwLeft, rightWingers.length),
                    type: 'multiple-choice'
                });

                questions.push({
                    question: 'How many right wingers shoot right?',
                    correctAnswer: rwRight.toString(),
                    options: generateCountOptions(rwRight, rightWingers.length),
                    type: 'multiple-choice'
                });
            }
            break;

        case 'count-centers-handedness':
            const centers = filteredPlayers.filter(p => p.position === 'C');
            if (centers.length > 0) {
                const leftCount = centers.filter(p => p.handedness === 'L').length;
                const rightCount = centers.filter(p => p.handedness === 'R').length;

                questions.push({
                    question: 'How many centers shoot left?',
                    correctAnswer: leftCount.toString(),
                    options: generateCountOptions(leftCount, centers.length),
                    type: 'multiple-choice'
                });

                questions.push({
                    question: 'How many centers shoot right?',
                    correctAnswer: rightCount.toString(),
                    options: generateCountOptions(rightCount, centers.length),
                    type: 'multiple-choice'
                });
            }
            break;

        case 'centers-shoot-right':
            const centersRight = filteredPlayers.filter(p => p.position === 'C' && p.handedness === 'R');
            if (centersRight.length > 0) {
                questions.push({
                    question: 'Which centers shoot right?',
                    correctAnswer: centersRight.map(p => p.name).sort().join(', '),
                    options: generateMultiplePlayerOptions(centersRight, filteredPlayers.filter(p => p.position === 'C')),
                    type: 'multiple-choice'
                });
            }
            break;

        case 'captain':
            const captain = players.find(p => p.captain);
            if (captain) {
                questions.push({
                    question: 'Who is the team captain?',
                    correctAnswer: captain.name,
                    options: generatePlayerOptions(captain, players),
                    type: 'multiple-choice'
                });
            }
            break;
    }

    return questions;
}

function generateNumberOptions(correctNumber) {
    const options = [correctNumber];
    const allNumbers = players.map(p => p.number).filter(n => n !== correctNumber);

    while (options.length < 4 && allNumbers.length > 0) {
        const randomIndex = Math.floor(Math.random() * allNumbers.length);
        options.push(allNumbers[randomIndex]);
        allNumbers.splice(randomIndex, 1);
    }

    return shuffleArray(options.map(n => n.toString()));
}

function generatePlayerOptions(correctPlayer, playerPool) {
    const options = [correctPlayer.name];
    const otherPlayers = playerPool.filter(p => p.name !== correctPlayer.name);

    while (options.length < 4 && otherPlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherPlayers.length);
        options.push(otherPlayers[randomIndex].name);
        otherPlayers.splice(randomIndex, 1);
    }

    return shuffleArray(options);
}

function generatePositionOptions(correctPosition) {
    const allPositions = Object.values(positionNames);
    const options = [positionNames[correctPosition]];
    const otherPositions = allPositions.filter(p => p !== positionNames[correctPosition]);

    while (options.length < 4 && otherPositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherPositions.length);
        options.push(otherPositions[randomIndex]);
        otherPositions.splice(randomIndex, 1);
    }

    return shuffleArray(options);
}

function generateCountOptions(correctCount, maxCount) {
    const options = [correctCount];

    for (let i = 0; i <= maxCount; i++) {
        if (i !== correctCount && options.length < 4) {
            options.push(i);
        }
    }

    return shuffleArray(options.map(n => n.toString()));
}

function generateMultiplePlayerOptions(correctPlayers, playerPool) {
    const correctAnswer = correctPlayers.map(p => p.name).sort().join(', ');
    const options = [correctAnswer];

    // Generate some wrong combinations
    const otherPlayers = playerPool.filter(p => !correctPlayers.includes(p));

    for (let i = 0; i < 3 && otherPlayers.length > 0; i++) {
        const wrongCombo = [];
        const numPlayers = Math.min(correctPlayers.length, otherPlayers.length);

        for (let j = 0; j < numPlayers; j++) {
            const randomIndex = Math.floor(Math.random() * otherPlayers.length);
            wrongCombo.push(otherPlayers[randomIndex].name);
            otherPlayers.splice(randomIndex, 1);
        }

        if (wrongCombo.length > 0) {
            options.push(wrongCombo.sort().join(', '));
        }
    }

    return shuffleArray(options);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        renderResults();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    quizContent.innerHTML = `
        <div class="quiz-question">
            <div class="question-header">
                <span class="question-number">Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</span>
                <span class="score">Score: ${score}/${currentQuestionIndex}</span>
            </div>
            <h2 class="question-text">${question.question}</h2>
            <div class="options">
                ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => checkAnswer(btn.dataset.answer, question.correctAnswer));
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
        score++;
    }

    // Show feedback
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.answer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.dataset.answer === selectedAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        renderQuestion();
    }, 1500);
}

function renderResults() {
    const percentage = Math.round((score / currentQuestions.length) * 100);

    quizContent.innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="score-display">
                <div class="final-score">${score} / ${currentQuestions.length}</div>
                <div class="percentage">${percentage}%</div>
            </div>
            <div class="result-message">
                ${percentage >= 90 ? 'Excellent! You really know your VGK roster!' :
                  percentage >= 70 ? 'Great job! You know the team well!' :
                  percentage >= 50 ? 'Good effort! Keep studying!' :
                  'Keep practicing with the study guide!'}
            </div>
            <div class="button-container">
                <button class="btn" onclick="location.reload()">Take Another Quiz</button>
                <a href="study-guide.html" class="btn">Study Guide</a>
                <a href="index.html" class="btn">Home</a>
            </div>
        </div>
    `;
}

renderQuizSetup();