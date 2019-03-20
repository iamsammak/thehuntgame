const people = ["matt", "tim", "jay", "ryan", "kristi", "erica", "maryann", "helena"];
const answers = ['getaway', 'secret', 'honeymoon', [false, false, true, true, false, false, false, false, true, false], 'devotion', '', [false, true, true, false, true, false, false, true, true, false], ''];
const state = {};

// an integer between 0 and PAUSE_BETWEEN_EVERY_ACTION_MAX is how long a user will
// do nothing after each action
const PAUSE_BETWEEN_EVERY_ACTION_MAX = 10;
// 1 / PROB_OF_CORRECT_ANSWER is the probability the user will get the answer right
const PROB_OF_CORRECT_ANSWER = 50;

// [min, max)
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function genRandomThink(context, eventEmitter, done) {
  context.vars.think = generateRandomNumber(0, PAUSE_BETWEEN_EVERY_ACTION_MAX);
  return done();
}

function genRandomPerson(context, eventEmitter, done) {
  const index = generateRandomNumber(0, people.length);
  context.vars.person = people[index];
  return done();
}

// We can get into weird situations where we submit an answer
// before we start it, but it's probably not a big deal.
function genRandomAnswer(context, eventEmitter, done) {
  const index = generateRandomNumber(0, PROB_OF_CORRECT_ANSWER);
  const table = context.vars.table;
  const puzzle = state[table];
  context.vars.puzzle = puzzle;
  if (index === 1) {
    context.vars.answer = answers[puzzle - 1];
    // Next puzzle
    state[table] += 1;
  } else {
    context.vars.answer = 'wrong';
  }
  return done();
}

function joinTable(context, eventEmitter, done) {
  const table = generateRandomNumber(0, 30);
  context.vars.table = table;
  if (state[table] === undefined) {
    state[table] = 1;
  }
  context.vars.puzzle = state[table];
  return done();
}

function updateContext(context, eventEmitter, done) {
  const table = context.vars.table;
  if (state[table] !== undefined) {
    context.vars.puzzle = state[table];
  }
  return done();
}

module.exports = {
  genRandomAnswer,
  genRandomPerson,
  genRandomThink,
  joinTable,
  updateContext,
};
