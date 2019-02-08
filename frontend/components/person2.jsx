import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';
import Puzzle8 from './puzzle8';

class Person2 extends React.Component {
  render() {
    const { gameState, name } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage === 5) {
      body = <Puzzle5Clue clue="clue1" />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue1" />;
    } else if (stage === 8) {
      body = <Puzzle {...this.props} component={Puzzle8} />;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {showBase && <Base name={name} />}
        <br />
        {body}
      </div>
    );
  }
}

export default Person2;
