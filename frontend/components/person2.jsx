import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle2 from './puzzle2';
import Puzzle7Clue from './puzzle7Clue';

class Person2 extends React.Component {
  render() {
    const { gameState, name } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage < 4 && gameState[2] && !gameState[2].solved) {
      body = <Puzzle {...this.props} component={Puzzle2} />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue1" />;
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

export default Person2;
