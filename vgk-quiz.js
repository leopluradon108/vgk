// ========== GLOBAL STATE ==========
let rosterData = [];
let currentSeason = '';
let allQuestions = [];
let currentQuiz = {
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    difficulty: 'easy'
};
let userStats = {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    questionHistory: {}
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', async () => {
    loadUserStats();
    loadColorScheme();
    await fetchRosterData();
    updateSeasonTitle();
});

// ========== NHL API INTEGRATION ==========
async function fetchRosterData() {
    const rosterInfoDiv = document.getElementById('rosterInfo');
    
    try {
        rosterInfoDiv.innerHTML = '<div class="loading">🏒 Fetching live roster data...</div>';
        
        const response = await fetch('https://api-web.nhle.com/v1/roster/VGK/current');
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        // Parse roster
        rosterData = [
            ...data.forwards.map(p => ({ ...p, positionGroup: 'forwards', position: getPosition(p.positionCode) })),
            ...data.defensemen.map(p => ({ ...p, positionGroup: 'defense', position: 'D' })),
            ...data.goalies.map(p => ({ ...p, positionGroup: 'goalies', position: 'G' }))
        ];
        
        // Determine season from API data
        currentSeason = data.season || getCurrentSeasonString();
        
        console.log(`✅ Loaded ${rosterData.length} players for ${currentSeason} season`);
        
        rosterInfoDiv.innerHTML = `
            <strong>✓ Live Roster Loaded</strong><br>
            ${rosterData.length} Players • ${currentSeason} Season
        `;
        
        generateAllQuestions();
        renderStudyGuide('all');
        
    } catch (error) {
        console.error('❌ Error fetching roster:', error);
        rosterInfoDiv.innerHTML = `
            <strong style="color: var(--incorrect-bg);">⚠ Unable to load live roster</strong><br>
            <small>Using fallback data</small>
        `;
        useFallbackRoster();
    }
}

function getPosition(code) {
    if (code === 'C') return 'C';
    if (code === 'L') return 'LW';
    if (code === 'R') return 'RW';
    return 'F';
}

function getCurrentSeasonString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    if (month >= 9) {
        return `${year}-${(year + 1).toString().slice(-2)}`;
    } else {
        return `${year - 1}-${year.toString().slice(-2)}`;
    }
}

function useFallbackRoster() {
    // Fallback roster from October 31, 2025
    rosterData = [
        // Goalies
        { firstName: {default: 'Adin'}, lastName: {default: 'Hill'}, sweaterNumber: 33, shootsCatches: 'L', position: 'G', positionGroup: 'goalies' },
        { firstName: {default: 'Carl'}, lastName: {default: 'Lindbom'}, sweaterNumber: 30, shootsCatches: 'L', position: 'G', positionGroup: 'goalies' },
        { firstName: {default: 'Akira'}, lastName: {default: 'Schmid'}, sweaterNumber: 40, shootsCatches: 'L', position: 'G', positionGroup: 'goalies' },
        // Defense
        { firstName: {default: 'Zach'}, lastName: {default: 'Whitecloud'}, sweaterNumber: 2, shootsCatches: 'R', position: 'D', positionGroup: 'defense' },
        { firstName: {default: 'Brayden'}, lastName: {default: 'McNabb'}, sweaterNumber: 3, shootsCatches: 'L', position: 'D', positionGroup: 'defense' },
        { firstName: {default: 'Jeremy'}, lastName: {default: 'Lauzon'}, sweaterNumber: 5, shootsCatches: 'L', position: 'D', positionGroup: 'defense' },
        { firstName: {default: 'Kaedan'}, lastName: {default: 'Korczak'}, sweaterNumber: 6, shootsCatches: 'R', position: 'D', positionGroup: 'defense' },
        { firstName: {default: 'Noah'}, lastName: {default: 'Hanifin'}, sweaterNumber: 15, shootsCatches: 'L', position: 'D', positionGroup: 'defense' },
        { firstName: {default: 'Ben'}, lastName: {default: 'Hutton'}, sweaterNumber: 17, shootsCatches: 'L', position: 'D', positionGroup: 'defense' },
        { firstName: {default: 'Shea'}, lastName: {default: 'Theodore'}, sweaterNumber: 27, shootsCatches: 'L', position: 'D', positionGroup: 'defense' },
        // Forwards
        { firstName: {default: 'Jack'}, lastName: {default: 'Eichel'}, sweaterNumber: 9, shootsCatches: 'R', position: 'C', positionGroup: 'forwards' },
        { firstName: {default: 'Colton'}, lastName: {default: 'Sissons'}, sweaterNumber: 10, shootsCatches: 'R', position: 'C', positionGroup: 'forwards' },
        { firstName: {default: 'Pavel'}, lastName: {default: 'Dorofeyev'}, sweaterNumber: 16, shootsCatches: 'L', position: 'RW', positionGroup: 'forwards' },
        { firstName: {default: 'Reilly'}, lastName: {default: 'Smith'}, sweaterNumber: 19, shootsCatches: 'L', position: 'RW', positionGroup: 'forwards' },
        { firstName: {default: 'Brandon'}, lastName: {default: 'Saad'}, sweaterNumber: 20, shootsCatches: 'L', position: 'LW', positionGroup: 'forwards' },
        { firstName: {default: 'Brett'}, lastName: {default: 'Howden'}, sweaterNumber: 21, shootsCatches: 'L', position: 'C', positionGroup: 'forwards' },
        { firstName: {default: 'Cole'}, lastName: {default: 'Reinhardt'}, sweaterNumber: 23, shootsCatches: 'L', position: 'LW', positionGroup: 'forwards' },
        { firstName: {default: 'Alexander'}, lastName: {default: 'Holtz'}, sweaterNumber: 26, shootsCatches: 'R', position: 'RW', positionGroup: 'forwards' },
        { firstName: {default: 'Tomas'}, lastName: {default: 'Hertl'}, sweaterNumber: 48, shootsCatches: 'L', position: 'C', positionGroup: 'forwards' },
        { firstName: {default: 'Ivan'}, lastName: {default: 'Barbashev'}, sweaterNumber: 49, shootsCatches: 'L', position: 'LW', positionGroup: 'forwards' },
        { firstName: {default: 'Keegan'}, lastName: {default: 'Kolesar'}, sweaterNumber: 55, shootsCatches: 'R', position: 'RW', positionGroup: 'forwards' },
        { firstName: {default: 'Mark'}, lastName: {default: 'Stone'}, sweaterNumber: 61, shootsCatches: 'R', position: 'RW', positionGroup: 'forwards' },
        { firstName: {default: 'William'}, lastName: {default: 'Karlsson'}, sweaterNumber: 71, shootsCatches: 'L', position: 'C', positionGroup: 'forwards' },
        { firstName: {default: 'Mitch'}, lastName: {default: 'Marner'}, sweaterNumber: 93, shootsCatches: 'R', position: 'RW', positionGroup: 'forwards' }
    ];
    
    currentSeason = '2025-26';
    generateAllQuestions();
    renderStudyGuide('all');
}

function updateSeasonTitle() {
    document.getElementById('seasonTitle').textContent = `${currentSeason} ROSTER QUIZ`;
}

// ========== QUESTION GENERATION ==========
function generateAllQuestions() {
    allQuestions = [];
    
    rosterData.forEach(player => {
        const firstName = player.firstName?.default || '';
        const lastName = player.lastName?.default || '';
        const fullName = `${firstName} ${lastName}`.trim();
        const number = player.sweaterNumber;
        const shoots = player.shootsCatches;
        const position = player.position;
        const posGroup = player.positionGroup;
        
        // Get wrong answers
        const otherPlayers = rosterData.filter(p => p.sweaterNumber !== number);
        const randomPlayer = () => otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
        
        // 1. Number → Name
        allQuestions.push({
            type: 'numbers',
            category: posGroup,
            question: `Who wears #${number}?`,
            correctAnswer: fullName,
            wrongAnswer: `${randomPlayer().firstName?.default} ${randomPlayer().lastName?.default}`,
            acceptedAnswers: [fullName.toLowerCase(), lastName.toLowerCase()],
            player: player
        });
        
        // 2. Name → Number
        allQuestions.push({
            type: 'numbers',
            category: posGroup,
            question: `What number does ${fullName} wear?`,
            correctAnswer: number.toString(),
            wrongAnswer: randomPlayer().sweaterNumber.toString(),
            acceptedAnswers: [number.toString(), `#${number}`, `# ${number}`],
            player: player
        });
        
        // 3. Name → Position
        const positionName = position === 'G' ? 'Goalie' : position === 'D' ? 'Defense' : position;
        allQuestions.push({
            type: 'position',
            category: posGroup,
            question: `What position does ${fullName} play?`,
            correctAnswer: positionName,
            wrongAnswer: position === 'G' ? 'Defense' : position === 'D' ? 'Forward' : 'Defense',
            acceptedAnswers: [
                positionName.toLowerCase(),
                position.toLowerCase(),
                position === 'G' ? 'g' : position === 'D' ? 'd' : 'f',
                position === 'C' ? 'center' : position === 'LW' ? 'left wing' : position === 'RW' ? 'right wing' : positionName.toLowerCase()
            ],
            player: player
        });
        
        // 4. Name → Shooting Hand
        const handLong = shoots === 'L' ? 'Left' : 'Right';
        const handAction = position === 'G' ? 'catch' : 'shoot';
        allQuestions.push({
            type: 'handedness',
            category: posGroup,
            question: `What hand does ${fullName} ${handAction}?`,
            correctAnswer: handLong,
            wrongAnswer: shoots === 'L' ? 'Right' : 'Left',
            acceptedAnswers: [handLong.toLowerCase(), shoots.toLowerCase()],
            player: player
        });
        
        // 5. Position + Number → Name
        allQuestions.push({
            type: 'both',
            category: posGroup,
            question: `Which ${positionName} wears #${number}?`,
            correctAnswer: fullName,
            wrongAnswer: `${randomPlayer().firstName?.default} ${randomPlayer().lastName?.default}`,
            acceptedAnswers: [fullName.toLowerCase(), lastName.toLowerCase()],
            player: player
        });
        
        // 6. Number + Shooting Hand → Name
        allQuestions.push({
            type: 'both',
            category: posGroup,
            question: `Who wears #${number} and ${handAction}s ${handLong.toLowerCase()}?`,
            correctAnswer: fullName,
            wrongAnswer: `${randomPlayer().firstName?.default} ${randomPlayer().lastName?.default}`,
            acceptedAnswers: [fullName.toLowerCase(), lastName.toLowerCase()],
            player: player
        });
    });
    
    console.log(`✅ Generated ${allQuestions.length} questions`);
}

// ========== QUIZ BUILDER ==========
function selectDifficulty(difficulty) {
    document.querySelectorAll('[data-difficulty]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
}

function startQuiz() {
    // Get selected options
    const difficulty = document.querySelector('[data-difficulty].active')?.dataset.difficulty || 'easy';
    
    const questionTypes = [];
    if (document.getElementById('qtype-numbers').checked) questionTypes.push('numbers');
    if (document.getElementById('qtype-handedness').checked) questionTypes.push('handedness');
    if (document.getElementById('qtype-position').checked) questionTypes.push('position');
    
    const positionTypes = [];
    if (document.getElementById('ptype-forwards').checked) positionTypes.push('forwards');
    if (document.getElementById('ptype-defense').checked) positionTypes.push('defense');
    if (document.getElementById('ptype-goalies').checked) positionTypes.push('goalies');
    
    // Validate selection
    if (questionTypes.length === 0 || positionTypes.length === 0) {
        alert('Please select at least one question type and one position type!');
        return;
    }
    
    // Filter questions
    let filteredQuestions = allQuestions.filter(q => {
        const typeMatch = questionTypes.includes(q.type) || (questionTypes.length > 1 && q.type === 'both');
        const categoryMatch = positionTypes.includes(q.category);
        return typeMatch && categoryMatch;
    });
    
    if (filteredQuestions.length === 0) {
        alert('No questions available for your selection!');
        return;
    }
    
    // Shuffle and select questions
    filteredQuestions = shuffleArray(filteredQuestions);
    const quizLength = Math.min(20, filteredQuestions.length);
    
    currentQuiz = {
        questions: filteredQuestions.slice(0, quizLength),
        currentIndex: 0,
        answers: new Array(quizLength).fill(null),
        score: 0,
        difficulty: difficulty
    };
    
    goToPage('quizPage');
    renderQuestion();
}

function renderQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const content = document.getElementById('quizContent');
    const isAnswered = currentQuiz.answers[currentQuiz.currentIndex] !== null;
    
    let html = `<div class="question-text">${q.question}</div>`;
    
    if (currentQuiz.difficulty === 'easy') {
        // Multiple choice
        const options = shuffleArray([q.correctAnswer, q.wrongAnswer]);
        html += '<div class="options-grid">';
        options.forEach(opt => {
            let className = 'option-btn';
            if (isAnswered) {
                if (opt === q.correctAnswer) className += ' correct';
                else if (opt === currentQuiz.answers[currentQuiz.currentIndex]?.userAnswer) className += ' incorrect';
            } else if (opt === currentQuiz.answers[currentQuiz.currentIndex]?.userAnswer) {
                className += ' selected';
            }
            html += `<button class="option-btn ${className}" onclick="selectAnswer('${opt.replace(/'/g, "\\'")}')" ${isAnswered ? 'disabled' : ''}>${opt}</button>`;
        });
        html += '</div>';
    } else {
        // Type answer
        const userAnswer = currentQuiz.answers[currentQuiz.currentIndex]?.userAnswer || '';
        html += `<input type="text" class="answer-input" id="answerInput" value="${userAnswer}" placeholder="Type your answer..." ${isAnswered ? 'disabled' : ''} onkeypress="if(event.key==='Enter') checkAnswer()">`;
    }
    
    // Show feedback if answered
    if (isAnswered) {
        const isCorrect = currentQuiz.answers[currentQuiz.currentIndex].isCorrect;
        html += `<div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ Correct!' : `✗ Incorrect. Answer: ${q.correctAnswer}`}
        </div>`;
    }
    
    content.innerHTML = html;
    
    // Update UI
    updateQuizUI();
}

function selectAnswer(answer) {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = answer === q.correctAnswer;
    
    currentQuiz.answers[currentQuiz.currentIndex] = {
        userAnswer: answer,
        correctAnswer: q.correctAnswer,
        isCorrect: isCorrect,
        question: q.question
    };
    
    if (isCorrect) currentQuiz.score++;
    
    // Save to stats
    saveQuestionStats(q.question, isCorrect);
    
    renderQuestion();
}

function checkAnswer() {
    const input = document.getElementById('answerInput');
    if (!input) return;
    
    const userAnswer = input.value.trim();
    if (!userAnswer) return;
    
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = q.acceptedAnswers.some(ans => 
        ans.toLowerCase() === userAnswer.toLowerCase()
    );
    
    currentQuiz.answers[currentQuiz.currentIndex] = {
        userAnswer: userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: isCorrect,
        question: q.question
    };
    
    if (isCorrect) currentQuiz.score++;
    
    saveQuestionStats(q.question, isCorrect);
    renderQuestion();
}

function updateQuizUI() {
    const index = currentQuiz.currentIndex;
    const total = currentQuiz.questions.length;
    
    document.getElementById('questionCounter').textContent = `Question ${index + 1} of ${total}`;
    document.getElementById('quizScore').textContent = `Score: ${currentQuiz.score}/${total}`;
    document.getElementById('progressFill').style.width = `${((index + 1) / total) * 100}%`;
    
    document.getElementById('btnPrev').disabled = index === 0;
    
    const nextBtn = document.getElementById('btnNext');
    if (index === total - 1) {
        nextBtn.textContent = 'Finish Quiz →';
        nextBtn.onclick = finishQuiz;
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = nextQuestion;
    }
}

function prevQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        renderQuestion();
    }
}

function finishQuiz() {
    // Save stats
    userStats.totalQuizzes++;
    userStats.totalQuestions += currentQuiz.questions.length;
    userStats.correctAnswers += currentQuiz.score;
    saveUserStats();
    
    // Show results
    goToPage('resultsPage');
    renderResults();
}

function exitQuiz() {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
        goToPage('landingPage');
    }
}

// ========== RESULTS ==========
function renderResults() {
    const total = currentQuiz.questions.length;
    const score = currentQuiz.score;
    const percentage = Math.round((score / total) * 100);
    
    let message = '';
    if (percentage === 100) message = '🏆 Perfect Score!';
    else if (percentage >= 90) message = '⭐ Outstanding!';
    else if (percentage >= 80) message = '👍 Great Job!';
    else if (percentage >= 70) message = '📚 Good Effort!';
    else message = '💪 Keep Practicing!';
    
    document.getElementById('resultsSummary').innerHTML = `
        <div class="score-display">${score}/${total}</div>
        <div class="score-message">${percentage}% • ${message}</div>
    `;
    
    // Detailed results
    let detailHtml = '<h3>Question Review</h3>';
    currentQuiz.answers.forEach((ans, i) => {
        if (ans) {
            detailHtml += `
                <div class="result-item ${ans.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-question">${i + 1}. ${ans.question}</div>
                    <div class="result-answer">Your answer: ${ans.userAnswer}</div>
                    ${!ans.isCorrect ? `<div class="result-answer">Correct answer: ${ans.correctAnswer}</div>` : ''}
                </div>
            `;
        }
    });
    
    document.getElementById('resultsDetail').innerHTML = detailHtml;
}

// ========== STUDY GUIDE ==========
function filterStudy(filter) {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderStudyGuide(filter);
}

function renderStudyGuide(filter) {
    let filteredPlayers = rosterData;
    
    if (filter !== 'all') {
        filteredPlayers = rosterData.filter(p => p.positionGroup === filter);
    }
    
    const grid = document.getElementById('studyContent');
    grid.innerHTML = filteredPlayers.map(player => {
        const firstName = player.firstName?.default || '';
        const lastName = player.lastName?.default || '';
        const position = player.position;
        const shoots = player.shootsCatches;
        const handAction = position === 'G' ? 'Catches' : 'Shoots';
        
        return `
            <div class="player-card">
                <div class="player-number">#${player.sweaterNumber}</div>
                <div class="player-name">${firstName} ${lastName}</div>
                <div class="player-info">${position} • ${handAction} ${shoots}</div>
            </div>
        `;
    }).join('');
}

// ========== USER STATS ==========
function loadUserStats() {
    const saved = localStorage.getItem('vgkQuizStats');
    if (saved) {
        userStats = JSON.parse(saved);
    }
}

function saveUserStats() {
    localStorage.setItem('vgkQuizStats', JSON.stringify(userStats));
}

function saveQuestionStats(question, isCorrect) {
    if (!userStats.questionHistory[question]) {
        userStats.questionHistory[question] = { correct: 0, incorrect: 0 };
    }
    
    if (isCorrect) {
        userStats.questionHistory[question].correct++;
    } else {
        userStats.questionHistory[question].incorrect++;
    }
}

function viewStats() {
    const accuracy = userStats.totalQuestions > 0 
        ? Math.round((userStats.correctAnswers / userStats.totalQuestions) * 100) 
        : 0;
    
    alert(`📊 YOUR STATS\n\n` +
          `Total Quizzes: ${userStats.totalQuizzes}\n` +
          `Total Questions: ${userStats.totalQuestions}\n` +
          `Correct Answers: ${userStats.correctAnswers}\n` +
          `Overall Accuracy: ${accuracy}%`);
}

// ========== COLOR SCHEME ==========
function loadColorScheme() {
    const saved = localStorage.getItem('vgkColorScheme') || 'classic';
    setColorScheme(saved);
}

function setColorScheme(scheme) {
    if (scheme === 'bold') {
        document.body.classList.add('palette-bold');
    } else {
        document.body.classList.remove('palette-bold');
    }
    
    document.querySelectorAll('.btn-scheme').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn${scheme.charAt(0).toUpperCase() + scheme.slice(1)}`).classList.add('active');
    
    localStorage.setItem('vgkColorScheme', scheme);
}

// ========== NAVIGATION ==========
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ========== UTILITY FUNCTIONS ==========
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}