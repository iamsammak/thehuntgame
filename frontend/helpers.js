export function isSolved(gameState, puzzle) {
  return gameState[puzzle] && gameState[puzzle].solved;
}

export function getCurrentStage(gameState) {
  if (isSolved(gameState, '8')) {
    return 9;
  } else if (isSolved(gameState, '7') && gameState['8'].started) {
    return 8;
  } else if (isSolved(gameState, '6') && gameState['7'].started) {
    return 7;
  } else if (isSolved(gameState, '5') && gameState['6'].started) {
    return 6;
  } else if (isSolved(gameState, '4') && gameState['5'].started) {
    return 5;
  } else if (
    isSolved(gameState, '3') &&
    isSolved(gameState, '2') &&
    isSolved(gameState, '1') &&
    gameState['4'] && gameState['4'].started
  ) {
    return 4;
  } else if (isSolved(gameState, '2') && gameState['3'].started) {
    return 3;
  } else if (isSolved(gameState, '1') && gameState['2'].started) {
    return 2;
  } else if (gameState['1'] && gameState['1'].started) {
    return 1;
  }
  return 0;
}

export const PEOPLE = {
  "Matt": { path: "/matt", src: "images/matt.jpeg" },
  "Tim": { path: "/tim", src: "images/tim.jpeg" },
  "Jay": { path: "/jay", src: "images/jay.jpeg" },
  "Ryan": { path: "/ryan", src: "images/ryan.jpeg" },
  "Kristi": { path: "/kristi", src: "images/kristi.jpeg" },
  "Erica": { path: "/erica", src: "images/erica.jpeg" },
  "MaryAnn": { path: "/maryann", src: "images/maryann.jpeg" },
  "Helena": { path: "/helena", src: "images/helena.jpeg" },
};

function pad(n) {
  if (n < 10) {
    return `0${n}`;
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
