// Initialize
let rosterData = [];
let currentQuiz = [];
let currentQuestionIndex = 0;
let quizAnswers = [];
let stats = loadStats();

// Load color scheme
document.body.setAttribute('data-theme', localStorage.getItem('colorScheme') || 'classic');

// Fetch NHL roster on load
fetchRoster();

// Navigation functions
function showLanding() {
    hideAllPages();
    document.getElementById('landingPage').classList.add('active');
}

function showGameTime() {
    hideAllPages();
    document.getElementById('gameTimePage').classList.add('active');
}

function showScrimmage() {
    hideAllPages();
    document.getElementById('scrimmagePage').classList.add('active');
    displayPlayers('all');
}

function showStats() {
    hideAllPages();
    document.getElementById('statsPage').classList.add('active');
    displayStats();
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// Color scheme
function setColorScheme(scheme) {
    document.body.setAttribute('data-theme', scheme);
    localStorage.setItem('colorScheme', scheme);
}

// Fetch roster from NHL API
async function fetchRoster() {
    try {
        const response = await fetch('https://api-web.nhle.com/v1/roster/VGK/current');
        const data = await response.json();
        
        rosterData = [];
        
        // Process forwards
        ['forwards', 'defensemen', 'goalies'].forEach(posType => {
            if (data[posType]) {
                data[posType].forEach(player => {
                    rosterData.push({
                        firstName: player.firstName.default,
                        lastName: player.lastName.default,
                        number: player.sweaterNumber,
                        position: player.positionCode,
                        shoots: player.shootsCatches
                    });
                });
            }
        });
        
        console.log('Roster loaded:', rosterData.length, 'players');
    } catch (error) {
        console.error('Error fetching roster:', error);
        // Fallback data
        loadFallbackRoster();
    }
}

function loadFallbackRoster() {
    rosterData = [
        {firstName: "Jack", lastName: "Eichel", number: 9, position: "C", shoots: "R"},
        {firstName: "Mark", lastName: "Stone", number: 61, position: "R", shoots: "R"},
        {firstName: "Ivan", lastName: "Barbashev", number: 49, position: "L", shoots: "L"},
        {firstName: "Shea", lastName: "Theodore", number: 27, position: "D", shoots: "L"},
        {firstName: "Adin", lastName: "Hill", number: 33, position: "G", shoots: "L"}
    ];
}

// Display players in study mode
function displayPlayers(filter) {
    const container = document.getElementById('playerCards');
    container.innerHTML = '';
    
    const filtered = rosterData.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'F') return ['C', 'L', 'R', 'LW', 'RW'].includes(p.position);
        if (filter === 'D') return p.position === 'D';
        if (filter === 'G') return p.position === 'G';
        return true;
    });
    
    filtered.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div class="number">#${player.number}</div>
            <div class="name">${player.firstName} ${player.lastName}</div>
            <div class="details">${getPositionName(player.position)} • Shoots ${player.shoots}</div>
        `;
        container.appendChild(card);
    });
}

function filterPlayers(type) {
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    displayPlayers(type);
}

// Quiz generation
function startQuiz() {
    const qtNumbers = document.getElementById('qtNumbers').checked;
    const qtHandedness = document.getElementById('qtHandedness').checked;
    const qtPosition = document.getElementById('qtPosition').checked;
    
    const pfForwards = document.getElementById('pfForwards').checked;
    const pfDefense = document.getElementById('pfDefense').checked;
    const pfGoalies = document.getElementById('pfGoalies').checked;
    
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    
    // Filter players
    let players = rosterData.filter(p => {
        if (pfForwards && ['C', 'L', 'R', 'LW', 'RW'].includes(p.position)) return true;
        if (pfDefense && p.position === 'D') return true;
        if (pfGoalies && p.position === 'G') return true;
        return false;
    });
    
    if (players.length === 0) {
        alert('Select at least one position filter!');
        return;
    }
    
    // Generate questions
    currentQuiz = [];
    players.forEach(player => {
        if (qtNumbers) {
            currentQuiz.push(generateNumberQuestion(player, difficulty));
            currentQuiz.push(generateNameToNumberQuestion(player, difficulty));
        }
        if (qtPosition) {
            currentQuiz.push(generatePositionQuestion(player, difficulty));
        }
        if (qtHandedness) {
            currentQuiz.push(generateHandednessQuestion(player, difficulty));
        }
        if (qtNumbers && qtHandedness) {
            currentQuiz.push(generateNumberHandQuestion(player, difficulty));
        }
        if (qtPosition && qtNumbers) {
            currentQuiz.push(generatePositionNumberQuestion(player, difficulty));
        }
    });
    
    // Shuffle questions
    currentQuiz = shuffleArray(currentQuiz);
    currentQuestionIndex = 0;
    quizAnswers = [];
    
    hideAllPages();
    document.getElementById('quizPage').classList.add('active');
    showQuestion();
}

function generateNumberQuestion(player, difficulty) {
    if (difficulty === 'easy') {
        const wrong = getRandomPlayer(player);
        return {
            question: `Who wears #${player.number}?`,
            answer: `${player.firstName} ${player.lastName}`,
            options: shuffleArray([
                `${player.firstName} ${player.lastName}`,
                `${wrong.firstName} ${wrong.lastName}`
            ]),
            type: 'multiple'
        };
    } else {
        return {
            question: `Who wears #${player.number}?`,
            answer: player.lastName,
            alternates: [`${player.firstName} ${player.lastName}`, player.lastName.toLowerCase()],
            type: 'text'
        };
    }
}

function generateNameToNumberQuestion(player, difficulty) {
    if (difficulty === 'easy') {
        const wrong = getRandomPlayer(player);
        return {
            question: `What number does ${player.firstName} ${player.lastName} wear?`,
            answer: player.number.toString(),
            options: shuffleArray([player.number.toString(), wrong.number.toString()]),
            type: 'multiple'
        };
    } else {
        return {
            question: `What number does ${player.firstName} ${player.lastName} wear?`,
            answer: player.number.toString(),
            type: 'text'
        };
    }
}

function generatePositionQuestion(player, difficulty) {
    const posName = getPositionName(player.position);
    if (difficulty === 'easy') {
        const positions = ['Center', 'Left Wing', 'Right Wing', 'Defenseman', 'Goalie'];
        const wrong = positions.filter(p => p !== posName)[Math.floor(Math.random() * 4)];
        return {
            question: `What position does ${player.firstName} ${player.lastName} play?`,
            answer: posName,
            options: shuffleArray([posName, wrong]),
            type: 'multiple'
        };
    } else {
        return {
            question: `What position does ${player.firstName} ${player.lastName} play?`,
            answer: player.position,
            alternates: [posName, player.position.toLowerCase(), posName.toLowerCase()],
            type: 'text'
        };
    }
}

function generateHandednessQuestion(player, difficulty) {
    const hand = player.shoots === 'L' ? 'Left' : 'Right';
    if (difficulty === 'easy') {
        return {
            question: `What hand does ${player.firstName} ${player.lastName} shoot?`,
            answer: hand,
            options: ['Left', 'Right'],
            type: 'multiple'
        };
    } else {
        return {
            question: `What hand does ${player.firstName} ${player.lastName} shoot?`,
            answer: hand,
            alternates: [hand.toLowerCase(), player.shoots, player.shoots.toLowerCase()],
            type: 'text'
        };
    }
}

function generateNumberHandQuestion(player, difficulty) {
    const hand = player.shoots === 'L' ? 'Left' : 'Right';
    if (difficulty === 'easy') {
        const wrong = getRandomPlayer(player);
        return {
            question: `Who wears #${player.number} and shoots ${hand}?`,
            answer: `${player.firstName} ${player.lastName}`,
            options: shuffleArray([
                `${player.firstName} ${player.lastName}`,
                `${wrong.firstName} ${wrong.lastName}`
            ]),
            type: 'multiple'
        };
    } else {
        return {
            question: `Who wears #${player.number} and shoots ${hand}?`,
            answer: player.lastName,
            alternates: [`${player.firstName} ${player.lastName}`, player.lastName.toLowerCase()],
            type: 'text'
        };
    }
}

function generatePositionNumberQuestion(player, difficulty) {
    const posName = getPositionName(player.position);
    if (difficulty === 'easy') {
        const wrong = getRandomPlayer(player);
        return {
            question: `Which ${posName} wears #${player.number}?`,
            answer: `${player.firstName} ${player.lastName}`,
            options: shuffleArray([
                `${player.firstName} ${player.lastName}`,
                `${wrong.firstName} ${wrong.lastName}`
            ]),
            type: 'multiple'
        };
    } else {
        return {
            question: `Which ${posName} wears #${player.number}?`,
            answer: player.lastName,
            alternates: [`${player.firstName} ${player.lastName}`, player.lastName.toLowerCase()],
            type: 'text'
        };
    }
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuiz.length) {
        endQuiz();
        return;
    }
    
    const q = currentQuiz[currentQuestionIndex];
    const content = document.getElementById('quizContent');
    
    let html = `
        <div class="quiz-progress">Question ${currentQuestionIndex + 1} of ${currentQuiz.length}</div>
        <div class="question">${q.question}</div>
    `;
    
    if (q.type === 'multiple') {
        html += '<div class="quiz-options">';
        q.options.forEach(opt => {
            html += `<button class="quiz-option" onclick="answerQuestion('${opt}')">${opt}</button>`;
        });
        html += '</div>';
    } else {
        html += `
            <input type="text" class="quiz-input" id="quizAnswer" placeholder="Type your answer...">
            <button class="main-button" onclick="submitTextAnswer()">Submit</button>
        `;
    }
    
    content.innerHTML = html;
    
    if (q.type === 'text') {
        document.getElementById('quizAnswer').focus();
        document.getElementById('quizAnswer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitTextAnswer();
        });
    }
}

function answerQuestion(selected) {
    const q = currentQuiz[currentQuestionIndex];
    const correct = selected === q.answer;
    
    quizAnswers.push({
        question: q.question,
        correct: correct,
        answer: q.answer,
        selected: selected
    });
    
    // Visual feedback
    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach(btn => {
        if (btn.textContent === q.answer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && !correct) {
            btn.classList.add('incorrect');
        }
        btn.disabled = true;
    });
    
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function submitTextAnswer() {
    const input = document.getElementById('quizAnswer');
    const answer = input.value.trim().toLowerCase();
    const q = currentQuiz[currentQuestionIndex];
    
    let correct = answer === q.answer.toLowerCase();
    if (!correct && q.alternates) {
        correct = q.alternates.some(alt => alt.toLowerCase() === answer);
    }
    
    quizAnswers.push({
        question: q.question,
        correct: correct,
        answer: q.answer,
        selected: input.value
    });
    
    currentQuestionIndex++;
    showQuestion();
}

function endQuiz() {
    const correct = quizAnswers.filter(a => a.correct).length;
    const total = quizAnswers.length;
    const percentage = ((correct / total) * 100).toFixed(1);
    
    // Update stats
    stats.totalQuizzes++;
    stats.totalQuestions += total;
    stats.correctAnswers += correct;
    saveStats();
    
    let html = `
        <div class="quiz-score">
            Score: ${correct} / ${total} (${percentage}%)
        </div>
        <div style="margin: 2rem 0;">
    `;
    
    quizAnswers.forEach((a, i) => {
        html += `
            <div class="stat-item" style="background: ${a.correct ? '#28a74520' : '#dc354520'}">
                <div>
                    <div><strong>Q${i + 1}:</strong> ${a.question}</div>
                    <div style="color: ${a.correct ? '#28a745' : '#dc3545'}">
                        Your answer: ${a.selected}
                        ${!a.correct ? ` (Correct: ${a.answer})` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <button class="main-button" onclick="showLanding()">Back to Home</button>
    `;
    
    document.getElementById('quizContent').innerHTML = html;
}

// Stats management
function loadStats() {
    const saved = localStorage.getItem('quizStats');
    return saved ? JSON.parse(saved) : {
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0
    };
}

function saveStats() {
    localStorage.setItem('quizStats', JSON.stringify(stats));
}

function displayStats() {
    const accuracy = stats.totalQuestions > 0 
        ? ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(1)
        : 0;
    
    document.getElementById('statsContent').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Total Quizzes Taken:</div>
            <div class="stat-value">${stats.totalQuizzes}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Total Questions Answered:</div>
            <div class="stat-value">${stats.totalQuestions}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Correct Answers:</div>
            <div class="stat-value">${stats.correctAnswers}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Overall Accuracy:</div>
            <div class="stat-value">${accuracy}%</div>
        </div>
    `;
}

function clearStats() {
    if (confirm('Clear all stats? This cannot be undone.')) {
        stats = { totalQuizzes: 0, totalQuestions: 0, correctAnswers: 0 };
        saveStats();
        displayStats();
    }
}

// Utility functions
function getPositionName(code) {
    const map = {
        'C': 'Center',
        'L': 'Left Wing',
        'R': 'Right Wing',
        'LW': 'Left Wing',
        'RW': 'Right Wing',
        'D': 'Defenseman',
        'G': 'Goalie'
    };
    return map[code] || code;
}

function getRandomPlayer(exclude) {
    let player;
    do {
        player = rosterData[Math.floor(Math.random() * rosterData.length)];
    } while (player === exclude && rosterData.length > 1);
    return player;
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}