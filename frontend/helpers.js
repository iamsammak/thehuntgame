import React from 'react';

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
  "matt": { displayName: 'Matt', path: "/matt", src: "images/matt.jpeg", gender: "male" },
  "tim": { displayName: 'Tim', path: "/tim", src: "images/tim.jpeg", gender: "male" },
  "jay": { displayName: 'Jay', path: "/jay", src: "images/jay.jpeg", gender: "male" },
  "ryan": { displayName: 'Ryan', path: "/ryan", src: "images/ryan.jpeg", gender: "male" },
  "kristi": { displayName: 'Kristi', path: "/kristi", src: "images/kristi.jpeg", gender: "female" },
  "erica": { displayName: 'Erica', path: "/erica", src: "images/erica.jpeg", gender: "female" },
  "maryann": { displayName: 'Mary Ann', path: "/maryann", src: "images/maryann.jpeg", gender: "female" },
  "helena": { displayName: 'Helena', path: "/helena", src: "images/helena.jpeg", gender: "female" },
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

export const HINTS = {
  1: "These letters don't make any sense like this. What if we move the letters along the alphabet like Ryan had moved?",
  2: "You found a riddle after visiting Kristi? Hmm...if it's not written in ink, then maybe it's white space?",
  3: "Erica's clue has nine numbers. Aren't there nine ingredients at the tea table? What if you take a letter from each ingredient?",
  4: (
    <div>
      My Chinese name? Chris mispronounces it all the time! He should use an online dictionary like <a href="https://www.cantoneseclass101.com/cantonese-dictionary/">this one</a> to figure out how to pronounce words.
    </div>
  ),
  5: "The paper looks oddly familiar. Did we take a picture with it at the photobooth?",
  8: "Jay would've taken the shortest path possible from his car to the sweetheart table. Retrace only his steps and nothing more, otherwise he'll restart from the beginning.",
};

export function hintAvailable(gameState) {
  const stage = getCurrentStage(gameState);
  const stageSolved = isSolved(gameState, stage.toString());
  return !stageSolved && HINTS[stage] !== undefined;
}
