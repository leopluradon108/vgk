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
                <div class="template-category">
                    <h3>All Positions</h3>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" value="number-by-name" class="template-check">
                            <span>What # does [player] wear?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="name-by-number" class="template-check">
                            <span>Who wears #[number]?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="position-by-name" class="template-check">
                            <span>What position does [player] play?</span>
                        </label>
                    </div>
                </div>

                <div class="template-category">
                    <h3>Offense and Defense</h3>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" value="shoots" class="template-check">
                            <span>Which side does [player] shoot?</span>
                        </label>
                    </div>
                </div>

                <div class="template-category">
                    <h3>Goalie Only</h3>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" value="catches" class="template-check">
                            <span>Which hand does [player] catch with?</span>
                        </label>
                    </div>
                </div>

                <div class="template-category">
                    <h3>Critical Thinking</h3>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" value="players-by-handedness" class="template-check">
                            <span>Which player/s shoot/s left/right?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="count-forwards-handedness" class="template-check">
                            <span>How many forwards shoot left vs right?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="count-defense-handedness" class="template-check">
                            <span>How many defensemen shoot left vs right?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="count-wingers-handedness" class="template-check">
                            <span>How many left/right wingers shoot left vs right?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="count-centers-handedness" class="template-check">
                            <span>How many centers shoot left vs right?</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="centers-shoot-right" class="template-check">
                            <span>Which centers shoot right?</span>
                        </label>
                    </div>
                </div>

                <div class="template-category">
                    <h3>Special Questions</h3>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" value="captain" class="template-check">
                            <span>Who is the team captain?</span>
                        </label>
                    </div>
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
    // Next step: generate questions based on selections
    console.log('Positions:', selectedPositions);
    console.log('Templates:', selectedTemplates);
}

function renderQuestion() {
    // Next step: render questions
}

renderQuizSetup();