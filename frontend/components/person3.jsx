import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle3 from './puzzle3';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';
import Puzzle8 from './puzzle8';

class Person3 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);
    const name = 'Person3';

    let body = <EmptyBody name={name} />;
    if (stage < 4 && gameState[3] && !gameState[3].solved) {
      body = <Puzzle {...this.props} component={Puzzle3} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue3" />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue2" />;
    } else if (stage === 8) {
      body = <Puzzle {...this.props} component={Puzzle8} />;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {body}
      </div>
    );
  }
}

export default Person3;
