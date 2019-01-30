export function getCurrentStage(gameState) {
  if (gameState[8] && gameState[8].solved) {
    return 9;
  } else if (gameState[7] && gameState[7].solved) {
    return 8;
  } else if (gameState[6] && gameState[6].solved) {
    return 7;
  } else if (gameState[5] && gameState[5].solved) {
    return 6;
  } else if (gameState[4] && gameState[4].solved) {
    return 5;
  } else if (
    gameState[3] && gameState[3].solved &&
    gameState[2] && gameState[2].solved &&
    gameState[1] && gameState[1].solved
  ) {
    return 4;
  } else if (gameState[1] && !gameState[1].solved) {
    return 1;
  } else if (gameState[2] && !gameState[2].solved) {
    return 2;
  } else if (gameState[3] && !gameState[3].solved) {
    return 3;
  }
  return 0;
}

export const PEOPLE = {
  "Person0": { src: "images/placeholder.jpg", gender: "male" },
  "Person1": { src: "images/placeholder.jpg", gender: "male" },
  "Person2": { src: "images/placeholder.jpg", gender: "female" },
  "Person3": { src: "images/placeholder.jpg", gender: "female" },
  "Person4": { src: "images/placeholder.jpg", gender: "male" },
  "Person5": { src: "images/placeholder.jpg", gender: "female" },
  "Person6": { src: "images/placeholder.jpg", gender: "male" },
  "Person7": { src: "images/placeholder.jpg", gender: "female" },
};
