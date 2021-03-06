import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle1 from './puzzle1';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7 from './puzzle7';

class Person3 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage === 1) {
      body = <Puzzle {...this.props} component={Puzzle1} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue3" personId={personId} />;
    } else if (stage === 7) {
      body = <Puzzle {...this.props} component={Puzzle7} />;
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

export default Person3;
