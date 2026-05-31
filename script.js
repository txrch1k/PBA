// Sample League Data - You can replace/extend this
let players = [
    { name: "Juan Carlos", team: "Ginebra", gamesPlayed: 5, totalPoints: 120, totalRebounds: 30, totalAssists: 25 },
    { name: "Marc Pingris", team: "San Miguel", gamesPlayed: 5, totalPoints: 95, totalRebounds: 50, totalAssists: 15 },
    { name: "James Yap", team: "Rain or Shine", gamesPlayed: 5, totalPoints: 150, totalRebounds: 15, totalAssists: 30 },
    { name: "June Mar", team: "San Miguel", gamesPlayed: 4, totalPoints: 110, totalRebounds: 40, totalAssists: 10 }
];

// Calculate averages (PTS / Games)
function calculateAverages(player) {
    if (player.gamesPlayed === 0) return { ppg: 0, rpg: 0, apg: 0 };
    return {
        ppg: (player.totalPoints / player.gamesPlayed).toFixed(1),
        rpg: (player.totalRebounds / player.gamesPlayed).toFixed(1),
        apg: (player.totalAssists / player.gamesPlayed).toFixed(1)
    };
}

// Render Players in the directory table
function renderPlayerTable() {
    const tbody = document.getElementById('player-table-body');
    tbody.innerHTML = '';

    players.forEach(player => {
        const avg = calculateAverages(player);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${player.name}</strong></td>
            <td>${player.team}</td>
            <td>${player.gamesPlayed}</td>
            <td>${player.totalPoints}</td>
            <td>${player.totalRebounds}</td>
            <td>${player.totalAssists}</td>
            <td>${avg.ppg}</td>
        `;
        tbody.appendChild(row);
    });
}

// Render the Leaders in the Dashboard
function renderLeaders() {
    const ppgList = document.getElementById('ppg-leaders');
    const apgList = document.getElementById('apg-leaders');
    const rpgList = document.getElementById('rpg-leaders');

    // Create copies of the player array to sort
    const ppgSorted = [...players].sort((a, b) => (b.totalPoints / b.gamesPlayed) - (a.totalPoints / a.gamesPlayed));
    const apgSorted = [...players].sort((a, b) => (b.totalAssists / b.gamesPlayed) - (a.totalAssists / a.gamesPlayed));
    const rpgSorted = [...players].sort((a, b) => (b.totalRebounds / b.gamesPlayed) - (a.totalRebounds / a.gamesPlayed));

    ppgList.innerHTML = ppgSorted.slice(0, 3).map(p => `<li>${p.name} - ${(p.totalPoints/p.gamesPlayed).toFixed(1)} PPG</li>`).join('');
    apgList.innerHTML = apgSorted.slice(0, 3).map(p => `<li>${p.name} - ${(p.totalAssists/p.gamesPlayed).toFixed(1)} APG</li>`).join('');
    rpgList.innerHTML = rpgSorted.slice(0, 3).map(p => `<li>${p.name} - ${(p.totalRebounds/p.gamesPlayed).toFixed(1)} RPG</li>`).join('');
}

// Simulate importing stats from an image
document.getElementById('upload-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('stat-image');
    const statusText = document.getElementById('upload-status');

    if (!fileInput.files || fileInput.files.length === 0) {
        statusText.style.color = 'red';
        statusText.textContent = 'Please select an image file first!';
        return;
    }

    statusText.style.color = '#ff5722';
    statusText.textContent = 'Uploading image and extracting stats...';

    // Simulate "OCR processing" and "database update"
    setTimeout(() => {
        players = players.map(player => {
            // Randomly simulate adding stats for this game
            const newGamePoints = Math.floor(Math.random() * 25) + 10;
            const newGameRebounds = Math.floor(Math.random() * 12) + 2;
            const newGameAssists = Math.floor(Math.random() * 10) + 1;

            return {
                ...player,
                gamesPlayed: player.gamesPlayed + 1,
                totalPoints: player.totalPoints + newGamePoints,
                totalRebounds: player.totalRebounds + newGameRebounds,
                totalAssists: player.totalAssists + newGameAssists
            };
        });

        statusText.style.color = 'green';
        statusText.textContent = 'Success! Image processed and player stats updated.';
        
        renderPlayerTable();
        renderLeaders();
    }, 2000); // Wait 2 seconds to mimic server upload time
});

// Initial Render
renderPlayerTable();
renderLeaders();
