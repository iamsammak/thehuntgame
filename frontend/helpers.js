export function getCurrentStage(gameState) {
  if (gameState[8] && gameState[8].solved) {
    return 9;
  } else if (gameState[7] && gameState[7].solved && gameState[8].started) {
    return 8;
  } else if (gameState[6] && gameState[6].solved && gameState[7].started) {
    return 7;
  } else if (gameState[5] && gameState[5].solved && gameState[6].started) {
    return 6;
  } else if (gameState[4] && gameState[4].solved && gameState[5].started) {
    return 5;
  } else if (
    gameState[3] && gameState[3].solved &&
    gameState[2] && gameState[2].solved &&
    gameState[1] && gameState[1].solved &&
    gameState[4] && gameState[4].started
  ) {
    return 4;
  } else if (gameState[2] && !gameState[2].solved && gameState[3].started) {
    return 3;
  } else if (gameState[1] && gameState[1].solved && gameState[2].started) {
    return 2;
  } else if (gameState[1] && gameState[1].started) {
    return 1;
  }
  return 0;
}

export const PEOPLE = {
  "Matt": { src: "images/placeholder.jpg" },
  "Tim": { src: "images/placeholder.jpg" },
  "Jay": { src: "images/placeholder.jpg" },
  "Ryan": { src: "images/placeholder.jpg" },
  "Kristi": { src: "images/placeholder.jpg" },
  "Erica": { src: "images/placeholder.jpg" },
  "MaryAnn": { src: "images/placeholder.jpg" },
  "Helena": { src: "images/placeholder.jpg" },
};

function pad(n) {
  if (n < 10) {
    return '0' + n;
  }
  return n.toString();
}

export function formatElapsedTime(elapsed) {
  const ms = Math.round(((elapsed % 1000) / 101) * 10);
  const sec = Math.floor((elapsed / 1000)) % 60;
  const min = Math.floor((elapsed / 1000 / 60)) % 60;
  const hrs = Math.floor((elapsed / 1000 / 60 / 60)) % 24;
  return `${pad(hrs)}:${pad(min)}:${pad(sec)}:${pad(ms)}`;
}
