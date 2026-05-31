<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PBA Basketball League | Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="logo">PBA League</div>
        <div class="nav-links">
            <a href="#" class="active">Dashboard</a>
            <a href="#">Teams</a>
            <a href="#">Stats</a>
            <a href="#">Leaders</a>
            <a href="#">Admin (Upload)</a>
        </div>
    </nav>

    <main class="container">
        <!-- Dashboard Header -->
        <header class="dash-header">
            <h1>League Leaders</h1>
            <p>Welcome to the official home of the PBA. Data updates automatically upon image upload!</p>
        </header>

        <!-- Leaders Section -->
        <section class="leaders-section">
            <div class="leader-card">
                <h3>Points Per Game (PPG)</h3>
                <ol id="ppg-leaders">
                    <!-- Populated via JS -->
                </ol>
            </div>
            <div class="leader-card">
                <h3>Assists Per Game (APG)</h3>
                <ol id="apg-leaders">
                    <!-- Populated via JS -->
                </ol>
            </div>
            <div class="leader-card">
                <h3>Rebounds Per Game (RPG)</h3>
                <ol id="rpg-leaders">
                    <!-- Populated via JS -->
                </ol>
            </div>
        </section>

        <!-- UPLOAD SECTION -->
        <section class="upload-section">
            <h2>Upload Stat Sheet (OCR)</h2>
            <p>Upload a scorecard image (e.g., box score or stat sheet). Our system simulates OCR processing and adds to each player's existing totals!</p>
            <div class="upload-box">
                <input type="file" id="stat-image" accept="image/*">
                <button id="upload-btn" class="primary-btn">Process & Add Stats</button>
            </div>
            <p id="upload-status"></p>
        </section>

        <!-- Player Directory -->
        <section class="player-directory">
            <h2>Player Roster & Season Totals</h2>
            <table class="player-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Team</th>
                        <th>GP</th>
                        <th>PTS</th>
                        <th>REB</th>
                        <th>AST</th>
                        <th>PPG</th>
                    </tr>
                </thead>
                <tbody id="player-table-body">
                    <!-- Populated via JS -->
                </tbody>
            </table>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #121212;
    color: #e0e0e0;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e1e1e;
    padding: 1rem 2rem;
    border-bottom: 2px solid #ff5722;
}

.navbar .logo {
    font-weight: bold;
    color: #ff5722;
    font-size: 1.5rem;
}

.nav-links a {
    color: #e0e0e0;
    text-decoration: none;
    margin-left: 1.5rem;
    transition: color 0.3s;
}

.nav-links a:hover, .nav-links a.active {
    color: #ff5722;
}

.container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.dash-header {
    margin-bottom: 2rem;
}

.leaders-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.leader-card {
    background-color: #1e1e1e;
    padding: 1.5rem;
    border-radius: 8px;
    border-top: 4px solid #ff5722;
}

.leader-card h3 {
    margin-bottom: 1rem;
    color: #ff5722;
}

.leader-card ol {
    padding-left: 1.5rem;
}

.leader-card li {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.upload-section {
    background-color: #1e1e1e;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 3rem;
    text-align: center;
}

.upload-box {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
}

.primary-btn {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.primary-btn:hover {
    background-color: #e64a19;
}

.player-directory {
    background-color: #1e1e1e;
    padding: 2rem;
    border-radius: 8px;
}

.player-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.player-table th, .player-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #333;
}

.player-table th {
    color: #ff5722;
}

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
