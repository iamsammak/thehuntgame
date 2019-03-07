import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import PuzzleA from './puzzleA';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle6 from './puzzle6';
import Puzzle7Clue from './puzzle7Clue';

class Person6 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage === 1) {
      body = <Puzzle {...this.props} component={PuzzleA} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue6" personId={personId} />;
    } else if (stage === 6) {
      body = <Puzzle {...this.props} component={Puzzle6} />;
    } else if (stage === 7) {
      body = <Puzzle7Clue personId={personId} />;
    }

    return (
      <div>
        <PersonHeader personId={personId} />
        {showBase && <Base personId={personId} />}
        <br />
        {body}
      </div>
    );
  }
}

export default Person6;
