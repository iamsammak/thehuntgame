import React from 'react';

import { isSolved, getCurrentStage } from '../helpers';
import Base from './base';
import Hint from './hint';
import Puzzle from './puzzle';
import Puzzle4 from './puzzle4';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';
import PersonHeader from './personHeader';

class Person0 extends React.Component {
  render() {
    const { gameState, personId, socket } = this.props;
    const stage = getCurrentStage(gameState);
    const puzzle1Solved = isSolved(gameState, '1');
    const stageSolved = isSolved(gameState, stage.toString());
    const hint = <Hint hint={stage.toString()} socket={socket} />;
    const showBase = true;

    let body;
    if (stage >= 1 && puzzle1Solved && stage <= 4) {
      body = <Puzzle {...this.props} component={Puzzle4} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue0" personId={personId} />;
    } else if (stage === 7) {
      body = <Puzzle7Clue personId={personId} />;
    }

    return (
      <div>
        <PersonHeader personId={personId} />
        {!stageSolved && hint}
        {showBase && <Base personId={personId} />}
        <br />
        {body}
      </div>
    );
  }
}

export default Person0;
