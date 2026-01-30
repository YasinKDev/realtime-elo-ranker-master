const API_URL = 'http://localhost:3000/api';

const botNames = ['Kevin', 'Canna', 'Busio', 'Caliste', 'Prime', 'Tiky', 'Akali', 'Kyeahoo'];
const playerIds = [];

async function createBots() {
  console.log('Création des robots...');
  for (const name of botNames) {
    try {
      await fetch(`${API_URL}/player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: name }),
      });
      playerIds.push(name);
    } catch (e) {
      playerIds.push(name);
    }
  }
}

async function playRandomMatch() {
  if (playerIds.length < 2) return;

  // Choisir 2 joueurs au hasard
  const p1 = playerIds[Math.floor(Math.random() * playerIds.length)];
  let p2 = playerIds[Math.floor(Math.random() * playerIds.length)];
  while (p1 === p2) {
    p2 = playerIds[Math.floor(Math.random() * playerIds.length)];
  }

  const isDraw = Math.random() > 0.8; 
  const winner = Math.random() > 0.5 ? p1 : p2;
  const loser = winner === p1 ? p2 : p1;

  try {
    const res = await fetch(`${API_URL}/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        winner: winner,
        loser: loser,
        draw: isDraw
      }),
    });
    
    if (res.ok) {
        console.log(`Match : ${winner} bat ${loser} (Draw: ${isDraw})`);
    }
  } catch (e) {
    console.error('Erreur match:', e.message);
  }
}

// Lancement
(async () => {
  await createBots();
  setInterval(playRandomMatch, 100);
})();