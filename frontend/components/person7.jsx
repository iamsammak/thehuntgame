import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import PuzzleB from './puzzleB';
import Puzzle5 from './puzzle5';
import Puzzle7Clue from './puzzle7Clue';

class Person7 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage <= 4) {
      body = <Puzzle {...this.props} component={PuzzleB} />;
    } else if (stage === 5) {
      body = <Puzzle {...this.props} component={Puzzle5} personId={personId} />;
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

export default Person7;
