import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle3 from './puzzle3';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';

class Person5 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage === 3) {
      body = <Puzzle {...this.props} component={Puzzle3} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue5" personId={personId} />;
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

export default Person5;
