import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle5 from './puzzle5';
import Puzzle7Clue from './puzzle7Clue';

class Person5 extends React.Component {
  render() {
    const { gameState, name } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage === 5) {
      body = <Puzzle {...this.props} component={Puzzle5} />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue0" />;
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

export default Person5;
