const studyContent = document.getElementById('study-content');

// Group players by position
const forwards = players.filter(p => ['L', 'R', 'C'].includes(p.position));
const defensemen = players.filter(p => p.position === 'D');
const goalies = players.filter(p => p.position === 'G');

function renderStudyGuide() {
    studyContent.innerHTML = `
        <div class="study-section">
            <h2>Forwards</h2>
            ${renderPlayerTable(forwards)}
        </div>
        
        <div class="study-section">
            <h2>Defensemen</h2>
            ${renderPlayerTable(defensemen)}
        </div>
        
        <div class="study-section">
            <h2>Goalies</h2>
            ${renderPlayerTable(goalies, true)}
        </div>
        
        <div class="study-section">
            <h2>Special Roles</h2>
            <p><strong>Captain:</strong> Mark Stone (#61)</p>
        </div>
    `;
}

function renderPlayerTable(playerList, isGoalie = false) {
    const handLabel = isGoalie ? 'Catches' : 'Shoots';
    
    return `
        <table class="player-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>#</th>
                    <th>Position</th>
                    <th>${handLabel}</th>
                </tr>
            </thead>
            <tbody>
                ${playerList.map(p => `
                    <tr>
                        <td>${p.name}</td>
                        <td>${p.number}</td>
                        <td>${positionNames[p.position]}</td>
                        <td>${p.handedness}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

renderStudyGuide();