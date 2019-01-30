import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle4 from './puzzle4';
import Puzzle7Clue from './puzzle7Clue';

class Person4 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);
    const name = 'Person4';

    let body = <EmptyBody name={name} />;
    if (stage <= 4) {
      body = <Puzzle {...this.props} component={Puzzle4} />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue3" />;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {body}
      </div>
    );
  }
}

export default Person4;
