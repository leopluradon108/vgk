const questions = [
    // Goalies (3 total: Hill #33, Lindbom #30, Schmid #40)
    {q: "What # does Adin Hill wear?", correct: "33", wrong: "40", cat: ["numbers", "goalies"]},
    {q: "What # does Carl Lindbom wear?", correct: "30", wrong: "33", cat: ["numbers", "goalies"]},
    {q: "What # does Akira Schmid wear?", correct: "40", wrong: "33", cat: ["numbers", "goalies"]},
    {q: "Which hand do all three goalies catch with?", correct: "Left", wrong: "Right", cat: ["handedness", "goalies"]},
    {q: "Who wears #30?", correct: "Carl Lindbom", wrong: "Adin Hill", cat: ["numbers", "goalies"]},
    {q: "Who wears #33?", correct: "Adin Hill", wrong: "Akira Schmid", cat: ["numbers", "goalies"]},
    {q: "Who wears #40?", correct: "Akira Schmid", wrong: "Adin Hill", cat: ["numbers", "goalies"]},
    {q: "What position does Adin Hill play?", correct: "G", wrong: "F", cat: ["position", "goalies"]},
    {q: "What position does Carl Lindbom play?", correct: "G", wrong: "D", cat: ["position", "goalies"]},
    {q: "What position does Akira Schmid play?", correct: "G", wrong: "D", cat: ["position", "goalies"]},
    {q: "Which hand does Adin Hill catch with?", correct: "Left", wrong: "Right", cat: ["handedness", "goalies"]},
    {q: "Which hand does Carl Lindbom catch with?", correct: "Left", wrong: "Right", cat: ["handedness", "goalies"]},
    {q: "Which hand does Akira Schmid catch with?", correct: "Left", wrong: "Right", cat: ["handedness", "goalies"]},
    {q: "Which goalie wears the lowest number?", correct: "Carl Lindbom", wrong: "Adin Hill", cat: ["numbers", "goalies"]},
    {q: "Which goalie wears the highest number?", correct: "Akira Schmid", wrong: "Adin Hill", cat: ["numbers", "goalies"]},
    {q: "Hill's number?", correct: "33", wrong: "40", cat: ["numbers", "goalies"]},
    {q: "Lindbom's number?", correct: "30", wrong: "33", cat: ["numbers", "goalies"]},
    {q: "Schmid's number?", correct: "40", wrong: "33", cat: ["numbers", "goalies"]},
    {q: "Who is #30?", correct: "Lindbom", wrong: "Hill", cat: ["numbers", "goalies"]},
    {q: "Who is #33?", correct: "Hill", wrong: "Schmid", cat: ["numbers", "goalies"]},
    {q: "Who is #40?", correct: "Schmid", wrong: "Hill", cat: ["numbers", "goalies"]},
    {q: "How many goalies are on the roster?", correct: "3", wrong: "2", cat: ["position", "goalies"]},

    // Defense (8 total: Whitecloud #2, McNabb #3, Lauzon #5, Korczak #6, Hanifin #15, Hutton #17, Theodore #27, Megna #88)
    {q: "What # does Zach Whitecloud wear?", correct: "2", wrong: "3", cat: ["numbers", "defense"]},
    {q: "What # does Brayden McNabb wear?", correct: "3", wrong: "2", cat: ["numbers", "defense"]},
    {q: "What # does Jeremy Lauzon wear?", correct: "5", wrong: "6", cat: ["numbers", "defense"]},
    {q: "What # does Kaedan Korczak wear?", correct: "6", wrong: "5", cat: ["numbers", "defense"]},
    {q: "What # does Noah Hanifin wear?", correct: "15", wrong: "17", cat: ["numbers", "defense"]},
    {q: "What # does Ben Hutton wear?", correct: "17", wrong: "15", cat: ["numbers", "defense"]},
    {q: "What # does Shea Theodore wear?", correct: "27", wrong: "15", cat: ["numbers", "defense"]},
    {q: "What # does Jaycob Megna wear?", correct: "88", wrong: "27", cat: ["numbers", "defense"]},
    {q: "Who wears #2?", correct: "Zach Whitecloud", wrong: "Brayden McNabb", cat: ["numbers", "defense"]},
    {q: "Who wears #3?", correct: "Brayden McNabb", wrong: "Jeremy Lauzon", cat: ["numbers", "defense"]},
    {q: "Who wears #5?", correct: "Jeremy Lauzon", wrong: "Kaedan Korczak", cat: ["numbers", "defense"]},
    {q: "Who wears #6?", correct: "Kaedan Korczak", wrong: "Noah Hanifin", cat: ["numbers", "defense"]},
    {q: "Who wears #15?", correct: "Noah Hanifin", wrong: "Ben Hutton", cat: ["numbers", "defense"]},
    {q: "Who wears #17?", correct: "Ben Hutton", wrong: "Shea Theodore", cat: ["numbers", "defense"]},
    {q: "Who wears #27?", correct: "Shea Theodore", wrong: "Noah Hanifin", cat: ["numbers", "defense"]},
    {q: "Who wears #88?", correct: "Jaycob Megna", wrong: "Shea Theodore", cat: ["numbers", "defense"]},
    {q: "Which hand does Whitecloud shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "defense"]},
    {q: "Which hand does McNabb shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which hand does Lauzon shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which hand does Korczak shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "defense"]},
    {q: "Which hand does Hanifin shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which hand does Hutton shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which hand does Theodore shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which hand does Megna shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "How many defensemen shoot right?", correct: "2", wrong: "3", cat: ["handedness", "defense"]},
    {q: "How many defensemen shoot left?", correct: "6", wrong: "5", cat: ["handedness", "defense"]},
    {q: "Whitecloud's number?", correct: "2", wrong: "3", cat: ["numbers", "defense"]},
    {q: "McNabb's number?", correct: "3", wrong: "5", cat: ["numbers", "defense"]},
    {q: "Lauzon's number?", correct: "5", wrong: "6", cat: ["numbers", "defense"]},
    {q: "Korczak's number?", correct: "6", wrong: "5", cat: ["numbers", "defense"]},
    {q: "Hanifin's number?", correct: "15", wrong: "17", cat: ["numbers", "defense"]},
    {q: "Hutton's number?", correct: "17", wrong: "15", cat: ["numbers", "defense"]},
    {q: "Theodore's number?", correct: "27", wrong: "15", cat: ["numbers", "defense"]},
    {q: "Megna's number?", correct: "88", wrong: "27", cat: ["numbers", "defense"]},
    {q: "Who is #2?", correct: "Whitecloud", wrong: "McNabb", cat: ["numbers", "defense"]},
    {q: "Who is #3?", correct: "McNabb", wrong: "Lauzon", cat: ["numbers", "defense"]},
    {q: "Who is #5?", correct: "Lauzon", wrong: "Korczak", cat: ["numbers", "defense"]},
    {q: "Who is #6?", correct: "Korczak", wrong: "Hanifin", cat: ["numbers", "defense"]},
    {q: "Who is #15?", correct: "Hanifin", wrong: "Hutton", cat: ["numbers", "defense"]},
    {q: "Which two defensemen shoot right?", correct: "Whitecloud & Korczak", wrong: "Theodore & Hanifin", cat: ["handedness", "defense"]},
    {q: "How many defensemen shoot left vs right?", correct: "6 Left, 2 Right", wrong: "5 Left, 3 Right", cat: ["handedness", "defense"]},
    {q: "What position does Zach Whitecloud play?", correct: "D", wrong: "C", cat: ["position", "defense"]},
    {q: "What position does Brayden McNabb play?", correct: "D", wrong: "LW", cat: ["position", "defense"]},
    {q: "What position does Jeremy Lauzon play?", correct: "D", wrong: "RW", cat: ["position", "defense"]},
    {q: "What position does Kaedan Korczak play?", correct: "D", wrong: "C", cat: ["position", "defense"]},
    {q: "What position does Noah Hanifin play?", correct: "D", wrong: "LW", cat: ["position", "defense"]},
    {q: "What position does Ben Hutton play?", correct: "D", wrong: "C", cat: ["position", "defense"]},
    {q: "What position does Shea Theodore play?", correct: "D", wrong: "RW", cat: ["position", "defense"]},
    {q: "What position does Jaycob Megna play?", correct: "D", wrong: "C", cat: ["position", "defense"]},
    {q: "Which side does Zach Whitecloud shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "defense"]},
    {q: "Which side does Brayden McNabb shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which side does Jeremy Lauzon shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which side does Kaedan Korczak shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "defense"]},
    {q: "Which side does Noah Hanifin shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which side does Ben Hutton shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which side does Shea Theodore shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "Which side does Jaycob Megna shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "defense"]},
    {q: "How many defensemen are on the roster?", correct: "8", wrong: "7", cat: ["position", "defense"]},

    // Forwards - Left Wing (3: Barbashev #49, Reinhardt #23, Saad #20)
    {q: "What # does Ivan Barbashev wear?", correct: "49", wrong: "19", cat: ["numbers", "forwards"]},
    {q: "What # does Cole Reinhardt wear?", correct: "23", wrong: "20", cat: ["numbers", "forwards"]},
    {q: "What # does Brandon Saad wear?", correct: "20", wrong: "23", cat: ["numbers", "forwards"]},
    {q: "Who wears #20?", correct: "Brandon Saad", wrong: "Cole Reinhardt", cat: ["numbers", "forwards"]},
    {q: "Who wears #23?", correct: "Cole Reinhardt", wrong: "Brandon Saad", cat: ["numbers", "forwards"]},
    {q: "Who wears #49?", correct: "Ivan Barbashev", wrong: "Brett Howden", cat: ["numbers", "forwards"]},
    {q: "Which hand does Barbashev shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "Which hand does Reinhardt shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "Which hand does Saad shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "What position is Barbashev?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Reinhardt?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Saad?", correct: "F", wrong: "D", cat: ["position", "forwards"]},

    // Forwards - Center (5: Eichel #9, Sissons #10, Howden #21, Hertl #48, Karlsson #71)
    {q: "What # does Jack Eichel wear?", correct: "9", wrong: "10", cat: ["numbers", "forwards"]},
    {q: "What # does Colton Sissons wear?", correct: "10", wrong: "9", cat: ["numbers", "forwards"]},
    {q: "What # does Brett Howden wear?", correct: "21", wrong: "19", cat: ["numbers", "forwards"]},
    {q: "What # does Tomas Hertl wear?", correct: "48", wrong: "49", cat: ["numbers", "forwards"]},
    {q: "What # does William Karlsson wear?", correct: "71", wrong: "70", cat: ["numbers", "forwards"]},
    {q: "Who wears #9?", correct: "Jack Eichel", wrong: "Colton Sissons", cat: ["numbers", "forwards"]},
    {q: "Who wears #10?", correct: "Colton Sissons", wrong: "Jack Eichel", cat: ["numbers", "forwards"]},
    {q: "Who wears #21?", correct: "Brett Howden", wrong: "Tomas Hertl", cat: ["numbers", "forwards"]},
    {q: "Who wears #48?", correct: "Tomas Hertl", wrong: "Ivan Barbashev", cat: ["numbers", "forwards"]},
    {q: "Who wears #71?", correct: "William Karlsson", wrong: "Mark Stone", cat: ["numbers", "forwards"]},
    {q: "Which hand does Eichel shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "forwards"]},
    {q: "Which hand does Sissons shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "forwards"]},
    {q: "Which hand does Howden shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "Which hand does Hertl shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "Which hand does Karlsson shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "What position is Eichel?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Sissons?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Howden?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Hertl?", correct: "F", wrong: "G", cat: ["position", "forwards"]},
    {q: "What position is Karlsson?", correct: "F", wrong: "G", cat: ["position", "forwards"]},

    // Forwards - Right Wing (6: Dorofeyev #16, Smith #19, Holtz #26, Kolesar #55, Stone #61, Marner #93)
    {q: "What # does Pavel Dorofeyev wear?", correct: "16", wrong: "19", cat: ["numbers", "forwards"]},
    {q: "What # does Reilly Smith wear?", correct: "19", wrong: "16", cat: ["numbers", "forwards"]},
    {q: "What # does Alexander Holtz wear?", correct: "26", wrong: "19", cat: ["numbers", "forwards"]},
    {q: "What # does Keegan Kolesar wear?", correct: "55", wrong: "61", cat: ["numbers", "forwards"]},
    {q: "What # does Mark Stone wear?", correct: "61", wrong: "71", cat: ["numbers", "forwards"]},
    {q: "What # does Mitch Marner wear?", correct: "93", wrong: "61", cat: ["numbers", "forwards"]},
    {q: "Who wears #16?", correct: "Pavel Dorofeyev", wrong: "Reilly Smith", cat: ["numbers", "forwards"]},
    {q: "Who wears #19?", correct: "Reilly Smith", wrong: "Alexander Holtz", cat: ["numbers", "forwards"]},
    {q: "Who wears #26?", correct: "Alexander Holtz", wrong: "Pavel Dorofeyev", cat: ["numbers", "forwards"]},
    {q: "Who wears #55?", correct: "Keegan Kolesar", wrong: "Mark Stone", cat: ["numbers", "forwards"]},
    {q: "Who wears #61?", correct: "Mark Stone", wrong: "William Karlsson", cat: ["numbers", "forwards"]},
    {q: "Who wears #93?", correct: "Mitch Marner", wrong: "Mark Stone", cat: ["numbers", "forwards"]},
    {q: "Which hand does Dorofeyev shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "Which hand does Smith shoot?", correct: "Left", wrong: "Right", cat: ["handedness", "forwards"]},
    {q: "Which hand does Holtz shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "forwards"]},
    {q: "Which hand does Kolesar shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "forwards"]},
    {q: "Which hand does Stone shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "forwards"]},
    {q: "Which hand does Marner shoot?", correct: "Right", wrong: "Left", cat: ["handedness", "forwards"]},
    {q: "What position is Dorofeyev?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Smith?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Holtz?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Kolesar?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Stone?", correct: "F", wrong: "D", cat: ["position", "forwards"]},
    {q: "What position is Marner?", correct: "F", wrong: "D", cat: ["position", "forwards"]},

    // Forwards - Summary questions
    {q: "How many forwards shoot right?", correct: "6", wrong: "7", cat: ["handedness", "forwards"]},
    {q: "How many forwards shoot left?", correct: "8", wrong: "7", cat: ["handedness", "forwards"]},
    {q: "How many forwards are on the roster?", correct: "14", wrong: "13", cat: ["position", "forwards"]},
    {q: "Who is the team captain?", correct: "Mark Stone", wrong: "Jack Eichel", cat: ["position", "forwards"]},
    {q: "Barbashev's number?", correct: "49", wrong: "19", cat: ["numbers", "forwards"]},
    {q: "Eichel's number?", correct: "9", wrong: "10", cat: ["numbers", "forwards"]},
    {q: "Stone's number?", correct: "61", wrong: "71", cat: ["numbers", "forwards"]},
    {q: "Marner's number?", correct: "93", wrong: "61", cat: ["numbers", "forwards"]},
    {q: "Karlsson's number?", correct: "71", wrong: "70", cat: ["numbers", "forwards"]},
    {q: "Dorofeyev's number?", correct: "16", wrong: "19", cat: ["numbers", "forwards"]},
    {q: "Hertl's number?", correct: "48", wrong: "49", cat: ["numbers", "forwards"]},
    {q: "Who is #9?", correct: "Eichel", wrong: "Sissons", cat: ["numbers", "forwards"]},
    {q: "Who is #61?", correct: "Stone", wrong: "Karlsson", cat: ["numbers", "forwards"]},
    {q: "Who is #93?", correct: "Marner", wrong: "Stone", cat: ["numbers", "forwards"]},
];

let allQuestions = questions;
let activeQuestions = [];
let shuffledQuestions = [];
let questionStats = {};
let userAnswers = {};
let selectedCategories = ['numbers', 'handedness', 'position', 'goalies', 'defense', 'forwards'];
let selectedPalette = 'classic';

// Load stats from localStorage
function loadStats() {
    const saved = localStorage.getItem('rosterQuizStats');
    if (saved) {
        try {
            questionStats = JSON.parse(saved);
        } catch (e) {
            questionStats = {};
        }
    }
}

// Load palette preference
function loadPalette() {
    const saved = localStorage.getItem('colorPalette');
    if (saved && (saved === 'classic' || saved === 'bold')) {
        selectedPalette = saved;
        applyPalette(selectedPalette);
        document.getElementById('palette-' + selectedPalette).checked = true;
    }
}

// Apply color palette
function applyPalette(palette) {
    if (palette === 'bold') {
        document.body.classList.add('palette-bold');
    } else {
        document.body.classList.remove('palette-bold');
    }
}

// Select palette
function selectPalette(palette) {
    selectedPalette = palette;
    document.getElementById('palette-' + palette).checked = true;
    applyPalette(palette);
    localStorage.setItem('colorPalette', palette);
}

// Save stats to localStorage
function saveStats() {
    localStorage.setItem('rosterQuizStats', JSON.stringify(questionStats));
}

function toggleCategory(cat) {
    const checkbox = document.getElementById('cat-' + cat);
    checkbox.checked = !checkbox.checked;
    updateStartButton();
    event.stopPropagation();
}

function updateStartButton() {
    const numbersChecked = document.getElementById('cat-numbers').checked;
    const handednessChecked = document.getElementById('cat-handedness').checked;
    const positionChecked = document.getElementById('cat-position').checked;
    const goaliesChecked = document.getElementById('cat-goalies').checked;
    const defenseChecked = document.getElementById('cat-defense').checked;
    const forwardsChecked = document.getElementById('cat-forwards').checked;

    const startBtn = document.getElementById('startBtn');
    const anySelected = numbersChecked || handednessChecked || positionChecked || goaliesChecked || defenseChecked || forwardsChecked;

    startBtn.disabled = !anySelected;

    if (anySelected) {
        selectedCategories = [];
        if (numbersChecked) selectedCategories.push('numbers');
        if (handednessChecked) selectedCategories.push('handedness');
        if (positionChecked) selectedCategories.push('position');
        if (goaliesChecked) selectedCategories.push('goalies');
        if (defenseChecked) selectedCategories.push('defense');
        if (forwardsChecked) selectedCategories.push('forwards');

        // AND logic: question must have ALL selected categories
        const count = allQuestions.filter(q =>
            selectedCategories.every(c => q.cat.includes(c))
        ).length;

        startBtn.textContent = `Start Quiz (${count} questions)`;
    } else {
        startBtn.textContent = 'Start Quiz';
    }
}

function startQuiz() {
    // Filter questions by selected categories (AND logic)
    activeQuestions = allQuestions.filter(q =>
        selectedCategories.every(c => q.cat.includes(c))
    );

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';

    generateQuiz();
}

function backToStart() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function smartShuffle(array) {
    const wrong = [];
    const unanswered = [];
    const correct = [];

    array.forEach(q => {
        const stat = questionStats[q.q];
        if (!stat) {
            unanswered.push(q);
        } else if (stat.lastResult === 'incorrect') {
            wrong.push(q);
        } else if (stat.lastResult === 'correct') {
            correct.push(q);
        }
    });

    const shuffledWrong = shuffle(wrong);
    const shuffledUnanswered = shuffle(unanswered);
    const shuffledCorrect = shuffle(correct);

    return [...shuffledWrong, ...shuffledUnanswered, ...shuffledCorrect];
}

function selectOption(index, isCorrect) {
    const buttons = document.querySelectorAll(`[data-question="${index}"]`);
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    userAnswers[index] = isCorrect;
}

function generateQuiz() {
    shuffledQuestions = smartShuffle(activeQuestions);
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';
    document.getElementById('score').style.display = 'none';
    userAnswers = {};

    const wrong = activeQuestions.filter(q => questionStats[q.q]?.lastResult === 'incorrect').length;
    const correct = activeQuestions.filter(q => questionStats[q.q]?.lastResult === 'correct').length;
    const unanswered = activeQuestions.length - wrong - correct;

    let progressMsg = 'Select answers then click Submit';
    if (wrong > 0 || correct > 0) {
        progressMsg = `📊 Questions prioritized: ${wrong} wrong (first), ${unanswered} unanswered, ${correct} correct`;
    }
    document.getElementById('progress').textContent = progressMsg;

    shuffledQuestions.forEach((item, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';

        let statusBadge = '';
        const stat = questionStats[item.q];
        if (stat?.lastResult === 'incorrect') {
            statusBadge = '<span class="status-badge status-wrong">Previously Wrong</span>';
        } else if (stat?.lastResult === 'correct') {
            statusBadge = '<span class="status-badge status-correct">Previously Correct</span>';
        }

        // Randomize option order
        const options = Math.random() < 0.5
            ? [{text: item.correct, isCorrect: true}, {text: item.wrong, isCorrect: false}]
            : [{text: item.wrong, isCorrect: false}, {text: item.correct, isCorrect: true}];

        qDiv.innerHTML = `
            <div class="question-text">${index + 1}. ${item.q}${statusBadge}</div>
            <div class="options">
                <button type="button" class="option-btn" data-question="${index}" onclick="selectOption(${index}, ${options[0].isCorrect})">${options[0].text}</button>
                <button type="button" class="option-btn" data-question="${index}" onclick="selectOption(${index}, ${options[1].isCorrect})">${options[1].text}</button>
            </div>
            <div class="feedback" id="f${index}"></div>
        `;
        questionsDiv.appendChild(qDiv);
    });
}

function shuffleQuiz() {
    generateQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetStats() {
    if (confirm('Reset all question statistics? This will clear your progress.')) {
        questionStats = {};
        localStorage.removeItem('rosterQuizStats');
        generateQuiz();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function exportStats() {
    const statsText = JSON.stringify(questionStats, null, 2);
    const blob = new Blob([statsText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roster-quiz-stats.json';
    a.click();
    URL.revokeObjectURL(url);
}

function viewStats() {
    const totalQuestions = allQuestions.length;
    const answeredQuestions = Object.keys(questionStats).length;
    const unanswered = totalQuestions - answeredQuestions;

    let correct = 0;
    let incorrect = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;

    Object.values(questionStats).forEach(stat => {
        if (stat.lastResult === 'correct') correct++;
        if (stat.lastResult === 'incorrect') incorrect++;
        totalCorrect += stat.correct || 0;
        totalIncorrect += stat.incorrect || 0;
    });

    const totalAttempts = totalCorrect + totalIncorrect;
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    const statsMessage = `
📊 ROSTER QUIZ STATISTICS

Overall Performance:
• Total Questions: ${totalQuestions}
• Questions Attempted: ${answeredQuestions}
• Not Yet Attempted: ${unanswered}

Current Status:
• Last Answered Correctly: ${correct}
• Last Answered Incorrectly: ${incorrect}
• Unanswered: ${unanswered}

All-Time Accuracy:
• Total Attempts: ${totalAttempts}
• Correct Answers: ${totalCorrect}
• Incorrect Answers: ${totalIncorrect}
• Accuracy Rate: ${accuracy}%

Questions you got wrong will appear first when you shuffle the quiz!
    `.trim();

    alert(statsMessage);
}

// Initialize: load stats and palette from localStorage
loadStats();
loadPalette();
updateStartButton();

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let correct = 0;
    let total = shuffledQuestions.length;

    shuffledQuestions.forEach((item, index) => {
        const buttons = document.querySelectorAll(`[data-question="${index}"]`);
        const feedback = document.getElementById(`f${index}`);
        const userAnswer = userAnswers[index];

        if (!questionStats[item.q]) {
            questionStats[item.q] = { correct: 0, incorrect: 0 };
        }

        if (userAnswer === true) {
            correct++;
            questionStats[item.q].correct++;
            questionStats[item.q].lastResult = 'correct';
            feedback.className = 'feedback correct';
            feedback.textContent = '✓ Correct!';
            feedback.style.display = 'block';

            buttons.forEach(btn => {
                if (btn.textContent === item.correct) {
                    btn.classList.add('correct');
                }
            });
        } else if (userAnswer === false) {
            questionStats[item.q].incorrect++;
            questionStats[item.q].lastResult = 'incorrect';
            feedback.className = 'feedback incorrect';
            feedback.textContent = `✗ Correct answer: ${item.correct}`;
            feedback.style.display = 'block';

            buttons.forEach(btn => {
                if (btn.textContent === item.correct) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('incorrect');
                }
            });
        } else {
            feedback.className = 'feedback incorrect';
            feedback.textContent = `⚠ Not answered. Correct: ${item.correct}`;
            feedback.style.display = 'block';

            buttons.forEach(btn => {
                if (btn.textContent === item.correct) {
                    btn.classList.add('correct');
                }
            });
        }
    });

    const scoreDiv = document.getElementById('score');
    const percentage = Math.round((correct / total) * 100);
    scoreDiv.textContent = `Score: ${correct}/${total} (${percentage}%)`;
    scoreDiv.style.display = 'block';

    // Save stats to localStorage
    saveStats();

    window.scrollTo({ top: 0, behavior: 'smooth' });
});
