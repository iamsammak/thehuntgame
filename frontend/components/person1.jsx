import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle1 from './puzzle1';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';

class Person1 extends React.Component {
  render() {
    const { gameState, name } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage < 4 && gameState[1] && !gameState[1].solved) {
      body = <Puzzle {...this.props} component={Puzzle1} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue4" />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue4" />;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {showBase && <Base name={name} />}
        {body}
      </div>
    );
  }
}

export default Person1;
